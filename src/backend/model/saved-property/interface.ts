import { BackendJsonApiModelType } from 'backend/json-api/model.type';

export interface BackendModelSavedPropertyInterface extends BackendJsonApiModelType {
  property_id: number;
  save_date: string;
}
