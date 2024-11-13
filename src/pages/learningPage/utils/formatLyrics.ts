export const formatLyric = (
  lyric: string,
  lineLimit: number,
  expanded: boolean
) => {
  const lines = lyric.split("\n");
  if (lines.length > lineLimit && !expanded) {
    return lines.slice(0, lineLimit).join("\n") + "...";
  }
  return lyric;
};
