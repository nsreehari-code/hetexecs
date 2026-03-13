# How to Use This Repo

## The Thumbrule

> **hetexecs = "Should we?"**
> **hetops = "How do we?"**

If you're **deciding**, it's hetexecs. If you're **doing**, it's hetops.

| | **hetexecs** (this repo) | **hetops** |
|---|---|---|
| One question | "Is this the right thing to build?" | "Is this batch running correctly?" |
| Actor | CEO, alone or with one advisor | Program Manager + team |
| Cadence | Changes monthly | Changes weekly per batch |
| Content feels like | Hypotheses, reasoning, trade-offs, portfolio views | Checklists, artifacts, evidence, schedules |
| Failure mode | Built the wrong course | Ran the batch badly |

### Anecdotes to Ground This

**Example 1 — "Should we do mushroom cultivation?"**
That's hetexecs. You're evaluating the idea — who's the learner, what changes in their life, what NSQF level, does it fit our portfolio? You write a CCF Section A–C and pin it to the portfolio. If the reasoning doesn't hold, you kill the idea here. No batch was harmed.

**Example 2 — "The WMDG batch in Pune has 40% drop-off at Week 3"**
That's hetops. The course was already decided. Now you're asking: is the delivery working? Is the trainer effective? Are checklists being followed? You look at the batch runbook, QA checkpoint at Week 2, and figure out what broke.

**Example 3 — "Should we target NSQF Level 3 or Level 4?"**
That's hetexecs. It's a scoping decision about the *product*. Not about any specific batch or learner. You're qualifying the idea, not qualifying a person.

**Example 4 — "Does this learner have valid Aadhaar and bank linkage?"**
That's hetops. You're qualifying a *person* for enrollment, not the course idea.

**Example 5 — "What's in the Week 5 session plan?"**
That's hetops — curriculum content is manufacturing. hetexecs only holds the *spec*: "this course teaches WhatsApp commerce + pricing at L4." How that translates into weekly sessions is execution.

**Example 6 — "Our CSR partner wants to fund 200 women in Vidarbha"**
Both. The *decision* to accept this and how it fits the portfolio (funding strategy, which course family, which version) happens in hetexecs. The *operational checklist* for running a CSR-funded batch (MOU, reporting cadence, safeguarding) is in hetops.

---

## What This Repo Is — And What It Isn't

### This repo is a **Playbook**, not a **Dashboard**

Think of hetexecs as the **organization's field manual for strategic thinking** — not a real-time status board.

| What it IS | What it is NOT |
|------------|----------------|
| The reasoning behind why we chose NSQF L3 first | Today's batch enrollment count |
| The funding adapter logic (what changes across Govt/CSR/Paid) | Which batches are currently running |
| The CEO's pinboard — ideas, hypotheses, learnings | Live attendance data |
| Decision records — what we decided and why | Task lists or to-dos |
| The product spec for each course family | Session slides or trainer kits |

### For a real organization, this repo answers:

**For the CEO:**
- "What courses do we offer and why?"
- "How do I think about a new course idea?"
- "What's our operating doctrine?"
- "What strategic decisions have we made and what was the reasoning?"

**For a new Board Member or Advisor:**
- "What is this organization's skilling philosophy?"
- "How does the portfolio fit together?"
- "What's the entity model?"

**For a Proposal Writer:**
- "What's our positioning?"
- "What language works with government vs CSR?"
- "What funding adapters exist?"

**It does NOT answer:**
- "How many learners are enrolled right now?" → That's **hetlms** (the live system)
- "What's the Week 3 lesson plan?" → That's **hetops** (execution templates)
- "What does our public website say?" → That's **hetweb**

---

## The Four Repos — How They Relate

```
┌─────────────────────────────────────────────────────────────┐
│                    THE SKILLING SYSTEM                       │
│                                                             │
│   hetexecs          hetops          hetlms         hetweb   │
│   ─────────         ──────          ──────         ──────   │
│   PLAYBOOK:         PLAYBOOK:       LIVE SYSTEM:   SHOPFRONT│
│   Strategy          Execution       Data + App     Marketing│
│                                                             │
│   "Should we?"      "How do we?"    "What's        "What    │
│                                     happening?"    does the │
│                                                    world    │
│                                                    see?"    │
├─────────────────────────────────────────────────────────────┤
│   Changes:          Changes:        Changes:       Changes: │
│   Monthly           Weekly          Daily/hourly   Quarterly│
│                                                             │
│   Actors:           Actors:         Actors:        Actors:  │
│   CEO, advisor      PM, trainer,    Developers,    CEO,     │
│                     doc officer     learners       designer │
│                                                             │
│   Content:          Content:        Content:       Content: │
│   Reasoning,        Checklists,     Attendance,    Courses, │
│   hypotheses,       templates,      enrollment,    outcomes, │
│   portfolio,        runbooks,       evidence,      stories, │
│   decisions         evidence spines assessments    branding │
└─────────────────────────────────────────────────────────────┘
```

### How information flows between them

- **hetexecs → hetops:** "We're launching WMDG-v2 as a 6-week intensive. Here's the product spec (CCF A–C). Go build the execution plan."
- **hetops → hetexecs:** "After running 3 batches of WMDG-v1, we learned the 8-week format has 40% drop-off after Week 5. Consider a shorter version." (This goes into hetexecs pinboard → Experiments lane)
- **hetops → hetlms:** "Here's the evidence spine definition. Build the forms and tracking for it."
- **hetlms → hetops:** "Batch #47 has 3 learners with incomplete Aadhaar linkage." (Live operational data)
- **hetexecs → hetweb:** "We have 3 course families. Here's what the public should see — outcomes, positioning, testimonials."
- **hetlms → hetweb:** "Latest success metrics for the website — 240 women trained, 78% income increase."

### The simplest way to remember

| Repo | Analogy | Permanence |
|------|---------|-----------|
| **hetexecs** | The **constitution** — principles, product definitions, strategic decisions | Endures across batches |
| **hetops** | The **field manual** — SOPs, checklists, templates | Reused every batch |
| **hetlms** | The **factory floor** — live machines, real-time data, actual production | Changes constantly |
| **hetweb** | The **showroom** — what customers see | Updated periodically |
