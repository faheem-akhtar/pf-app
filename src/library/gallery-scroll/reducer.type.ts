import { Reducer } from 'react';

import { GalleryScrollActionType } from './action.type';
import { GalleryScrollStateInterface } from './state.interface';

export type GalleryScrollReducerType = Reducer<GalleryScrollStateInterface, GalleryScrollActionType>;
