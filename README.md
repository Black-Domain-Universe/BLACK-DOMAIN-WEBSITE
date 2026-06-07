# BLACK-DOMAIN-WEBSITE
A quiet, craft-driven platform for art, narrative worldbuilding, and disciplined making. Free from tracking and market speculation, this architecture houses a protected educational infrastructure for timeline literacy and artisan documentation under Law Protocols MM-11 and MM-14.
# Black Domain Universe – Station V01 (Web Canon Repo)

A quiet, high‑integrity web stack for the **Black Domain Universe**:

- Public‑facing pages only.
- No trading, no yield, no ads, no tracking.
- Hard bias & privacy constraints for all ages, genders, and races.

This repo is **not** a wallet or finance system.  
All wallet/contract code is explicitly embargoed and kept in cold storage outside this tree.

---

## 1. Purpose

This repository contains the **public website surfaces** and **governance canon** for Black Domain:

- `/` – Home  
  Intro to Black Domain, “what it is / is not”, no tracking pixels.

- `/projects` – Projects Router  
  Links only to Stewardship, Education (Learn), and Chronicles overview.

- `/learn` – Learn Surface  
  Adult‑facing explanation of the children’s program and internal teaching “tokens” with hard guardrails:
  - Tokens are learning tools only.
  - No real‑world monetary value.
  - No buying/selling/trading for money.

- `/stewardship` – Stewardship & Impact Ledger  
  Non‑financial participation paths (Seekers / Explorers / Stewards) with clear qualitative impact framing.

- `/stewardship/contact` – Quiet Contact Module  
  Minimal, low‑pressure email opt‑in for rare, relevant updates.

No page in this repo initiates or connects to financial transactions.

---

## 2. Canon Spine (Read Before Editing)

The behavior and content of this repo are defined by these Canon documents:

- `docs/BD_WEBSITE_CANON.md`  
  Core copy and structural rules for:
  - Home, Projects, Learn, Stewardship, Stewardship Contact.
  - “What Black Domain Is Not”.
  - Token guardrail language.
  - Participation tiers and Impact Ledger rows.

- `docs/MM11_ZERO_YIELD.md` (or equivalent)  
  Zero‑Yield / Isolation Shield law:
  - No speculative finance.
  - No APR, staking, ROI, swaps, liquidity pools, or “rapid yield” features.
  - No conversion of internal teaching tokens into real‑world money.

- `docs/MM14_BIAS_PRIVACY_COVENANT.md` (or equivalent)  
  Bias & Privacy Covenant:
  - All humans, of all ages, genders, and races, are equal subjects of protection.
  - No discrimination, profiling, or targeting based on protected attributes or their proxies.
  - No scraping of private domains (email, medical, legal, personal inboxes).
  - Sensitive data only appears here if explicitly pasted/provided by the user.

- `docs/AAOP_DAEMON_ONLINE.md`  
  Allowed Abilities & Operations for the **Online Daemon** (Copilot cloud agent):
  - Repo‑only operations.
  - No yield/trading features.
  - No analytics/tracking.
  - No doctrinal / Canon rewrites without EL JUDGE.

**Rule:**  
If repo changes conflict with any of the above, they must be halted and flagged as:

> `STATUS_NEEDS_EL_JUDGE – Canon conflict detected`

---

## 3. Code & Content Structure (High‑Level)

(Adjust names/paths to your actual tree.)

- `src/pages/`
  - `Home.tsx`           – Landing page, hero copy, “what BD is / is not”.
  - `Projects.tsx`       – Router to /stewardship, /learn, /chronicles.
  - `Learn.tsx`          – Education surface, token guardrail block.
  - `Stewardship.tsx`    – Stewardship & Impact Ledger layout.
  - `StewardshipContact.tsx` – Quiet contact form.

- `src/components/`
  - `FutureIntegrations.tsx`  
    Read‑only, design‑only tiles for:
    - BD Art & NFTs
    - Ecosystem Support (grants, ambassadors, marketing help)
    - L1/L2 presence indicators
    - BD Data Bubbles (oracle/coin info)
    These tiles have **no execution permissions**: no trading, no yield, no live hooks.

- `docs/`
  - `BD_WEBSITE_CANON.md`
  - `MM11_ZERO_YIELD.md`
  - `MM14_BIAS_PRIVACY_COVENANT.md`
  - `AAOP_DAEMON_ONLINE.md`
  - Other MM‑* governance docs as needed.

- `tests/`
  - Page/component tests for:
    - Presence of mandatory guardrail text (e.g. token value disclaimer).
    - Absence of banned phrases (e.g. APR, staking, ROI, “earnings”).
    - Correct routing between `/`, `/projects`, `/learn`, `/stewardship`.

There are **no** wallet contracts, ABIs, or address constants in this repo.

---

## 4. Running Locally

(Adjust commands to your actual toolchain.)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test
