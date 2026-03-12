import React, { useState } from 'react'
import { Menu, X, Shield, Home, Search, Database, Lock, FileText, Rocket } from 'lucide-react'
import './Navigation.css'

function Navigation({ currentModule, setCurrentModule }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'sql', label: 'SQL Injection', icon: Search },
    { id: 'nosql', label: 'NoSQL Injection', icon: Database },
    { id: 'ldap', label: 'LDAP Injection', icon: Lock },
    { id: 'xpath', label: 'XPath Injection', icon: FileText },
    { id: 'graphql', label: 'GraphQL Injection', icon: Rocket },
  ]

  const handleMenuItemClick = (id) => {
    setCurrentModule(id)
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Shield size={28} color="#3b82f6" />
          <span className="brand-text">VectorLab</span>
        </div>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {menuItems.map(item => {
            const IconComponent = item.icon
            return (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${currentModule === item.id ? 'active' : ''}`}
                  onClick={() => handleMenuItemClick(item.id)}
                >
                  <span className="icon"><IconComponent size={20} /></span>
                  <span className="label">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
