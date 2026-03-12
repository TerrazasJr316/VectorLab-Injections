import React, { useState } from 'react'
import Navigation from './components/Navigation'
import ProfilePage from './components/ProfilePage'
import { Github } from 'lucide-react'
import SQLInjection from './components/attacks/SQLInjection'
import NoSQLInjection from './components/attacks/NoSQLInjection'
import LDAPInjection from './components/attacks/LDAPInjection'
import XPathInjection from './components/attacks/XPathInjection'
import GraphQLInjection from './components/attacks/GraphQLInjection'
import './App.css'

function App() {
  const [currentModule, setCurrentModule] = useState('home')
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  const handleLogout = () => {
    setAuthenticatedUser(null)
    setCurrentModule('home')
  }

  // Si el usuario está autenticado, mostrar el perfil
  if (authenticatedUser) {
    return (
      <div className="app">
        <Navigation currentModule="profile" setCurrentModule={() => {}} />
        <main className="main-content">
          <ProfilePage 
            user={authenticatedUser} 
            injectionType={authenticatedUser.injectionUsed}
            onLogout={handleLogout}
          />
        </main>
        <Footer />
      </div>
    )
  }

  const renderContent = () => {
    switch(currentModule) {
      case 'sql':
        return <SQLInjection onLoginSuccess={setAuthenticatedUser} />
      case 'nosql':
        return <NoSQLInjection onLoginSuccess={setAuthenticatedUser} />
      case 'ldap':
        return <LDAPInjection onLoginSuccess={setAuthenticatedUser} />
      case 'xpath':
        return <XPathInjection onLoginSuccess={setAuthenticatedUser} />
      case 'graphql':
        return <GraphQLInjection onLoginSuccess={setAuthenticatedUser} />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Navigation currentModule={currentModule} setCurrentModule={setCurrentModule} />
      <main className="main-content">
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}

function Home() {
  return (
    <div className="home">
      <div className="home-header">
        <h1>VectorLab Injections</h1>
        <p className="subtitle">Laboratorio Interactivo de Ataques por Inyección</p>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="icon">🔐</div>
          <h3>Educación en Seguridad</h3>
          <p>Aprende sobre vulnerabilidades comunes de inyección</p>
        </div>
        <div className="feature-card">
          <div className="icon">🧪</div>
          <h3>Pruebas Interactivas</h3>
          <p>Experimenta en un entorno seguro y controlado</p>
        </div>
        <div className="feature-card">
          <div className="icon">📚</div>
          <h3>Recursos Completos</h3>
          <p>Documentación y ejemplos para cada tipo de ataque</p>
        </div>
      </div>

      <div className="intro-section">
        <h2>Módulos Disponibles</h2>
        <p>Selecciona un módulo del menú para comenzar a explorar diferentes tipos de ataques por inyección:</p>
        <ul className="modules-list">
          <li><strong>SQL Injection</strong> - Ataques a bases de datos SQL</li>
          <li><strong>NoSQL Injection</strong> - Ataques a bases de datos NoSQL</li>
          <li><strong>LDAP Injection</strong> - Ataques a servicios LDAP</li>
          <li><strong>XPath Injection</strong> - Ataques a consultas XPath</li>
          <li><strong>GraphQL Injection</strong> - Ataques a APIs GraphQL</li>
        </ul>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2026 VectorLab Injections - Laboratorio de Pruebas de Seguridad</p>
        <a 
          href="https://github.com/TerrazasJr316/VectorLab-Injections" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
          title="Ver en GitHub"
        >
          <Github size={20} />
          <span>Ver en GitHub</span>
        </a>
      </div>
    </footer>
  )
}

export default App
