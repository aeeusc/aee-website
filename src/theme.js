// src/theme.js
//
// Shared design tokens, copied directly from aee_homepage_mock_3.html's
// :root CSS custom properties. Every section of the homepage (and the
// Login/Signup pages) should import from here rather than re-declaring
// these values, so the whole site stays visually consistent as it's
// built out section by section.

export const colors = {
  navy950: '#182032',
  navy900: '#1F3160',
  navy800: '#1C3F94',
  slate: 'rgba(198,228,255,.70)',
  slateLight: 'rgba(198,228,255,.92)',
  ink: '#182032',
  white: '#FFFFFF',
  line: 'rgba(255,255,255,.16)',
};

export const fonts = {
  display: "'League Spartan', 'Libre Franklin', system-ui, sans-serif",
  body: "'Libre Franklin', -apple-system, sans-serif",
};
