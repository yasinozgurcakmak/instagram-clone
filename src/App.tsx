import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { Helmet } from "react-helmet"
import Register from "./pages/Register"

function App() {
  return (
    <main>
      <Helmet>
        <title>Instagram</title>
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="accounts/emailsignup" element={<Register/>} />
      </Routes>
    </main>
  )
}

export default App
