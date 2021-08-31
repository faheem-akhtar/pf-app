// tslint:disable:no-namespace

declare module 'Googletag' {
  /** Type Definition */
  type GeneralSize = SingleSize | MultiSize;
  type SingleSize = SingleSizeArray | NamedSize;
  type MultiSize = SingleSize[]; // Not null
  type NamedSize = string | string[];
  type SingleSizeArray = number[];
  type SizeMapping = GeneralSize[]; // Not null
  type SizeMappingArray = SizeMapping[]; // Not null

  interface SlotRenderEndedEvent extends Events {
    advertiserId?: number;
    campaignId?: number;
    creativeId?: number;
    isEmpty?: boolean;
    lineItemId?: number;
    size?: number[] | string;
    sourceAgnosticCreativeId?: number;
    sourceAgnosticLineItemId?: number;
  }

  interface SlotOnloadEvent extends Events {
    isEmpty?: boolean;
  }

  type eventType = 'slotRenderEnded' | 'slotOnload';

  interface Events extends Event {
    serviceName: string;
    slot: Slot;
  }

  interface Slot {
    /**
     * Adds a service to this slot
     *
     * @param service - The service to be added
     * Returns the slot object on which the method was called
     */
    addService(service: Service): Slot;

    /**
     *
     * Returns Slot
     */
    defineSizeMapping(sizeMapping: SizeMappingArray): Slot;

    /**
     *
     * Returns the id of the slot element provided when the slot was defined.
     */
    getSlotElementId(): string;
  }

  interface Service {
    /**
     * Registers a listener that allows you to set up and call a JavaScript
     * function when a specific GPT event happens on the page.
     */
    addEventListener(type: eventType, listener: <E extends Events>(event: E) => void): void;

    /**
     * Get the list of slots associated with this service.
     *
     * Returns Slot
     */
    getSlots(): Slot;
  }

  interface Googletag {
    /**
     * Flag indicating that GPT API is loaded and ready to be called
     */
    apiReady: boolean;

    /**
     * Reference to the global command queue for asynchronous execution of GPT-related calls.
     */
    cmd: Array<() => void>;

    /**
     * This is the namespace that GPT uses for Events
     */
    pubadsReady: boolean;

    /**
     * Flag indicating that Pubads service is enabled, loaded and fully operational
     */
    Service: Service;

    /**
     * Returns a reference to the pubads service.
     *
     * Returns instance of the pubads service.
     */
    pubads(): PubAdsService;

    /**
     * Creates a new SizeMappingBuilder
     *
     * Returns a new builder
     */
    sizeMapping(): SizeMappingBuilder;

    /**
     * Sets that title for all ad container iframes created by pubads service, from this point onwards.
     *
     * @param title - The title to set
     */
    setAdIframeTitle(title: string): void;

    /**
     * Constructs an ad slot with a given ad unit path and size and associates it with
     * the ID of a div element on the page that will contain the ad
     *
     * @param adUnitPath - Full path of the ad unit with the network code and unit code
     * @param size - Width and height of the added slot
     * @param optDiv - ID of the div that will contain this ad unit
     * Returns Slot
     */
    defineSlot(adUnitPath: string, size: GeneralSize, optDiv?: string): Slot;

    /**
     * Instructs slot services to render the slot.
     *
     * @param div - Element
     */
    display(div: string | Element): void;

    /**
     * Enables all GPT services that have been defined for ad slots on the page
     */
    enableServices(): void;
  }

  interface PubAdsService extends Service {
    /**
     * Fetches and displays new ads for specific or all slots on the page
     *
     * @param optSlots - The slots to refresh
     * @param optOptions - Configuration options associated with this refresh call
     */
    refresh(optSlots?: Slot[], optOptions?: { changeCorrelator: boolean }): void;

    /**
     *  /**
     * Clears custom targeting parameters for a specific key or for all keys
     *
     * @param optKey - Targeting parameter key
     * Returns the service object on which the method was called
     */
    clearTargeting(optKey?: string): PubAdsService;

    /**
     * Sets custom targeting parameters for a given key that apply to all pubads service ad slots
     *
     * @param key - Targeting parameter key.
     * @param value - Targeting parameter value or array of values.
     * Returns the service object on which the method was called.
     */
    setTargeting(key: string, value: string | string[]): PubAdsService;

    /**
     * Enables single request mode for fetching multiple ads at the same time.
     *
     * Returns true if single request mode was enabled and false if it is impossible
     * to enable single request mode because the method was called after the service was enabled
     */
    enableSingleRequest(): boolean;

    /**
     * Enables collapsing of slot divs so that they don't take up any
     * space on the page when there is no ad content to display.
     *
     * @param optCollapseBeforeAdFetch - Whether to collapse the slots even before the ads are fetched
     * Returns true if div collapse mode was enabled and false if it is impossible to
     * enable collapse mode because the method was called after the service was enabled.
     */
    collapseEmptyDivs(optCollapseBeforeAdFetch?: boolean): boolean;

    /**
     * Disables requests for ads on page load, but allows ads to be requested with a googletag.pubads().refresh() call
     */
    disableInitialLoad(): void;

    /**
     * Enables lazy loading in GPT as defined by the config object
     *
     * Lazy loading only works if using async rendering.
     * Lazy fetching in SRA only works if all slots are outside the fetching margin.
     * Lazy fetching does not currently work with collapseEmptyDivs.
     */
    enableLazyLoad(options: {
      fetchMarginPercent?: number;
      renderMarginPercent?: number;
      mobileScaling?: number;
    }): void;

    /**
     * Removes the ads from the given slots and replaces them with blank content.
     *
     * @param optSlots - The array of slots to clear. Array is optional; all slots will be cleared if it is unspecified
     * Returns true if slots have been cleared, false otherwise
     */
    clear(optSlots?: Slot[]): boolean;
  }

  interface SizeMappingBuilder {
    /**
     * Adds a mapping from a single-size array representing the viewport
     * to either a single-size array or a multi-size array representing the slot
     *
     * @param vieportSize - The size of the viewport for this mapping entry
     * @param slotSize - The sizes of the slot for this mapping entry
     * Returns a reference to this builder
     */
    addSize(vieportSize: number[], slotSize: number[]): SizeMappingBuilder;

    /**
     * Builds a size map specification from the mappings added to this builder
     *
     * Returns the result built by this builder.
     * Can be null if invalid size mappings were supplied
     */
    build(): SizeMappingArray;
  }
}

// tslint:enable:no-namespace
