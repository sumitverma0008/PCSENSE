# Shared Resources

Shared data and logs accessed by both frontend and backend.

## Structure
```
shared/
├── data/
│   └── components.json - Master component database (15k+ lines)
└── logs/
    ├── price-updates.log - JSON price change log
    └── price-summary.txt - Human-readable summary
```

## components.json Structure
Contains 800+ components across 8 categories:
- laptops
- cpus
- gpus
- mobos (motherboards)
- ram
- storage
- psu
- case

Each item includes:
- id, name, price, specs, brand
- shopLinks (6 Indian retailers: Amazon, Flipkart, Reliance Digital, Croma, Vijay Sales, MD Computers)
