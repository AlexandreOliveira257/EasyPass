export const myParkedTrains = [
    { coords: [-9.122000579859076, 38.71472786224251], name: "Comboio Regional 456 - Velocidade: " +  + " km/h" },
    { coords: [-9.121919988510655, 38.714690525460696], name: "Comboio Regional 482 - Velocidade: " +  + " km/h"},
    { coords: [-9.121914951550934, 38.71487524408451], name: "Comboio Longo Curso 897 - Velocidade: " +  + " km/h"},
    { coords: [-9.121574956800231, 38.71519751798786], name: "Comboio Longo Curso 875 - Velocidade: " +  + " km/h"},
    { coords: [-9.121267702284712, 38.715470663634534], name: "Comboio Longo Curso 846 - Velocidade: " +  + " km/h"},
  ];

export const setupParkedTrains = (map) => {
  const features = myParkedTrains.map((item) => ({
    'type': 'Feature',
    'properties': { 'name': item.name },
    'geometry': {
      'type': 'Point',
      'coordinates': item.coords
    }
  }));

  map.addSource('parked-trains-source', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': features
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