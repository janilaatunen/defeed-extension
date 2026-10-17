import { describe, expect, it } from 'vitest';
import { blockedPageUrl, isShortsPath } from './shorts';

describe('isShortsPath', () => {
  it.each(['/shorts', '/shorts/', '/shorts/abc123', '/@someone/shorts', '/channel/UC123/shorts', '/c/name/shorts/'])(
    'matches %s',
    (path) => expect(isShortsPath(path)).toBe(true),
  );

  it.each(['/', '/watch', '/feed/subscriptions', '/shortsfoo', '/@shorts', '/@someone/videos', '/results'])(
    'ignores %s',
    (path) => expect(isShortsPath(path)).toBe(false),
  );
});

describe('blockedPageUrl', () => {
  it('passes the blocked URL along encoded', () => {
    expect(blockedPageUrl('moz-extension://x/blocked.html', 'https://www.youtube.com/shorts/a?b=1')).toBe(
      'moz-extension://x/blocked.html?from=https%3A%2F%2Fwww.youtube.com%2Fshorts%2Fa%3Fb%3D1',
    );
  });
});
