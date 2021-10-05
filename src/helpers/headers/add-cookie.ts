export const headersAddCookie = (cookieKey: string, cookieValue: string, headers: Record<string, string>): void => {
  const cookies = (headers['cookie'] || '').split(/;|,/).reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);

  cookies[cookieKey] = cookieValue;

  headers['cookie'] = Object.keys(cookies).reduce((acc, cookieKey) => {
    return `${acc}${acc ? '; ' : ''}${cookieKey}=${cookies[cookieKey]}`;
  }, '');
};
