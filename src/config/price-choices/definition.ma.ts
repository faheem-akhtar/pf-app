import { ConfigPriceChoicesDefinitionInterface } from 'config/price-choices/definition.interface';

export const configPriceChoicesDefinition: ConfigPriceChoicesDefinitionInterface = {
  sell: {
    min: 100000,
    max: 40000000,
    increments: {
      0: 100000,
      19: 250000,
      29: 500000,
      30: 1000000,
      35: 10000000,
      36: 20000000,
    },
  },
  rent: {
    y: {
      min: 100000,
      max: 300000,
      increments: {
        0: 50000,
        2: 100000,
      },
    },
    m: {
      min: 100,
      max: 40000,
      increments: {
        0: 400,
        1: 500,
        2: 1500,
        3: 500,
        4: 1000,
        11: 2500,
        13: 5000,
        16: 10000,
      },
    },
    w: {
      min: 2000,
      max: 15000,
      increments: {
        0: 1000,
        3: 2500,
        5: 5000,
      },
    },
    d: {
      min: 25,
      max: 1000,
      increments: {
        0: 175,
        1: 100,
        2: 50,
        6: 100,
      },
    },
  },
};
