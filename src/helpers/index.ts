import { MOBILE_VIEW } from "../constants";

const getRandomLightColor = () => {
  const getColorValue = () => Math.floor(Math.random() * 156) + 150;

  const r = getColorValue();
  const g = getColorValue();
  const b = getColorValue();

  return `rgb(${r}, ${g}, ${b})`;
};

const luminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrast = (rgb1: string, rgb2: string) => {
  const [r1, g1, b1] = rgb1.match(/\d+/g)!.map(Number);
  const [r2, g2, b2] = rgb2.match(/\d+/g)!.map(Number);

  const lum1 = luminance(r1, g1, b1);
  const lum2 = luminance(r2, g2, b2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export const getReadableLightColor = () => {
  let color: string;

  do {
    color = getRandomLightColor();
  } while (contrast(color, "rgb(0, 0, 0)") < 4.5);

  return color;
};

/**
 * Generates a random integer within a specified range.
 *
 * @param {object | number} number
 * @returns {number} - A random integer within the specified range.
 */
export const getRandom = (
  number: { min: number; max: number } | number
): number => {
  if (typeof number === "number") {
    return Math.floor(Math.random() * number);
  }

  const { max, min } = number;

  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Generates random id that can be used for some specific elements or mapping
 * @returns {number} - Generated id
 *
 */
export const getRandomId = (): number => {
  return parseInt(Date.now().toString().split("").reverse().join(""));
};

export const isMobile = () => {
  return window.innerWidth < MOBILE_VIEW;
};

export const getModifiedPosition = (
  position: { x: number; y: number },
  condition: boolean,
  valueToModify: number,
) => {
  return {
    ...position,
    x:
    condition ? position.x + valueToModify : position.x,
  };
};
