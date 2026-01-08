import * as maptilersdk from '@maptiler/sdk';

const trainPath: [number, number][] = [
  [-8.675239, 39.242294],
  [-8.676500, 39.244000],
  [-8.678000, 39.246500],
  [-8.680000, 39.249000],
  [-8.682500, 39.252000]
];

export const setupTransportAnimation = (map: maptilersdk.Map) => {
  let pathIndex = 0;

  map.addSource('transports-source', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [{
          type: 'Feature',
          geometry: { type: 'Point', coordinates: trainPath[0] },
          properties: { id: 'moving-train' }
      }]
    }
  });

  map.addLayer({
    id: 'transport-layer',
    type: 'circle',
    source: 'transports-source',
    paint: {
      'circle-radius': 8,
      'circle-color': '#1b1287',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  });

const animate = () => {
    pathIndex = (pathIndex + 1) % trainPath.length;
    
    // 1. Recuperamos a source normalmente
    const source = map.getSource('transports-source');

    // 2. Verificação de segurança: 
    // Confirmamos que a source existe e que tem o método setData
    if (source && 'setData' in source) {
      // Usamos a sintaxe de array para chamar o método, 
      // o que evita problemas de tipagem e de compilação
      (source as any).setData({
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: { 
            type: 'Point', 
            coordinates: trainPath[pathIndex] 
          },
          properties: { id: 'moving-train' }
        }]
      });
    }

    // Usamos um timeout simples para controlar a velocidade (1000ms = 1 segundo)
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1000);
  };
  animate();
};