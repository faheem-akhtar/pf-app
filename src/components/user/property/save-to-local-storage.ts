import { objectReduce } from 'helpers/object/reduce';
import { stringToSnakeCase } from 'helpers/string/to-snake-case';
import { WindowService } from 'services/window/service';

import { UserPropertyInterface } from './interface';

export const userPropertySaveToLocalStorage = <Model extends UserPropertyInterface>(
  storageKey: string,
  data: Model[]
): void => {
  const { localStorage } = WindowService;

  localStorage.setItem(
    storageKey,
    data.map((item) =>
      objectReduce(item, (acc, key, val) => ({ ...acc, [stringToSnakeCase(key.toString())]: val }), {})
    )
  );
};
