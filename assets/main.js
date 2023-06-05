// This file contains only the JavaScript that is used on multiple pages.
// For the JavaScript powering the visualizations, see map.js and network.js.

// Function to toggle the dropdown akkordion with the explanation. Edited version of a function from https://www.w3schools.com/w3css/w3css_accordions.asp.
function akkordion(id) {
    let x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}