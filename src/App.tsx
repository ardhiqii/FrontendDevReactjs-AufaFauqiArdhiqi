import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainPage from "./pages/main/MainPage"
import DetailViewPage from "./pages/detail-view/DetailViewPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/detail/:id" element={<DetailViewPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
