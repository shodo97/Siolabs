# SioLabs - AI/ML Learning Platform

SioLabs is a production-grade learning platform for Indian students and early-career professionals to master AI and Machine Learning through structured courses, hands-on projects, and expert mentorship.

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 20.0.0
- **PostgreSQL** >= 16
- **Redis** (optional, for caching)
- **npm** >= 10.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/siolabs.git
   cd siolabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env with your configuration
   # Required: DATABASE_URL, JWT_SECRET
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # Seed with sample data (optional)
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   npm run dev:web   # Frontend on http://localhost:3000
   npm run dev:api   # Backend on http://localhost:3001
   ```

### Test Account

After seeding, use these credentials:
- **Email:** student@siolabs.com
- **Password:** Password123!

## 📁 Project Structure

```
siolabs/
├── apps/
│   ├── web/                 # Next.js 14 frontend
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # React components
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── lib/         # Utilities & API client
│   │   │   ├── providers/   # Context providers
│   │   │   ├── stores/      # Zustand stores
│   │   │   └── types/       # TypeScript types
│   │   └── ...
│   │
│   └── api/                 # Express.js backend
│       ├── src/
│       │   ├── config/      # Configuration
│       │   ├── controllers/ # Request handlers
│       │   ├── middleware/  # Express middleware
│       │   ├── routes/      # API routes
│       │   ├── services/    # Business logic
│       │   ├── utils/       # Utilities
│       │   └── validators/  # Zod schemas
│       └── prisma/          # Database schema
│
├── Docs/                    # Project documentation
│   ├── Implementation.md    # Task breakdown
│   ├── project_structure.md # Architecture guide
│   └── UI_UX_doc.md         # Design specifications
│
└── PRDs/                    # Product requirements
    └── Epic5PRD.md          # Learning Experience PRD
```

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Query** - Server state management
- **Zustand** - Client state management

### Backend
- **Node.js 20** - Runtime
- **Express.js** - API framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Redis** - Caching (optional)
- **JWT** - Authentication

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Learning
- `GET /api/dashboard` - Dashboard data
- `GET /api/courses` - Enrolled courses
- `GET /api/courses/:id` - Course details
- `GET /api/modules/:id` - Module details
- `GET /api/lessons/:id` - Lesson details
- `POST /api/lessons/:id/complete` - Mark lesson complete
- `PUT /api/lessons/:id/video-progress` - Update video position

### Progress & Sessions
- `GET /api/progress` - User progress
- `GET /api/progress/courses/:courseId` - Course progress
- `GET /api/sessions` - Upcoming live sessions
- `GET /api/sessions/:id` - Session details

## 🧪 Development Commands

```bash
# Development
npm run dev              # Start all services
npm run dev:web          # Start frontend only
npm run dev:api          # Start backend only

# Building
npm run build            # Build all
npm run build:web        # Build frontend
npm run build:api        # Build backend

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Quality
npm run lint             # Lint all packages
npm run type-check       # Type check all packages
```

## 📖 Documentation

- [Implementation Plan](/Docs/Implementation.md) - Development roadmap and tasks
- [Project Structure](/Docs/project_structure.md) - Architecture and conventions
- [UI/UX Guidelines](/Docs/UI_UX_doc.md) - Design specifications

## 🎯 MVP Features (EPIC-05)

- ✅ Learning dashboard
- ✅ Course → module → lesson navigation
- ✅ Video lesson consumption
- ✅ Progress tracking
- ✅ Resume learning functionality
- ✅ Assignment entry points
- ✅ Live session visibility

## 📝 License

Private - All rights reserved.
