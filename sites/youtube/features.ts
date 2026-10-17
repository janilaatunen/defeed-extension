import type { Site } from '@/lib/features';

export const youtube = {
  id: 'youtube',
  label: 'YouTube',
  features: [
    { id: 'shorts', label: 'Hide Shorts everywhere', default: true },
    { id: 'shortsLinks', label: 'Block Shorts links', default: true },
    { id: 'homeFeed', label: 'Hide home feed', default: true },
    { id: 'comments', label: 'Hide comments', default: true },
    { id: 'autoplay', label: 'Disable autoplay', default: true },
    { id: 'sidebar', label: 'Hide watch-page sidebar', default: true },
  ],
} satisfies Site;
