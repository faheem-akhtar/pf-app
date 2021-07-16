import { ConfigPriceChoicesDefinitionInterface } from 'config/price-choices/definition.interface';

export const configPriceChoicesDefinition: ConfigPriceChoicesDefinitionInterface = {
  sell: {
    min: 200000,
    max: 5000000,
    increments: {
      0: 100000,
      1: 50000,
      3: 25000,
      5: 50000,
      6: 100000,
      16: 500000,
      17: 1000000,
    },
  },
  rent: {
    y: {
      min: 10000,
      max: 100000,
      increments: {
        0: 1000,
        10: 2500,
        22: 5000,
      },
    },
    m: {
      min: 750,
      max: 5000,
      increments: {
        0: 250,
        3: 500,
        6: 1000,
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
      min: 500,
      max: 3000,
      increments: {
        0: 100,
        5: 500,
        6: 1500,
      },
    },
  },
};
