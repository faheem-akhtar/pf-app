import { ConfigPriceChoicesDefinitionInterface } from 'config/price-choices/definition.interface';

export const configPriceChoicesDefinition: ConfigPriceChoicesDefinitionInterface = {
  sell: {
    min: 100000,
    max: 40000000,
    increments: {
      0: 100000,
      29: 250000,
      35: 500000,
      38: 1000000,
      42: 5000000,
      44: 20000000,
    },
  },
  rent: {
    m: {
      min: 5000,
      max: 300000,
      increments: {
        0: 1000,
        15: 2500,
        27: 5000,
        37: 50000,
        39: 100000,
      },
    },
    d: {
      min: 2500,
      max: 15000,
      increments: {
        0: 500,
        3: 1000,
        5: 1500,
        6: 7500,
      },
    },
  },
};
