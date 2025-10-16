import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ARXSoftware from './pages/Home';

function App() {
  return (
    <Router>
      <div className="layout">

        <main>
          <Routes>
            <Route path="/" element={<ARXSoftware />} />
          </Routes>
        </main>
    
      </div>
    </Router>
  );
}

export default App;
