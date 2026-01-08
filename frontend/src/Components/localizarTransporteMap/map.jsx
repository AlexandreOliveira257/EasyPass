import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const santarem = { lng: -8.675239, lat: 39.242294 };
  const zoom = 14;
  const mapApi = process.env.REACT_APP_MAP_TILLER_API;

  // Coordenadas para a animação
  const trainPath = [
    [-8.675239, 39.242294],
    [-8.676500, 39.244000],
    [-8.678000, 39.246500],
    [-8.680000, 39.249000],
    [-8.682500, 39.252000]
  ];

  useEffect(() => {
    if (map.current) return;

    maptilersdk.config.apiKey = mapApi;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: "019abd07-7fbd-7062-8681-1eebe53d9a99",
      center: [santarem.lng, santarem.lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      map.current.addSource('transports-source', {
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

      // Ponto no mapa (comboio)
      map.current.addLayer({
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

      // Animação
      let pathIndex = 0;
      const animate = () => {
        pathIndex = (pathIndex + 1) % trainPath.length;
        const source = map.current.getSource('transports-source');

        // verificar se tem erros
        if (source && typeof source.setData === 'function') {
          source.setData({
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: trainPath[pathIndex] },
              properties: {}
            }]
          });
        }
        setTimeout(animate, 1000); // Movimento a cada 1 seg
      };

      animate();
    });

  }, [mapApi]); // API do mapa para evitar re-renders desnecessários

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}