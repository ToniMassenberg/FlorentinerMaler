// This file contains all code for the map.html subpage.

// jQuery wrapper to only load JavaScript when HTML is fully loaded
$(document).ready(() => {

  // How to log objects so you can see the content:
  //console.log('regionObjects: ' + JSON.stringify(regionObjects)) 

  // as soon as I use another file i get an error in the browser. To solve I set up a local testing server: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server
  // to run this page in local server right-click HTML and select Launch in Browser (intro to extension in VSCode: https://marketplace.visualstudio.com/items?itemName=yuichinukiyama.vscode-preview-server&ssr=false#overview)

  // insert image in html ("prepend" puts the entity first in the container)
  //$('#oldmap-container').prepend($('<img>', { id: 'oldmap', src: 'images/basicmap.jpg' }))


  // Get data for annotations from JSON here so it runs just once, not every time a checkbox is checked. The code to access the JSON file and reformat the pointsString was partly written by ChatGPT and edited by me.    
  // Array with the objects holding gonfaloni info so it can be accessed when checkboxes are checked
  
  // Function which accepts the JSON files for all kinds of border annotation and adding the annotation information to a regionObject that will be called in mapAnnotations()
  function makeRegionObjects(jsonFilePath) {
    var regionObjects = [];
    $.getJSON(jsonFilePath, function (data) {
      // Loop through each region in the JSON file
      for (const region of data.regions) {
        const allPointsX = region.shape_attributes.all_points_x;
        const allPointsY = region.shape_attributes.all_points_y;

        // Combine the all_points_x and all_points_y arrays into a single string to get SVG path. 
        const pointsString = allPointsX.map((x, i) => `${x},${allPointsY[i]}`).join(' ');

        // Create an object for the region with its name and formatted points string
        const regionObj = {
          name: region.region_attributes.name,
          type: region.region_attributes.type,
          avgWealth: region.region_attributes.avgWealth,
          points: pointsString,
          middle: region.region_attributes.middlePoint // this coordinate is not the actual middle, it's the placement for the text.
        };

        // Add the region object to the array
        regionObjects.push(regionObj);
      }
    });
    return regionObjects;
  }

  // function to add annotation regions based on coordinates in map-annotation-gonfaloni.json
  function mapAnnotations(planNr, jsonFilePath) {
    let regionObjects = makeRegionObjects(jsonFilePath);
    $(`input[id="${planNr}"]`).click(function () {
      // initialize ID for the region overlay container
      let idGenerated = planNr + "Generated"
      // if the checkbox is checked: 
      if ($(this).prop("checked") === true) {
        // Initialize container for all region overlays so it can be emptied later
        $('#oldmap-container').append(`<div class="svg-container" id="${idGenerated}"></div>`)

        // get the region object array and loop over each regionObject to make one overlay each
        // Every city quarter has its own overlay which means they properties can be changed individually. Here they have different name tags, if needed they could have eg. different colors or line patterns.
        regionObjects.forEach(obj => {
          const nameString = obj.name;
          const pointsString = obj.points;
          const middle = obj.middle;
          const avgWealth = obj.avgWealth;

          // Define the colors and opacity in the wealth map based on average wealth of each region's citizens (Jacobsen p.28)
          if (planNr === "choropleth") {
            if (obj.type === "Gonfaloni") {
              switch (true) {
                case avgWealth < 120:
                  var styleString = "fill:#c51b7d;opacity:0.6";
                  break;
                case avgWealth <= 150:
                  var styleString = "fill:#e9a3c9;opacity:0.7";
                  break;
                case avgWealth <= 200:
                  var styleString = "fill:#fde0ef;opacity:0.7";
                  break;
                case avgWealth <= 230:
                  var styleString = "fill:#f7f7f7;opacity:0.7";
                  break;
                case avgWealth <= 260:
                  var styleString = "fill:#e6f5d0;opacity:0.7";
                  break;
                case avgWealth <= 300:
                  var styleString = "fill:#a1d76a;opacity:0.7";
                  break;
                case avgWealth > 300:
                  var styleString = "fill:#4d9221;opacity:0.6";
                  break;
                default:
                  console.log("Choropleth map went to default option")
              }

              // Append SVG overlay as its own container since HTML can't handle SVG containers themselves, since they use different namespaces.
              // The viewbox defines the SVG's size as the image size, preserveAspectRatio="none" means that the SVG overlay can be scaled and squished like the raster image instead of being cut off. 
              // Explanation for the use of SVGs: https://css-tricks.com/scale-svg/
              $(`#${idGenerated}`).append(`
            <div class="svg-container">
                <svg viewBox="0 0 2178 2121" preserveAspectRatio="none">
                  <polygon points="${pointsString}" style="${styleString}" />
                </svg>
              </div>
            `);
            } else {
              // do nothing, because we log the wealth of Gonfaloni, not of the Quartieri. Add here if something should happen.
            };
            // end of choropleth map

          } else { // Condition if it is for plan2 or plan3
            // Define the style of the line.
            if (obj.type === "Quartieri") {
              var styleString = "fill:none;stroke:black;stroke-width:5";
              var textSize = "5em";
            } else if (obj.type === "Gonfaloni") {
              // Different line style for Gonfaloni: thinner, dashed line (stroke-dasharray)
              var styleString = "fill:none;stroke:black;stroke-dasharray:5,10;stroke-width:4";
              var textSize = "3em";
            } else {
              // Different line style for walls
              var styleString = "fill:none;stroke:black;stroke-dasharray:10,10;stroke-width:5";
              var textSize = "5em";
            }
            // Append SVG overlays for each region border
            $(`#${idGenerated}`).append(`
            <div class="svg-container">
                <svg viewBox="0 0 2178 2121" preserveAspectRatio="none">
                  <polygon points="${pointsString}" style="${styleString}" />
                  <text font-size="${textSize}" ${middle} fill="black">${nameString}</text>
                </svg>
              </div>
            `);
          }
        });
        // end for plan2 and plan3
      }

      // when the checkbox is unchecked again remove overlays
      else if ($(this).prop("checked") === false) {
        $(`#${idGenerated}`).empty();
      }
    });
  }

  // Function to display the icons based on plan6-17
  function mapIcons(planNr, jsonFilePath) {

    $(`input[id="${planNr}"]`).click(function () {
      // if the checkbox is checked: 
      let idGenerated = planNr + "Generated";
      if ($(this).prop("checked") === true) {
        // initialize ID for the region overlay container, so each plan gets its own container and can be stacked
        const locationObjects = [];
        // Initialize container for all region overlays so it can be emptied later
        $('#oldmap-container').append(`<div class="svg-container" id="${idGenerated}"></div>`);

        // Define one symbol for every job group Jacobsen has a symbol for
        // Use of SVG HTML-native symbols: https://wiki.selfhtml.org/wiki/SVG/Tutorials/Icons#SVG_in_HTML
        // SVG paths from Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License Icons: CC BY 4.0. Copyright 2023 Fonticons, Inc., taken from https://github.com/FortAwesome/Font-Awesome/tree/6.x/svgs
        const symbolPaths = {
          wandmaler: 'M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z', // circle.svg
          moebelmaler: 'M464 48V464H48V48H464zM48 0H0V48 464v48H48 464h48V464 48 0H464 48z', // square-full.svg
          waffenmaler: 'M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z', // circle-dot.svg
          glasmaler: 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z', // circle-xmark.svg
          miniaturist: 'M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z', // bookmark.svg
        };
        // For rare job groups use text as a symbol to keep the more common symbols easily recognizeable
        const symbolTexts = {
          wandmaler: '',
          moebelmaler: '',
          waffenmaler: '',
          glasmaler: '',
          miniaturist: '',
          naibi: 'N',
          ceri: 'C',
          stoffmaler: 'S',
          zimmermaler: 'Z',
          gips: 'G',
          steinmetz: 'M',
          hobby: 'H',
          undefined: 'U'
        }

        $.getJSON(jsonFilePath, function (data) {
          // Loop through each region in the JSON file
          for (const region of data.regions) {

            var job = region.region_attributes.job;

            // Define color of symbol based on certainty of information: black if the street can be identified, gray if only the parish is known
            if (region.region_attributes.certainty === 'street') {
              var color = "black";
            } else {
              var color = "gray";
            };

            // Insert a div container with the symbol appropriate to the job group for every marker.
            $(`#${idGenerated}`).append(`
              <div class="svg-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2178 2121" preserveAspectRatio="none">
                  <defs><symbol id="${job}" viewBox="0 0 512 512">'<path d="${symbolPaths[job]}" stroke="${color}" stroke-width="2" /></symbol></defs>
                  <use href="#${job}" x="${region.shape_attributes.cx}" y="${region.shape_attributes.cy}" width="40" height="40" />
                  <text x="${region.shape_attributes.cx}" y="${region.shape_attributes.cy}" font-size="50" fill="${color}">${symbolTexts[job]}</text>
                </svg>
              </div>
            `);
          }
        });

        // when the checkbox is unchecked again delete all symbols:  
      } else if ($(this).prop("checked") === false) {
        $(`#${idGenerated}`).empty();
      }
    });
  }

  // call the appropriate function with the corresponding JSON file for each checkbox 
  mapAnnotations("plan1", "assets/map-annotation-walls.json")
  mapAnnotations("plan2", "assets/map-annotation-gonfaloni.json")
  mapAnnotations("plan3", "assets/map-annotation-popoli.json")
  mapAnnotations("choropleth", "assets/map-annotation-gonfaloni.json")
  mapIcons("plan6", "assets/map-annotation-1400.json"); 
  mapIcons("plan7", "assets/map-annotation-1410.json");


  // Function which toggles the legends depending on which checkboxes are checked. Basic functionality written by ChatGPT, edited by me. 
  $(document).ready(function() {
    var $explanationDiv = $('#oldmap-explanation');
    var $regionInfo = $('<div class="w3-cell"><span class="w3-tag w3-wide">Legende Grenzen</span><br>Durchgehende Linie: Quartieri <br>Gestrichelte Linie: Gonfaloni</div>');
    var $iconInfo = $('<div class="w3-cell"><span class="w3-tag w3-wide">Legende Icons</span><br>Kreis: Wandmaler<br>Quadrat: Möbelmaler<br>Kreis mit Punkt: Waffenmaler<br>Kreis mit X: Glasmaler<br>Lesezeichen: Miniaturist<br>N: Naibi<br>C: Ceri<br>S: Stoffmaler<br>Z: Zimmermaler<br>G: Gipsmaler<br>M: Steinmetz<br>H: Hobbymaler<br>U: Unspezifizierter Maler<br></div>');
    var $choroplethInfo = $('<div class="w3-cell"><span class="w3-tag w3-wide">Legende Besitz</span><br><img src="images/choroplethInfo.jpg"></div>');
  
    $('input[type="checkbox"]').change(function() {
      $explanationDiv.empty(); // clear any previously added elements
      var $checked = $('input[type="checkbox"]:checked');
      if ($checked.length === 0) {
        $explanationDiv.hide();
      } else {
        if ($checked.is('#plan6') || $checked.is('#plan7')) {
          $explanationDiv.append($iconInfo).fadeIn('slow');

        }
        if ($checked.is('#plan2')) {
          $explanationDiv.append($regionInfo).fadeIn('slow');
        }
        if ($checked.is('#choropleth')) {
          $explanationDiv.append($choroplethInfo).fadeIn('slow');
        }
        $explanationDiv.show();
      }
    });
  });
  
  


  // Code for the Leaflat map of modern Florence. Edited version of: Agafonkin, Volodymyr. "Quick Start Guide - Leaflet - a JavaScript library for interactive maps". Accessed 22. April 2023. https://leafletjs.com/examples/quick-start/.
  var modernmap = L.map('modernmap').setView([43.7703, 11.2574], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(modernmap);
})


