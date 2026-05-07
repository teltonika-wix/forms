export function getCookie(cookieName: string): string {
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const decodedCookies = decodedCookie.split(';');

  for (let i = 0; i < decodedCookies.length; i++) {
    let currentCookie = decodedCookies[i];

    while (currentCookie.charAt(0) === ' ') {
      currentCookie = currentCookie.substring(1);
    }

    if (currentCookie.indexOf(name) === 0) {
      return currentCookie.substring(name.length, currentCookie.length);
    }
  }

  return '';
}
