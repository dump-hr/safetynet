import AboutPage from '@pages/AboutPage';
import HomePage from '@pages/HomePage';
import LeaderboardPage from '@pages/LeaderboardPage';
import MaterialsPage from '@pages/MaterialsPage';
import MaterialPage from '@pages/MaterialsPage/MaterialPage';
import ErrorPage from '@pages/ErrorPage';
import ParentsPage from '@pages/ParentsPage';
import QuizPage from '@pages/QuizPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from 'react-router-dom';
import PrivacyPolicyPage from '@pages/PrivacyPolicyPage';

export enum Page {
  Home,
  Quiz,
  Settings,
  Materials,
  Parents,
  Leaderboard,
  About,
  PrivacyPolicy,
}

export const routes = {
  [Page.Home]: '/',
  [Page.Quiz]: '/igra',
  [Page.Settings]: '/postavke',
  [Page.Materials]: '/materijali-za-ucenje',
  [Page.Parents]: '/kutak-za-roditelje',
  [Page.Leaderboard]: '/ljestvica',
  [Page.About]: '/o-igri',
  [Page.PrivacyPolicy]: '/privacy',
};

const queryClient = new QueryClient();

const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorPage message={String(error)} />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
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
      <Route path={routes[Page.Leaderboard]} element={<LeaderboardPage />} />
      <Route path={routes[Page.About]} element={<AboutPage />} />
      <Route
        path={routes[Page.PrivacyPolicy]}
        element={<PrivacyPolicyPage />}
      />
      <Route path={routes[Page.Home]} element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
