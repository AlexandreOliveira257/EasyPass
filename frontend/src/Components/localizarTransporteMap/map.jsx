import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import * as turf from '@turf/turf';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  // --- CONFIGURAÇÃO: EDITA AQUI ---
  const MAPTILER_API_KEY = 'ccju2Vzo4orZNRCbc50a'; 
  const MAP_STYLE_ID = '019abd07-7fbd-7062-8681-1eebe53d9a99';
  // --------------------------------

  const santarem = { lng: -8.675239, lat: 39.242294 };
  const zoom = 14;

  // Traçado do comboio (podes adicionar mais pontos para caminhos complexos)
  const trainPath = [
    [-8.675239, 39.242294],
    [-8.676500, 39.244000],
    [-8.678000, 39.246500],
    [-8.680000, 39.249000],
    [-8.682500, 39.252000]
  ];

  useEffect(() => {
    if (map.current) return;

    maptilersdk.config.apiKey = MAPTILER_API_KEY;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: MAP_STYLE_ID,
      center: [santarem.lng, santarem.lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      // 1. Criar a linha e calcular distância com Turf
      const route = turf.lineString(trainPath);
      const distance = turf.length(route);

      // 2. Adicionar a fonte de dados (começa no ponto inicial)
      map.current.addSource('train-source', {
        type: 'geojson',
        data: turf.point(trainPath[0])
      });

      // 3. Adicionar a camada visual
      map.current.addLayer({
        id: 'train-layer',
        type: 'circle',
        source: 'train-source',
        paint: {
          'circle-radius': 9,
          'circle-color': '#1b1287',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff'
        }
      });

      // 4. Lógica de Animação Suave
      let startTime = 0;
      const duration = 8000; // 8 segundos para percorrer o trajeto

      const frame = (time) => {
        if (!startTime) startTime = time;
        const phase = (time - startTime) / duration;

        if (phase <= 1) {
          // Calcula onde o ponto deve estar baseado no tempo (0 a 1)
          const currentPos = turf.along(route, phase * distance);
          
          const source = map.current.getSource('train-source');
          if (source) source.setData(currentPos);
          
          requestAnimationFrame(frame);
        } else {
          // Loop: Reinicia a animação
          startTime = 0;
          requestAnimationFrame(frame);
        }
      };

      requestAnimationFrame(frame);
    });

  }, []); // useEffect corre apenas uma vez ao montar o componente

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}