import { z } from 'zod';
import {
  removeWhitespace,
  validateCommaSeparatedNumbers,
  validateMinMaxRange,
  validateRangeHasTwoValues,
} from './validations';
import { sortNumbers } from './sorts';

const messageCommaSeparatedValues = (name: string) =>
  `${name.toUpperCase()} values must be comma separated numbers`;

// function to remove whitespace from string
// and then split on comma to validate numbers
// and then transform to number[]
// and then reorder min -> max
// very cool programmer move, thanks zod 😎
// https://github.com/colinhacks/zod#schema-methods
export const RandomNumbersInputToSchema = (name: string) => {
  return z
    .string()
    .transform((val) => removeWhitespace(val))
    .refine(validateCommaSeparatedNumbers, {
      message: messageCommaSeparatedValues(name),
    })
    .transform((val) => {
      const numberValues: number[] = val.split(',').map(Number);
      return sortNumbers(numberValues);
    });
};

// function to remove whitespace from string
// and then split on comma to validate numbers
// and then transform to number[]
// and then validate only two values
// and then validate min < max
// very cool programmer move, thanks zod 😎
// https://github.com/colinhacks/zod#schema-methods
export const RangeInputMinMaxToSchema = (name: string) => {
  return z
    .string()
    .transform((val) => removeWhitespace(val))
    .refine(validateCommaSeparatedNumbers, {
      message: messageCommaSeparatedValues(name),
    })
    .transform((val) => val.split(',').map(Number))
    .refine(validateRangeHasTwoValues, {
      message: 'Range must have two values',
    })
    .refine(validateMinMaxRange, {
      message: 'Min value must be less than max value',
    });
};
