import { useState } from "react";

enum Pages {
  Homepage,
  Quiz,
  Settings,
  ReadingMaterials,
  Parents,
  Leaderboard,
  About,
}

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(Pages.Homepage);

  switch (currentPage) {
    case Pages.Quiz:
    case Pages.Settings:
    case Pages.ReadingMaterials:
    case Pages.Parents:
    case Pages.Leaderboard:
    case Pages.About:
      break;
    case Pages.Homepage:
    default:
      return <div></div>;
  }
};

export default HomePage;
