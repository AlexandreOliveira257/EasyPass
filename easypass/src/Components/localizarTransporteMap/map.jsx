import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const santarem = { lng: -8.675239, lat: 39.242294 };
  const zoom = 14;
  maptilersdk.config.apiKey = 'ccju2Vzo4orZNRCbc50a'; /* <<-- NAO PARTILHAR CHAVE API */

  useEffect(() => {
    if (map.current) return; // Faz com que o mapa não inicie mais do que uma vez

    map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [santarem.lng, santarem.lat],
        zoom: zoom
    });

    // Marcador no mapa
    new maptilersdk.Marker({color: "#1b1287ff"})
      .setLngLat([-8.675239,39.242294])
      .addTo(map.current);
    }, [santarem.lng, santarem.lat, zoom]);

    return (
    <div className="map-wrap">
        <div ref={mapContainer} className="map" />
    </div>
    );
}