function extractVerbsFromLyrics(lyrics) {
  const regex = /\b\w+ing\b/g;

  const verbsFound = lyrics.match(regex);

  return verbsFound || [];
}

function extractLyricsExcerpt(lyrics, start, length) {
  if (start < 0 || start >= lyrics.length || length <= 0) {
    return "Invalid start position or length.";
  }

  const excerpt = lyrics.substr(start, length);
  return excerpt;
}

function extractAdverbsFromLyrics(lyrics) {
  const regex = /\b\w+ly\b/g;

  const adverbsFound = lyrics.match(regex);

  return adverbsFound || [];
}