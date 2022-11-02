import { GraphQLScalarType } from 'graphql';

const naiveIsoDateRegex = /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/;

export const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Data type representing the date and time',
  parseValue: (value) => {
    if (!naiveIsoDateRegex.test(value as string)) {
      throw new Error('Invalid date format');
    }

    return new Date(value as string);
  },
  serialize: (value: unknown) => {
    return (value as Date).toISOString();
  },
});
