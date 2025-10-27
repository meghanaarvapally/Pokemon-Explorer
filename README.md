# Pokémon Explorer

A sleek and interactive **Pokédex web app** built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** that allows users to explore and search Pokémon from the [PokéAPI](https://pokeapi.co/).

## Features

- **Live Search** — instantly filter Pokémon by name
- **Type-based Colors** — Pokémon types (Fire, Water, Grass, etc.) have unique colors
- **Detailed View** — click any Pokémon to view:
  - Image and ID
  - Height, Weight, Abilities
  - Base Stats (with progress bars)
  - Evolution Chain
- **Responsive Design** — works seamlessly on desktop and mobile
- **Animated UI** — subtle hover and scaling animations for smooth interactions

---

## Tech Stack

| Technology       | Purpose                                               |
| ---------------- | ----------------------------------------------------- |
| **Next.js**      | React framework for server-side rendering and routing |
| **TypeScript**   | Type safety and better developer experience           |
| **Tailwind CSS** | Styling with utility classes                          |
| **PokéAPI**      | Source of Pokémon data                                |
| **Vercel**       | (Optional) Deployment platform                        |

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/pokemon-explorer.git
   cd pokemon-explorer
   Install dependencies
   ```

bash
Copy code
npm install
Run the development server

bash
Copy code
npm run dev
Open your browser and visit
http://localhost:3000

Folder Structure
bash
Copy code
pokemon-explorer/
│
├── app/
│ ├── page.tsx # Main Pokémon grid and search page
│ ├── [id]/page.tsx # Detailed Pokémon info page
│ └── globals.css # Tailwind base styles
│
├── public/
│ └── pokeball1.png # Pokéball icon used in header
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md

## Deployment

Deploy easily using Vercel:

Push your project to GitHub

Visit vercel.com → “Add New Project”

Import your repo → Deploy 🚀

You’ll get a live link like

arduino
Copy code
https://pokemon-explorer-yourname.vercel.app
📸 Preview
(You can add screenshots here later!)

💡 Future Enhancements
🧠 Add Pokémon comparisons

🌐 Add infinite scroll or pagination

🎵 Add sound or animations when Pokémon appear

🧑‍💻 Author
Your Name
💼 GitHub: meghanaarvapally

🏁 License
This project is for educational purposes and uses data provided by PokéAPI.
