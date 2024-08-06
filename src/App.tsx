import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import supabase from "./config/supabase";
import { setUser } from "./store/user";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import QRPage from "./pages/QRPage";
import favicon from "./assets/logo.svg";
import PostPage from "./pages/PostPage";
import Error from "./components/base/Error";

function App() {
  const dispatch = useDispatch();
  const checkSession = async () => {
    const currentUser = await supabase.auth.getSession()
    dispatch(setUser(currentUser.data))
  }
  useEffect(() => { checkSession() }, [])
  const queryClient = new QueryClient()
  return (
    <main>
      <Helmet>
        <title>Instagram</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="accounts/emailsignup" element={<Register />} />
          <Route path="profile/:username" element={<Profile />} />          
          <Route path="post/:id" element={<PostPage />} />          
          <Route path="qr/:username" element={<QRPage />} />
          <Route path="404" element={<Error />} />          
          <Route path="*" element={<Error />} />          
        </Routes>
      </QueryClientProvider>
    </main>
  )
}

export default App
