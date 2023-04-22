// This file contains all code for the map.html subpage.
const oldmap = document.getElementById("oldmap")

// insert image in html
oldmap.src = "images/basicmap.jpg"; //"<img src="images/basicmap.jpg" alt="Italian Trulli"></img>";

// handle checkboxes: https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/
const plan6 = document.querySelector('#plan6');
console.log(plan6.checked);

//function oldmap() {
//    document.getElementById("oldmap").innerHTML = "Hello JavaScript function";
//  }

// Code for the Leaflat map of modern Florence. Reference: Agafonkin, Volodymyr. „Quick Start Guide - Leaflet - a JavaScript library for interactive maps“. Zugegriffen 22. April 2023. https://leafletjs.com/examples/quick-start/.
var modernmap = L.map('modernmap').setView([43.7703,11.2574], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(modernmap);


