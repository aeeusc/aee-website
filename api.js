// src/lib/api.js
//
// Small shared helper for talking to the AEE backend on Render.
// Every auth-related fetch() call in the app should go through this
// file, so the backend URL and the "send cookies" behavior only need
// to be configured in one place.

// The live backend URL. In a real production setup you'd usually pull
// this from a Vite environment variable (import.meta.env.VITE_API_URL)
// so you could point at a different backend for local dev vs. the live
// site without editing code — that's a nice upgrade for later. For now,
// hardcoding it keeps this simple to understand and to paste in.
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

export function signup(email, password) {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function login(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return apiRequest('/auth/logout', { method: 'POST' });
}

export function getCurrentUser() {
  return apiRequest('/auth/me', { method: 'GET' });
}
