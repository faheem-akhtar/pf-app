const __html = `
    window.dataLayer = [];
`;

export const HeadInitGlobalAnalyticsVariablesTemplate = (): JSX.Element => (
  // eslint-disable-next-line react/no-danger
  <script dangerouslySetInnerHTML={{ __html }} />
);
