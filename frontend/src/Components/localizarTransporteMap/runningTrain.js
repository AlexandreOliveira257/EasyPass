import * as turf from '@turf/turf';

// trajeto do comboio
export const trainPath = [
    [-8.675229796360725, 39.24239838604544], 
    [-8.675236620753509, 39.24135995192643], 
    [-8.674876418738904, 39.2389705033315], 
    [-8.67423052076137, 39.23754292528815], 
    [-8.673805173312445, 39.23679862094204], 
    [-8.673458593910482, 39.23593228954519], 
    [-8.673348318645708, 39.23495612867603], 
    [-8.673584622783778, 39.233504064256294], 
    [-8.6739591971687, 39.23209630909537], 
    [-8.674409385448513, 39.23073630599916], 
    [-8.675253498620265, 39.22912344622256], 
    [-8.676232669899775, 39.227623889285894], 
    [-8.677567425796553, 39.22376556288751], 
    [-8.678457206884502, 39.22188563509138], 
    [-8.6791852095933, 39.22072632118716], 
    [-8.680155879870853, 39.219629655278624], 
    [-8.681369217718412, 39.21881497808394], 
    [-8.683229669083971, 39.21796895714519], 
    [-8.684604785310796, 39.217185595333746], 
    [-8.685413677209112, 39.215775522047835], 
    [-8.68593945694218, 39.214240076706716], 
    [-8.687274128574728, 39.21257925108793], 
    [-8.689255914894716, 39.21129443515713], 
    [-8.69245516156704, 39.20984968891301],
    [-8.695326727805565, 39.20865883781502], 
    [-8.698966741348215, 39.20743662753367], 
    [-8.702970756243616, 39.20624573551933], 
    [-8.710736118466542, 39.203707187777326], 
    [-8.715549025260287, 39.20154464881719], 
    [-8.720006425204673, 39.19821905907264], 
    [-8.722109544139045, 39.195680221254065], 
    [-8.723363326581989, 39.19292187372244], 
    [-8.723808217125423, 39.19013207119923], 
    [-8.723889106316136, 39.187812375785825], 
    [-8.723889106316136, 39.186276319120765], 
    [-8.724131773885006, 39.18521046415549], 
    [-8.724536219834164, 39.18423864113021], 
    [-8.725183333352192, 39.183078705736534], 
    [-8.726441001615882, 39.18207145143177], 
    [-8.728422786766487, 39.18109958500787], 
    [-8.730404571917035, 39.18012770514787], 
    [-8.73279080301674, 39.17849742488821], 
    [-8.751031104276933, 39.16281978209071]
];

export const setupTrainAnimation = (map, trainPath, duration = 300000) => {
  const route = turf.lineString(trainPath);
  const distance = turf.length(route);

  // source
  map.addSource('train-source', {
    type: 'geojson',
    data: turf.point(trainPath[0])
  });

  // ponto no mapa
  map.addLayer({
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

  // animação
  let startTime = 0;
  let animationRequest;

  const frame = (time) => {
    if (!startTime) startTime = time;
    const phase = (time - startTime) / duration;

    if (phase <= 1) {
      const currentPos = turf.along(route, phase * distance);
      const source = map.getSource('train-source');
      if (source) source.setData(currentPos);
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