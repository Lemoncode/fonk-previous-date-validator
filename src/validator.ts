import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'PREVIOUS_DATE';

export interface CustomArgs {
  date: Date;
}

const MISSING_ARGS =
  'FieldValidationError: date option for date validation is mandatory. Example: { date: new Date() }.';
const BAD_PARAMETER = 'Value must be a valid Date object.';

let defaultMessage = "Date isn't previous to the one provided.";
export const setErrorMessage = message => (defaultMessage = message);

export const validator: FieldValidationFunctionSync<CustomArgs> = ({
  value,
  message = defaultMessage,
  customArgs,
}) => {
  if (!customArgs) {
    throw new Error(MISSING_ARGS);
  }

  const { date } = customArgs;

  if (!(value instanceof Date)) {
    throw new TypeError(BAD_PARAMETER);
  }

  const succeeded = value < date;

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(message as string, customArgs),
    type: VALIDATOR_TYPE,
  };
};
