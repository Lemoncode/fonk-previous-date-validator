import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'PREVIOUS_DATE';

export interface CustomArgs {
  date: Date;
  parseStringToDateFn?: (value: string) => Date;
  inclusive?: boolean;
}

let defaultCustomArgs: CustomArgs = {
  date: null,
  parseStringToDateFn: null,
  inclusive: false,
};

export const setCustomArgs = (customArgs: Partial<CustomArgs>) => {
  defaultCustomArgs = { ...defaultCustomArgs, ...customArgs };
};

const MISSING_DATE_ARGS =
  'FieldValidationError: date custom arg is mandatory. Example: { customArgs: { date: new Date() } }.';

const MISSING_PARSE_ARGS =
  'FieldValidationError: parseStringToDateFn custom arg is mandatory when value is string. Example: { customArgs: { parseStringToDateFn: (value) => new Date(value) } }.';

let defaultMessage = "Date isn't previous to the one provided.";
export const setErrorMessage = message => (defaultMessage = message);

const isDefined = value => value !== void 0 && value !== null && value !== '';

const isString = value => typeof value === 'string';

const parseToDate = (value, { parseStringToDateFn }: CustomArgs) => {
  if (!parseStringToDateFn) {
    throw new Error(MISSING_PARSE_ARGS);
  }

  return parseStringToDateFn(value);
};

const isValid = (value: Date, customArgs: CustomArgs) =>
  customArgs.inclusive ? value <= customArgs.date : value < customArgs.date;

export const validator: FieldValidationFunctionSync<CustomArgs> = ({
  value,
  message = defaultMessage,
  customArgs = defaultCustomArgs,
}) => {
  const args: CustomArgs = {
    ...defaultCustomArgs,
    ...customArgs,
  };

  if (!args || !args.date) {
    throw new Error(MISSING_DATE_ARGS);
  }

  const valueAsDate = isString(value) ? parseToDate(value, args) : value;

  const succeeded = !isDefined(value) || isValid(valueAsDate, args);

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(message as string, args),
    type: VALIDATOR_TYPE,
  };
};
