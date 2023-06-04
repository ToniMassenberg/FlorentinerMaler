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
// It was then adapted from Observable to vanilla JavaScript and heavily edited using ChatGPT.
// I edited it to work with my specific data, filter types, add colors, etc.

// Code for the force-directed graph
function ForceGraph() {
    const width = 800;
    const height = 1000;

    // Add the SVG container for the network graph
    const svg = d3.select("#graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Define the arrowhead marker
    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "-5 -5 10 10") // One view box for every node
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M -5,-5 L 0,0 L -5,5")
        .attr("class", "arrowhead");

    d3.csv("assets/data/painters-family.csv").then(function (connections) {
        d3.csv("assets/data/painters.csv").then(function (labels) {
            const nodes = Array.from(new Set(connections.flatMap(d => [d.source, d.target]))).map(id => {
                const label = labels.find(p => p.id === id)?.label || "";
                return { id, label };
            });

            const links = [];

            connections.forEach((d) => {
                const sourceNode = nodes.find((node) => node.id === d.source);
                const targetNode = nodes.find((node) => node.id === d.target);

                // Create a link object for each connection
                links.push({
                    source: sourceNode,
                    target: targetNode,
                    type: d.type,
                    lineType: d.lineType
                });
            });

            const linkForce = d3.forceLink(links)
                .id((d) => d.id)
                .distance(50); // Adjust the length of the links


            const simulation = d3.forceSimulation(nodes)
                .force("link", linkForce)
                .force("charge", d3.forceManyBody().strength(-10)) // Force with which other nodes are repelled
                .force("center", d3.forceCenter(width / 2, height / 2));

            const link = svg.selectAll(".link")
                .data(links)
                .enter()
                .append("line")
                .attr("class", "link")
                .attr("stroke", (d) => getLineColor(d.lineType))
                .attr("stroke-opacity", 0.6)
                .attr("stroke-width", 1.5)
                .attr("marker-end", "url(#arrowhead)");

            const node = svg.selectAll(".node")
                .data(nodes)
                .enter()
                .append("circle")
                .attr("class", "node")
                .attr("r", 5) // Node size
                .attr("fill", (d) => getNodeColor(d.type))
                .call(drag(simulation));

            node.append("title") // Title will be displayed on hover
                .text((d) => d.label);

            // Define what happens when a node is dragged: x/y position changes
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

            function getNodeColor(type) {
                // Define colors based on type / job
                if (type === "tafelmaler") {
                    return "red";
                } else if (type === "moebelmaler") {
                    return "blue";
                } else if (type === "waffenmaler") {
                    return "blue";
                } else if (type === "moebelmaler") {
                    return "blue";
                } else if (type === "glasmaler") {
                    return "blue";
                } else if (type === "miniaturist") {
                    return "blue";
                } else if (type === "naibi") {
                    return "blue";
                } else if (type === "ceri") {
                    return "blue";
                } else if (type === "stoffmaler") {
                    return "blue";
                } else if (type === "gips") {
                    return "blue";
                } else if (type === "steinmetz") {
                    return "blue";
                } else if (type === "hobby") {
                    return "blue";
                } else if (type === "anstreicher") {
                    return "blue";
                } else {
                    return "green";
                }
            }

            function getLineColor(lineType) {
                // Define colors based on lineType / relationship
                if (lineType === "fatherOf") {
                    return "red";
                } else if (lineType === "brotherOf") {
                    return "blue";

                } else if (lineType === "uncleOf") {
                    return "green";
                } else {
                    return "yellow";
                }
            }
        }).catch(function (error) {
            console.log("Error loading painters data:", error);
        });
    }).catch(function (error) {
        console.log("Error loading connections data:", error);
    });
}

ForceGraph();
