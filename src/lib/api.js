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
    // Some responses (like /auth/verify-email) send plain text, not JSON.
    // That's fine — data just stays null in that case.
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
export function createUser(firstName, lastName, email) {
  return apiRequest('/auth/admin/create-user', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email: email || undefined }),
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

// The admin send/list endpoints below all take the shared admin
// password as an argument rather than reading it from anywhere stored
// client-side — nothing about it is persisted in the browser (no
// localStorage, no cookie), so it has to be re-entered on the admin
// page each time. See NewsletterAdmin.jsx.
export function sendNewsletter(password, subject, message) {
  return apiRequest('/newsletter/send', {
    method: 'POST',
    body: JSON.stringify({ password, subject, message }),
  });
}

export function getSubscribers(password) {
  return apiRequest(`/newsletter/subscribers?password=${encodeURIComponent(password)}`, {
    method: 'GET',
  });
}