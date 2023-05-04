// This file contains all code for the map.html subpage.

// jQuery wrapper to only load JavaScript when HTML is fully loaded
$(document).ready(() => {


  // insert image in html ("prepend" puts the entity first in the container)
  //$('#oldmap-container').prepend($('<img>', { id: 'oldmap', src: 'images/basicmap.jpg' }))
  // load image with canvas: https://www.encodedna.com/html5/canvas/add-image-to-html5-canvas-using-javascript.htm
  let img = new Image();
  img.src = '/images/basicmap.jpg';
  
  img.onload = function () { // wait until the image is loaded
      fill_canvas(img);       // fill canvas with the image
  }

  function fill_canvas(img) {
      // create canvas context.
      let canvas = document.getElementById('oldmap-canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0); // draw the image to the canvas.
  }


  // as soon as I use another file i get an error in the browser. To solve I set up a local testing server: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server
  // to run this page in local server right-click HTML and select Launch in Browser (intro to extension in VSCode: https://marketplace.visualstudio.com/items?itemName=yuichinukiyama.vscode-preview-server&ssr=false#overview)

  // function to add annotation regions based on coordinates in map-annotation-gonfaloni.json
  function mapAnnotations(planNr, jsonFilePath) {
    $('input[id="' + planNr + '"]').click(function () {
      // if the checkbox is checked: 
      if ($(this).prop("checked") == true) {
        // get data for icon position from JSON
        //$.getJSON(jsonFilePath, function (data) {};
        var canvas = document.getElementById("oldmap-canvas");
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(30, 30, 150, 75);


        ctx.font = "30px Arial";
        //ctx.drawImage(img, 50, 50);
        ctx.fillText("Hello World",20,90);
    

      // when the checkbox is unchecked again:  
      } else if ($(this).prop("checked") == false) {
        $('.' + planNr + 'icon').remove();
      }
    });
  }
  
  mapAnnotations("plan2", "assets/map-annotation-gonfaloni.json")



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
            var container = document.querySelector('.container');
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


