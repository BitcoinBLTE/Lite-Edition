import { useEffect } from 'react';

/**
 * useRotatingFavicon / useStaticFavicon:
 * Sets the official Falcon logo as the static browser favicon across all formats
 * (SVG, PNG, ICO, and Apple Touch Icon) with proper MIME types and cache invalidation.
 */
export function useRotatingFavicon() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // 1. Remove any legacy or broken image/jpeg favicon tags
    const brokenJpegs = document.querySelectorAll("link[type='image/jpeg']");
    brokenJpegs.forEach((el) => el.remove());

    // 2. Ensure official Falcon favicons are set and active
    const updateOrCreateFavicon = (rel: string, type: string, href: string) => {
      let link: HTMLLinkElement | null = document.querySelector(`link[rel='${rel}'][type='${type}']`);
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        link.type = type;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    updateOrCreateFavicon('icon', 'image/svg+xml', '/favicon.svg?v=3');
    updateOrCreateFavicon('icon', 'image/png', '/favicon-32x32.png?v=3');
    updateOrCreateFavicon('shortcut icon', 'image/x-icon', '/favicon.ico?v=3');
    updateOrCreateFavicon('apple-touch-icon', 'image/png', '/apple-touch-icon.png?v=3');
  }, []);
}

export const useStaticFavicon = useRotatingFavicon;
