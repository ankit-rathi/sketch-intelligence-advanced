import frontmatter
import json
from pathlib import Path

TOPICS_DIR = Path("_topics")
OUTPUT_FILE = Path("data/related-topics.json")

topics = {}

# Load all topics
for md_file in TOPICS_DIR.glob("*.md"):

    post = frontmatter.load(md_file)

    slug = md_file.stem

    tags = set(post.get("tags", []))

    topics[slug] = tags

# Build relationships based on shared tags
related = {}

for topic1, tags1 in topics.items():

    neighbours = []

    for topic2, tags2 in topics.items():

        if topic1 == topic2:
            continue

        if tags1.intersection(tags2):

            neighbours.append(topic2)

    related[topic1] = sorted(neighbours)

OUTPUT_FILE.parent.mkdir(exist_ok=True)

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        related,
        f,
        indent=2
    )

print("related-topics.json generated successfully.")
