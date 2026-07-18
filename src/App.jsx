import ListEmployeeComponent from "./components/ListEmployeeComponent"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent";

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={ <ListEmployeeComponent/>}></Route>
        <Route path="/employees" element={ <ListEmployeeComponent/>}></Route>
        <Route path="/add-employee" element={ <EmployeeComponent/>}></Route>
        <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
  </>
  )
}

export default App;
