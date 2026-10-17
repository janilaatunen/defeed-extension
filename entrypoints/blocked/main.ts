const from = new URLSearchParams(location.search).get('from');
const home = document.querySelector<HTMLAnchorElement>('#home')!;
const back = document.querySelector<HTMLButtonElement>('#back')!;

// Send "home" to the same YouTube (desktop or mobile) the Short came from.
if (from) {
  try {
    home.href = `${new URL(from).origin}/`;
  } catch {
    // Keep the default link.
  }
}

if (history.length > 1) {
  back.addEventListener('click', () => history.back());
} else {
  back.hidden = true;
}
