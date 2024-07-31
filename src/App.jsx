import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RedirectPage from "./pages/RedirectPage/RedirectPage";
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist";
import SuccessPage from "./pages/SuccessPage/SuccessPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/redirect" element={<RedirectPage />} />
      <Route path="/create-playlist" element={<CreatePlaylist />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
};

export default App;
