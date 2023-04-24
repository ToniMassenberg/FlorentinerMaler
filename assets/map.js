// This file contains all code for the map.html subpage.
const oldmap = document.getElementById("oldmap")

// insert image in html
oldmap.src = "images/basicmap.jpg"; //"<img src="images/basicmap.jpg" alt="Italian Trulli"></img>";

// handle checkboxes: https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/
const plan6 = document.querySelector('#plan6');
const plan7 = document.querySelector('#plan7');

if (plan6.checked){
        var container = document.querySelector('.container');

        // create the icon element
        var icon = document.createElement('i');
        icon.classList.add('fa', 'fa-circle');
        //icon.className = 'icon';
        icon.style.position = 'absolute';
        icon.style.width = '10px';
        icon.style.height = '10px';

        // append the icon element to the container element
        container.appendChild(icon);

        // calculate the percentage position of the icon
        var containerWidth = container.offsetWidth;
        var containerHeight = container.offsetHeight;
        var iconTop = 40;
        var iconLeft = 50;

        icon.style.top = iconTop + '%';
        icon.style.left = iconLeft + '%';
}

if (plan7.checked){
    console.log("hello");
}




// Code for the Leaflat map of modern Florence. Reference: Agafonkin, Volodymyr. „Quick Start Guide - Leaflet - a JavaScript library for interactive maps“. Zugegriffen 22. April 2023. https://leafletjs.com/examples/quick-start/.
var modernmap = L.map('modernmap').setView([43.7703,11.2574], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(modernmap);


