import { ConfigPriceChoicesDefinitionInterface } from 'config/price-choices/definition.interface';

export const configPriceChoicesDefinition: ConfigPriceChoicesDefinitionInterface = {
  sell: {
    min: 30000,
    max: 1000000,
    increments: {
      0: 10000,
      17: 25000,
      19: 50000,
      22: 100000,
      23: 250000,
    },
  },
  rent: {
    m: {
      min: 300,
      max: 5000,
      increments: {
        0: 100,
        7: 250,
        9: 500,
        10: 3000,
      },
    },
  },
};
