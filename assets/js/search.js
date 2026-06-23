let articles = [];

// Load search index

fetch("data/search-index.json")

    .then(response => response.json())

    .then(data => {

        articles = data;

        renderResults(data);

    });

// Search

function searchArticles(query) {

    query = query.toLowerCase().trim();

    if (!query) {
        return articles;
    }

    return articles.filter(article =>

        article.title.toLowerCase().includes(query)

        ||

        article.summary.toLowerCase().includes(query)

        ||

        article.tags.some(tag =>
            tag.toLowerCase().includes(query)
        )

    );

}

// Render Results

function renderResults(results) {

    const resultsContainer =
        document.getElementById("results");

    const resultCount =
        document.getElementById("resultCount");

    resultCount.innerHTML =
        `${results.length} sketch${results.length !== 1 ? "es" : ""}`;

    if (results.length === 0) {

        resultsContainer.innerHTML =

            `
            <div class="empty-state">

                <h3>No Results Found</h3>

                <p>
                    Try searching with another keyword.
                </p>

            </div>
            `;

        return;
    }

    resultsContainer.innerHTML =

        results.map(article =>

            `
            <div class="card">

                <h3>
                    <a href="${article.url}">
                        ${article.title}
                    </a>
                </h3>

                <p>
                    ${article.summary}
                </p>

                <div class="tags">

                    ${article.tags
                        .map(tag =>
                            `<span class="tag">${tag}</span>`
                        )
                        .join("")}

                </div>

            </div>
            `

        ).join("");

}

// Search Input

const searchBox =
    document.getElementById("searchBox");

searchBox.addEventListener("input", () => {

    const results =
        searchArticles(searchBox.value);

    renderResults(results);

});
