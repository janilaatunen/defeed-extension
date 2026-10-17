export default defineContentScript({
  matches: ['*://www.youtube.com/*', '*://m.youtube.com/*'],
  runAt: 'document_start',
  main() {
    document.documentElement.dataset.defeed = 'on';
  },
});
