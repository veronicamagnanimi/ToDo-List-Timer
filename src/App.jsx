import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Home from './pages/Home';

const App = () => {
  
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route element={<AppLayout />}>
    <Route path="/" element={<Home />} />
    </Route>
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App;
