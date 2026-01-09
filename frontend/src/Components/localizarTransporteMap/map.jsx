import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

//import autocarro
import { busPath, setupBusAnimation } from './runningBus.js';

// import comboios
import { trainPath, setupTrainAnimation } from './runningTrain.js'; 
import { myParkedTrains, setupParkedTrains } from './parkedTrains.js'; 

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const MAPTILER_API_KEY = 'ccju2Vzo4orZNRCbc50a'; 
  const MAP_STYLE_ID = '019abd07-7fbd-7062-8681-1eebe53d9a99';

  // local start place
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
      //comboios
      const stopAnimation = setupTrainAnimation(map.current, trainPath);
      map.current.stopTrain = stopAnimation;

      //autocarros
      const busAnimation = setupBusAnimation(map.current, busPath);
      map.current.stopBus = busAnimation;

      //parkedTrains
      setupParkedTrains(map.current, myParkedTrains);
    });

    return () => {
      if (map.current?.stopTrain) map.current.stopTrain();
      if (map.current?.stopBus) map.current.stopBus();
      if (map.current) map.current.remove();
    };
  }, []);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  )};
