export default defineBackground(() => {
  console.log('Defeed background started', { id: browser.runtime.id });
});
