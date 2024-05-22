import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { Helmet } from "react-helmet"
import Register from "./pages/Register"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from "./config/supabase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/user";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider} from 'react-query'


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
      </Helmet>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="accounts/emailsignup" element={<Register />} />
        </Routes>
      </QueryClientProvider>
    </main>
  )
}

export default App
