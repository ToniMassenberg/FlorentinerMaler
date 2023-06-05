// This file contains all code for the map.html subpage.}

// jQuery wrapper to only load rest of the JavaScript when HTML is fully loaded
$(document).ready(() => {

  // How to log objects so you can see the content:
  //console.log('regionObjects: ' + JSON.stringify(regionObjects)) 

  // as soon as I use another file I get an error in the browser. To solve I set up a local testing server: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server
  // to run this page in local server right-click HTML and select Launch in Browser (intro to extension in VSCode: https://marketplace.visualstudio.com/items?itemName=yuichinukiyama.vscode-preview-server&ssr=false#overview)

  // Function which accepts the JSON files for all kinds of border annotation and adding the annotation information to a regionObject that will be called in mapAnnotations()
  // Get data for annotations from JSON here so it runs just once, not every time a checkbox is checked. The code to access the JSON file and reformat the pointsString was partly written by ChatGPT and edited by me.
  function makeRegionObjects(jsonFilePath) {
    // Array with the objects holding gonfaloni info so it can be accessed when checkboxes are checked
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
      // Get the ID of the currently selected checkbox
      const currentCheckboxId = $(this).attr("id");
      // Generate the ID for the region overlay container based on the current checkbox
      let idIconsGenerated = planNr + "IconsGenerated";

      // Clear all other checkboxes with IDs plan6-plan17 when one of them is checked. These 4 lines were written by ChatGPT.
      $(`input[id^="plan"]:not(#${currentCheckboxId})`).filter((index, element) => {
        const idNumber = parseInt(element.id.slice(4));
        return idNumber >= 6 && idNumber <= 17;
      }).not(`#${currentCheckboxId}`).prop("checked", false);


      if ($(this).prop("checked") === true) {
        // Delete old icons before new ones are added by emptying the container for icon overlays
        $("[id*='IconsGenerated']").empty();
        // Initialize container for all region overlays so it can be emptied later
        $('#oldmap-container').append(`<div class="svg-container" id="${idIconsGenerated}"></div>`);

        // Define one symbol for every job group Jacobsen has a symbol for
        // Use of SVG HTML-native symbols: https://wiki.selfhtml.org/wiki/SVG/Tutorials/Icons#SVG_in_HTML
        // SVG paths from Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License Icons: CC BY 4.0. Copyright 2023 Fonticons, Inc., taken from https://github.com/FortAwesome/Font-Awesome/tree/6.x/svgs
        const symbolPaths = {
          wandmaler: 'M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z', // circle.svg
          moebelmaler: 'M464 48V464H48V48H464zM48 0H0V48 464v48H48 464h48V464 48 0H464 48z', // square-full.svg
          waffenmaler: 'M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z', // circle-dot.svg
          glasmaler: 'M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z', // star.svg
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

            // Define color of symbol based on certainty of information: dark blue if the street can be identified, lighter blue if only the parish is known OR if the icon is for an assistant
            color = (region.region_attributes.certainty === 'street') ? "darkblue" : "blue";

            // Insert a div container with the symbol appropriate to the job group for every marker.
            $(`#${idIconsGenerated}`).append(`
              <div class="svg-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2178 2121" preserveAspectRatio="none">
                  <defs><symbol id="${job}" viewBox="0 0 512 512">'<path d="${symbolPaths[job]}" stroke="${color}" stroke-width="1" fill="${color}"/></symbol></defs>
                  <use href="#${job}" x="${region.shape_attributes.cx}" y="${region.shape_attributes.cy}" width="40" height="40" />
                  <text x="${region.shape_attributes.cx}" y="${region.shape_attributes.cy}" font-size="50" fill="${color}">${symbolTexts[job]}</text>
                </svg>
              </div>
            `);
          }
        });

        // Empty container when no checkbox is checked
      } else if ($(this).prop("checked") === false) {
        $(`#${idIconsGenerated}`).empty();
      }
    });
  }

  // Function to display the icons for church locations
  function mapChurches(planNr, jsonFilePath) {
    $(`input[id="${planNr}"]`).click(function () {
      if ($(this).prop("checked") === true) {
        // Initialize container for this region overlay so it can be emptied later
        $('#oldmap-container').append('<div class="svg-container" id="churchContainer"></div>');

        // Define symbol paths for the church and cross symbols
        const symbolPaths = {
          mainChurch: 'M344 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V48H264c-13.3 0-24 10.7-24 24s10.7 24 24 24h32v46.4L183.3 210c-14.5 8.7-23.3 24.3-23.3 41.2V512h96V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96h96V251.2c0-16.9-8.8-32.5-23.3-41.2L344 142.4V96h32c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V24zM24.9 330.3C9.5 338.8 0 354.9 0 372.4V464c0 26.5 21.5 48 48 48h80V273.6L24.9 330.3zM592 512c26.5 0 48-21.5 48-48V372.4c0-17.5-9.5-33.6-24.9-42.1L512 273.6V512h80z',
          church: 'M176 0c-26.5 0-48 21.5-48 48v80H48c-26.5 0-48 21.5-48 48v32c0 26.5 21.5 48 48 48h80V464c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V256h80c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48H256V48c0-26.5-21.5-48-48-48H176z'
        };

        $.getJSON(jsonFilePath, function (data) {
          // Loop through each region in the JSON file
          for (const region of data.regions) {
            var name = region.region_attributes.name;
            var type = region.region_attributes.type;

            // Insert a div container with the church symbols for every marker.
            $("#churchContainer").append(`
              <div class="svg-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2178 2121" preserveAspectRatio="none">
                  <defs><symbol id="${type}" viewBox="0 0 512 512"><path d="${symbolPaths[type]}" stroke="black" stroke-width="1" fill="black"/></symbol></defs>
                  <use xlink:href="#${type}" x="${region.shape_attributes.cx}" y="${region.shape_attributes.cy}" width="40" height="40"/>
                </svg>
              </div>
            `);
          }
        });
      } else if ($(this).prop("checked") === false) {
        $("#churchContainer").empty();
      }
    });
  }

  // call the appropriate function with the corresponding JSON file for each checkbox 
  mapAnnotations("plan1", "assets/data/map-annotation-walls.json")
  mapAnnotations("plan2", "assets/data/map-annotation-gonfaloni.json")
  mapAnnotations("plan3", "assets/data/map-annotation-popoli.json")
  mapAnnotations("choropleth", "assets/data/map-annotation-gonfaloni.json")
  mapChurches("churches", "assets/data/map-annotation-churches.json")
  mapIcons("plan6", "assets/data/map-annotation-1400.json");
  mapIcons("plan7", "assets/data/map-annotation-1410.json");
  mapIcons("plan8", "assets/data/map-annotation-1427.json");
  mapIcons("plan9", "assets/data/map-annotation-1431.json");
  mapIcons("plan10", "assets/data/map-annotation-1433.json");
  mapIcons("plan11", "assets/data/map-annotation-1442.json");
  mapIcons("plan12", "assets/data/map-annotation-1447.json");
  mapIcons("plan13", "assets/data/map-annotation-1451.json");
  mapIcons("plan14", "assets/data/map-annotation-1458.json");
  mapIcons("plan15", "assets/data/map-annotation-1427-workshop.json");
  mapIcons("plan16", "assets/data/map-annotation-1431-workshop.json");
  mapIcons("plan17", "assets/data/map-annotation-1433-workshop.json");


  // Function which toggles the legends depending on which checkboxes are checked. Basic functionality written by ChatGPT, edited by me. 
  function mapLegend() {
    $(document).ready(function () {
      var $explanationDiv = $('#oldmap-explanation');
      var $regionInfo = $('<div class="w3-cell"><span class="w3-tag w3-wide">Legende Grenzen</span><br>Durchgehende Linie: Quartieri <br>Gestrichelte Linie: Gonfaloni</div>');
      var $churchInfo = $('<div class="w3-cell"><span class="w3-tag w3-wide">Legende Kirchen</span><br>Kirche: Hauptkirche der Viertel<br>Kreuz: Kirche mit Pfarrfunktion</div>');
      var $iconInfo = $('<div class="w3-cell"><span class="w3-tag w3-wide">Legende Wohnungen</span><br>Dunkelblau: Straße bekannt<br>Hellblau: Nur Pfarrsprengel bekannt<br><br>Kreis: Wandmaler<br>Quadrat: Möbelmaler<br>Kreis mit Punkt: Waffenmaler<br>Stern: Glasmaler<br>Lesezeichen: Miniaturist<br>N: Naibi<br>C: Ceri<br>S: Stoffmaler<br>Z: Zimmermaler<br>G: Gipsmaler<br>M: Steinmetz<br>H: Hobbymaler<br>U: Unspezifizierter Maler<br></div>');
      var $iconInfoWorkshop = $('<div class="w3-cell"><span class="w3-tag w3-wide">Legende Werkstätten</span><br>Dunkelblau: Meister<br>Hellblau: Assistent (Lehrling oder Gehilfe)<br><br>Kreis: Wandmaler<br>Quadrat: Möbelmaler<br>Kreis mit Punkt: Waffenmaler<br>Stern: Glasmaler<br>Lesezeichen: Miniaturist<br>N: Naibi<br>C: Ceri<br>S: Stoffmaler<br>Z: Zimmermaler<br>G: Gipsmaler<br>M: Steinmetz<br>H: Hobbymaler<br>U: Unspezifizierter Maler<br></div>');
      var $choroplethInfo = $('<div class="w3-cell"><span class="w3-tag w3-wide">Legende Besitz</span><br><img src="assets/images/choroplethInfo.jpg"></div>');

      $('input[type="checkbox"]').change(function () {
        $explanationDiv.empty(); // clear any previously added elements
        var $checked = $('input[type="checkbox"]:checked');
        if ($checked.length === 0) {
          $explanationDiv.hide();
        } else {
          if ($checked.is('#plan6') || $checked.is('#plan7') || $checked.is('#plan8') || $checked.is('#plan9') || $checked.is('#plan10') || $checked.is('#plan11') || $checked.is('#plan12') || $checked.is('#plan13') || $checked.is('#plan14')) {
            $explanationDiv.append($iconInfo).fadeIn('slow');
          }
          if ($checked.is('#plan15') || $checked.is('#plan16') || $checked.is('#plan17')) {
            $explanationDiv.append($iconInfoWorkshop).fadeIn('slow');
          }
          if ($checked.is('#churches')) {
            $explanationDiv.append($churchInfo).fadeIn('slow');
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
  }
  // call legend function (it doesn't have to be a function, it is for modularity)
  mapLegend()

  // Code for the Leaflat map of modern Florence. Edited version of: Agafonkin, Volodymyr. "Quick Start Guide - Leaflet - a JavaScript library for interactive maps". Accessed 22. April 2023. https://leafletjs.com/examples/quick-start/.
  var modernmap = L.map('modernmap').setView([43.7703, 11.2574], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(modernmap);

})