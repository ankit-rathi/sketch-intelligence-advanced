import json
from pathlib import Path

OUTPUT_FILE = Path("data/embeddings.json")

embeddings = {}

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:

    json.dump(
        embeddings,
        f,
        indent=2
    )

print("embeddings.json generated.")
