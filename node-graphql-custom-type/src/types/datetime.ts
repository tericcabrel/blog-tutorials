import { GraphQLScalarType, Kind } from 'graphql';

export const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Data type representing the date and time',
  parseLiteral: (valueNode) => {
    if (valueNode.kind === Kind.STRING) {
      if (valueNode.value.length < 10) {
        throw new Error('Invalid date format');
      }
    }
    return null;
  },
  parseValue: (value) => {
    return new Date(value);
  },
  serialize: (value: Date) => {
    return value.toISOString();
  },
});
