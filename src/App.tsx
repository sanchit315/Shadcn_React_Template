import { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRoute from "./routes/user.route";
import PublicRoute from "./routes/public.route";

const LoginScreen = lazy(() => import("@/screens/login/login"));
const HomeScreen = lazy(() => import("@/screens/course-list/course-list"));

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
