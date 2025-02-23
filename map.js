// mapboxgl.accessToken = 'pk.eyJ1IjoiY29jb2x1byIsImEiOiJjbTdjbWl5bmMwczFlMmlvY3k1eHc5MG9hIn0.vTK8oOVbx_pQ1jCA6GusoQ';

// // Initialize the map centered on Cambridge/Boston area
// const map = new mapboxgl.Map({
//   container: 'map',                              // ID of the div where the map will render
//   style: 'mapbox://styles/mapbox/streets-v12',     // Using a light style to make bike routes stand out
//   center: [-71.10788, 42.3736],                  // Cambridge/Boston area [longitude, latitude]
//   zoom: 13,                                      // Initial zoom level - close enough to see streets
//   minZoom: 10,                                   // Minimum allowed zoom
//   maxZoom: 18                                    // Maximum allowed zoom
// });

// map.on('load', () => { 
//     // Define shared bike lane style
//     const bikeLaneStyle = {
//         'line-color': '#32D400',
//         'line-width': 3.2,
//         'line-opacity': 0.4
//     };

//     // Boston Bike Lanes
//     map.addSource('boston_route', {
//         type: 'geojson',
//         data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson'
//     });

//     map.addLayer({
//         id: 'boston-bike-lanes',
//         type: 'line',
//         source: 'boston_route',
//         paint: bikeLaneStyle // Using shared style
//     });

//     // Cambridge Bike Lanes
//     map.addSource('cambridge_route', {
//         type: 'geojson',
//         data: 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson',
//     });

//     map.addLayer({
//         id: 'cambridge-bike-lanes',
//         type: 'line',
//         source: 'cambridge_route',
//         paint: bikeLaneStyle // Using shared style
//     });


// });

// map.on('load', () => {
//     // Load station data
//     const jsonurl = 'https://dsc106.com/labs/lab07/data/bluebikes-stations.json';

//     let stations = []; // Define stations globally

//     d3.json(jsonurl).then(jsonData => {
//         console.log('Loaded JSON Data:', jsonData);

//         stations = jsonData.data.stations; // Correctly updates the global stations array

//         let svg = d3.select('#map').select('svg');
//         if (svg.empty()) {
//             svg = d3.select('#map').append('svg')
//                 .style('position', 'absolute')
//                 .style('top', 0)
//                 .style('left', 0)
//                 .style('width', '100%')
//                 .style('height', '100%')
//                 .style('pointer-events', 'none');
//         }

//         function getCoords(station) {
//             const point = new mapboxgl.LngLat(+station.lon, +station.lat);
//             const { x, y } = map.project(point);
//             return { cx: x, cy: y };
//         }

//         let circles = svg.selectAll('circle')
//             .data(stations)
//             .enter()
//             .append('circle')
//             .attr('r', 5)
//             .attr('fill', 'steelblue')
//             .attr('stroke', 'white')
//             .attr('stroke-width', 1)
//             .attr('opacity', 0.8);

//         function updatePositions() {
//             circles
//                 .attr('cx', d => getCoords(d).cx)
//                 .attr('cy', d => getCoords(d).cy);
//         }

//         updatePositions();
//         map.on('move', updatePositions);
//         map.on('zoom', updatePositions);
//         map.on('resize', updatePositions);
//         map.on('moveend', updatePositions);

//         // Load traffic data after stations are set
//         d3.csv('https://dsc106.com/labs/lab07/data/bluebikes-traffic-2024-03.csv').then(trips => {
//             console.log("Traffic data loaded:", trips);

//             let departures = d3.rollup(
//                 trips,
//                 v => v.length,
//                 d => d.start_station_id
//             );

//             let arrivals = d3.rollup(
//                 trips,
//                 v => v.length,
//                 d => d.end_station_id
//             );

//             // Update stations with traffic data correctly
//             stations = stations.map(station => {
//                 let id = station.short_name;
//                 station.arrivals = arrivals.get(id) ?? 0;
//                 station.departures = departures.get(id) ?? 0;
//                 station.totalTraffic = station.arrivals + station.departures;
//                 return station;
//             });

//             console.log("Updated Stations with Traffic:", stations.slice(0, 5));
//             console.log("Max Traffic Value:", d3.max(stations, d => d.totalTraffic));

//             // Define square root scale correctly
//             const radiusScale = d3.scaleSqrt()
//                 .domain([0, d3.max(stations, d => d.totalTraffic)])
//                 .range([3, 25]);

//             console.log("Traffic Range:", d3.extent(stations, d => d.totalTraffic));

//             //  Update existing circles instead of appending new ones
//             circles = svg.selectAll("circle")
//                 .data(stations)
//                 .join("circle")
//                 .attr('r', d => radiusScale(d.totalTraffic))
//                 .attr('fill', 'steelblue')
//                 .attr('stroke', 'white')
//                 .attr('stroke-width', 1)
//                 .attr('opacity', 0.8);

//             // Update tooltips after assigning traffic data
//             circles.each(function(d) {
//                 d3.select(this).select("title").remove();
//                 d3.select(this).append("title")
//                     .text(`${d.totalTraffic} trips (${d.departures} departures, ${d.arrivals} arrivals)`);
//             });

//             updatePositions();

//         }).catch(error => {
//             console.error("Error loading CSV:", error);
//         });

//     }).catch(error => {
//         console.error("Error loading JSON:", error);
//     });



    
// });


// // Bike station and traffic data
// // map.on('load', () => {
// //     // Load the nested JSON file
// //     const jsonurl = 'https://dsc106.com/labs/lab07/data/bluebikes-stations.json';
// //     d3.json(jsonurl).then(jsonData => {
// //         console.log('Loaded JSON Data:', jsonData);  // Log to verify structure

// //         // Extract station data
// //         let stations = jsonData.data.stations;  // Assuming JSON structure has stations inside 'data.stations'

// //         // Append an SVG layer to #map if it doesn't exist
// //         let svg = d3.select('#map').select('svg');
// //         if (svg.empty()) {
// //             svg = d3.select('#map').append('svg')
// //                 .style('position', 'absolute')
// //                 .style('top', 0)
// //                 .style('left', 0)
// //                 .style('width', '100%')
// //                 .style('height', '100%')
// //                 .style('pointer-events', 'none');  // Prevent blocking map interactions
// //         }

// //         // Function to convert station coordinates to screen pixels
// //         function getCoords(station) {
// //             const point = new mapboxgl.LngLat(+station.lon, +station.lat);
// //             const { x, y } = map.project(point);
// //             return { cx: x, cy: y };
// //         }

// //         // Append circles for bike stations
// //         const circles = svg.selectAll('circle')
// //             .data(stations)
// //             .enter()
// //             .append('circle')
// //             .attr('r', 5)               // Radius of the circle
// //             .attr('fill', 'steelblue')  // Circle fill color
// //             .attr('stroke', 'white')    // Circle border color
// //             .attr('stroke-width', 1)    // Circle border thickness
// //             .attr('opacity', 0.8);      // Circle opacity

// //         // Function to update circle positions
// //         function updatePositions() {
// //             circles
// //                 .attr('cx', d => getCoords(d).cx)  // Set the x-position using projected coordinates
// //                 .attr('cy', d => getCoords(d).cy); // Set the y-position using projected coordinates
// //         }

// //         // Initial position update when map loads
// //         updatePositions();

// //         // Reposition markers on map interactions
// //         map.on('move', updatePositions);    
// //         map.on('zoom', updatePositions);    
// //         map.on('resize', updatePositions);  
// //         map.on('moveend', updatePositions);

// //         d3.csv(' https://dsc106.com/labs/lab07/data/bluebikes-traffic-2024-03.csv').then(trips => {
// //     console.log("Traffic data loaded", trips);
    

// //     let departures = d3.rollup(
// //         trips,
// //         v => v.length,
// //         d => d.start_station_id
// //     );
    
// //     let arrivals = d3.rollup(
// //         trips,
// //         v => v.length,
// //         d => d.end_station_id
// //     );
    
// //     stations = stations.map(station => {
// //         let id = station.short_name;
// //         station.arrivals = arrivals.get(id) ?? 0;
// //         station.departures = departures.get(id) ?? 0;
// //         station.totalTraffic = station.arrivals + station.departures;
// //         return station;
// //     });

// //     const radiusScale = d3
// //     .scaleSqrt()
// //     .domain([0, d3.max(stations, (d) => d.totalTraffic)])
// //     .range([0, 25]);

// //     let svg = d3.select('#map').select('svg');
// //     if (svg.empty()) {
// //         svg = d3.select('#map').append('svg')
// //             .style('position', 'absolute')
// //             .style('top', 0)
// //             .style('left', 0)
// //             .style('width', '100%')
// //             .style('height', '100%')
// //             .style('pointer-events', 'none');
// //     }

// //     // Function to convert station coordinates to screen position
// //     function getCoords(station) {
// //         const point = new mapboxgl.LngLat(+station.lon, +station.lat);
// //         const { x, y } = map.project(point);
// //         return { cx: x, cy: y };
// //     }

// //     // Append circles for stations
// //     const circles = svg.selectAll('circle')
// //         .data(stations)
// //         .enter()
// //         .append('circle')
// //         .attr('r', d => radiusScale(d.totalTraffic)) // Use square root scale
// //         .attr('fill', 'steelblue')
// //         .attr('stroke', 'white')
// //         .attr('stroke-width', 1)
// //         .attr('opacity', 0.8)
// //         .append("title") // Add tooltip
// //         .text(d => `Station: ${d.name}\nArrivals: ${d.arrivals}\nDepartures: ${d.departures}\nTotal Traffic: ${d.totalTraffic}`);

// //     // Function to update circle positions when the map moves/zooms
// //     function updatePositions() {
// //         circles
// //             .attr('cx', d => getCoords(d).cx)
// //             .attr('cy', d => getCoords(d).cy);
// //     }

// //     // Initial position update
// //     updatePositions();

// //     // Reposition markers on map interactions
// //     map.on('move', updatePositions);
// //     map.on('zoom', updatePositions);
// //     map.on('resize', updatePositions);
// //     map.on('moveend', updatePositions);

// // })


// // })

   
    
      
// // })


// let timeFilter = -1;
// const timeSlider = document.getElementById('time-slider');
// const selectedTime = document.getElementById('selected-time');
// const anyTimeLabel = document.getElementById('any-time');

// function formatTime(minutes) {
//     const date = new Date(0, 0, 0, 0, minutes);  // Set hours & minutes
//     return date.toLocaleString('en-US', { timeStyle: 'short' }); // Format as HH:MM AM/PM
//   }

// function updateTimeDisplay() {
//     timeFilter = Number(timeSlider.value);  // Get slider value
  
//     if (timeFilter === -1) {
//       selectedTime.textContent = '';  // Clear time display
//       anyTimeLabel.style.display = 'block';  // Show "(any time)"
//     } else {
//       selectedTime.textContent = formatTime(timeFilter);  // Display formatted time
//       anyTimeLabel.style.display = 'none';  // Hide "(any time)"
//     }
  
//     // Trigger filtering logic which will be implemented in the next step
//   }




// Set your Mapbox access token here
mapboxgl.accessToken =
  'pk.eyJ1IjoiYmVkcm9vbSIsImEiOiJjbTdmZ2Y1dnMwMXhtMndweXUxOWR0aDFzIn0.B8dDJgohfPFZ4GFCse9OqA';

// Declare filterTripsByTime early so it exists for updateTimeDisplay()
let filterTripsByTime = function() {};

// Global filtering variables and DOM element selections
let timeFilter = -1; // -1 means no filtering
const timeSlider = document.getElementById('time-slider');
const selectedTime = document.getElementById('selected-time');
const anyTimeLabel = document.getElementById('any-time');

// Helper: Format minutes as HH:MM AM/PM
function formatTime(minutes) {
  const date = new Date(0, 0, 0, 0, minutes);
  return date.toLocaleString('en-US', { timeStyle: 'short' });
}

// Helper: Get minutes since midnight from a Date object
function minutesSinceMidnight(date) {
  return date.getHours() * 60 + date.getMinutes();
}

// Update the slider display and trigger filtering
function updateTimeDisplay() {
  timeFilter = Number(timeSlider.value);
  if (timeFilter === -1) {
    selectedTime.textContent = '';
    anyTimeLabel.style.display = 'block';
  } else {
    selectedTime.textContent = formatTime(timeFilter);
    anyTimeLabel.style.display = 'none';
  }
  if (typeof filterTripsByTime === "function") {
    filterTripsByTime();
  }
}

timeSlider.addEventListener('input', updateTimeDisplay);
updateTimeDisplay(); // Initialize display

// Define a quantize scale for station flow (ratio of departures/total)
const stationFlow = d3.scaleQuantize()
  .domain([0, 1])
  .range([0, 0.5, 1]);

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map', // The div where the map will render
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-71.09415, 42.36027],
  zoom: 12,
  minZoom: 5,
  maxZoom: 18
});

// Global variables to store station/trip data and SVG circles
let stations, trips;
let circles;
let filteredStations = [];

// When the map loads, add bike lane layers and load station & traffic data
map.on('load', () => {
  // --- Add Bike Lane Layers ---
  // Boston Bike Lanes
  map.addSource('boston_route', {
    type: 'geojson',
    data:
      'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson'
  });
  map.addLayer({
    id: 'bike-lanes-boston',
    type: 'line',
    source: 'boston_route',
    paint: {
      'line-color': '#32D400',
      'line-width': 5,
      'line-opacity': 0.6
    }
  });

  // Cambridge Bike Lanes
  map.addSource('cambridge_route', {
    type: 'geojson',
    data:
      'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson'
  });
  map.addLayer({
    id: 'bike-lanes-cambridge',
    type: 'line',
    source: 'cambridge_route',
    paint: {
      'line-color': '#32D400',
      'line-width': 5,
      'line-opacity': 0.6
    }
  });

  // --- Load Station and Traffic Data ---
  Promise.all([
    d3.json('https://dsc106.com/labs/lab07/data/bluebikes-stations.json'),
    d3.csv('https://dsc106.com/labs/lab07/data/bluebikes-traffic-2024-03.csv')
  ])
    .then(([stationData, tripData]) => {
      // Process station data (assumed to be in stationData.data.stations)
      stations = stationData.data.stations;

      // Process trip data: convert start and end times to Date objects
      trips = tripData;
      for (let trip of trips) {
        trip.started_at = new Date(trip.started_at);
        trip.ended_at = new Date(trip.ended_at);
      }

      // Compute overall traffic using d3.rollup
      let overallDepartures = d3.rollup(
        trips,
        v => v.length,
        d => d.start_station_id
      );
      let overallArrivals = d3.rollup(
        trips,
        v => v.length,
        d => d.end_station_id
      );

      // Append overall traffic properties to each station.
      // We assume station.short_name uniquely identifies the station.
      stations = stations.map(station => {
        let id = station.short_name;
        station.departures = overallDepartures.get(id) ?? 0;
        station.arrivals = overallArrivals.get(id) ?? 0;
        station.totalTraffic = station.departures + station.arrivals;
        return station;
      });
      console.log('Stations with overall traffic:', stations);

      // Create circles for each station using overall traffic.
      const svg = d3.select('#map').select('svg');
      circles = svg.selectAll('circle')
        .data(stations)
        .enter()
        .append('circle')
        .attr('r', d => {
          // Base radius scale: overall range [0, 25]
          const radiusScale = d3.scaleSqrt()
            .domain([0, d3.max(stations, d => d.totalTraffic)])
            .range([0, 25]);
          return radiusScale(d.totalTraffic);
        })
        // Set an initial fill (it will be overridden by CSS via the custom property)
        .attr('fill', 'steelblue')
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('opacity', 0.6)
        .style('pointer-events', 'auto')
        // Set the custom property for departure ratio.
        .style("--departure-ratio", d =>
          d.totalTraffic ? stationFlow(d.departures / d.totalTraffic) : 0)
        .each(function(d) {
          d3.select(this)
            .append('title')
            .text(`${d.totalTraffic} trips (${d.departures} departures, ${d.arrivals} arrivals)`);
        });

      // Function to update circle positions as the map moves.
      function updatePositions() {
        circles
          .attr('cx', d => {
            const point = new mapboxgl.LngLat(+d.lon, +d.lat);
            return map.project(point).x;
          })
          .attr('cy', d => {
            const point = new mapboxgl.LngLat(+d.lon, +d.lat);
            return map.project(point).y;
          });
      }
      updatePositions();
      map.on('move', updatePositions);
      map.on('zoom', updatePositions);
      map.on('resize', updatePositions);
      map.on('moveend', updatePositions);

      // --- Define Filtering Functionality ---
      // Following the instructions, we create new data structures for filteredTrips, filteredDepartures,
      // filteredArrivals, and filteredStations.
      filterTripsByTime = function() {
        // 1. Create filteredTrips: if no filtering, use all trips; otherwise, filter trips.
        let filteredTrips = timeFilter === -1
          ? trips
          : trips.filter(trip => {
              const startedMinutes = minutesSinceMidnight(trip.started_at);
              const endedMinutes = minutesSinceMidnight(trip.ended_at);
              return (
                Math.abs(startedMinutes - timeFilter) <= 60 ||
                Math.abs(endedMinutes - timeFilter) <= 60
              );
            });

        // 2. Create filteredDepartures and filteredArrivals via d3.rollup on filteredTrips.
        let filteredDepartures = d3.rollup(
          filteredTrips,
          v => v.length,
          d => d.start_station_id
        );
        let filteredArrivals = d3.rollup(
          filteredTrips,
          v => v.length,
          d => d.end_station_id
        );

        // 3. Create filteredStations by cloning each station and updating its traffic.
        filteredStations = stations.map(station => {
          let st = { ...station }; // clone to avoid modifying original
          let id = st.short_name;
          st.departures = filteredDepartures.get(id) ?? 0;
          st.arrivals = filteredArrivals.get(id) ?? 0;
          st.totalTraffic = st.departures + st.arrivals;
          return st;
        });

        // 4. Create a conditional radius scale:
        //    - If no filtering, use range [0, 25]; otherwise, use range [3, 50]
        const radiusScale = d3.scaleSqrt()
          .domain([
            0,
            timeFilter === -1
              ? d3.max(stations, d => d.totalTraffic)
              : d3.max(filteredStations, d => d.totalTraffic)
          ])
          .range(timeFilter === -1 ? [0, 25] : [3, 50]);

        // 5. Update the circles with the filtered station data.
        circles
          .data(filteredStations)
          .transition()
          .duration(200)
          .attr('r', d => radiusScale(d.totalTraffic))
          .each(function(d) {
            d3.select(this)
              .select('title')
              .text(`${d.totalTraffic} trips (${d.departures} departures, ${d.arrivals} arrivals)`);
          })
          // Update the custom property for departure ratio.
          .style("--departure-ratio", d =>
            d.totalTraffic ? stationFlow(d.departures / d.totalTraffic) : 0);
      };

      // Run filtering initially.
      filterTripsByTime();
    })
    .catch(error => {
      console.error('Error loading station or traffic data:', error);
    });
});



