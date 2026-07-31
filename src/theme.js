// src/theme.js
//
// Shared design tokens, copied directly from aee_homepage_mock_3.html's
// :root CSS custom properties. Every section of the homepage (and the
// Login/Signup pages) should import from here rather than re-declaring
// these values, so the whole site stays visually consistent as it's
// built out section by section.

export const colors = {
  navy950: '#0A0E1A',
  navy900: '#101830',
  navy800: '#16213E',
  slate: '#94A3B8',
  slateLight: '#C9D4E4',
  ink: '#0B0F1A',
  white: '#FFFFFF',
  line: 'rgba(255,255,255,.16)',
};

export const fonts = {
  display: "'Space Grotesk', 'Inter', system-ui, sans-serif",
  body: "'Inter', -apple-system, sans-serif",
};
