import { Routes,Route,BrowserRouter } from "react-router-dom";
import ShowPersons from './components/ShowPersons';


function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path='/' element={<ShowPersons></ShowPersons>}> </Route>
   </Routes>
    </BrowserRouter> 
  )
}

export default App;
