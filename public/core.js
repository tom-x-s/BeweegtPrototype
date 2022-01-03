let map, popup, Popup;

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

    const contentString = 
    '<a class="card" href="testInfoPage.html">' +
    '<div class="cardImg"> </div>' +
    '<div class="cardText">' +
    '<h3>Naam van de sport</h3>' +
    '<b>Naam van de vereniging</b>' +
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>' +
    '</div>' +
    '</a>';

    const marker = new google.maps.Marker({
        position: mapPosition,
        map: map,
    });

    const infoWindowWidth = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 4) - 48;
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: infoWindowWidth,
    });

    marker.addListener("mouseover", () => {
        infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
        });
    });

};

/*
 class Popup extends google.maps.OverlayView {
        position;
        containerDiv;
        constructor(position, content) {
          super();
          this.position = position;
          content.classList.add("popup-bubble");
    
          // This zero-height div is positioned at the bottom of the bubble.
          const bubbleAnchor = document.createElement("div");
    
          bubbleAnchor.classList.add("popup-bubble-anchor");
          bubbleAnchor.appendChild(content);
          // This zero-height div is positioned at the bottom of the tip.
          this.containerDiv = document.createElement("div");
          this.containerDiv.classList.add("popup-container");
          this.containerDiv.appendChild(bubbleAnchor);
          // Optionally stop clicks, etc., from bubbling up to the map.
          Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
        }
        // Called when the popup is added to the map.
        onAdd() {
            this.getPanes().floatPane.appendChild(this.containerDiv);
          }
          // Called when the popup is removed from the map.
          onRemove() {
            if (this.containerDiv.parentElement) {
              this.containerDiv.parentElement.removeChild(this.containerDiv);
            }
          }
          // Called each frame when the popup needs to draw itself. 
          draw() {
            const divPosition = this.getProjection().fromLatLngToDivPixel(
              this.position
            );
            // Hide the popup when it is far out of view.
            const display =
              Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
                ? "block"
                : "none";
      
            if (display === "block") {
              this.containerDiv.style.left = divPosition.x + "px";
              this.containerDiv.style.top = divPosition.y + "px";
            }
      
            if (this.containerDiv.style.display !== display) {
              this.containerDiv.style.display = display;
            }
          }
        }
  
      marker.addListener("mouseover", () => {
          popup = new Popup(
              new google.maps.LatLng(marker.position),
              document.getElementById("bubbleContent")
          );
          popup.setMap(map);
      });
*/