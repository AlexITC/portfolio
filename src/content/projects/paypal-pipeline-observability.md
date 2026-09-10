---
name: "PayPal — ingestion pipeline observability & silent-loss fix"
tagline: "Found a years-old bug silently dropping millions of records/day; added observability."
company: "PayPal (via Beyond)"
years: "2026"
type: "employment"
role: "IC."
roleGroup: "Engineer/IC"
industries: ["Fintech", "Data"]
technologies: ["Scala", "Apache Beam", "Airflow", "GCP", "DataDog"]
tags: ["reliability", "observability"]
themes: ["Reliability & observability"]
featured: false
metrics: ""
links: []
---

On a large Beam-on-Airflow ingestion pipeline, found and fixed connection-pool mismanagement that had silently dropped millions of records/day for years, then defined an observability approach for the full pipeline so silent failures surface on their own.
