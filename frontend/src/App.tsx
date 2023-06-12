import HomePage from '@pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export enum Page {
  Home,
  Quiz,
  Settings,
  ReadingMaterials,
  Parents,
  Leaderboard,
  About,
}

export const routes = {
  [Page.Home]: '/',
  [Page.Quiz]: '/igra',
  [Page.Settings]: '/postavke',
  [Page.ReadingMaterials]: '/materijali-za-ucenje',
  [Page.Parents]: '/kutak-za-roditelje',
  [Page.Leaderboard]: '/ljestvica',
  [Page.About]: '/o-igri',
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes[Page.Quiz]} element={<></>} />
        <Route path={routes[Page.Settings]} element={<></>} />
        <Route path={routes[Page.ReadingMaterials]} element={<></>} />
        <Route path={routes[Page.Parents]} element={<></>} />
        <Route path={routes[Page.Leaderboard]} element={<></>} />
        <Route path={routes[Page.About]} element={<></>} />
        <Route path={routes[Page.Home]} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
