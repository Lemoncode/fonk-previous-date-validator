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

let defaultMessage = "Date isn't previous to the one provided.";
export const setErrorMessage = message => (defaultMessage = message);

const isDefined = value => value !== void 0 && value !== null && value !== '';

export const validator: FieldValidationFunctionSync<CustomArgs> = ({
  value,
  message = defaultMessage,
  customArgs,
}) => {
  if (!customArgs) {
    throw new Error(MISSING_ARGS);
  }

  const { date } = customArgs;

  const succeeded = !isDefined(value) || value < date;

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(message as string, customArgs),
    type: VALIDATOR_TYPE,
  };
};
