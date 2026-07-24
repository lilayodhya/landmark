# 🏘️ Landmark Estate Agents

A modern, full-stack real estate web application for Landmark Estate Agents. Browse properties, schedule visits, and manage real estate inquiries with an intuitive interface and robust backend.

**Live Site:** [landmarkestates.vercel.app](https://landmarkestates.vercel.app)

---

## 📋 Project Overview

Landmark is a comprehensive real estate solution consisting of:

- **Frontend:** React-based web application with TanStack Router and modern UI components
- **Backend:** Express.js API server for property management and inquiries
- **Database:** Supabase for data storage and management
- **Hosting:** Vercel (Frontend) and Render (Backend)

---

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- **Framework:** React 19 with TanStack Start
- **Router:** TanStack Router
- **State Management:** TanStack React Query
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI components with custom theming
- **Forms:** React Hook Form with Zod validation
- **Build Tool:** Vite
- **Language:** TypeScript (95.5% of codebase)

**Backend:**
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database Client:** Supabase JS SDK
- **Utilities:** dotenv, CORS
- **Language:** JavaScript

**Infrastructure:**
- **Database:** Supabase (PostgreSQL)
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render

---

## 📁 Project Structure

```
landmark/
├── frontend/                    # React frontend application
│   ├── src/                     # Source code
│   ├── components.json          # shadcn/ui component configuration
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.ts          # Vite build configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── bunfig.toml             # Bun package manager config
│   └── eslint.config.js        # Linting rules
│
├── backend/                     # Express backend API
│   ├── server.js               # Main server entry point
│   ├── config/                 # Configuration files
│   ├── controllers/            # Route controllers
│   ├── routes/                 # API route definitions
│   │   ├── propertyRoutes.js
│   │   ├── blogRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── popupRoutes.js
│   │   ├── sellRoutes.js
│   │   ├── enquiryRoutes.js
│   │   └── scheduledVisitRoutes.js
│   ├── package.json            # Backend dependencies
│   └── .env.example            # Environment variables template
│
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or Bun for frontend)
- npm or yarn package manager
- Git

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Create environment configuration:**
   ```bash
   cp .env.example .env
   # Configure with your API endpoint
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

6. **Start production server:**
   ```bash
   npm start
   ```

---

## 🔌 API Endpoints

### Properties
- `GET /properties` - Fetch all properties
- `GET /properties/:id` - Get property details

### Blog
- `GET /blog` - Fetch all blog posts
- `GET /blog/:id` - Get blog post details

### Contact
- `POST /contact-us` - Submit contact form

### Listings
- `GET /pop-up` - Fetch popup/featured listings
- `POST /sell` - Submit property for sale

### Inquiries
- `POST /enquiry` - Submit property inquiry
- `POST /scheduled-visits` - Schedule property visit

---

## 📦 Available Scripts

### Frontend

```bash
npm run dev           # Start development server with hot reload
npm run build         # Build for production
npm run build:dev     # Build in development mode
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

### Backend

```bash
npm start             # Start production server
npm run dev           # Start development server with nodemon
```

---

## 🎨 Key Features

- **Property Listings:** Browse and search available properties
- **Property Details:** Comprehensive information about each listing
- **Blog Section:** Real estate insights and market updates
- **Contact Forms:** Easy inquiry submission
- **Visit Scheduling:** Schedule property viewings
- **Responsive Design:** Mobile-friendly interface
- **Modern UI:** Clean and intuitive user experience with Radix UI components
- **Type Safety:** Full TypeScript support on frontend

---

## 🌐 Deployment

### Frontend (Vercel)

The frontend is automatically deployed to Vercel when changes are pushed to the main branch.

```bash
npm run build
# Deploy to Vercel
vercel
```

### Backend (Render)

Deploy backend to Render by connecting your GitHub repository:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy from the `backend/` directory

---

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-public-key>
```

### Frontend (.env)

```env
VITE_API_URL=<your-backend-api-url>
```

---

## 🛠️ Development Tools

- **ESLint:** Code quality and style checking
- **Prettier:** Code formatting
- **TypeScript:** Type safety and IDE support
- **Vite:** Fast build tool and dev server
- **Nodemon:** Auto-restart backend on file changes

---

## 📄 Code Quality

- TypeScript configuration for strict type checking
- ESLint rules for code consistency
- Prettier formatting rules
- Pre-commit hooks (configurable)

---

## 🔐 Security

- CORS enabled for safe cross-origin requests
- Environment variables for sensitive data
- Supabase for secure database access
- Input validation with Zod

---

## 🐛 Troubleshooting

**Frontend won't start:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`

**Backend API connection issues:**
- Verify Supabase credentials in `.env`
- Check CORS configuration
- Ensure backend is running on correct port

**Port already in use:**
- Frontend: Change port in `vite.config.ts`
- Backend: Set different PORT in `.env`

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TanStack Router](https://tanstack.com/router)
- [Express.js Guide](https://expressjs.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

---

## 📄 License

This project is proprietary software for Landmark Estate Agents.

---

## 👤 Author

[lilayodhya](https://github.com/lilayodhya)

---

**Last Updated:** July 2026