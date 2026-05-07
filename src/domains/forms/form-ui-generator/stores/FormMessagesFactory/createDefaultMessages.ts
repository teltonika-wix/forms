import { type FormMessageData, createFormMessage } from './createFormMessage';

export type FormMessages = { successfullySent: FormMessageData; failedSent: FormMessageData; submitError: string };

export const createDefaultMessages = (): FormMessages => {
  return {
    successfullySent: createFormMessage(),
    failedSent: createFormMessage(),
    submitError: '',
  };
};
