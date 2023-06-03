// This file contains all code for the network.html subpage.

// Function to toggle the dropdown akkordion with the explanation. Edited version of a function from https://www.w3schools.com/w3css/w3css_accordions.asp.
function akkordion(id) {
    let x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }

// The following function ForceGraph is based on code by Bruno Laranjeira from 2021 here: https://observablehq.com/@brunolaranjeira/d3-v6-force-directed-graph-with-directional-straight-arrow.
// It was then adapted from Observable to vanilla JavaScript using ChatGPT.
// I edited it to work with my data, filter types, add colors, etc.

// Code for the force-directed graph
function ForceGraph() {
    const width = 800;
    const height = 600;

    const svg = d3.select("#graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.csv("assets/data.csv").then(function (data) {
        const nodes = data.map((d) => ({ id: d.id, type: d.type }));
        const links = data.map((d) => ({ source: d.source, target: d.target }));

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d) => d.id))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const link = svg.selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 1.5);

        const node = svg.selectAll(".node")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .attr("fill", (d) => getColor(d.type))
            .call(drag(simulation));

        node.append("title")
            .text((d) => d.id);

        simulation.on("tick", () => {
            link.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);
        });

        function drag(simulation) {
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        function getColor(type) {
            // Define colors based on type
            if (type === "TypeA") {
                return "red";
            } else if (type === "TypeB") {
                return "blue";
            } else {
                return "green";
            }
        }
    }).catch(function (error) {
        console.log("Error loading data:", error);
    });
}

ForceGraph();


