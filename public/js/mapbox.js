/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicmF5eWFuLTAzIiwiYSI6ImNsbHllZzFrcTFrMDUzaW85ZmVqdm0xdG4ifQ.0J66TJ05iJ4dVHRZY0QB1A';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rayyan-03/cllyf9lvt01ik01magppd4y11',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    // Add markers
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup info
    new mapboxgl.Popup({
      offset: 35,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });
};
