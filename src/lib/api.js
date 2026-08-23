// src/lib/api.js
//
// Small shared helper for talking to the AEE backend on Render.
// Every auth-related fetch() call in the app should go through this
// file, so the backend URL and the "send cookies" behavior only need
// to be configured in one place.

const API_BASE_URL = 'https://aee-backend.onrender.com';

// A thin wrapper around fetch() that always:
//  - points at our backend
//  - sends/receives cookies (needed for login sessions to work)
//  - sends JSON bodies with the right header
//  - throws a real Error with the backend's message on failure, so
//    calling code can just try/catch instead of checking res.ok itself
async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include', // send the session cookie cross-origin (GitHub Pages -> Render)
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Try to parse JSON either way (our backend's error responses are JSON too)
  let data = null;
  try {
    data = await res.json();
  } catch {
    // A non-JSON response would land here (none currently expected from
    // this backend, but kept defensive) — data just stays null.
  }

  if (!res.ok) {
    const message = data?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

// Public self-signup is gone — accounts are created by an admin (see
// createUser below). login() now takes `identifier`, which can be
// either a username or an email, matching routes/auth.js's /login.
export function login(identifier, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
}

export function logout() {
  return apiRequest('/auth/logout', { method: 'POST' });
}

export function getCurrentUser() {
  return apiRequest('/auth/me', { method: 'GET' });
}

// --- Admin: account creation ---
//
// Requires an active admin session (the backend checks req.session,
// not anything passed from here) — so this only works when called by
// someone who's already logged in as an admin, via CreateUser.jsx.
//
// title is REQUIRED and must be one of CreateUser.jsx's preset TITLES.
// team is OPTIONAL as of 2026-08-23 ("make assigning a design team
// optional") — still validated against the preset TEAMS list when one is
// given, stored as NULL when it isn't. uscEmail is REQUIRED; `email` (the Gmail) is
// OPTIONAL as of 2026-08-23 ("make it so putting a gmail is optional") —
// it was briefly required alongside the USC address when both fields
// were introduced on 2026-08-16. An empty string is fine to send; the
// backend stores it as NULL. linkedinUrl/instagramUrl are also
// OPTIONAL, letting an admin pre-fill a new member's social links
// instead of leaving them for the member to fill in themselves later.
// The backend re-validates all of this (see routes/auth.js's
// VALID_TITLES/VALID_TEAMS/isValidUscEmail/isValidLinkedInUrl/
// isValidInstagramUrl) since anything enforced only client-side is
// bypassable via a direct API call.
export function createUser(firstName, lastName, email, uscEmail, title, team, linkedinUrl, instagramUrl) {
  return apiRequest('/auth/admin/create-user', {
    method: 'POST',
    body: JSON.stringify({
      firstName, lastName, email, uscEmail, title, team,
      linkedinUrl: linkedinUrl || undefined,
      instagramUrl: instagramUrl || undefined,
    }),
  });
}

// --- Admin: account management (AdminUsers.jsx) ---
//
// Every function here requires an active ADMIN session (checked
// server-side via requireAdmin, not anything passed from here). Powers
// the admin dashboard: list every account (including deactivated ones,
// unlike getMembers() above which only returns active members),
// edit an account's name/title/team, reset a locked-out member's
// password, deactivate/reactivate an account, and promote/demote admin
// status. See routes/auth.js's "Admin account management" section for
// the matching backend routes and their safeguards (e.g. an admin can't
// deactivate or demote their own account through these).
export function getAllUsers() {
  return apiRequest('/auth/admin/users', { method: 'GET' });
}

export function updateUser(id, { firstName, lastName, title, team } = {}) {
  return apiRequest(`/auth/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ firstName, lastName, title, team }),
  });
}

export function resetUserPassword(id) {
  return apiRequest(`/auth/admin/users/${id}/reset-password`, { method: 'POST' });
}

export function deactivateUser(id) {
  return apiRequest(`/auth/admin/users/${id}/deactivate`, { method: 'PUT' });
}

export function reactivateUser(id) {
  return apiRequest(`/auth/admin/users/${id}/reactivate`, { method: 'PUT' });
}

export function promoteUser(id) {
  return apiRequest(`/auth/admin/users/${id}/promote`, { method: 'PUT' });
}

export function demoteUser(id) {
  return apiRequest(`/auth/admin/users/${id}/demote`, { method: 'PUT' });
}

// PERMANENT account deletion — added 2026-08-16 ("I need to be able to
// purge members... someone graduates and then it's just clutter").
// Distinct from deactivateUser above, which is reversible: this removes
// the account row, every task assigned to them, their role history, and
// any calendar events they created. Tasks they assigned to OTHER people
// survive (those are the other member's work). The backend refuses to
// delete your own account or the last remaining admin — see
// routes/auth.js's DELETE /admin/users/:id.
export function deleteUser(id) {
  return apiRequest(`/auth/admin/users/${id}`, { method: 'DELETE' });
}

// --- Members directory (Members.jsx) ---
//
// Any logged-in member can view the full directory — not admin-gated,
// unlike createUser above. Returns every account's card-relevant fields
// (see routes/auth.js's GET /auth/members) for the Members grid to sort/
// filter/render as MemberCard flip-cards.
export function getMembers() {
  return apiRequest('/auth/members', { method: 'GET' });
}

// --- Profile (Profile.jsx) ---
//
// updateProfile only ever acts on the logged-in user's OWN profile
// (enforced server-side via req.session.userId, not anything passed
// here) — every field is optional, only send the ones actually changed.
// updateProfilePhoto is separate from updateProfile (its own endpoint,
// its own request) since the photo payload is much larger — keeping it
// out of the plain profile-fields save means a small text-only edit
// never has to re-upload the photo along with it.
//
// linkedinUrl/instagramUrl added 2026-08-11 — the backend re-validates
// these are real linkedin.com/in/... and instagram.com/... profile
// links (see routes/auth.js's LINKEDIN_URL_REGEX/INSTAGRAM_URL_REGEX)
// since Profile.jsx's matching client-side check is bypassable via a
// direct API call.
export function updateProfile({ description, hometown, favoriteFood, favoriteDrink, hobbies, linkedinUrl, instagramUrl } = {}) {
  return apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify({ description, hometown, favoriteFood, favoriteDrink, hobbies, linkedinUrl, instagramUrl }),
  });
}

export function updateProfilePhoto(photoDataUrl) {
  return apiRequest('/auth/profile/photo', {
    method: 'PUT',
    body: JSON.stringify({ photoDataUrl }),
  });
}

// --- Dashboard: change your own password ---

export function changePassword(currentPassword, newPassword) {
  return apiRequest('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

// --- Newsletter ---

export function subscribeToNewsletter(email) {
  return apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// Called by the /unsubscribe page (Unsubscribe.jsx) with the token from
// the link in a newsletter email. No session needed — the token itself
// is the authorization, and most subscribers don't have portal accounts.
// Added 2026-08-16 alongside moving the unsubscribe flow onto the site
// (it used to be a GET straight to the Render backend, which both
// exposed the backend URL and could be triggered by mail-client link
// prefetchers — see routes/newsletter.js).
export function unsubscribeFromNewsletter(token) {
  return apiRequest('/newsletter/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

// A logged-in member's OWN newsletter subscription, for the checkbox in
// Profile.jsx's Settings tab — added 2026-08-16 ("do the members for the
// portal unsubscribe in the settings for them... so it could be a
// checkbox"). Before this, members had no way to opt in or out from
// inside the portal at all: `subscribers` is a separate table from
// `users`, so the only opt-out was the token link buried in an email.
// Both endpoints act only on req.session.userId's own addresses — the
// member id is never passed from here.
export function getNewsletterPreference() {
  return apiRequest('/newsletter/preference', { method: 'GET' });
}

export function setNewsletterPreference(subscribed) {
  return apiRequest('/newsletter/preference', {
    method: 'PUT',
    body: JSON.stringify({ subscribed }),
  });
}

// As of 2026-08-08, sending/listing subscribers is gated by session-based
// admin login (same as everything else in the portal) instead of a
// shared password — the backend checks req.session, not anything passed
// from here, so these just need an active admin session already
// established via login(). See NewsletterAdmin.jsx / Portal.jsx's
// NewsletterSend.
export function sendNewsletter(subject, message) {
  return apiRequest('/newsletter/send', {
    method: 'POST',
    body: JSON.stringify({ subject, message }),
  });
}

export function getSubscribers() {
  return apiRequest('/newsletter/subscribers', { method: 'GET' });
}

// The member-facing "Newsletter" tab on the portal reads past sends via
// this — session-gated (any logged-in member), unlike sendNewsletter/
// getSubscribers above which require the separate shared admin password.
export function getNewsletterArchive() {
  return apiRequest('/newsletter/archive', { method: 'GET' });
}

// Admin-only. Removes one or more past sends from the archive (what
// getNewsletterArchive above reads from) — pass an array of ids. Added
// 2026-08-15 so an admin can clear out test sends from the Dashboard.
// Only deletes the archive record; it can't un-send an email that
// already went out.
export function deleteNewsletterSends(ids) {
  return apiRequest('/newsletter/sends', {
    method: 'DELETE',
    body: JSON.stringify({ ids }),
  });
}

// --- Member Portal: events (calendar) ---
//
// getEvents is for any logged-in member (everyone sees the same shared
// list). createEvent/deleteEvent require an active admin session — same
// requireAdmin check on the backend as createUser above. As of the
// 2026-08-11 Calendar/Tasks rework these are called from the standalone
// src/pages/Calendar.jsx month-grid page rather than Portal.jsx's old
// quarter-width CalendarPanel — the endpoints themselves are unchanged,
// still just "give me every event," with month-grouping done client-side.
export function getEvents() {
  return apiRequest('/portal/events', { method: 'GET' });
}

// endAt is OPTIONAL (added 2026-08-12) — pass an ISO string for events
// that have a known end time, or omit/pass undefined for a single-point
// event (unchanged prior behavior).
export function createEvent(title, description, eventAt, endAt) {
  return apiRequest('/portal/events', {
    method: 'POST',
    body: JSON.stringify({ title, description: description || undefined, eventAt, endAt: endAt || undefined }),
  });
}

export function deleteEvent(id) {
  return apiRequest(`/portal/events/${id}`, { method: 'DELETE' });
}

// Minimal id/name list for the admin task-assignment dropdown — NOT the
// full Members directory (that's still a placeholder on the portal).
// See routes/portal.js's GET /assignable-members for what this returns.
export function getAssignableMembers() {
  return apiRequest('/portal/assignable-members', { method: 'GET' });
}

// --- Member Portal: tasks ---
//
// getMyTasks only ever returns the logged-in user's own tasks (enforced
// server-side, not by anything passed from here). createTask is
// admin-only. setTaskDone works for any logged-in member, but only on a
// task actually assigned to them — see routes/portal.js's WHERE clause.
//
// dueDate is OPTIONAL (added 2026-08-11's Calendar/Tasks rework) — pass
// an ISO string or omit/pass null/undefined for no due date. Tasks stay
// in their own separate panel (not merged into the Calendar page), so
// this is only ever used for sorting/display within that panel.
export function getMyTasks() {
  return apiRequest('/portal/tasks/mine', { method: 'GET' });
}

// startAt/endAt are OPTIONAL (added 2026-08-14) — pass ISO strings for a
// task that has a specific time window to work in, or omit for the
// prior behavior (no time window, just an optional due date).
//
// assignedTo (as of 2026-08-15) can be a single id OR an array of ids —
// pass an array to assign the same task to multiple people at once,
// each getting their own independent copy (see routes/portal.js's POST
// /tasks comment). Still accepts a plain single id for backwards
// compatibility with any existing call sites.
export function createTask(title, description, assignedTo, dueDate, startAt, endAt) {
  return apiRequest('/portal/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title, description: description || undefined, assignedTo,
      dueDate: dueDate || undefined, startAt: startAt || undefined, endAt: endAt || undefined,
    }),
  });
}

export function setTaskDone(id, isDone) {
  return apiRequest(`/portal/tasks/${id}/done`, {
    method: 'PUT',
    body: JSON.stringify({ isDone }),
  });
}

// Deletes a task assigned to the CURRENT user — works for any member
// (not just admins), but only ever on their own task (enforced server-
// side, not by anything passed here). Added 2026-08-15 so a member can
// clear a task off their list once they don't need it anymore, done or
// not.
export function deleteTask(id) {
  return apiRequest(`/portal/tasks/${id}`, { method: 'DELETE' });
}

// --- Admin: every task across every member (Tasks.jsx's admin view) ---
//
// getAllTasks/deleteAnyTask are admin-only (checked server-side) —
// separate from getMyTasks/deleteTask above, which only ever act on the
// CURRENT user's own tasks. Added 2026-08-15 so an admin can see and
// delete a task assigned to someone else, not just their own.
export function getAllTasks() {
  return apiRequest('/portal/tasks/all', { method: 'GET' });
}

export function deleteAnyTask(id) {
  return apiRequest(`/portal/admin/tasks/${id}`, { method: 'DELETE' });
}
