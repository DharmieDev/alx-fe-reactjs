import { BrowserRouter as Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileDetails from "./pages/ProfileDetails.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import './App.css'

function App() {

  return (
    <Routes>
      {/* Shared layout (header/nav/footer) */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* Blog list + dynamic (:postId) */}
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:postId" element={<BlogPost />} />

        <Route path="login" element={<Login />} />

        {/* Protected area */}
        <Route element={<ProtectedRoute />}>
          {/* Nested routes inside Profile */}
          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileDetails />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
