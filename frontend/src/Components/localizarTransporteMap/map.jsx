import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

//import autocarro
import { busPath, setupBusAnimation } from './runningBus.js';

// import comboios
import { trainPath, setupTrainAnimation } from './runningTrain.js'; 
import { myParkedTrains, setupParkedTrains } from './parkedTrains.js'; 

// import id's para popups
const layers = ['parked-trains-layer', 'train-layer', 'bus-layer'];

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const MAPTILER_API_KEY = 'ccju2Vzo4orZNRCbc50a'; 
  const MAP_STYLE_ID = '019abd07-7fbd-7062-8681-1eebe53d9a99';

  const santarem = { lng: -8.675239, lat: 39.242294 };
  const zoom = 14;

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
      // animações
      setupTrainAnimation(map.current, trainPath);
      setupBusAnimation(map.current, busPath);
      setupParkedTrains(map.current, myParkedTrains);

      const transportes = ['parked-trains-layer'];

      // popups
      map.current.on("click", transportes, (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties.name;

      // Só abre o popup se houver um nome definido nas propriedades
        if (properties && properties.name) {
          new maptilersdk.Popup({
            closeButton: true,
            closeOnClick: true,
            className: 'custom-popup'
          })
            .setLngLat(coordinates)
            .setHTML(`<strong>Comboio Parado</strong><br>${properties.name}`)
            .addTo(map.current);
        }
      });

      // O cursor pointer continua a ser útil para todos, para mostrar que são clicáveis
          const allLayers = ['parked-trains-layer', 'train-layer', 'bus-layer'];
          allLayers.forEach(layerId => {
            map.current.on('mouseenter', layerId, () => {
              map.current.getCanvas().style.cursor = 'pointer';
            });
            map.current.on('mouseleave', layerId, () => {
              map.current.getCanvas().style.cursor = '';
            });
          });
        }
      )}, [map.current]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
