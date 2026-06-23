let relatedTopics = {};

fetch("/sketch-intelligence/data/related-topics.json")

.then(response => response.json())

.then(data => {

    relatedTopics = data;

    renderConnectedConcepts();

});


function prettify(text){

    return text
            .replaceAll("-", " ")
            .replace(/\b\w/g,
                c => c.toUpperCase());

}


function renderConnectedConcepts() {

    let slug = document.body.dataset.slug;

    let topics = relatedTopics[slug];

    if (!topics || topics.length === 0)
        return;

    let html = `

        <h2>
            Connected Concepts
        </h2>

        <div class="concept-cards">

    `;

    topics.forEach(topic => {

        html += `

            <a
                class="concept-card"
                href="/sketch-intelligence/topics/${topic}/">

                ${prettify(topic)}

            </a>

        `;

    });

    html += "</div>";

    document
        .getElementById("connected-concepts")
        .innerHTML = html;

}
