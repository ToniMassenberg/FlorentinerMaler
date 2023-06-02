// This file contains all code for the map.html subpage.

// Function to toggle the dropdown akkordeon with the explanation. Edited version of a function from https://www.w3schools.com/w3css/w3css_accordions.asp.
function akkordeon(id) {
    let x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }
