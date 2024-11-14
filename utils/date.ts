/* eslint-disable import/prefer-default-export */
const msInOneDay = 1000 * 60 * 60 * 24;

const relativeTimeFormatter = new Intl.RelativeTimeFormat('ko');

export const formatToTimeAgo = (time: number) => {
  const timestampTimeAgo = new Date(time).getTime();

  const timestampNow = Date.now();

  const diff = Math.round((timestampTimeAgo - timestampNow) / msInOneDay);

  return relativeTimeFormatter.format(diff, 'days');
};
