fetch("/data/graph.json")
    .then(response => response.json())
    .then(graph => {

        console.log(graph);

        // Later:
        // Render with Cytoscape.js

    });
