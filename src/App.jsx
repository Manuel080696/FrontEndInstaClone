import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import { HomePage } from "./pages/HomePage";
import { PhotosPage } from "./pages/PhotosPage";
import { UserPage } from "./pages/UserPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CommentsPage } from "./pages/CommentsPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { ModalLogin } from "./components/ModalLogin";
import { ModalRegister } from "./components/ModalRegister";
import { ModalRecover } from "./components/ModalRecover";
import { ModalReset } from "./components/ModalReset";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="photos/:id" element={<PhotosPage />} />
      <Route path="user/:id" element={<UserPage />} />
      <Route path="modallogin" element={<ModalLogin />} />
      <Route path="modalregister" element={<ModalRegister />} />
      <Route path="modalrecover" element={<ModalRecover />} />
      <Route path="modalreset" element={<ModalReset />} />
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
