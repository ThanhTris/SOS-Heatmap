# SOS Heatmap Project

## Overview
The SOS Heatmap project is a web application designed to visualize data on a map using heatmap overlays. It features a sidebar for navigation and controls, allowing users to interact with the map and customize their view.

## Project Structure
```
sos-heatmap
├── src
│   ├── app
│   │   ├── (user)
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components
│   │   ├── Sidebar.tsx
│   │   ├── SidebarItem.tsx
│   │   ├── Map.tsx
│   │   └── HeatmapControls.tsx
│   ├── hooks
│   │   └── useMap.ts
│   └── types
│       └── index.ts
├── public
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Installation
To set up the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd sos-heatmap
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To run the application in development mode, use the following command:
```
npm run dev
```
This will start the Next.js development server, and you can view the application in your browser at `http://localhost:3000`.

## Components
- **Sidebar**: A component that provides navigation links and options for the user.
- **Map**: Displays the map with heatmap overlays based on the data provided.
- **HeatmapControls**: Allows users to interact with the heatmap, adjusting settings and layers.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.