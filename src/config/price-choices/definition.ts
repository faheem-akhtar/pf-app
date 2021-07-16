import { ConfigPriceChoicesDefinitionInterface } from 'config/price-choices/definition.interface';

export const configPriceChoicesDefinition: ConfigPriceChoicesDefinitionInterface = {
  sell: {
    min: 300000,
    max: 50000000,
    increments: {
      0: 100000,
      27: 250000,
      33: 500000,
      34: 1000000,
      39: 15000000,
      40: 25000000,
    },
  },
  rent: {
    y: {
      min: 20000,
      max: 1000000,
      increments: {
        0: 10000,
        18: 25000,
        22: 50000,
        24: 100000,
        25: 250000,
      },
    },
    m: {
      min: 20000,
      max: 1000000,
      increments: {
        0: 10000,
        18: 25000,
        22: 50000,
        24: 100000,
        25: 250000,
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
