export const toBoolean = () => ({
  control: {
    type: 'boolean',
  },
});

export const toEnum = <T>(arr: T[]) => ({
  control: {
    type: 'inline-radio',
    options: arr,
  },
});

export const toStr = () => ({
  control: {
    type: 'text',
  },
});
