import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { PhotosPage } from "./pages/PhotosPage";
import { UserPage } from "./pages/UserPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CommentsPage } from "./pages/CommentsPage";
import Root from "./pages/Root";
import { EditProfilePage } from "./pages/EditProfilePage";
import { SearchPage } from "./pages/Search";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="photos/:id" element={<PhotosPage />} />
      <Route path="user/:id" element={<UserPage />} />
      <Route path="comments/:id" element={<CommentsPage />} />
      <Route path="user/profile" element={<EditProfilePage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
