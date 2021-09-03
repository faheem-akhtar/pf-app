import { PropertyReportUserTypeEnum } from 'enums/property/report/user-type.enum';
import { SelectFieldOptionInterface } from 'library/select-field/option.interface';

export const propertyReportFormAdditionalUserTypes: SelectFieldOptionInterface<PropertyReportUserTypeEnum>[] = [
  {
    label: 'user-landlord',
    value: PropertyReportUserTypeEnum.landlord,
  },
  {
    label: 'user-agent',
    value: PropertyReportUserTypeEnum.agent,
  },
];
