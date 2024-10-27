import './App.css';
import { Route,Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage"
import BlogPage from "./pages/BlogPage"

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/:id' element={<BlogPage/>} />
      </Routes>
    </div>
  );
}

export default App;
