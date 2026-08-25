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
//
// As of 2026-08-24 this is only the FIRST half of logging in. Every
// account requires a 6-digit code emailed at this point, so a successful
// call here usually does NOT mean the person is logged in — check the
// response:
//
//   { twoFactorRequired: true, sentTo: ['k••••@usc.edu'], ... }
//        -> show the code step and call verifyLoginCode() next
//   { twoFactorRequired: false, message: 'Welcome back, ...' }
//        -> already logged in; this browser is a remembered device
//
// Login.jsx branches on exactly that field.
export function login(identifier, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
}

// Second half of the login flow. Which account this applies to lives in
// the server-side session, so there's no user id to pass — just the code
// the person typed, and whether to skip the code on this browser for the
// next 30 days.
export function verifyLoginCode(code, rememberDevice) {
  return apiRequest('/auth/login/verify', {
    method: 'POST',
    body: JSON.stringify({ code, rememberDevice: Boolean(rememberDevice) }),
  });
}

// "Didn't get it? Send another." The backend enforces a cooldown and a
// per-login cap, so this can throw with a message worth showing as-is.
export function resendLoginCode() {
  return apiRequest('/auth/login/resend', { method: 'POST' });
}

// --- Trusted devices (Settings tab) ---
// The counterpart to the "remember this device" checkbox on the code
// screen: see how many browsers are currently allowed to skip 2FA, and
// revoke all of them.
export function getTrustedDevices() {
  return apiRequest('/auth/trusted-devices', { method: 'GET' });
}

export function forgetTrustedDevices() {
  return apiRequest('/auth/trusted-devices', { method: 'DELETE' });
}

// --- Public forms (no session required) ---
// The interest form replaced a Google Form; the contact form replaced a
// mailto: link. Both post to the backend, which emails the club — see
// routes/forms.js. These are the only two calls in this file that work
// for someone who is not logged in.
export function submitInterestForm({ firstName, lastName, uscEmail, major, year, heardFrom }) {
  return apiRequest('/forms/interest', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, uscEmail, major, year, heardFrom }),
  });
}

export function submitContactForm({ name, email, subject, message }) {
  return apiRequest('/forms/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, subject, message }),
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
// websiteUrl and photoDataUrl added 2026-08-23, both optional. The photo
// travels in the create payload rather than as a follow-up request so an
// account is never left half-made (created, but the picture silently
// failed) — if the image is bad the whole create is rejected and the
// admin fixes it before anything is written.
export function createUser(
  firstName, lastName, email, uscEmail, title, team,
  linkedinUrl, instagramUrl, websiteUrl, photoDataUrl
) {
  return apiRequest('/auth/admin/create-user', {
    method: 'POST',
    body: JSON.stringify({
      firstName, lastName, email, uscEmail, title, team,
      linkedinUrl: linkedinUrl || undefined,
      instagramUrl: instagramUrl || undefined,
      websiteUrl: websiteUrl || undefined,
      photoDataUrl: photoDataUrl || undefined,
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

// hideFromOrgChart added 2026-08-23 — drops an account off the org chart
// without deactivating it or changing its title (see the column comment
// in db/database.js). Optional like every other field; omit it to leave
// the current value alone.
// Expanded 2026-08-23 to cover every field the create form collects
// ("make what we have from dashboard for making accounts to be able to be
// edited on dashboard for existing accounts for admins").
//
// IMPORTANT for callers: an omitted key means "leave this field alone",
// while an explicit EMPTY STRING means "clear it". That distinction is
// what lets an admin remove a stale LinkedIn link rather than only ever
// overwrite it. uscEmail and title are required and cannot be cleared.
export function updateUser(id, {
  firstName, lastName, title, team, hideFromOrgChart,
  email, uscEmail, linkedinUrl, instagramUrl, websiteUrl,
} = {}) {
  return apiRequest(`/auth/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      firstName, lastName, title, team, hideFromOrgChart,
      email, uscEmail, linkedinUrl, instagramUrl, websiteUrl,
    }),
  });
}

// Sets (or clears, with null) another account's profile photo. Distinct
// from updateProfilePhoto below, which is strictly self-serve and writes
// to the logged-in user — see routes/auth.js for why the two are separate
// endpoints rather than one with a user id.
export function adminSetUserPhoto(id, photoDataUrl) {
  return apiRequest(`/auth/admin/users/${id}/photo`, {
    method: 'PUT',
    body: JSON.stringify({ photoDataUrl }),
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
export function updateProfile({ description, hometown, favoriteFood, favoriteDrink, hobbies, linkedinUrl, instagramUrl, websiteUrl } = {}) {
  return apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify({ description, hometown, favoriteFood, favoriteDrink, hobbies, linkedinUrl, instagramUrl, websiteUrl }),
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

// --- Newsletter template builder (admin) ---
//
// Added 2026-08-23. Templates are saved as structured BLOCKS, not HTML —
// see newsletter-blocks.js on the backend for the renderer and why.
// All admin-only.
//
// Note that previewNewsletter goes to the SERVER to render. The editor
// deliberately does not build its own preview markup: the preview has to
// be the same HTML that gets emailed, and two renderers (one here, one
// on the server) would drift apart and start lying about what
// subscribers actually receive.
export function getNewsletterTemplates() {
  return apiRequest('/newsletter/templates', { method: 'GET' });
}

export function getNewsletterTemplate(id) {
  return apiRequest(`/newsletter/templates/${id}`, { method: 'GET' });
}

export function createNewsletterTemplate(name, blocks) {
  return apiRequest('/newsletter/templates', {
    method: 'POST',
    body: JSON.stringify({ name, blocks }),
  });
}

export function updateNewsletterTemplate(id, name, blocks) {
  return apiRequest(`/newsletter/templates/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, blocks }),
  });
}

export function deleteNewsletterTemplate(id) {
  return apiRequest(`/newsletter/templates/${id}`, { method: 'DELETE' });
}

export function previewNewsletter(blocks, subject) {
  return apiRequest('/newsletter/preview', {
    method: 'POST',
    body: JSON.stringify({ blocks, subject }),
  });
}

// Sends the template to one address so it can be checked in a real
// inbox first. Does NOT post to the members' portal archive — see
// /newsletter/send-test in the backend.
export function sendTestNewsletter(subject, blocks, to) {
  return apiRequest('/newsletter/send-test', {
    method: 'POST',
    body: JSON.stringify({ subject, blocks, to }),
  });
}

export function sendNewsletterTemplate(subject, blocks) {
  return apiRequest('/newsletter/send-template', {
    method: 'POST',
    body: JSON.stringify({ subject, blocks }),
  });
}

// Returns { subject, blocks }. Throws with a clear message if the
// backend has no ANTHROPIC_API_KEY configured — the rest of the builder
// works fine without it.
export function draftNewsletterWithAI(prompt) {
  return apiRequest('/newsletter/draft-ai', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
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
