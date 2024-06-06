export const getRandomColor = () => {
  const getRandomValue = () => Math.floor(Math.random() * (250 - 160)) + 160;

  const r = getRandomValue();
  const g = getRandomValue();
  const b = getRandomValue();

  return `rgb(${r}, ${g}, ${b})`;
};
