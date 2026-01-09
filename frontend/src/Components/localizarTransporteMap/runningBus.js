import * as turf from '@turf/turf';
import * as maptilersdk from '@maptiler/sdk';

let activeBusPopup = null;

// trajeto do autocarro
export const busPath = [
  [-8.69394943968328, 39.22130517871983],
  [-8.692847452263862, 39.22061563223107],
  [-8.692402418884086, 39.22018876672425],
  [-8.692148114094607, 39.21925293710774],
  [-8.692084537897841, 39.21821858459688],
  [-8.691575928320106, 39.21708570483733],
  [-8.691130894939135, 39.2167244929546],
  [-8.691258047333832, 39.21631402265024],
  [-8.691024934610425, 39.21601848254551],
  [-8.690643477427386, 39.215903549946574],
  [-8.690177251980458, 39.21616625275337],
  [-8.689520297943147, 39.21649462988],
  [-8.688630231181236, 39.21679016798089],
  [-8.687803740617284, 39.21741407766356],
  [-8.687401091368258, 39.218382768552715],
  [-8.687528243762983, 39.21925293710774],
  [-8.688100429537542, 39.2199096609512],
  [-8.688926920101494, 39.220402199802095],
  [-8.689901755126158, 39.22094398854648],
  [-8.690664669492207, 39.22173203743807],
  [-8.690973882677696, 39.222345047607234],
  [-8.691219240495712, 39.222910859495045],
  [-8.69112794456342, 39.2231539803897],
  [-8.69131624242479, 39.22337941901219],
  [-8.691492204126206, 39.22331945777307],
  [-8.691572254830902, 39.22316279000415],
  [-8.691471138151087, 39.223045288948356],
  [-8.691323676325311, 39.22283966162695],
  [-8.691066671429127, 39.22227499937745],
  [-8.690822306117468, 39.221694012667996],
  [-8.690489464742882, 39.221233786161775],
  [-8.689979668145384, 39.220829048352186],
  [-8.68958784100883, 39.22060056630028],
  [-8.688125862336449, 39.21982045769093],
  [-8.687679257540935, 39.21932432092183],
  [-8.687481237375266, 39.218851025702236],
  [-8.687447531814712, 39.21821125605703],
  [-8.687573927665397, 39.21784240662191],
  [-8.687915196462, 39.21735278048479],
  [-8.688294384014, 39.21700677595558],
  [-8.68876626185704, 39.21677175303893],
  [-8.689313977209935, 39.216585692671345],
  [-8.68995859604783, 39.21647470906021],
  [-8.690186108579212, 39.2164779732864],
  [-8.690392555134565, 39.21668361924182],
  [-8.690708544761236, 39.21674563933266],
  [-8.690957123267765, 39.216765224612914],
  [-8.69121412816392, 39.216886000388484],
  [-8.691825829010185, 39.217609946457316],
  [-8.692032275566447, 39.21812241985336],
  [-8.69210811307633, 39.21925180661586],
  [-8.69213728216593, 39.21971684991286],
  [-8.692373221086996, 39.22022277982549],
  [-8.69278611419952, 39.22066342548757],
  [-8.693544489303548, 39.22112365244885],
  [-8.69394082493821, 39.2213459472207],
  [-8.694008236058352, 39.22146997911017],
  [-8.69407986037342, 39.22167887442828],
  [-8.694315799294458, 39.22179311379239],
  [-8.69458965697092, 39.2217213062134],
  [-8.694669707676496, 39.22152873098074],
  [-8.694593870165733, 39.22137205921584],
  [-8.694383210415538, 39.221270875181716],
  [-8.69415991107897, 39.22128719519708]
];

export const setupBusAnimation = (map, busPath, duration = 160000) => {
  const route = turf.lineString(busPath);
  const distance = turf.length(route);

  // source
  map.addSource('bus-source', {
    type: 'geojson',
    data: turf.point(busPath[0])
  });

  // ponto no mapa
  map.addLayer({
    id: 'bus-layer',
    type: 'circle',
    source: 'bus-source',
    paint: {
      'circle-radius': 9,
      'circle-color': '#a5ea1b',
      'circle-stroke-width': 3,
      'circle-stroke-color': '#ffffff'
    }
  });

  // popup
  map.on('click', 'bus-layer', (e) => {
    if (activeBusPopup) activeBusPopup.remove();

    activeBusPopup = new maptilersdk.Popup({
      closeButton: true,
      closeOnClick: false
    })
      .setLngLat(e.lngLat)
      .setHTML('<strong>Urbano U564</strong><br>Estado: Operacional<br>Velocidade média: 62 km/h')
      .addTo(map);

    activeBusPopup.on('close', () => {
      activeBusPopup = null;
    });
  });

  // animação
  let startTime = 0;
  let animationRequest;

  const frame = (time) => {
    if (!startTime) startTime = time;
    const phase = (time - startTime) / duration;

    if (phase <= 1) {
      const currentPos = turf.along(route, phase * distance);
      const source = map.getSource('bus-source');
      const coords = currentPos.geometry.coordinates;
      if (source) source.setData(currentPos);

    if (activeBusPopup && typeof activeBusPopup.setLngLat === 'function' && activeBusPopup.isOpen()) {
      activeBusPopup.setLngLat(coords);
    }

      animationRequest = requestAnimationFrame(frame);
    } else {
      startTime = 0;
      animationRequest = requestAnimationFrame(frame);
    }
  };

  animationRequest = requestAnimationFrame(frame);

  // retornamos uma função para parar a animação se o componente for destruído
  return () => cancelAnimationFrame(animationRequest);
};