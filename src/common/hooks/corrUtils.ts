export const useIntials = (name: string) =>
  name
    .split(' ')
    .map((name) => name[0].toUpperCase())
    .join('');

export const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
