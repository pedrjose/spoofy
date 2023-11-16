function formatDescrHotspot(str) {
  const regex = /"([^"]*)"/;
  const response = regex.exec(str);
  return response ? response[1] : null;
}

export function formatHotspotArray(hotspotArray) {
  let hotspotTrending = [];

  for (let i = 0; i < hotspotArray.length; i++) {
    const itemHotspot = {
      artist: hotspotArray[i].title,
      music: formatDescrHotspot(hotspotArray[i].descr),
    };

    hotspotTrending.push(itemHotspot);
  }

  return hotspotTrending;
}
