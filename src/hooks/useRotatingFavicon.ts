import { useEffect } from 'react';

/**
 * useRotatingFavicon / useStaticFavicon:
 * Sets the official Bitcoin Lite Edition logo as the static browser favicon.
 * Does not rotate or animate to preserve clean, distraction-free branding.
 */
export function useRotatingFavicon() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const logoSrc = '/src/assets/images/bitcoin_lite_logo_1791633769447.jpg';
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/jpeg';
    link.href = logoSrc;
  }, []);
}

export const useStaticFavicon = useRotatingFavicon;

