import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
// import SplashCursor from './components/SplashCursor';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import AboutPage from './pages/AboutPage';
import SearchResultPage from './pages/SearchResultPage';
import CategoriesPage from './pages/CategoriesPage';
import TagsPage from './pages/TagsPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ScrollToTop />
      {/* <SplashCursor
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        DENSITY_DISSIPATION={5}
        VELOCITY_DISSIPATION={2}
        COLOR_UPDATE_SPEED={12}
        CURL={5}
      /> */}
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/tags" element={<TagsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
