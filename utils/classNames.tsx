export const className = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};
