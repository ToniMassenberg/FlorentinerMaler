// This file contains all code for the map.html subpage.

// jQuery wrapper to only load JavaScript when HTML is fully loaded
$(document).ready(() => {

    // global variable with annotations for gonfaloni
    const regionObjects = [];
        // Load the JSON file with annotations
        $.getJSON('assets/map-annotation-gonfaloni.json', function (data) {
          // Create an array to hold the region objects
          

          // Loop through each region in the JSON file
          for (const region of data.regions) {
            const allPointsX = region.shape_attributes.all_points_x;
            const allPointsY = region.shape_attributes.all_points_y;

            // Combine the all_points_x and all_points_y arrays into a single string. This line was written by ChatGPT.
            const pointsString = allPointsX.map((x, i) => `${x},${allPointsY[i]}`).join(' ');

            // Create an object for the region with its name and formatted points string
            const regionObj = {
              name: region.region_attributes.name,
              type: region.region_attributes.type,
              avgWealth: region.region_attributes.avgwealth,
              points: pointsString
            };

            // Add the region object to the array
            regionObjects.push(regionObj);
            
          }

          // Log the region objects to the console
          //console.log('regionObjects: ' + JSON.stringify(regionObjects))
          //return regionObjects
        });





  // insert image in html ("prepend" puts the entity first in the container)
  //$('#oldmap-container').prepend($('<img>', { id: 'oldmap', src: 'images/basicmap.jpg' }))


  // as soon as I use another file i get an error in the browser. To solve I set up a local testing server: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server
  // to run this page in local server right-click HTML and select Launch in Browser (intro to extension in VSCode: https://marketplace.visualstudio.com/items?itemName=yuichinukiyama.vscode-preview-server&ssr=false#overview)

  // function to add annotation regions based on coordinates in map-annotation-gonfaloni.json
  function mapAnnotations(planNr, jsonFilePath) {
    $('input[id="' + planNr + '"]').click(function () {
      // if the checkbox is checked: 
      if ($(this).prop("checked") == true) {
        // get data for annotations from JSON


        //console.log('regionObjects: ' + JSON.stringify(regionObjects))
        
        regionObjects.forEach(obj => {
          const nameString = obj.name;
          const pointsString = obj.points;
          // The viewbox defines the SVG's size as the image size, preserveAspectRatio="none" means that the SVG overlay can be scaled and squished like the raster image instead of being cut off. Explanation for the use of SVGs: https://css-tricks.com/scale-svg/
          $('#oldmap-container').append($('<div class="svg-container" id="generated"><svg viewBox="0 0 2178 2121" preserveAspectRatio="none"><polygon points="' + pointsString + '"style="fill:none;stroke:black;stroke-width:5" /><text x="200" y="100" fill="black">' + nameString + '</text></svg></div>'))


        });
        


        // when the checkbox is unchecked again:  
      } else if ($(this).prop("checked") == false) {
        $('.svg-container').remove();
      }
    });
  }

  mapAnnotations("plan2", "assets/map-annotation-gonfaloni.json")

  function mapChoropleth(planNr, jsonFilePath) {
    $('input[id="' + planNr + '"]').click(function () {
      // if the checkbox is checked: 
      if ($(this).prop("checked") == true) {
        // get data for annotations from JSON
        //$.getJSON(jsonFilePath, function (data) {};

        var points = "'709,341 765,551 819,823 901,894 873,927 876,943 851,966 919,987 909,1035'"

        // fill polygon for avg wealth map
        $('#oldmap-svg-choropleth').append($('<svg viewBox="0 0 2178 2121" preserveAspectRatio="none"><polygon points=' + points + 'style="fill:lime;opacity:0.5" /></svg>'))


        // when the checkbox is unchecked again:  
      } else if ($(this).prop("checked") == false) {
        $('#oldmap-svg-choropleth').empty();
      }
    });
  }

  mapChoropleth("choropleth", "assets/map-annotation-gonfaloni.json")



  // function to add icons to the map image based on coordinates in a JSON file. For checkbox use with jQuery: https://www.w3docs.com/snippets/javascript/how-to-test-if-a-checkbox-is-checked-with-jquery.html
  function mapIcons(planNr, jsonFilePath) {
    $('input[id="' + planNr + '"]').click(function () {
      // if the checkbox is checked: 
      if ($(this).prop("checked") == true) {
        // get data for icon position from JSON
        $.getJSON(jsonFilePath, function (data) {
          var selectedPlan = planNr;
          // Get the painters for the selected plan
          var painters = data[selectedPlan];
          // Iterate over each painter
          $.each(painters, function (painter, painterData) {
            // Access the painter's data
            var label = painterData.label;
            var iconTop = painterData.iconTop;
            var iconLeft = painterData.iconLeft;

            // create icon based on data
            var container = document.querySelector('#oldmap-container');
            // create the icon element
            var icon = document.createElement('i');
            icon.classList.add('fa', 'fa-circle', planNr + 'icon');
            icon.style.position = 'absolute';
            icon.style.width = '10px';
            icon.style.height = '10px';
            // append the icon element to the container element
            container.appendChild(icon);
            // place position as percentage
            icon.style.top = iconTop + '%';
            icon.style.left = iconLeft + '%';
          });
        });

        // when the checkbox is unchecked again:  
      } else if ($(this).prop("checked") == false) {
        $('.' + planNr + 'icon').remove();
      }
    });
  }

  // call the function for each checkbox 
  mapIcons("plan6", "assets/examplejson.json");
  mapIcons("plan7", "assets/examplejson.json");

  // place text: https://www.w3schools.com/howto/howto_css_image_text.asp


  // Code for the Leaflat map of modern Florence. Reference: Agafonkin, Volodymyr. „Quick Start Guide - Leaflet - a JavaScript library for interactive maps“. Zugegriffen 22. April 2023. https://leafletjs.com/examples/quick-start/.
  var modernmap = L.map('modernmap').setView([43.7703, 11.2574], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(modernmap);



})


