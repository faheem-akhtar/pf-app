// typings.d.ts
declare interface Window {
  dataLayer: AnalyticsGaEventType[];
  utag?: TealiumUtagInterface;
  tealium?: Partial<StatsTealiumDataLayerInterface>;
}
