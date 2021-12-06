let map;

function initMap() {
    const mapPosition = { lat: 51.448327, lng: 5.454946 };
    const map = new google.maps.Map(document.getElementById("map"), {
        center: mapPosition,
        zoom: 15,
        styles: [
            {
                "featureType": "poi",
                "stylers": [
                  { "visibility": "off" }
                ]
              }
        ]
    });
    const marker = new google.maps.Marker({
    position: mapPosition,
    map: map,
  });
}

initMap();