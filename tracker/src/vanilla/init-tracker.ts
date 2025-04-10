import { createTracker } from '../core/createTracker';

(function () {
  try {
    const tracker = createTracker();

    tracker.trackPageViews();
    tracker.trackClicks();
  } catch (err) {
    console.error('[Tracker] Tracker init failed:', err);
  }
})();
