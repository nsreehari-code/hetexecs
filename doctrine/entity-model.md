# Entity Model — The Skilling OS

```
Portfolio
  └─ Course Family (product)
       └─ Blueprint Version (variant: duration, rhythm, evidence spine)
            └─ Batch (run instance)
                 ├─ Cohort (people + context snapshot)
                 └─ Funding Allocations (many-to-many: Govt/CSR/Paid/mixed)
```

## Definitions

### Course Family
Stays stable. It's a product line.
- Example: "Women's Micro-Entrepreneurship & Digital Growth"
- Doesn't change when you adjust duration or add a module

### Blueprint Version
A variant of the course family. When duration, rhythm, or evidence spine changes **materially**, it's a new version — not a batch tweak.
- Example: WMDG-v1 (8 weeks, 3x/week), WMDG-v2 (6 weeks intensive)
- Multiple versions can run in parallel
- Each version defines its own evidence spine

### Batch
A run instance. One cohort, one timeline, one or more funding sources.
- Contains a specific set of learners (cohort)
- Has a defined start/end
- May mix funding (60% Govt + 30% CSR + 10% co-pay)

### Cohort
People + context snapshot. The learner group enrolled in a specific batch.
- Baseline captured at enrollment
- Demographics, prior skills, income baseline

### Funding Allocations
Many-to-many with batches. A batch can have mixed funding.
- The OS is funding-agnostic
- Adapters modify proof burden, not structure
- Funding is a batch property, not a course property

## Key Design Principles
1. **Blueprint versions, not course rewrites** — shape change = new version
2. **Funding is many-to-many** — a batch can blend Govt + CSR + Paid
3. **Course Family stays stable** — the product identity doesn't change with variants
