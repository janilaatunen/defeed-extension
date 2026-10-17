// Matches the Shorts player (/shorts, /shorts/<id>) and channel Shorts tabs (/@name/shorts).
const SHORTS_PATH = /^\/(?:(?:@[^/]+|channel\/[^/]+|c\/[^/]+|user\/[^/]+)\/)?shorts(?:\/|$)/;

export function isShortsPath(pathname: string): boolean {
  return SHORTS_PATH.test(pathname);
}

export function blockedPageUrl(extensionUrl: string, from: string): string {
  return `${extensionUrl}?from=${encodeURIComponent(from)}`;
}
