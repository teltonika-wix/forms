import { createDefaultMessages } from './createDefaultMessages';
import { createFormMessage } from './createFormMessage';

export type * from './createDefaultMessages';
export type * from './createFormMessage';

export const FormMessagesFactory = {
  createFormMessage,
  createDefaultMessages,
};
