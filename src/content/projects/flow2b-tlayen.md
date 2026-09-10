---
name: "Flow2b / Tlayen"
tagline: "Rescued and migrated the most complex system I've worked on (ERP with a per-project DSL)."
company: "Flow2b / Tlayen"
years: "TBD"
type: "consulting"
role: "Developer + lead."
roleGroup: "Lead/Architect"
industries: ["Enterprise/ERP"]
technologies: ["Scala", "Akka", "OrientDB"]
tags: ["rescue", "migration", "data-migration", "live-system", "ops", "lead"]
themes: ["Legacy restoration & rescue", "Migration"]
featured: true
metrics: "customer restoration <48h (first) / <1 week (rest); migration ~1 customer/week over a few months."
links: []
---

ERP-like platform with a per-project DSL for building internal apps, which made debugging very hard. flow2b was the original platform; tlayen the newer one. Rescued customers on a live system (first back within 48h, the rest within a week), then led the flow2b→tlayen migration one customer per week over a few months to guarantee nothing broke. Included an OrientDB 2→3 migration where the built-in tool couldn't be used (per-customer requirement): freeze the customer's project in flow2b, export the DB, import into tlayen, test, hand back. Given the data volume, worked out critical DB details, used memory-efficient dump/restore, and built a rollback mechanism, all on a live system. Also ran the server (monolith) and the VPN servers customers connected through.
