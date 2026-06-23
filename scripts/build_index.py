import frontmatter
import json
from pathlib import Path

TOPICS_DIR = Path("_topics")
OUTPUT_FILE = Path("data/search-index.json")

articles = []

for md_file in TOPICS_DIR.glob("*.md"):

    post = frontmatter.load(md_file)

    articles.append({
        "title": post.get("title", ""),
        "category": post.get("category", ""),
        "tags": post.get("tags", []),
        "summary": post.get("summary", ""),
        "date": str(post.get("date", "")),
        "url":f"/sketch-intelligence/topics/{md_file.stem}/"
    })

# Sort latest first
articles.sort(
    key=lambda article: article["date"],
    reverse=True
)

OUTPUT_FILE.parent.mkdir(exist_ok=True)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(
        articles,
        f,
        indent=2,
        ensure_ascii=False
    )

print("search-index.json generated successfully.")
