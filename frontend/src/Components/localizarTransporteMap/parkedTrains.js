export const myParkedTrains = [
    [-9.122000579859076, 38.71472786224251],
    [-9.121919988510655, 38.714690525460696],
    [-9.121914951550934, 38.71487524408451],
    [-9.121574956800231, 38.71519751798786],
    [-9.121267702284712, 38.715470663634534],
    [-9.121010817361281, 38.71543332724076],
    [-9.121257628365242, 38.71522109894863],
    [-9.121582512238803, 38.71491061568142],
    [-9.121743694935645, 38.71485166301042],
    [-9.121350812111984, 38.715329178250386],
    [-9.12039680722566, 38.71611725525898],
    [-9.120705307006403, 38.71590803114964],
    [-9.120607086299998, 38.716073096067646],
    [-9.120861452743554, 38.7155837953799],
    [-9.102525193446695, 38.74748531798528],
    [-9.098984580148453, 38.76910891872774],
    [-9.098990902478704, 38.76842373346028],
    [-9.099142638390845, 38.76715686279201],
    [-9.098744331620424, 38.76725545275605],
    [-9.099382886920154, 38.7685518981113],
    [-9.094570722632994, 38.80735410293093],
    [-9.06415562276996, 38.85923316029783]
  ];

export const setupParkedTrains = (map, coordinatesList) => {
  const points = coordinatesList.map(coords => ({
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': coords
    }
  }));

  map.addSource('parked-trains-source', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': points
    }
  });

  // 
  map.addLayer({
    'id': 'parked-trains-layer',
    'type': 'circle',
    'source': 'parked-trains-source',
    'paint': {
      'circle-radius': 9,
      'circle-color': '#1b1287',
      'circle-stroke-width': 3,
      'circle-stroke-color': '#ffffff'
    }
  });

  return () => {
    if (map.getLayer('parked-trains-layer')) map.removeLayer('parked-trains-layer');
    if (map.getSource('parked-trains-source')) map.removeSource('parked-trains-source');
  };
};