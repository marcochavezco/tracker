export function getUserId(): string {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('ref');

  if (userId) {
    localStorage.setItem('userId', userId);
    return userId;
  }

  const storedId = localStorage.getItem('userId');
  if (storedId) return storedId;

  const anonId = 'anon_' + Date.now();
  localStorage.setItem('userId', anonId);
  return anonId;
}
