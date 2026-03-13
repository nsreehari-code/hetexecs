# hetexecs — HET Skilling Portfolio (CEO Map)

A static HTML+JS+JSON site that serves as the CEO's navigable mental map of the Heartfulness Skill Institute skilling system.

## What this is

- **Portfolio view** — all course families at a glance
- **Course view** — blueprint versions for one course
- **Version view** — evidence spine + batches for one version
- **Batch view** — execution details, cohort, funding mix

## What this is NOT

- Not a task board or project tracker
- Not a workflow engine
- Not a replacement for the LMS

## Structure

```
hetexecs/
├── index.html              # Portfolio (CEO view)
├── views/
│   ├── course.html         # Course family + versions
│   ├── version.html        # Blueprint version details
│   └── batch.html          # Batch execution view
├── data/
│   ├── courses.json        # Course families
│   ├── versions.json       # Blueprint versions
│   ├── batches.json        # Batch instances
│   └── funding-adapters.json # Govt/CSR/Paid adapter definitions
├── js/
│   └── app.js              # Rendering + navigation
├── style.css               # Light, minimal CSS
└── records/                # Decision records (append-only)
```

## Viewing

Open `index.html` in a browser, or deploy via GitHub Pages.

## Data

All data lives in `data/*.json`. Edit the JSON files to add courses, versions, or batches. The HTML views render dynamically from these files.
