export type FormMessageData = { isActive: boolean; title: string; message: string };

export const createFormMessage = ({ isActive, title, message }: Partial<FormMessageData> = {}): FormMessageData => {
  return {
    isActive: !!isActive,
    title: title || '',
    message: message || '',
  };
};
