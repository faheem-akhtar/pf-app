import { BackendModelPropertyImageInterface } from 'backend/model/property/image.interface';

type PropertyId = string;

export type BackendApiPropertyImagesType = Record<PropertyId, BackendModelPropertyImageInterface[]>;
