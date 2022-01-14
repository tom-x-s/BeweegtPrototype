/* map */
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
    '<h3>Voetbal</h3>' +
    '<b><i class="tag georganiseerdTag">Vereniging</i></b><br>' +
    '<b>VV Jong Eindhoven</b>' +
    '<p>Dagen: Woensdag, zaterdag & zondag</p>' +
    '<p>Tijden: Ochtend & middag</p>' +
    '<p>Leeftijd: 6-18 </p>' +
    '<p>Niveau: Beginner, amateur, gevorderd </p>' +
    '<p>Afstand: 2,3km </p>' +
    '</div>' +
    '</a>';

    const marker1 = new google.maps.Marker({
        position: mapPosition,
        map: map,
    });
    const marker2 = new google.maps.Marker({
      position: { lat: 51.475847, lng: 5.456067 },
      map: map,
    });
    const marker3 = new google.maps.Marker({
      position: { lat: 51.435202, lng: 5.471352 },
      map: map,
    });

    const infoWindowWidth = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 4) - 48;
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: infoWindowWidth,
    });

    marker1.addListener("mouseover", () => {
        infowindow.open({
        anchor: marker1,
        map,
        shouldFocus: false,
        });
    });

    marker2.addListener("mouseover", () => {
        infowindow.open({
        anchor: marker2,
        map,
        shouldFocus: false,
        });
    });

    marker3.addListener("mouseover", () => {
        infowindow.open({
        anchor: marker3,
        map,
        shouldFocus: false,
        });
    });

};

/* filters */
const infoBlokken = document.getElementsByClassName('card');

const dropdownSport = document.getElementById('soortSport');
const dropdownLeeftijd = document.getElementById('leetfijd');
const dropdownArray = [dropdownSport, dropdownLeeftijd];

const checkboxesNiveau = document.getElementsByClassName('niveauFilter');
const checkboxesDagen = document.getElementsByClassName('dagenFilter');
const checkboxesTijden = document.getElementsByClassName('tijdenFilter');
const checkboxArrays = [checkboxesNiveau, checkboxesDagen, checkboxesTijden];

const sportFilters = ["Voetbal", "Tennis", "Fitness", "Cardio"];
let sportFilterPair = [sportFilters, [], ["AlleSporten"]]

const leeftijdFilters = ["0-3", "4-5", "6-12", "12-18", "18-35", "35-50", "50+"];
let leeftijdFilterPair = [leeftijdFilters, [], ["AlleLeeftijden"]]

const niveauFilters = ["Beginner", "Amateur", "Gevorderd", "Professioneel"];
let niveauFilterPair = [niveauFilters, [], ["AlleNiveaus"]]

const dagenFilters = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
let dagenFilterPair = [dagenFilters, [], ["AlleDagen"]]

const tijdenFilters = ["Ochtend", "Middag", "Avond"];
let tijdenFilterPair = [tijdenFilters, [], ["AlleTijden"]]

let filters = [leeftijdFilterPair, sportFilterPair, niveauFilterPair, dagenFilterPair, tijdenFilterPair]

let displayInfoBlock = (infoBlock, display) => {
  if(display == true){
    infoBlock.style.display = "flex";
  }
  else if(display == false){
    infoBlock.style.display = "none";
  }
  else{
    infoBlock.style.display = "flex";
    console.log("display error")
  }
}

let filterUpdate = () => {

  for (let infoBlock of infoBlokken){
    let shouldBeDisplayed = true;

    filters.forEach(function(filterArray){

      if(infoBlock.classList.contains(filterArray[2][0])){
        return;
      }
      else if(filterArray[1].length != 0){

        filterArray[1].forEach(function(filterName){
      
          if(!infoBlock.classList.contains(filterName)){
            shouldBeDisplayed = false;
          }
    
        });

      }

    });

    displayInfoBlock(infoBlock, shouldBeDisplayed);

  }

};

let checkboxToggle = (element) => {

  filters.forEach(function(filterArray){
    let filterName = element.name;

    if(filterArray[0].includes(filterName)){
      if(!filterArray[1].includes(filterName)){
        filterArray[1].push(filterName);  
      }
      else if(filterArray[1].includes(filterName)){
        let filterIndex = filterArray[1].indexOf(filterName);
        filterArray[1].splice(filterIndex, 1);  
      }
      else{
        console.log("filter error");
      }
    }
  
  });

  filterUpdate();

};

let dropdownToggle = (element) => {

  filters.forEach(function(filterArray){
    let filterContent = element.value;

    if(filterArray[0].includes(filterContent)){
      filterArray[1].splice(0,1,filterContent);
    }
    else if(filterArray[2].includes(filterContent)){
      filterArray[1] = [];
    }

  });

  console.log(filters[1]);
  filterUpdate();

};

let setFilterToggleListeners = () => {

  checkboxArrays.forEach(function(elementArray){
    
    for (let element of elementArray){

      element.addEventListener("click", () => {

        checkboxToggle(element);

      }); 

    };

  });

  dropdownArray.forEach(function(element){
    element.addEventListener("change", () => {

      dropdownToggle(element);

    }); 
  });

};

let filterSetup = () => {
  setFilterToggleListeners();
  filterUpdate();
}

window.onload = filterSetup();


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