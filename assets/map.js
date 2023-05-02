// This file contains all code for the map.html subpage.

// jQuery wrapper to only load JavaScript when HTML is fully loaded
$(document).ready(() => {

  // insert image in html ("prepend" puts the entity first in the container)
  $('#oldmap-container').prepend($('<img>', { id: 'oldmap', src: 'images/basicmap.jpg' }))


  // as soon as I use another file i get an error in the browser. to solve: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server
  // to run this page in local server right-click HTML and select Launch in Browser (intro to extension: https://marketplace.visualstudio.com/items?itemName=yuichinukiyama.vscode-preview-server&ssr=false#overview)


  // checkbox with jQuery https://www.w3docs.com/snippets/javascript/how-to-test-if-a-checkbox-is-checked-with-jquery.html
  $('input[id="plan6"]').click(function () {
    // if plan6 is selected: 
    if ($(this).prop("checked") == true) {
      // get data for icon position from JSON
      $.getJSON("assets/examplejson.json", function (data) {
        var selectedPlan = "plan6";
        // Get the painters for the selected plan
        var painters = data[selectedPlan];
        // Iterate over each painter
        $.each(painters, function (painter, painterData) {
          // Access the painter's data
          var label = painterData.label;
          var iconTop = painterData.iconTop;
          var iconLeft = painterData.iconLeft;
          console.log(painter, label, iconTop, iconLeft)

          // create icon based on data
          var container = document.querySelector('.container');
          // create the icon element
          var icon = document.createElement('i');
          icon.classList.add('fa', 'fa-circle', 'plan6icon');
          //icon.className = 'icon';
          icon.style.position = 'absolute';
          icon.style.width = '10px';
          icon.style.height = '10px';
          // append the icon element to the container element
          container.appendChild(icon);
          // place position as percentage
          icon.style.top = iconTop + '%';
          icon.style.left = iconLeft + '%';
          console.log(icon)
        
        });
      });

      // when the checkbox is unchecked again:  
    } else if ($(this).prop("checked") == false) {
      $('.plan6icon').remove();
    }
  });



  $('#plan7').on('click', () => {
    console.log("hello");
  });






  // Code for the Leaflat map of modern Florence. Reference: Agafonkin, Volodymyr. „Quick Start Guide - Leaflet - a JavaScript library for interactive maps“. Zugegriffen 22. April 2023. https://leafletjs.com/examples/quick-start/.
  var modernmap = L.map('modernmap').setView([43.7703, 11.2574], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(modernmap);



})