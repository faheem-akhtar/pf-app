import { objectReduce } from 'helpers/object/reduce';
import { stringToCamelCase } from 'helpers/string/to-camel-case';
import { WindowService } from 'services/window/service';

import { UserPropertyInterface } from './interface';

export const userPropertyLoadFromLocalStorage = <Model extends UserPropertyInterface>(storageKey: string): Model[] => {
  const { localStorage } = WindowService;

  const properties = (localStorage.getItem(storageKey) || []) as Model[];

  return properties.map((property) =>
    objectReduce(property, (acc, key, val) => ({ ...acc, [stringToCamelCase(key.toString())]: val }), {} as Model)
  );
};
