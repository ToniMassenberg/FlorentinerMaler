// This file contains only the JavaScript that is used on multiple pages.
// For the JavaScript powering the visualizations, see map.js and network/network.js.

// Function to toggle the dropdown accordion with the explanation. Edited version of a function from W3schools, "W3.CSS Accordions", https://www.w3schools.com/w3css/w3css_accordions.asp.
function accordion(id) {
    let x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}