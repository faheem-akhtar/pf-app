import * as Googletag from 'Googletag';

import { configAdsGptUnits } from 'config/ads/gpt/units';
import { importScript } from 'helpers/import/script';
import { AdConfigInterface } from 'types/ad/config.interface';
import { AdStrategyInterface } from 'types/ad/strategy.interface';
import { AdTargetingInterface } from 'types/ad/targeting.interface';
import { AdUnitInterface } from 'types/ad/unit.interface';

export class DfpAdService implements AdStrategyInterface {
  /**
   * DFP targeting
   */
  private targeting!: AdTargetingInterface;

  /**
   * Googletag global object
   * using any because currently googletag has no typings
   */
  private googletag!: Googletag.Googletag;

  /**
   * GPT ad slots
   * using any because currently googletag has no typings
   */
  private adSlots: { [key: string]: Googletag.Slot } = {};

  /**
   * GPT responsive ad slots
   * using any because currently googletag has no typings
   */
  private responsiveAdSlots: { [key: string]: Googletag.Slot } = {};

  /**
   * Script load promise
   */
  private scriptLoadPromise: Promise<void>;

  /**
   * Constructor
   */
  public constructor(private config: AdConfigInterface) {
    this.scriptLoadPromise = importScript('https://securepubads.g.doubleclick.net/tag/js/gpt.js');

    this.scriptLoadPromise.then(() => {
      this.initAdUnits();

      this.initGoogletag();
    });
  }

  /**
   * @inheritDoc
   */
  public setTargeting(targeting: AdTargetingInterface): void {
    this.scriptLoadPromise.then(() => {
      this.googletag.cmd.push(() => {
        // Clear current targeting
        if (this.targeting) {
          this.googletag.pubads().clearTargeting();
        }

        this.targeting = targeting;

        Object.keys(this.targeting).forEach((target) => {
          this.googletag.pubads().setTargeting(target, this.targeting[target]);
        });
      });
    });
  }

  /**
   * @inheritDoc
   */
  public refreshAllAds(): void {
    this.scriptLoadPromise.then(() => {
      this.googletag.cmd.push(() => {
        // Refresh currently rendered ads
        this.googletag.pubads().refresh();
      });
    });
  }

  /**
   * Create ad slot
   */
  private createAdSlot(adUnit: AdUnitInterface, containerId: string): Googletag.Slot {
    if (this.adSlots[containerId]) {
      return this.adSlots[containerId];
    }

    const isFluid = adUnit.size.length === 1 && adUnit.size[0].isFluid;

    const sizes = adUnit.size.map((adSize) => [adSize.width || 0, adSize.height || 0]);

    let sizeMapping: Googletag.SizeMappingBuilder | null = null;

    adUnit.size.forEach((size) => {
      if (size.viewportWidth) {
        if (!sizeMapping) {
          sizeMapping = this.googletag.sizeMapping();
        }

        sizeMapping = sizeMapping.addSize([size.viewportWidth, 0], [size.width || 0, size.height || 0]);
      }
    });

    const slot = this.googletag.defineSlot(
      `/${process.env.NEXT_PUBLIC_GOOGLE_TAG_ACCOUNT_ID}/${adUnit.id}`,
      isFluid ? 'fluid' : sizes,
      containerId
    );

    if (sizeMapping) {
      slot.defineSizeMapping((sizeMapping as Googletag.SizeMappingBuilder).build());
      this.responsiveAdSlots[containerId] = slot;
    }

    slot.addService(this.googletag.pubads());

    this.adSlots[containerId] = slot;

    return slot;
  }

  /**
   * @inheritDoc
   */
  private registerAdUnit(adUnit: AdUnitInterface, containerId: string): void {
    this.googletag.cmd.push(() => {
      this.createAdSlot(adUnit, containerId);
    });
  }

  /**
   * Init ad units from backend
   */
  private initAdUnits(): void {
    this.googletag = (window as unknown as { googletag: Googletag.Googletag }).googletag || {};
    this.googletag.cmd = this.googletag.cmd || [];

    configAdsGptUnits.forEach((adUnit) => this.registerAdUnit(adUnit, adUnit.id));
  }

  /**
   * Initialize googletag global object
   */
  private initGoogletag(): void {
    // preconfigure all add slots and enable services
    this.googletag.cmd.push(() => {
      this.googletag.pubads().collapseEmptyDivs();
      this.googletag.pubads().enableSingleRequest();
      this.googletag.pubads().enableLazyLoad({
        fetchMarginPercent: 30, // Fetch slots within 0.3 viewports.
        renderMarginPercent: 30, // Render slots within 0.3 viewports.
      });

      this.googletag.enableServices();
    });
  }
}
