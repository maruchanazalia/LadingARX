import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const ProjectPlaceholder = () => {
  const { nombre } = useParams();
  return (
    <div style={{
      minHeight:'60vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'column',
      padding: '4rem 2rem',
      background: '#f5f5f5'
    }}>
      <div style={{
        padding: '3rem',
        borderRadius: '20px',
        background: '#f5f5f5',
        boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)',
        maxWidth: '600px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #d32f2f, #b71c1c)'
        }}></div>
        <h2 style={{
          color:'#d32f2f',
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1rem',
          fontFamily: "'Poppins', sans-serif"
        }}>Detalle de Proyecto</h2>
        <p style={{
          fontSize: '1.5rem',
          maxWidth: '100%',
          textAlign: 'center',
          color: '#1a1a1a',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>{nombre}</p>
        <span style={{
          color:'#5E657B',
          fontSize: '1rem'
        }}>Aquí pronto tu diseño pro 👷‍♂️</span>
      </div>
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
