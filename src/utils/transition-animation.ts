/* eslint-disable import/prefer-default-export */
export const gradientAnimation: (color: string) => string = (color) => {
  let animation = '';
  for (let i = 0; i <= 100; i += 10) {
    animation += `${i}% {
      background-image: linear-gradient(to right, ${color} ${i}%, transparent 0%);
    }`;
  }
  return animation;
};
