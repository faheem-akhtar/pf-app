export const headersParseExperimentsFromSetCookie = (valueOfSetCookieHeader: string): any => {
  try {
    const keyStr = process.env.ENVIRONMENT === 'staging' ? 'website_ab_tests_staging=' : 'website_ab_tests=';
    const indexOfKeyStr = valueOfSetCookieHeader.indexOf(keyStr);
    const valueIndex = indexOfKeyStr + keyStr.length;
    const valueOfSetCookieHeaderStartingFromAbTestValue = valueOfSetCookieHeader.substr(valueIndex);
    const abTestCookieValue = valueOfSetCookieHeaderStartingFromAbTestValue.substr(
      0,
      valueOfSetCookieHeaderStartingFromAbTestValue.indexOf(';')
    );

    return decodeURIComponent(abTestCookieValue)
      .split(',')
      .map((abTestKeyValue) => abTestKeyValue.split('='))
      .filter(([key, value]) => key && value)
      .reduce((acc, [key, value]) => {
        acc[key] = {
          async: false,
          variants: {
            [value]: true,
          },
        };
        return acc;
      }, {} as any);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Failed to parse abtests from set cookie header: ${valueOfSetCookieHeader}`, e);
    return {};
  }
};
