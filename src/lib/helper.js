export function getFromLocalStorage(key) {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}
