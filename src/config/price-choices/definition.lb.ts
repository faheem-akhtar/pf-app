import { ConfigPriceChoicesDefinitionInterface } from 'config/price-choices/definition.interface';

export const configPriceChoicesDefinition: ConfigPriceChoicesDefinitionInterface = {
  sell: {
    min: 100000,
    max: 3000000,
    increments: {
      0: 100000,
      1: 50000,
      3: 100000,
      5: 250000,
      7: 500000,
      8: 1500000,
    },
  },
  rent: {
    y: {
      min: 5000,
      max: 100000,
      increments: {
        0: 5000,
        1: 1000,
        11: 2500,
        19: 5000,
        23: 10000,
      },
    },
    m: {
      min: 500,
      max: 7500,
      increments: {
        0: 250,
        12: 500,
        13: 1000,
        14: 2500,
      },
    },
  },
};
