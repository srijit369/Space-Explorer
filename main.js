// Use your actual NASA API key
const API_KEY = 'j8BcQx4aqA0fSnJ9X7OT4HCLyRbvW1LmzHIo2712'; // <-- Replace or keep if this is your real key!

// Initialize the globe ONCE
const world = Globe()
  (document.getElementById('globeViz'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .pointAltitude(0.1)
  .pointColor('color')
  .pointRadius(0.25)
  .pointsTransitionDuration(1000)
  .pointLabel('eventTitle');
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.3;

// Set the initial camera angle to center the globe in the view
// (Adjust lat, lng, altitude as needed to center your desired region)
world.pointOfView({ lat: 0, lng: 0, altitude: 2.0 });

// Handle globe clicks for location-based data
world.onGlobeClick((lat, lng) => {
  fetchEarthImagery(lat, lng);
  fetchEONETEvents(lat, lng);
});

// Earth Imagery: Fetch for a default location or clicked location
function loadEarthImagery() {
  const lat = 1.5, lon = 100.75, date = '2014-02-01';
  fetchEarthImagery(lat, lon, date);
}

function fetchEarthImagery(lat, lon, date = new Date().toISOString().split('T')[0]) {
  const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&dim=0.1&api_key=${API_KEY}`;
  fetch(url)
    .then(response => {
      if (response.ok) return response.url;
      throw new Error('No imagery available for this location/date.');
    })
    .then(imgUrl => {
      document.getElementById('infoPanel').innerHTML = `
        <h3>Earth Satellite Imagery</h3>
        <p><b>Latitude:</b> ${lat.toFixed(4)}<br><b>Longitude:</b> ${lon.toFixed(4)}</p>
        <img src="${imgUrl}" alt="Satellite view" style="max-width: 100%;">
        <p><small>Image from NASA Earth API, Date: ${date}</small></p>
      `;
    })
    .catch(error => {
      document.getElementById('infoPanel').innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

// Natural Events: Fetch and display as globe markers
function loadNaturalEvents() {
  fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
    .then(response => response.json())
    .then(data => {
      const points = data.events
        .filter(event => event.geometry && event.geometry.length > 0)
        .map(event => ({
          lat: event.geometry[0].coordinates[1],
          lng: event.geometry[0].coordinates[0],
          color: getColorByEventType(event.categories[0].title),
          size: 0.5,
          eventTitle: event.title
        }));
      world.pointsData(points);
      document.getElementById('infoPanel').innerHTML = `
        <h3>Natural Events (EONET)</h3>
        <p>${points.length} active natural events displayed.</p>
      `;
    })
    .catch(error => {
      document.getElementById('infoPanel').innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function getColorByEventType(type) {
  switch (type.toLowerCase()) {
    case 'wildfires': return '#ff3d00';
    case 'severe storms': return '#4286f4';
    case 'volcanoes': return '#ff8c00';
    default: return '#4caf50';
  }
}

// Fetch EONET events near a clicked location
function fetchEONETEvents(lat, lon) {
  const radius = 2; // degrees
  fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
    .then(response => response.json())
    .then(data => {
      const nearbyEvents = data.events.filter(event => {
        if (!event.geometry || !event.geometry[0]) return false;
        const [eventLon, eventLat] = event.geometry[0].coordinates;
        return Math.abs(eventLat - lat) < radius && Math.abs(eventLon - lon) < radius;
      });
      if (nearbyEvents.length === 0) {
        document.getElementById('infoPanel').innerHTML += `<p>No recent natural events found near this location.</p>`;
        return;
      }
      document.getElementById('infoPanel').innerHTML += `
        <h3>Natural Events Nearby</h3>
        <ul>
          ${nearbyEvents.map(ev => `<li><b>${ev.title}</b> (${ev.categories[0].title})<br>${ev.description || ''}</li>`).join('')}
        </ul>
      `;
    });
}

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MmE4OGU0My04YzI3LTRkMmEtYWUyZi1lN2M2M2I0NzVkOGMiLCJpZCI6MzE3NDA0LCJpYXQiOjE3NTEzNjQ2NTN9.NkU9FbsfUrAggwUYAfZdSXmgemrWmjubr0GwM0spcxY';
