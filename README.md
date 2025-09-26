# Personal Blog Frontend

Modern personal blog built with React 18, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** components (planned)
- **React Router DOM** for routing
- **Redux Toolkit** for state management
- **Axios** for API calls
- **React Bits** for animations (planned)

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Footer component
│   └── AnimatedHeader.tsx # Animated title component
├── pages/              # Page components
│   └── HomePage.tsx    # Home page
├── services/           # API services
│   └── api.ts         # Axios instance
├── store/             # Redux store
│   ├── index.ts       # Store configuration
│   ├── authSlice.ts   # Authentication state
│   ├── postsSlice.ts  # Posts state
│   ├── categoriesSlice.ts # Categories state
│   └── tagsSlice.ts   # Tags state
└── styles/            # Global styles
```

## 🎨 Features

- **Modern UI**: Glassmorphism effects, gradients, and pastel colors
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching (planned)
- **Smooth Animations**: Custom CSS animations
- **Redux State Management**: Centralized state
- **Type Safety**: Full TypeScript support

## 🛠️ Development

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

## 📝 Sprint 1 Completed Tasks

- [x] T001 - Project initialization with Vite + React + TypeScript
- [x] T002 - Core dependencies installation
- [x] T003 - Tailwind CSS and styling setup
- [x] T004 - Redux store configuration
- [x] T005 - Axios API service setup
- [x] T006 - Header and Footer layout components
- [x] T007 - AnimatedHeader component with custom animations

## 🔄 Next Sprint

Sprint 2 will focus on:
- Public pages (Categories, Tags, About)
- Post detail page
- Search functionality
- Enhanced animations

## 🌐 Environment Variables

Create a `.env` file for environment variables:

```
VITE_API_URL=http://localhost:8080/api
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

Made with ❤️ and React
