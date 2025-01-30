import HomeScreen from "@/screens/home/home";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRoute from "./routes/user.route";
import PublicRoute from "./routes/public.route";
import LoginScreen from "./screens/login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserRoute />}>
          <Route index element={<HomeScreen />}></Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<LoginScreen />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
