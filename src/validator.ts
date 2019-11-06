import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'PREVIOUS_DATE';

export interface CustomArgs {
  date: Date;
  parseStringToDate?: (value: string) => Date;
}

let defaultCustomArgs: CustomArgs = {
  date: void 0,
  parseStringToDate: void 0,
};

export const setCustomArgs = (customArgs: Partial<CustomArgs>) => {
  defaultCustomArgs = { ...defaultCustomArgs, ...customArgs };
};

const MISSING_DATE_ARGS =
  'FieldValidationError: date custom arg is mandatory. Example: { customArgs: { date: new Date() } }.';

const MISSING_PARSE_ARGS =
  'FieldValidationError: parseStringToDate custom arg is mandatory when value is string. Example: { customArgs: { parseStringToDate: (value) => new Date(value) } }.';

let defaultMessage = "Date isn't previous to the one provided.";
export const setErrorMessage = message => (defaultMessage = message);

const isDefined = value => value !== void 0 && value !== null && value !== '';

const isString = value => typeof value === 'string';

const parseToDate = (value, { parseStringToDate }: CustomArgs) => {
  if (!parseStringToDate) {
    throw new Error(MISSING_PARSE_ARGS);
  }

  return parseStringToDate(value);
};

export const validator: FieldValidationFunctionSync<CustomArgs> = ({
  value,
  message = defaultMessage,
  customArgs,
}) => {
  if (!customArgs || !customArgs.date) {
    throw new Error(MISSING_DATE_ARGS);
  }

  const { date } = customArgs;

  const valueAsDate = isString(value) ? parseToDate(value, customArgs) : value;

  const succeeded = !isDefined(value) || valueAsDate < date;

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(message as string, customArgs),
    type: VALIDATOR_TYPE,
  };
};
