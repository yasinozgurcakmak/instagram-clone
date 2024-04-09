import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { Helmet } from "react-helmet"
import Register from "./pages/Register"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from "./config/supabase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/user";
import { RootState } from "./store";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice)
  const checkSession = async () => {
    const user = await supabase.auth.getSession()
    dispatch(setUser(user))
  }
  useEffect(() => { checkSession() }, [user])
  return (
    <main>
      <Helmet>
        <title>Instagram</title>
      </Helmet>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="accounts/emailsignup" element={<Register />} />
      </Routes>
    </main>
  )
}

export default App
