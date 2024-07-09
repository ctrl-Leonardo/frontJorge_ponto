import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/home';
import Colaboradores from './pages/colaboradores/Colaboradores';
import Demissao from './pages/demissao/Demissao';
import Admissao from './pages/admissao/Admissao';
import Ponto from './pages/ponto/Ponto';
import RegistroPonto from './pages/ponto/RegistroPonto';
import RelatorioPonto from './pages/ponto/RelatorioPonto';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="colaboradores" element={<Colaboradores />} />
          <Route path="admissao" element={<Admissao />} />
          <Route path="demissao" element={<Demissao />} />
          <Route path="ponto" element={<Ponto />}>
            <Route path="registro-ponto" element={<RegistroPonto />} />
            <Route path="relatorio-ponto" element={<RelatorioPonto />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
