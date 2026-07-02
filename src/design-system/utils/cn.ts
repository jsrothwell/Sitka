export const cn = (...inputs: (string | undefined | false | null)[]) => {
  return inputs.filter(Boolean).join(' ');
};
