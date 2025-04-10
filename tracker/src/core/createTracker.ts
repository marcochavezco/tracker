import { getUserId } from './getUserId';

export function createTracker() {
  const userId = getUserId();

  function sendEvent(eventName: string, data: Record<string, any> = {}) {
    const payload = {
      event: eventName,
      userId,
      url: window.location.href,
      timestamp: Date.now(),
      ...data,
    };

    console.log('[tracker]', payload);
    // navigator.sendBeacon('/track', JSON.stringify(payload));
  }

  function track(event: string, data?: Record<string, any>) {
    sendEvent(event, data);
  }

  function trackPageViews() {
    sendEvent('page_view');

    const pushState = history.pushState;
    const replaceState = history.replaceState;

    const detectRouteChange = () => sendEvent('page_view');

    history.pushState = function (...args) {
      pushState.apply(this, args);
      detectRouteChange();
    };

    history.replaceState = function (...args) {
      replaceState.apply(this, args);
      detectRouteChange();
    };

    window.addEventListener('popstate', detectRouteChange);
  }

  function trackClicks() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const label =
        target.getAttribute('aria-label') ||
        target.textContent?.trim() ||
        'unknown';

      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        sendEvent('click', {
          tag: target.tagName,
          label,
          href: (target as HTMLAnchorElement).href || undefined,
        });
      }
    });
  }

  return {
    track,
    trackPageViews,
    trackClicks,
  };
}
