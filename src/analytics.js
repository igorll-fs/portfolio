// Lightweight analytics - stores in localStorage + sends beacon
const ANALYTICS_KEY = 'igor_dev_analytics';
const BEACON_URL = 'https://api.countapi.xyz';

function getVisitorId() {
  let id = localStorage.getItem('igor_visitor_id');
  if (!id) {
    id = crypto.randomUUID?.() || Math.random().toString(36).slice(2);
    localStorage.setItem('igor_visitor_id', id);
  }
  return id;
}

function getSessionVisits() {
  const key = 'igor_session_visits';
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveSessionVisit(visit) {
  const visits = getSessionVisits();
  visits.push(visit);
  sessionStorage.setItem(key, JSON.stringify(visits));
}

export function trackPageView() {
  const page = window.location.pathname;
  const referrer = document.referrer || 'direct';
  const device = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  const visit = {
    ts: new Date().toISOString(),
    page,
    referrer,
    device,
    visitor: getVisitorId().slice(0, 8),
  };

  // Store locally
  const stored = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
  stored.push(visit);
  // Keep last 1000 visits
  if (stored.length > 1000) stored.splice(0, stored.length - 1000);
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(stored));

  // Send to CountAPI (free, no auth)
  fetch(`${BEACON_URL}/hit/igor-dev-portfolio/pageviews`, { method: 'POST' }).catch(() => {});
  fetch(`${BEACON_URL}/hit/igor-dev-portfolio/${encodeURIComponent(page)}`, { method: 'POST' }).catch(() => {});
  fetch(`${BEACON_URL}/hit/igor-dev-portfolio/${device}`, { method: 'POST' }).catch(() => {});
}

export function getAnalytics() {
  return JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
}

export function getAnalyticsSummary() {
  const visits = getAnalytics();
  const now = Date.now();
  const today = visits.filter(v => new Date(v.ts).toDateString() === new Date().toDateString());
  const week = visits.filter(v => now - new Date(v.ts).getTime() < 7 * 86400000);

  // Country (from referrer domain)
  const refMap = {};
  visits.forEach(v => {
    try {
      const domain = v.referrer === 'direct' ? 'Direto' : new URL(v.referrer).hostname;
      refMap[domain] = (refMap[domain] || 0) + 1;
    } catch { refMap[v.referrer] = (refMap[v.referrer] || 0) + 1; }
  });

  // Pages
  const pageMap = {};
  visits.forEach(v => { pageMap[v.page] = (pageMap[v.page] || 0) + 1; });

  // Devices
  const devices = { mobile: 0, desktop: 0 };
  visits.forEach(v => { devices[v.device] = (devices[v.device] || 0) + 1; });

  // Hourly (today)
  const hourly = {};
  today.forEach(v => {
    const h = new Date(v.ts).getHours();
    hourly[h] = (hourly[h] || 0) + 1;
  });

  return {
    total: visits.length,
    today: today.length,
    thisWeek: week.length,
    referrers: Object.entries(refMap).sort((a, b) => b[1] - a[1]).slice(0, 10),
    pages: Object.entries(pageMap).sort((a, b) => b[1] - a[1]).slice(0, 10),
    devices,
    hourly,
  };
}
