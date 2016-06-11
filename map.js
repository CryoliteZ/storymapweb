// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var data = [[{lat: 25.02029453006571, lng: 121.54103243189436}, 'p1.jpg', '#AA3','EventA'],
[{lat: 25.01930453006571, lng: 121.54123243189436}, 'p2.jpg', '#AA3','EventB'],
[{lat: 25.0229453006571, lng: 121.5353243189436}, 'p3.jpg', '#27A','EventA'],
[{lat: 25.03006571, lng: 121.5203189436}, 'p4.jpg', '#2A7','EventC'],
[{lat: 25.0229453006571, lng: 121.5103243189436}, 'p5.jpg','#27A','EventA'],
[{lat: 25.03006571, lng: 121.5243189436}, 'p6.jpg', '#AA3','EventB'],
[{lat:25.017652, lng: 121.539720}, 'p7.jpg', '#2A7','EventD'],
[{lat:25.006018, lng:121.509839}, 'p8.jpg', '#AA3', 'EventA'],
[{lat:25.015322, lng:121.494256}, 'p10.jpg', '#27A', 'EventB'],
[{lat:25.033701, lng:121.515902}, 'p10.jpg', '#2A7', 'EventD']];



var map;
var markers = [];
var markersInfo = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
const imgThumbUrlPrefix = 'img/thumb/';
function initMap() {  
  var myLatLng = {lat:25.017652, lng: 121.539720};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng,
    
  });

  // Add Marker
  for(var i = 0; i < 10; ++i){
    addMarker(data[i][0], data[i][1], data[i][2]); 
  }  
  addCluster();

  // Add infoWindow
  for(var i = 0; i < markers.length; ++i){
    // InfoWindow content
    var content = '<div id="iw-container">' +
    '<div class="iw-title" style = "background-color:' + data[i][2] +  '">NTU Space</div>' +
    '<div class="iw-content">' +
    '<div class="iw-subTitle">IM is good</div>' +
    '<img src="img/p' + (i + 1) + '.jpg" alt="info img"  width="190" height="120">' +
    '<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>' +
    '<div class="iw-subTitle">Repsonse</div>' +
    '<p>This looks fun and challenging!</p>'+
    '</div>' +
    '<div class="iw-bottom-gradient"></div>' +
    '</div>';
    addInfoWindow(markers[i], content, data[i][2]);
  }

}

function addCluster(){
  var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'asset/m'});
}
// Adds a marker to the map and push to the array.
function addMarker(location, markerImg, borderColor) {
  if(!markerImg)
    markerImg = "asset/markerIcon.png";
  else
    markerImg = imgThumbUrlPrefix+ markerImg;
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
    icon: markerImg
  });
  markers.push(marker);
  markersInfo.push({src: markerImg, borderColor: borderColor});
  setInterval(function(){setMarkerBorderColor(markerImg, borderColor);},700);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
  labelIndex = 0;
}

// Set color of a marker
function setMarkerBorderColor(src, color){
  $('img[src="' + src+'"]').parent().css({border: 'solid 3px '+color});
}

// Find a marker's index by img src
function findInMarkersInfo(src){
  for(var i = 0 ; i < markersInfo.length ; ++i){
    if(markersInfo[i].src==src) return i;
  }
  return -1;
}

// Add an InfoWindow to a marker
function addInfoWindow(marker, message, color) {

  var infoWindow = new google.maps.InfoWindow({
    content: message
  });


  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.open(map, marker);
  });

  google.maps.event.addListener(map, "click", function(event) {
    infoWindow.close();
  });

  // This removes the right margin of the infowindow (Dark-magic)
  google.maps.event.addListener(infoWindow, 'domready', function() {

   // Reference to the DIV which receives the contents of the infowindow using jQuery
   var iwOuter = $('.gm-style-iw');

   /* The DIV we want to change is above the .gm-style-iw DIV.
    * So, we use jQuery and create a iwBackground variable,
    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    */
    var iwBackground = iwOuter.prev();

   // Remove the background shadow DIV
   iwBackground.children(':nth-child(2)').css({'display' : 'none'});

   // Remove the white background DIV
   iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Taking advantage of the already established reference to
    // div .gm-style-iw with iwOuter variable.
    // You must set a new variable iwCloseBtn.
    // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
    // Is this div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();
      console.log(color);
    // Apply the desired effect to the close button
    iwCloseBtn.css({
      opacity: '1', // by default the close button has an opacity of 0.7
      right: '38px', top: '3px', // button repositioning
      border: '7px solid #424242'  , // increasing button border and new color
      'border-radius': '13px', // circular effect
      'box-shadow': '0 0 5px #EEEEEE' // 3D effect to highlight the button
    });

    // The API automatically applies 0.7 opacity to the button after the mouseout event.
    // This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });

  });
}

function customerExitBtn(){

}
