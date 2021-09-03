import { PropertyReportReasonEnum } from 'enums/property/report/reason.enum';
import { SelectFieldOptionInterface } from 'library/select-field/option.interface';

export const propertyReportFormReasons: SelectFieldOptionInterface<PropertyReportReasonEnum>[] = [
  {
    label: 'report/property-not-available',
    value: PropertyReportReasonEnum.notAvailable,
  },
  {
    label: 'report/inaccurate-price',
    value: PropertyReportReasonEnum.inaccuratePrice,
  },
  {
    label: 'report/no-response-broker',
    value: PropertyReportReasonEnum.noResponseBroker,
  },
  {
    label: 'report/no-property-details',
    value: PropertyReportReasonEnum.noPropertyDetail,
  },
  {
    label: 'report/poor-quality-irrelevant-photos',
    value: PropertyReportReasonEnum.poorQuality,
  },
  {
    label: 'report/poor-description',
    value: PropertyReportReasonEnum.poorDescription,
  },
  {
    label: 'report/inaccurate-location',
    value: PropertyReportReasonEnum.inaccurateLocation,
  },
  {
    label: 'report/inaccurate-bedrooms',
    value: PropertyReportReasonEnum.inaccurateBedrooms,
  },
  {
    label: 'report/incorrect-property-type',
    value: PropertyReportReasonEnum.incorrectPropertyType,
  },
];
