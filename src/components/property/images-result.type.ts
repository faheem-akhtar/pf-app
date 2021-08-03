import { BackendModelPropertyImageInterface } from 'backend/model/property/image.interface';

type PropertyId = string;

export type PropertyImagesResultType = Record<PropertyId, BackendModelPropertyImageInterface[]>;
