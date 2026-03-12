import React from 'react'

function AttackModule({ title, icon, description, children }) {
  return (
    <div className="attack-module">
      <div className="module-header">
        <div className="header-title">
          <span className="module-icon">{icon}</span>
          <div>
            <h1>{title}</h1>
            <p className="module-description">{description}</p>
          </div>
        </div>
      </div>

      <div className="module-content">
        {children}
      </div>
    </div>
  )
}

export default AttackModule
