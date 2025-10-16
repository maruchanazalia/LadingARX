import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const ProjectPlaceholder = () => {
  const { nombre } = useParams();
  return (
    <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <h2 style={{color:'#891D1A'}}>Detalle de Proyecto</h2>
      <p style={{fontSize:28,maxWidth:400,textAlign:'center'}}>{nombre}</p>
      <span style={{color:'#5E657B'}}>Aquí pronto tu diseño pro 👷‍♂️</span>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="layout">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyecto/:nombre" element={<ProjectPlaceholder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
