import { PageTypeEnum } from 'enums/page-type/enum';

import { propertySerpObfuscatedGetId } from './serp/obfuscated/get/id';
import { PropertySerpObfuscatedType } from './serp/obfuscated/type';

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export class PropertyTracker {
  /**
   * Constructor
   */
  constructor(private pageType: PageTypeEnum, private context?: any) {}

  /**
   * Trigger when a property get loaded on a page
   */
  public load(property: PropertySerpObfuscatedType, context: any): void {
    const propertyId = propertySerpObfuscatedGetId(property);
    this.context = context;
  }

  /**
   * Trigger when a property is visible in a viewport
   */
  public impression(property: PropertySerpObfuscatedType, context: any): void {}

  /**
   * Trigger when user click on the property
   */
  public click(property: PropertySerpObfuscatedType): void {}
}
