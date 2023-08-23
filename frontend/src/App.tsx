import AboutPage from '@pages/AboutPage';
import HomePage from '@pages/HomePage';
import LeaderboardPage from '@pages/LeaderboardPage';
import MaterialsPage from '@pages/MaterialsPage';
import MaterialPage from '@pages/MaterialsPage/MaterialPage';
import NotFoundPage from '@pages/NotFoundPage';
import ParentsPage from '@pages/ParentsPage';
import QuizPage from '@pages/QuizPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export enum Page {
  Home,
  Quiz,
  Settings,
  Materials,
  Parents,
  Leaderboard,
  About,
}

export const routes = {
  [Page.Home]: '/',
  [Page.Quiz]: '/igra',
  [Page.Settings]: '/postavke',
  [Page.Materials]: '/materijali-za-ucenje',
  [Page.Parents]: '/kutak-za-roditelje',
  [Page.Leaderboard]: '/ljestvica',
  [Page.About]: '/o-igri',
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={routes[Page.Quiz]} element={<QuizPage />} />
          <Route path={routes[Page.Materials]} element={<MaterialsPage />} />
          <Route
            path={`${routes[Page.Materials]}/:id`}
            element={<MaterialsPage />}
          />
          <Route
            path={`${routes[Page.Materials]}/:id/:materialId`}
            element={<MaterialPage />}
          />
          <Route path={routes[Page.Parents]} element={<ParentsPage />} />
          <Route
            path={routes[Page.Leaderboard]}
            element={<LeaderboardPage />}
          />
          <Route path={routes[Page.About]} element={<AboutPage />} />
          <Route path={routes[Page.Home]} element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
