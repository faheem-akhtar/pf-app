export const stringMakeCaseInsensitiveTester = (str1: string): ((str2: string) => boolean) => {
  const regex = new RegExp(`(${str1})`, 'i');
  return (str2: string): boolean => regex.test(str2);
};
