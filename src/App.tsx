import { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRoute from "./routes/user.route";
import PublicRoute from "./routes/public.route";
import QuizScreen from "./screens/quiz/quiz";
import CourseCreateScreen from "./screens/course-create/course-create";

const LoginScreen = lazy(() => import("@/screens/login/login"));
const HomeScreen = lazy(() => import("@/screens/course-list/course-list"));

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserRoute />}>
          <Route index element={<HomeScreen />}></Route>
          <Route path="quiz/:quizId" element={<QuizScreen />}></Route>
          <Route path="course/create" element={<CourseCreateScreen />}></Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="auth/login" element={<LoginScreen />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
