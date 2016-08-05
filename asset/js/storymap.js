$(function(){
    var mapManager = new MapManager();
    var mapDataManager = new MapDataManager();
    var clusterPreviewSlide = new BottomSlider();
    

    // Initialize the map and markers
    initMap();
    // Initialize UI components 
    initUI();
    
    clusterPreviewSlide.init(mapDataManager, mapManager.map);
    
    
    function initUI(){
        if(!mapDataManager.data.length) {
            $('#welcomeCover, #welcomeCover .loadingHint').show();
//            $('#welcomeCover').removeClass('bgToTransparentWhite');
//            $('#welcomeCover .loadingHint').removeClass('此課程活動之節目皆無GPS資料:(');
            $('#welcomeCover .loadingHint').html('此課程活動之節目皆無GPS資料:(');
            $('#welcomeCover .loadingImg').hide();
            
            return;
        }
        setTimeout(function(){
            $('#welcomeCover').addClass('bgToTransparentWhite');
            $('#welcomeCover .loadingImg div').addClass('bgColorToBlue');
            $('#welcomeCover .loadingHint').addClass('textToBlue');;
        }, 1000);

        setTimeout(function(){
            $('#welcomeCover, #welcomeCover .loadingHint').hide();
        }, 7000);

        var filterDrawerOpened = false;
        $('#filtersWrapper').css({right: "0px"}).delay(7000).animate({right: "-240px"}, 500);
        $('.closer').hide();
        $('#filtersWrapper').on("click", function(e){
          e.stopPropagation();
        });
        $('#filtersWrapper .drawer').click(function(){
            if(filterDrawerOpened){
                $('#filtersWrapper').animate({right: "-240px"}, 700);
                $('.closer').hide();
                $('.alternativeRLToggle').show();
            } else {
                $('#filtersWrapper').animate({right: "0px"}, 700);
                $('.closer').show();
                $('.alternativeRLToggle').hide();

            }

            filterDrawerOpened = !filterDrawerOpened;
        });
        
        
        $('.onOffSwitch').html('<input type="checkbox" class="onOffSwitch-checkbox" id="dayNightOnOffSwitch" checked><label class="onOffSwitch-label" for="dayNightOnOffSwitch"></label>');
        
        $('#dayNightOnOffSwitch').click(function(){
            mapManager.updateMapStyle();
          });
        
        
        
        $(".homeBtn").click(function (e) {
  
          // Remove any old one
          $(".ripple").remove();

          // Setup
          var posX = $(this).offset().left,
              posY = $(this).offset().top,
              buttonWidth = $(this).width(),
              buttonHeight =  $(this).height();
          
          // Add the element
          $(this).prepend("<span class='ripple'></span>");

          
         // Make it round
          if(buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
          } else {
            buttonWidth = buttonHeight; 
          }
          
          // Get the center of the element
          var x = e.pageX - posX - buttonWidth / 2;
          var y = e.pageY - posY - buttonHeight / 2;
          
         
          // Add the ripples CSS and start the animation
          $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
          }).addClass("rippleEffect");
        });
    
        google.maps.event.addListener(mapManager.map, 'zoom_changed', function() {
          var zoom = mapManager.map.getZoom();
          if (zoom >= 12 ) {
            $('.homeBtn').addClass('open');
          } else{
            $('.homeBtn').removeClass('open');
          }
        });
        $('.homeBtn').click(function(){
          mapManager.initMapFocus();
        })
    }

    function initMap(){
        mapDataManager.requestData();
        mapDataManager.generateRandomFilter();

        mapManager.initMap(mapDataManager.data);
        mapManager.updateFilterStatus(mapDataManager, mapDataManager.eventsColor);
        mapManager.initStreetViewListeners();

        setTimeout(function(){
          mapManager.initMapFocus();
        },1500);
        mapManager.setRoute(mapDataManager.data);

        mapManager.setOverlappingMarkerSpiderfier();

        /* filter update init */
        $('#filters input[type="checkbox"]').click(function(){
            $('#filtersWrapper .rightPart .loadingHint').fadeIn({ duration: 100, complete: function(){
                mapManager.updateFilterStatus(mapDataManager, mapDataManager.eventsColor, function(){
                       $('#filtersWrapper .rightPart .loadingHint').fadeOut(400);
                   });
                }
            });
           
        }); 
        
        $('#chooseAll').click(function(){
          $('#filters input[type="checkbox"]').prop('checked', false); // Checks it
          $('#filtersWrapper .rightPart .loadingHint').fadeIn({ duration: 100, complete: function(){
              mapManager.updateFilterStatus(mapDataManager, mapDataManager.eventsColor, function(){
                     $('#filtersWrapper .rightPart .loadingHint').fadeOut(700);
                 });
              }
          });
        })

    }

});


function MapDataManager(){
    this.teams = [];
    this.teamsColorTable = [];
    this.events = [];
    this.eventsColorTable = [];
    this.eventsColor = [];
    this.data = [];    
    
    MapDataManager.prototype.requestData = function(){
        // Get program data here <-
        this.processRawData(TEST_DATA);
    }
    MapDataManager.prototype.processRawData = function(rawData){
        var limit = rawData.length;
        this.events.push("%NOEVENTS%");
        for(var i = 0 ; i < limit ; ++i){
            if(rawData[i].lat * rawData[i].lon == 0){
                continue;
            } 
            var newData = rawData[i];
            newData.location = {lat: rawData[i].lat, lng: rawData[i].lon};
            newData.imgSrc = rawData[i].iconURL;
            newData.team = rawData[i].userID;       // temporary: user uploader ID as team data
            if(this.teams.indexOf(newData.team)<0){
                this.teams.push(newData.team);
            }
            newData.team = this.teams.indexOf(newData.team);

            // the events for a program
            newData.events = [];

            var tmp = rawData[i].tagList.split(','); 
            for(var j = 0; j < tmp.length; ++j){
              if(tmp[j] != ''){                               
                  newData.events.push(tmp[j]);
                  if(this.events.indexOf(tmp[j]) < 0){
                    this.events.push(tmp[j]);
                  }
              }
            }

            if(newData.events.length <= 0){
              newData.events.push("%NOEVENTS%");
            }
            // index events for a program
            for(var j = 0; j < newData.events.length; ++j){
              newData.events[j] = this.events.indexOf(newData.events[j]);
            }  

            
            var markerColorGenerator = new MarkerColorGenerator();
            var colorIndex = markerColorGenerator.getSaturationByPopularity(rawData[i].popularity);
            newData.borderColor = markerColorGenerator.getColor('Amber', colorIndex);

            // if(tmp[0] != ''){            // temporary: find one event to represent the story
            //   newData.event = tmp[0];
            // } else {
            //     newData.event = "%NOEVENT%";
            // }

             
            // newData.event = this.events.indexOf(newData.event);
            // console.log(newData.event);

            //   for(var j = 0 ; j < newData.event.length ; ++j){
            //            if(events.indexOf(newData.event[j])<0){
            //                newData.push(newData.event[j]);
            //            }
            //        }

            this.data.push(newData);
        }
    }
    

    MapDataManager.prototype.generateRandomFilter = function(){
      /* generate color table for teams and events */ /* and Generate filter check boxes */
      var filter_event = '';
      var filter_team = '';
      for(var i= 0 ; i < this.events.length ; ++i){         
          if(this.events[i][0]=='%'){
              filter_event += '<input style="display: none;" type="checkbox" name="event" value="'+i+'" >';
              continue;
          }
          filter_event += '<input type="checkbox" id="filterEvent'+i+'" name="event" value="'+i+'" >';

          filter_event += '<span class = "tagWrapper">';
          filter_event += '<div class = "arrowLeft"> </div> ' ;  
          filter_event += '<label class = "sliderTag" for="filterEvent'+i+'" >'+    this.events[i] +' </label> </span>';
      }


//        for(var i= 0 ; i < this.teams.length ; ++i){

//            filter_team += '<br>';
//            filter_team += '<input style="display: none;" type="checkbox" name="team" value="'+i+'" >'+this.teams[i];
//        }


      // update html
      $('#filters').html(filter_event+filter_team);
        
    }
    
    MapDataManager.prototype.findDataByOpID = function (opid){
      for(var i = 0; i < this.data.length; ++i){
          if(opid == this.data[i]['opID']) return this.data[i];
      }
      return null;
    }
    
}


function MapManager(){
    this.imgThumbUrlPrefix = '';
    
    this.map = null;
    this.markerCluster = null;
    this.oms = null;
    this.markers = [];
    this.labels = ' ';
    this.labelIndex = 0;
    this.directionsDisplay = [];
    

    // Deletes all markers in the array by removing references to them.
    MapManager.prototype.deleteMarkers = function () {
      for (var i = 0; i < this.markers.length; ++i) {
        this.markers[i].setMap(null);
      }
      if(this.markerCluster)
        this.markerCluster.clearMarkers();
      this.markers = [];
      this.labelIndex = 0;
    }
    
    
    MapManager.prototype.initMap = function(data){
        /* find and locate map to central */
        var limit = data.length;
        var mycenter={lat:0.0, lng:0.0};
        for(var i = 0; i < limit; ++i){
            mycenter.lat += data[i].location.lat;
            mycenter.lng += data[i].location.lng;
        }
        mycenter.lat /= limit;
        mycenter.lng /= limit;


        /* init map  */
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: mycenter,


          /* set style */
        styles:[{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}]

      });
    }
    
    MapManager.prototype.initMapFocus = function(){
        /* init map position: contain all marker */
      var bounds = new google.maps.LatLngBounds(); // set map to fit all markers
      for(var i = 0 ; i < this.markers.length ; i++){
          bounds.extend(this.markers[i].getPosition());
      }
      if(bounds)
         this.map.fitBounds(bounds);
    }
    
    
    MapManager.prototype.setRoute = function(data){
        for(var i = 0; i < data.length - 10; i+=9)
            this.displayRoute(i, i + 9,data);
    }

    MapManager.prototype.hideRoute = function(){
      for(var i = 0; i < this.directionsDisplay.length; ++i){
         this.directionsDisplay[i].setMap(null);
      }
      this.directionsDisplay = [];
    }


    
    MapManager.prototype.setOverlappingMarkerSpiderfier = function(){
        this.oms = new OverlappingMarkerSpiderfier(this.map);
        for (var i = 0; i < this.markers.length; i ++) {	  
              this.oms.addMarker(this.markers[i]);  // <-- here
        }
    }
    
    
    
    MapManager.prototype.addCluster = function (mapDataManager){
      this.markerCluster = null;
      this.markerCluster = new MarkerClusterer(this.map, this.markers, {imagePath: 'asset/m'}, mapDataManager);
      this.markerCluster.mapDataManager_ = mapDataManager;
    };

    MapManager.prototype.initStreetViewListeners = function (){
        // Street view
      var panorama = this.map.getStreetView();
      var cluster = this.markerCluster;
      var that = this;
      var prevPov;
      var spinInterval = null;
      // Detect streetview
      google.maps.event.addListener(panorama, 'visible_changed', function() {
        clearInterval(spinInterval);
          if (panorama.getVisible()) {
            for(var i = 0; i < that.markers.length; ++i){
              that.markers[i].setIcon(that.markers[i].iconSrc); 
            }

            cluster.resetViewport();
            cluster.setMinClusterSize(9999999);
            cluster.redraw();  
            prevPov = panorama.getPov();
            // auto spin the view
            spinInterval = setInterval(function() {
              var curPov = panorama.getPov();
              var tmpPov = prevPov;
              prevPov = curPov.heading;
              
              if(tmpPov > curPov.heading) {
                 curPov.heading -= 0.3;
              }else{
                curPov.heading += 0.3;
              }               
              panorama.setPov(curPov);
            }, 100);  
            // hide UI　elements
            $('.onOffSwitchWrapper').hide();  
            $('.homeBtn').removeClass('open');      

          }else{

            // disable marker icon
            for(var i = 0; i < that.markers.length; ++i){
              that.markers[i].setIcon(null);
            }

            // disable spiderfy effect
            that.oms.unspiderfy();
            cluster.resetViewport();
            cluster.setMinClusterSize(1);
            cluster.redraw(); 

            // show UI elements
            $('.onOffSwitchWrapper').show();
          }
      });
    }
    
    
    // Adds a marker to the map and push to the array.
    MapManager.prototype.addMarker = function (location, markerImg, borderColor, team, popularity, opTitle, opID) {
      if(!markerImg)
        markerImg = "asset/markerIcon.png";
      else
        markerImg = this.imgThumbUrlPrefix + markerImg;

      // var icon = {
      //   url: markerImg, 
      //   size: new google.maps.Size(150, 50), 
      //   scaledSize: new google.maps.Size(150, 50), // scaled size
      //   origin: new google.maps.Point(0,0), // origin
      //   anchor: new google.maps.Point(0, 0) // anchor
      //   };
      var marker = new google.maps.Marker({
        position: location,
        label: this.labels[this.labelIndex++ % this.labels.length],
        map: this.map,
        iconSrc: markerImg,
        animation: google.maps.Animation.DROP,
        opID: opID
      });
      this.markers.push(marker);
//      markersInfo.push({src: markerImg, borderColor: borderColor, team: team, popularity: popularity, opTitle:opTitle, });
      setInterval(function(){setMarkerBorderColor(markerImg, borderColor);},700);
        
      // Set color of a marker
      function setMarkerBorderColor(src, color){
          var which = $('img[src="' + src+'"]');
      //    if(which.parent().hasClass('gm-style-iw'))return;
      //  which.css({ height: ''}).css({maxHeight: '120px',width: '128px'}).parent().css({ height: which.height()+'px'}).css({ width: '128px', border: 'solid 3px '+color});
          which.parent().css({ border: 'solid 3px '+color});

      }
        
    }
    
    MapManager.prototype.setMarkersWithFilter = function (filter, mapDataManager, eventsColor){
      var data = mapDataManager.data;
      if(!filter){
          filter = {};
      }
      if(!filter.team){
          filter.team = [];
      }
      if(!filter.event){
          filter.event = [];
      }

      // Add Marker    
      for(var i = 0; i < data.length; ++i){         
        var flag = true;
        if(filter.event.length > 0){
          for(var j = 0; j < filter.event.length; ++j){
            if(data[i].events.indexOf(parseInt(filter.event[j]))<0){
              flag = false;
              break;
            }
          }

        }  
        if(flag){
          this.addMarker(data[i].location, data[i].imgSrc, data[i].borderColor,data[i].team, data[i].popularity, data[i].opTitle, data[i].opID); 
            // this.addInfoWindow(this.markers[this.markers.length-1], data[i]);
        }
      }  
      // this.setOverlappingMarkerSpiderfier();
      this.addCluster(mapDataManager);
    }      

    
    /**
    * DEPRECATED, REPLACED BY LIGHTBOX
    *
    * @author  ITRI
    * @version beta
    * @param marker The marker object of Google Map 
    * @param data Program data corresponds to the marker
    */
    /*
    MapManager.prototype.addInfoWindow = function (marker, data) {

    
   
      // create a click listener of a marker
      google.maps.event.addListener(marker, 'click', function (event) {
        // <-- Call the lightbox here

       // console.log(data);
       // alert(data.opTitle );


        // DEPRECATED LIGHTBOX
        // function startInfoWindow(){
        //   infoWindow.open(this.map, marker);
        // }
        
        // DEPRECATED Click event
        // document.addEventListener("markerRealClickEvent", startInfoWindow);
        // setTimeout(function(){
        //     document.removeEventListener("markerRealClickEvent", startInfoWindow);
        // },700);

      });

      // DEPRECATED LIGHTBOX CONTENT
      // var infoWindow = new google.maps.InfoWindow({
      //   content: message
      // });   

      // Close infoWindow
      // google.maps.event.addListener(this.map, "click", function(event) {
      //   infoWindow.close();
      // });


      // WILL BE REOMOVED, TEMPORARY LIGHTBOX
      // This removes the right margin of the infowindow (Dark-magic)
      // google.maps.event.addListener(infoWindow, 'domready', function() {

      //  // Reference to the DIV which receives the contents of the infowindow using jQuery
      //  var iwOuter = $('.gm-style-iw');

      //   var iwBackground = iwOuter.prev();

      //  // Remove the background shadow DIV
      //  iwBackground.children(':nth-child(2)').css({'display' : 'none'});

      //  // Remove the white background DIV
      //  iwBackground.children(':nth-child(4)').css({'display' : 'none'});

      //   // Taking advantage of the already established reference to
      //   // div .gm-style-iw with iwOuter variable.
      //   // You must set a new variable iwCloseBtn.
      //   // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
      //   // Is this div that groups the close button elements.
      //   var iwCloseBtn = iwOuter.next();
      //     // console.log(color);
      //   // Apply the desired effect to the close button
      //   iwCloseBtn.css({
      //     opacity: '1', // by default the close button has an opacity of 0.7
      //     right: '38px', top: '3px', // button repositioning
      //     border: '7px solid #424242'  , // increasing button border and new color
      //     'border-radius': '13px', // circular effect
      //     'box-shadow': '0 0 5px #EEEEEE' // 3D effect to highlight the button
      //   });

      //   // The API automatically applies 0.7 opacity to the button after the mouseout event.
      //   // This function reverses this event to the desired value.
      //   iwCloseBtn.mouseout(function(){
      //     $(this).css({opacity: '1'});
      //   });

      // });

      
     
    } */
    
    
    
    MapManager.prototype.displayRoute = function (startIndex, endIndex, data) {
      var start = data[startIndex].location;
      var end = data[endIndex].location;
        // var randonColorPicking = Math.floor(Math.random()*colorPalette.length);
 //  var randonGradientPicking = Math.floor(Math.random()*13);

      var directionDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: { 
            strokeColor: new MarkerColorGenerator().getColor('Cyan', 4),
            // icons:[{
            //     repeat:'50px',
            //     icon:{path:google.maps.SymbolPath.FORWARD_OPEN_ARROW}
            // }]
        }
      });
      this.directionsDisplay.push(directionDisplay);
      directionDisplay.setMap(this.map); 
      var waypts = [];

        for (var i = startIndex + 1; i < startIndex + 9; ++i) {
            waypts.push({
            location: data[i].location,
            stopover: true
            });
        }

      var request = {
          origin : start,
          destination : end,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode : google.maps.TravelMode.DRIVING 
      };
      var directionsService = new google.maps.DirectionsService(); 
      directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
              directionDisplay.setDirections(response);
          }
      });
    }
    
    
    MapManager.prototype.updateFilterStatus = function (mapDataManager, eventsColor, afterEffect){
        
        this.deleteMarkers();

          var newFilter = {};
          newFilter.team = [];
          newFilter.event = [];
          $( "input[name=team]" ).each(function( index ) {
              if($(this).prop("checked") )
                  (newFilter.team).push($(this).val());
          });
          $( "input[name=event]" ).each(function( index ) {
              if($(this).prop("checked") )
                  (newFilter.event).push($(this).val());
          });

          this.setMarkersWithFilter(newFilter, mapDataManager, eventsColor);
          if(!newFilter.event.length){
            this.setRoute(mapDataManager.data);
          }
          else{
            this.hideRoute();
          }
          if(afterEffect)afterEffect();
        
    }
    
    MapManager.prototype.updateMapStyle = function (){
        if(!$("#dayNightOnOffSwitch").prop("checked")){
            // Midnight
            this.map.setOptions({styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]});
        } else {
            // Flat with label
            this.map.setOptions({styles:[{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}]});
        }
    }
    
    
}


function BottomSlider(){
    

    
    this.swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 4,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true,
        preloadImages: false,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        lazyLoadingInPrevNextAmount: 3,
    });
    this.justOn = false;
    var that = this;
    this.appendTimeout = [];
    this.homeBtnOrigIcon = $('.homeBtn img').attr('src');
    function setSwiperSlidesPerView(){
      that.swiper.params.slidesPerView = 4;
      var ww = $(window).width(); 
      that.swiper.params.slidesPerView = Math.floor(Math.max(ww-200,0)/400)+1;
    }

    setSwiperSlidesPerView();
    $(window).resize (setSwiperSlidesPerView);
    
    
    BottomSlider.prototype.close = function(){
        this.homeBtnToggleBack();
        $('.swiper-container').hide();
    }
    BottomSlider.prototype.reset = function(){
        this.homeBtnToggleBack();
        for(var i = 0 ; i < this.appendTimeout.length ; ++i){
            clearTimeout(this.appendTimeout[i]);
        }
        this.swiper.removeAllSlides();
        this.emptyLightboxLink();
        $('.swiper-container').show();
    }
    BottomSlider.prototype.addSlide = function(info, eventsNameTable){ 

        // Convert UNIX_time to time
        function timeConverter(UNIX_timestamp){
          var a = new Date(UNIX_timestamp * 1000);
          // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = a.getMonth();
          var date = a.getDate();
          var hour = (a.getHours() >= 10) ? a.getHours() : ('0'+a.getHours());
          var min = (a.getMinutes() >= 10) ? a.getMinutes() : ('0' + a.getMinutes());
          // var sec = a.getSeconds();
          var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min  ;
          return time;
        }

        var typeIconSrc,min,sec, mediaLabel;
        min = (Math.floor((info.duration)/60)).toString();
        sec = ((info.duration) % 60) >= 10 ? ((info.duration) % 60).toString() : '0' +((info.duration) % 60).toString() ;;
        if(info.opType == "IMAGE"){
          typeIconSrc = "https://edu.cloudplay.tw/images/png/pic.png";
          mediaLabel = info.photoCount;
        }     
        else{
          typeIconSrc = "https://edu.cloudplay.tw/images/png/video.png";
          mediaLabel = min + ':' + sec;
        }
        var sliderContent = '<div class="swiper-slide">';
        sliderContent += '<div class ="sliderImgWrapper swiper-lazy " data-opID="'+ info.opID +'" data-background="'+info.iconURL+'" style = "background-image: "";">';
        sliderContent += ' <div class="swiper-lazy-preloader"></div> </div>';
        sliderContent += '<span class="video_type_tag">';
        sliderContent += '<span class="op_type_label"><img class="m-r-5" src="';
        sliderContent += typeIconSrc + '" height="14" > ' + mediaLabel +' </span> </span>';
        sliderContent += ' <div class="info-area">';
        sliderContent += ' <h4 class="title">'+ info.opTitle+'</h4>';
        sliderContent +=  '<h5 class="chanel-title">';
        for (var i = 0; i < info.events.length ; ++i) { 
          sliderContent +=  '<span class = "tagWrapper">';
          sliderContent +=  '<div class = "arrowLeft"> </div> ' + '<div class = "sliderTag">';         
          // sliderContent += ' <a href="#">';
          if(!info.events[i]){ 
            sliderContent += '沒有標籤:( </div></span>';
            break;
          }
          else{
           sliderContent += eventsNameTable[ info.events[i] ] + '</div></span>';
          }
         ;   
        }
        
        sliderContent += '</h5>';
        sliderContent += '<div class="extra_info">';
        sliderContent += '<span class="start-time m-l-10 ">' + timeConverter(info.createDate) + '　</span>';
          
        sliderContent +='<span class="view m-r-10 ">';
        sliderContent +=   '<img class="m-r-5" src="https://edu.cloudplay.tw/images/png/eye.png" width="16" alt="瀏覽人數">' + info.popularity+ '</span>';  



          //   </div>
          //   <div class="clearfix"></div>
          // </div> '
        
        
        sliderContent += '</div>';
        this.swiper.appendSlide(sliderContent);
    };
    BottomSlider.prototype.homeBtnToggle = function(){
        $('.homeBtn img').attr('src', 'images/waitingCircle2.gif');
    }
    BottomSlider.prototype.homeBtnToggleBack = function(){
        $('.homeBtn img').attr('src', this.homeBtnOrigIcon);
    }
    BottomSlider.prototype.init = function(mapDataManager ,map){
        var that = this;
        this.close();
        
        window.addEventListener('startClusterPreviewSlider', 恭喜發財, false);

        document.addEventListener("startClusterPreviewSlider", 恭喜發財);
        
        google.maps.event.addListener(map, 'zoom_changed', function(event) {
            if(that.justOn)return;
          that.close();
        });
        google.maps.event.addListener(map, 'center_changed', function(event) {
            if(that.justOn)return;
          that.close();
        });


        function 恭喜發財(event){
            var markersToShow = event.detail.markers;
            that.reset();
            
            that.justOn = true;
            setTimeout(function(){
                that.justOn = false;
            }, 1000);
            
            that.homeBtnToggle();
            (function (that, markersToShow){

                for(var p = 0 ; p < markersToShow.length ; ++p)
                that.appendTimeout.push(setTimeout(function(markerToShow){
                        var info = mapDataManager.findDataByOpID(markerToShow.opID);

                        that.addSlide(info, mapDataManager.events);
                        that.appendLightboxLink(info);
                }, p*1.2*p, markersToShow[p]) );
                that.appendTimeout.push(setTimeout(function(){
                    that.homeBtnToggleBack();
                }, p*1.2*p) );
                
            })(that, markersToShow);
            
        }
        
        
    }
    
    BottomSlider.prototype.emptyLightboxLink = function(){
        $('#video-list').html('');
    }
    
    BottomSlider.prototype.appendLightboxLink = function(info){

        var newElement = '<li class="col-md-3 col-sm-6 col-xs-12 no-md-pd no-xs-pd" id="row_'+info.opID+'">';
        newElement += '<div class="video_block side_video" data-id="'+info.opID+'" data-title="'+ info.opTitle+'" data-desc="'+ info.opDescription +'" data-avatar="'+ info.userAvatar +'" data-owner-name="'+ info.ownerName +'" data-view-count="' + info.popularity + '" data-op-time="'+ info.opTime +'" data-channel-name="'+ info.channelName +'" data-org-name="'+ info.orgName +'" data-like="'+ info.likeCount +'" data-comment="'+ info.commentCount +'" data-share="'+ info.shareCount +'" data-type="'+ info.opType +'" data-datatype="'+ info.dataType +'" data-playlist="'+ info.playlist +'">';
        newElement += '<a class="cover fancybox" href="#fancybox"><ul class="hide tag_hide">';
        var tags = info.tagList.split(',');
        for(var k = 0 ; k < tags.length ; ++k){
            newElement += '<li class="tag pull-left m-r-5 m-b-5">#'+ tags[k] +'</li>';
        }
        newElement += '</ul></a></div></li>';

        $('#video-list').html($('#video-list').html()+ newElement);
        
        fancyBoxRegister(info.opID);
        
        function fancyBoxRegister(opID){
            $('.sliderImgWrapper[data-opID="' + opID + '"]').click(function(){
               $('.video_block[data-id="'+opID+'"] a').click(); 
            });
        }

    }
    
}

function MarkerColorGenerator(){
  this.colorTable = { 
      'Red': { 
        '0': '#FFEBEE', 
        '1': '#FFCDD2', 
        '2': '#EF9A9A', 
        '3': '#E57373', 
        '4': '#EF5350', 
        '5': '#F44336', 
        '6': '#E53935', 
        '7': '#D32F2F', 
        '8': '#C62828', 
        '9': '#B71C1C', 
        '10': '#FF8A80', 
        '11': '#FF5252', 
        '12': '#FF1744', 
        '13': '#D50000', 
      },

      'Pink': { 
        '0': '#FCE4EC', 
        '1': '#F8BBD0', 
        '2': '#F48FB1', 
        '3': '#F06292', 
        '4': '#EC407A', 
        '5': '#E91E63', 
        '6': '#D81B60', 
        '7': '#C2185B', 
        '8': '#AD1457', 
        '9': '#880E4F', 
        '10': '#FF80AB', 
        '11': '#FF4081', 
        '12': '#F50057', 
        '13': '#C51162', 
      },

      'Purple': { 
        '0': '#F3E5F5', 
        '1': '#E1BEE7', 
        '2': '#CE93D8', 
        '3': '#BA68C8', 
        '4': '#AB47BC', 
        '5': '#9C27B0', 
        '6': '#8E24AA', 
        '7': '#7B1FA2', 
        '8': '#6A1B9A', 
        '9': '#4A148C', 
        '10': '#EA80FC', 
        '11': '#E040FB', 
        '12': '#D500F9', 
        '13': '#AA00FF', 
      },

      'Deep Purple': { 
        '0': '#EDE7F6', 
        '1': '#D1C4E9', 
        '2': '#B39DDB', 
        '3': '#9575CD', 
        '4': '#7E57C2', 
        '5': '#673AB7', 
        '6': '#5E35B1', 
        '7': '#512DA8', 
        '8': '#4527A0', 
        '9': '#311B92', 
        '10': '#B388FF', 
        '11': '#7C4DFF', 
        '12': '#651FFF', 
        '13': '#6200EA', 
      },

      'Indigo': { 
        '0': '#E8EAF6', 
        '1': '#C5CAE9', 
        '2': '#9FA8DA', 
        '3': '#7986CB', 
        '4': '#5C6BC0', 
        '5': '#3F51B5', 
        '6': '#3949AB', 
        '7': '#303F9F', 
        '8': '#283593', 
        '9': '#1A237E', 
        '10': '#8C9EFF', 
        '11': '#536DFE', 
        '12': '#3D5AFE', 
        '13': '#304FFE', 
      },

      'Blue': { 
        '0': '#E3F2FD', 
        '1': '#BBDEFB', 
        '2': '#90CAF9', 
        '3': '#64B5F6', 
        '4': '#42A5F5', 
        '5': '#2196F3', 
        '6': '#1E88E5', 
        '7': '#1976D2', 
        '8': '#1565C0', 
        '9': '#0D47A1', 
        '10': '#82B1FF', 
        '11': '#448AFF', 
        '12': '#2979FF', 
        '13': '#2962FF', 
      },

      'Light Blue': { 
        '0': '#E1F5FE', 
        '1': '#B3E5FC', 
        '2': '#81D4FA', 
        '3': '#4FC3F7', 
        '4': '#29B6F6', 
        '5': '#03A9F4', 
        '6': '#039BE5', 
        '7': '#0288D1', 
        '8': '#0277BD', 
        '9': '#01579B', 
        '10': '#80D8FF', 
        '11': '#40C4FF', 
        '12': '#00B0FF', 
        '13': '#0091EA', 
      },

      'Cyan': { 
        '0': '#E0F7FA', 
        '1': '#B2EBF2', 
        '2': '#80DEEA', 
        '3': '#4DD0E1', 
        '4': '#26C6DA', 
        '5': '#00BCD4', 
        '6': '#00ACC1', 
        '7': '#0097A7', 
        '8': '#00838F', 
        '9': '#006064', 
        '10': '#84FFFF', 
        '11': '#18FFFF', 
        '12': '#00E5FF', 
        '13': '#00B8D4', 
      },

      'Teal': { 
        '0': '#E0F2F1', 
        '1': '#B2DFDB', 
        '2': '#80CBC4', 
        '3': '#4DB6AC', 
        '4': '#26A69A', 
        '5': '#009688', 
        '6': '#00897B', 
        '7': '#00796B', 
        '8': '#00695C', 
        '9': '#004D40', 
        '10': '#A7FFEB', 
        '11': '#64FFDA', 
        '12': '#1DE9B6', 
        '13': '#00BFA5', 
      },

      'Green': { 
        '0': '#E8F5E9', 
        '1': '#C8E6C9', 
        '2': '#A5D6A7', 
        '3': '#81C784', 
        '4': '#66BB6A', 
        '5': '#4CAF50', 
        '6': '#43A047', 
        '7': '#388E3C', 
        '8': '#2E7D32', 
        '9': '#1B5E20', 
        '10': '#B9F6CA', 
        '11': '#69F0AE', 
        '12': '#00E676', 
        '13': '#00C853', 
      },

      'Light Green': { 
        '0': '#F1F8E9', 
        '1': '#DCEDC8', 
        '2': '#C5E1A5', 
        '3': '#AED581', 
        '4': '#9CCC65', 
        '5': '#8BC34A', 
        '6': '#7CB342', 
        '7': '#689F38', 
        '8': '#558B2F', 
        '9': '#33691E', 
        '10': '#CCFF90', 
        '11': '#B2FF59', 
        '12': '#76FF03', 
        '13': '#64DD17', 
      },

      'Lime': { 
        '0': '#F9FBE7', 
        '1': '#F0F4C3', 
        '2': '#E6EE9C', 
        '3': '#DCE775', 
        '4': '#D4E157', 
        '5': '#CDDC39', 
        '6': '#C0CA33', 
        '7': '#AFB42B', 
        '8': '#9E9D24', 
        '9': '#827717', 
        '10': '#F4FF81', 
        '11': '#EEFF41', 
        '12': '#C6FF00', 
        '13': '#AEEA00', 
      },

      'Yellow': { 
        '0': '#FFFDE7', 
        '1': '#FFF9C4', 
        '2': '#FFF59D', 
        '3': '#FFF176', 
        '4': '#FFEE58', 
        '5': '#FFEB3B', 
        '6': '#FDD835', 
        '7': '#FBC02D', 
        '8': '#F9A825', 
        '9': '#F57F17', 
        '10': '#FFFF8D', 
        '11': '#FFFF00', 
        '12': '#FFEA00', 
        '13': '#FFD600', 
      },

      'Amber': { 
        '0': '#FFF8E1', 
        '1': '#FFECB3', 
        '2': '#FFE082', 
        '3': '#FFD54F', 
        '4': '#FFCA28', 
        '5': '#FFC107', 
        '6': '#FFB300', 
        '7': '#FFA000', 
        '8': '#FF8F00', 
        '9': '#FF6F00', 
        '10': '#FFE57F', 
        '11': '#FFD740', 
        '12': '#FFC400', 
        '13': '#FFAB00', 
      },

      'Orange': { 
        '0': '#FFF3E0', 
        '1': '#FFE0B2', 
        '2': '#FFCC80', 
        '3': '#FFB74D', 
        '4': '#FFA726', 
        '5': '#FF9800', 
        '6': '#FB8C00', 
        '7': '#F57C00', 
        '8': '#EF6C00', 
        '9': '#E65100', 
        '10': '#FFD180', 
        '11': '#FFAB40', 
        '12': '#FF9100', 
        '13': '#FF6D00', 
      },

      'Deep Orange': { 
        '0': '#FBE9E7', 
        '1': '#FFCCBC', 
        '2': '#FFAB91', 
        '3': '#FF8A65', 
        '4': '#FF7043', 
        '5': '#FF5722', 
        '6': '#F4511E', 
        '7': '#E64A19', 
        '8': '#D84315', 
        '9': '#BF360C', 
        '10': '#FF9E80', 
        '11': '#FF6E40', 
        '12': '#FF3D00', 
        '13': '#DD2C00', 
      },

      'Brown': { 
        '0': '#EFEBE9', 
        '1': '#D7CCC8', 
        '2': '#BCAAA4', 
        '3': '#A1887F', 
        '4': '#8D6E63', 
        '5': '#795548', 
        '6': '#6D4C41', 
        '7': '#5D4037', 
        '8': '#4E342E', 
        '9': '#3E2723', 
      },

      'Grey': { 
        '0': '#FAFAFA', 
        '1': '#F5F5F5', 
        '2': '#EEEEEE', 
        '3': '#E0E0E0', 
        '4': '#BDBDBD', 
        '5': '#9E9E9E', 
        '6': '#757575', 
        '7': '#616161', 
        '8': '#424242', 
        '9': '#212121', 
      },

      'Blue Grey': { 
        '0': '#ECEFF1', 
        '1': '#CFD8DC', 
        '2': '#B0BEC5', 
        '3': '#90A4AE', 
        '4': '#78909C', 
        '5': '#607D8B', 
        '6': '#546E7A', 
        '7': '#455A64', 
        '8': '#37474F', 
        '9': '#263238', 
      },

      'Black': { 
        '5': '#000000', 
        'Text': 'rgba(0,0,0,0.87)', 
        'Secondary Text': 'rgba(0,0,0,0.54)', 
        'Icons': 'rgba(0,0,0,0.54)', 
        'Disabled': 'rgba(0,0,0,0.26)', 
        'Hint Text': 'rgba(0,0,0,0.26)', 
        'Dividers': 'rgba(0,0,0,0.12)', 
      },

      'White': { 
        '5': '#ffffff', 
        'Text': '#ffffff', 
        'Secondary Text': 'rgba(255,255,255,0.7)', 
        'Icons': '#ffffff', 
        'Disabled': 'rgba(255,255,255,0.3)', 
        'Hint Text': 'rgba(255,255,255,0.3)', 
        'Dividers': 'rgba(255,255,255,0.12)', 
      },

  };

    MarkerColorGenerator.prototype.getColor = function(color, saturation){
      return this.colorTable[color][saturation.toString()];
    }
    MarkerColorGenerator.prototype.getSaturationByPopularity = function(popularity){
      if(popularity <= 10){
        return '0';
      } else {
        return  Math.min((Math.floor(popularity /10)+1),9).toString();
      }
    }

}

