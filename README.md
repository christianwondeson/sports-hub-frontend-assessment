# Sports Hub Frontend Assessment

Sports dashboard built with React, TypeScript, Vite, and Tailwind CSS. Features live match updates, detailed match views, and seamless mobile-to-desktop responsiveness.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sports-hub-frontend-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── fixtures/        # Match cards, filters, date selector
│   ├── layout/          # Navbar, layout wrapper
│   └── match/           # Match detail components
├── constants/           # API endpoints, routes, colors
├── context/            # Global state management
├── hooks/              # Custom React hooks
├── pages/              # Page components (Dashboard, MatchDetail)
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## 🎨 Features

### Dashboard
- Live match updates with 20-second polling
- Matches grouped by league
- Responsive design (360px - 1440px+)
- Live score animations
- Filter by All/Live/Favorites

### Match Details
- Comprehensive match information
- Event timeline with goals, cards, substitutions
- Head-to-head statistics
- Responsive layout

### Technical Highlights
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Custom Hooks**: Clean separation of logic
- **API Integration**: TheSportsDB API
- **Offline Support**: Graceful fallback with mock data

## 🔧 Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **TheSportsDB API** - Match data

## 📱 Responsive Breakpoints

- **Mobile**: 360px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🎯 Key Components

### Custom Hooks
- `useMatchDetails(id)` - Fetch match detail data
- `useMatches()` - Global match state with polling

### Main Components
- `Navbar` - Responsive navigation
- `Dashboard` - Match list view
- `MatchDetail` - Individual match view
- `MatchCard` - Match card with live updates
- `EventTimeline` - Match events display

## 🌐 API Integration

Uses TheSportsDB API for match data:
- Live matches
- Match details
- Team information
- Event timeline

Fallback to mock data when offline.

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Design System

### Colors
- Primary: `#6D00FF`
- Secondary: `#00FFA5`
- Danger: `#EE5E52`
- Background: `#0F1419`
- Surface: `#1D1E2B`

### Typography
- **Fonts**: Poppins, Inter
- **Sizes**: 10px, 12px, 14px, 16px, 18px, 20px
- **Weights**: 300, 400, 500, 600, 700

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173
```
