export function breaklineContent(content) {
  const format = content.split("\n");

  const formatContent = format.map((content) => content.trim());

  return formatContent;
}
