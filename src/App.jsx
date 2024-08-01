import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RedirectPage from "./pages/RedirectPage/RedirectPage";
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/redirect" element={<RedirectPage />} />
      <Route path="/create-playlist" element={<CreatePlaylist />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
