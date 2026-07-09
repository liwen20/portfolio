import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import WorkDetail from './components/WorkDetail'
import './styles/global.css'
import './styles/fonts.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:category/:name" element={<WorkDetail />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
