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

function App() {
  const dispatch = useDispatch();
  const checkSession = async () => {
    const user = await supabase.auth.getSession()
    dispatch(setUser(user.data))
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
          <Route path="/" element={<Home />}></Route>
          <Route path="accounts/emailsignup" element={<Register />} />
          <Route path="profile/:username" element={<Profile />} />          
          <Route path="qr" element={<QRPage />} />          
        </Routes>
      </QueryClientProvider>
    </main>
  )
}

export default App
