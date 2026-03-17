// simple class name joiner — replaces clsx/tailwind-merge
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
