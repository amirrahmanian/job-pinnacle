import * as ms from 'ms';

export const parseSeconds = (time: string | number) => {
  let seconds = 0;

  if (typeof time === 'string') {
    seconds = Math.floor(ms(time) / 1000);
  } else if (typeof time === 'number') {
    seconds = time;
  }

  return seconds;
};
