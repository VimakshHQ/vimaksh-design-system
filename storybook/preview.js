// Theme switch in the toolbar; it sets <html data-theme> exactly as the site does.
export const globalTypes = {
  theme: { description: 'Vimaksh theme', toolbar: { title: 'Theme', items: ['light', 'dark'], dynamicTitle: true } },
};
export const initialGlobals = { theme: 'light' };
export const decorators = [(story, ctx) => {
  document.documentElement.dataset.theme = ctx.globals.theme || 'light';
  try { localStorage.setItem('vimaksh-theme', document.documentElement.dataset.theme); } catch (e) {}
  return story();
}];
export const parameters = { layout: 'fullscreen', backgrounds: { disable: true } };
