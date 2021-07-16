import { ConfigPriceChoicesDefinitionInterface } from 'config/price-choices/definition.interface';

export const configPriceChoicesDefinition: ConfigPriceChoicesDefinitionInterface = {
  sell: {
    min: 750000,
    max: 10000000,
    increments: {
      0: 250000,
      1: 500000,
      2: 250000,
      4: 500000,
      6: 1000000,
      8: 5000000,
    },
  },
  rent: {
    m: {
      min: 3000,
      max: 30000,
      increments: {
        0: 1000,
        17: 10000,
      },
    },
  },
};
