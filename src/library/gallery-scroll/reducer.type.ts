import { GalleryScrollActionType } from './action.type';
import { GalleryScrollStateInterface } from './state.interface';
import { Reducer } from 'react';

export type GalleryScrollReducerType = Reducer<GalleryScrollStateInterface, GalleryScrollActionType>;
