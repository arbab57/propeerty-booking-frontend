import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import NotFound from "./pages/notFound";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/login";
import Media from "./pages/Media";
import BlogsPage from "./pages/BlogsPage";
import AddBlog from "./pages/AddBlog";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import Bookings from "./pages/Bookings";
import AddBooking from "./pages/AddBooking";
import Users from "./pages/Users";
import Admin from "./pages/Admin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="properties" element={<Properties />} />
          <Route path="addproperties" element={<AddProperty />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="addbookings" element={<AddBooking />} />
          <Route path="media" element={<Media />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="addblogs" element={<AddBlog />} />
          <Route path="admin" element={<Admin />} />

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
