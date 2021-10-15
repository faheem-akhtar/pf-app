import { GtmStatsAdapterListingStatus } from '@propertyfinder/pf-frontend-common/dist/module/gtm/stats/adapter/listing-status';
import { StatsContextLocalInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/context/local.interface';
import { StatsDataPropertyInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/data/property.interface';
import { StatsEntityEnum } from '@propertyfinder/pf-frontend-common/dist/module/stats/entity.enum';
import { StatsDataService } from '@propertyfinder/pf-frontend-common/dist/service/stats-data/service';

import { PageTypeEnum } from 'enums/page-type/enum';
import { AnalyticsGaService } from 'services/analytics/ga.service';
import { StatsAttributionService } from 'services/stats/attribution.service';
import { StatsService } from 'services/stats/service';

import { propertySerpObfuscatedGetId } from './serp/obfuscated/get/id';
import { propertySerpObfuscatedGetLiveEventValue } from './serp/obfuscated/get/live-event-value';
import { propertySerpObfuscatedGetVideoTour } from './serp/obfuscated/get/video-tour';
import { PropertySerpObfuscatedType } from './serp/obfuscated/type';

// eslint-disable-next-line pf-rules/export-name-validation
export class PropertyTracker {
  /**
   * Constructor
   */
  constructor(private pageType: PageTypeEnum, private context?: StatsContextLocalInterface) {}

  /**
   * Trigger when a property get loaded on a page
   */
  public load(property: PropertySerpObfuscatedType, context: StatsContextLocalInterface): void {
    const propertyId = propertySerpObfuscatedGetId(property);
    this.context = context;

    StatsService().propertyLoad(parseInt(propertyId, 10), this.context);
  }

  /**
   * Trigger when a property is visible in a viewport
   */
  public impression(property: PropertySerpObfuscatedType, context: StatsContextLocalInterface): void {
    const propertyId = parseInt(propertySerpObfuscatedGetId(property), 10);
    this.context = context;

    if (propertySerpObfuscatedGetLiveEventValue(property)) {
      this.sendCustomEventViaStatsData(propertyId, 'Live Viewing', 'Impression');
    }

    if (propertySerpObfuscatedGetVideoTour(property)) {
      this.sendCustomEventViaStatsData(propertyId, 'Virtual Tour', 'Impression');
    }

    this.sendCustomEventViaStatsData(propertyId, '360', 'Impression', (statsData) => !!statsData.has360View);

    StatsService().propertyImpression(propertyId, this.context);
  }

  /**
   * Trigger when user click on the property
   */
  public click(property: PropertySerpObfuscatedType): void {
    const propertyId = parseInt(propertySerpObfuscatedGetId(property), 10);

    if (propertySerpObfuscatedGetLiveEventValue(property)) {
      this.sendCustomEventViaStatsData(propertyId, 'Live Viewing', 'Click');
    }

    if (propertySerpObfuscatedGetVideoTour(property)) {
      this.sendCustomEventViaStatsData(propertyId, 'Virtual Tour', 'Click');
    }

    this.sendCustomEventViaStatsData(propertyId, '360', 'Click', (statsData) => !!statsData.has360View);

    StatsService().propertyClick(propertyId, {
      ...(this.context || {}),
      authentication: {
        attributionId: StatsAttributionService().push('property' as StatsEntityEnum, propertyId.toString()),
      },
    });
  }

  /**
   * Send tracking
   */
  private sendCustomEventViaStatsData(
    propertyId: number,
    eventCategory: string,
    type: 'Impression' | 'Click',
    predicate: (statsData: StatsDataPropertyInterface) => boolean = (): boolean => true
  ): void {
    StatsDataService()
      .getPropertyStore()
      .load(propertyId)
      .then((statsData) => {
        const listingStatus = new GtmStatsAdapterListingStatus(statsData.listingStatusDisplayed).getData();
        if (predicate(statsData)) {
          AnalyticsGaService.send({
            event: 'customEvent',
            eventCategory,
            eventAction: `${eventCategory} - ${type} - ${listingStatus}`,
            eventLabel: `${this.pageType} - ${eventCategory} - ${type} - ${listingStatus}`,
          });
        }
      });
  }
}
