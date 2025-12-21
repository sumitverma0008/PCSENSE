# PCSensei Frontend

HTML/JavaScript frontend for PC & Laptop recommendations.

## Files
- **index.html** - Landing page
- **main.html** - User-facing recommendation wizard
- **admin.html** - Admin panel for component/price management
- **price-dashboard.html** - Price update history visualization

## Tech Stack
- Vanilla JavaScript (ES6+)
- Tailwind CSS
- Glass-morphism design
- No build step required

## Running Locally
```bash
# From project root
cd frontend
python -m http.server 8000
# Visit: http://localhost:8000
```

## Data Access
Frontend fetches data from `../shared/data/components.json`
