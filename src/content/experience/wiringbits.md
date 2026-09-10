---
company: "Wiringbits"
title: "Founder & Principal Consultant"
type: "consulting"
period: "2019 – present"
start: "2019-01"
umbrella: true
environment: ["Scala", "Kotlin", "Java", "Rust", "TypeScript", "Scala.js", "Play Framework", "Akka", "Spring Boot", "JPA", "Jersey", "React", "Next.js", "Angular", "Node.js", "Express", "Postgres", "MySQL", "MongoDB", "OrientDB", "Redis", "Elasticsearch", "AWS", "GCP", "Pulumi", "Terraform", "Ansible", "nginx", "Bitcoin", "Ethereum", "Solana", "Solidity", "Arbitrum", "Stripe", "Twilio", "Onfido", "HashiCorp Vault", "Cryptography"]
---

My independent consultancy since 2019. Some periods have been dedicated to Wiringbits and my own products full-time; many client engagements ran in parallel with the roles below. I led teams of up to 12 engineers and acted as technical advisor to 8+ clients ([testimonials](https://wiringbits.net/testimonials)).

20+ clients across fintech, crypto, security, data, edtech, marketplaces and more. Roughly a third were rescues of systems that were broken, abandoned or unmaintainable, a third were built from zero, and the rest were migrations off legacy stacks or expensive providers.

#### Crypto and DeFi

- Original author and lead of the [real-time DEX order book](https://github.com/AlexITC/stakenet-orderbook) behind [Hydranet](https://hydranet.ai/), running on the Lightning Network.
- Original author and lead of a [Bitcoin block explorer](https://github.com/wiringbits/block-explorer) that stayed online 5+ years, and of an [Ethereum indexer](https://github.com/wiringbits/eth-indexer).
- Built a coin-swap app bridging a Bitcoin-like coin to an Ethereum token.
- Cut an NFT platform's operating cost from ~$70k to ~$3k per year by migrating it off a costly third-party API.

#### Fintech and payments

- Built a crypto exchange with a derived-balance ledger, idempotent withdrawals, and reconciliation against on-chain settlement.
- Led a buy-crypto-with-cash platform: ACH deposits, Onfido for KYC, and HashiCorp Vault for secrets.
- Built Stripe subscriptions and one-time payments for a creator course marketplace.

#### Security

Three engagements for a cybersecurity company:

- Built a Rust CLI that audits an AWS account for security violations and reports on them, in the spirit of prowler.
- Led a service running scheduled customer security scans on top of Qualys, taking the codebase from unrunnable to deployable along the way.
- Led an ingestion system that captured AWS console screenshots and ran OCR over them, so you could locate anything inside a customer account.

#### Data and pipelines

- Built most of the GCP Batch backend for [Cromwell](https://github.com/broadinstitute/cromwell/commits?author=AlexITC), the Broad Institute's open-source workflow engine.
- Led the fork of Snowplow's components into [OpenSnowcat](https://github.com/opensnowcat) after Snowplow's license change, a Scala event-data pipeline covering collection and enrichment.
- Led a crawler over a government land registry that analyzed documents and alerted customers when the ones they cared about changed.

#### Product and SaaS

- Contributed reliability fixes and the testing foundation to a student collaboration platform.
- Led a partial v2 migration of a creator course marketplace off its legacy platform.
- Led the frontend rebuild of an AI-assisted quiz portal for teachers.
- Led a rebuilt browser extension for veterinary staff that cut multi-minute tasks to seconds.
- Led development of a publish-and-sell-courses platform.
- Led a crop traceability platform: QR-tagged packages, analytics, and per-employee pay at the end of each workday.

#### Rescues and legacy systems

- Rescued and replatformed an ERP with a per-project DSL, the most complex system I've worked on. First customer running again within 48h on a live system, then customers moved one at a time, each with its own OrientDB 2→3 migration built by hand because the vendor tool couldn't be used, every one with a tested rollback path.
- Took over a downed production platform with almost no access or handover and had it back within 24h.
- Revived Kestrel, Twitter's open-source message queue from 2009, and got it building and running again in 2024 for a client.

#### Infrastructure

- Years of hands-on infrastructure: self-hosted SMTP (Postal with rspamd), VPNs (Algo, WireGuard/IPsec), nginx, and provisioning across AWS, GCP and DigitalOcean with Ansible, Terraform, Pulumi.

#### My own products

- Founded [codepreview.io](https://codepreview.io), providing preview environments for web applications, and led the team behind it.
- Founded cazadescuentos and led the team behind it: a web app, mobile apps, and a browser extension that scraped retailers to track discounts for shoppers. [Part of it is open source](https://github.com/AlexITC/cazadescuentos).
