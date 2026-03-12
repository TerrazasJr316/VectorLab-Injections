import React, { useState } from 'react'
import { Lock, AlertCircle, CheckCircle } from 'lucide-react'
import './SimpleLogin.css'

function SimpleLogin({ attackType, onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(null)

  const CORRECT_USERNAME = 'admin'
  const CORRECT_PASSWORD = 'password123'

  const injectionPatterns = {
    SQL: {
      patterns: [/'\s*(or|--)/i, /'\s*or\s*'1'\s*=\s*'1/i, /admin'\s*--/i],
      description: 'Patrones SQL Injection'
    },
    NoSQL: {
      patterns: [/\$ne|\$gt|\$lt|\$regex|\$where/i, /\{"|\[\]/i],
      description: 'Patrones NoSQL Injection'
    },
    LDAP: {
      patterns: [/\*|\(\|/i, /admin\*\)\)/i],
      description: 'Patrones LDAP Injection'
    },
    XPath: {
      patterns: [/'\s+or\s+'/i, /admin'\s+or\s+'/i],
      description: 'Patrones XPath Injection'
    },
    GraphQL: {
      patterns: [/__schema|query|mutation/i, /\{.*\}/i],
      description: 'Patrones GraphQL Injection'
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setResult(null)

    if (!username || !password) {
      setResult({
        success: false,
        message: '⚠️ Completa ambos campos'
      })
      return
    }

    // Validar credenciales correctas
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setResult({
        success: true,
        message: '✅ Credenciales válidas - Acceso concedido'
      })
      setTimeout(() => {
        onLoginSuccess({
          username,
          password,
          injectionUsed: null
        })
      }, 800)
      return
    }

    // Validar inyección si está seleccionado un tipo
    if (attackType && injectionPatterns[attackType]) {
      const patterns = injectionPatterns[attackType].patterns
      const combined = username + password

      const isInjection = patterns.some(pattern => pattern.test(combined))

      if (isInjection) {
        setResult({
          success: true,
          message: `🚨 ${attackType} Injection detectada y EJECUTADA - Acceso concedido`
        })
        setTimeout(() => {
          onLoginSuccess({
            username,
            password,
            injectionUsed: attackType
          })
        }, 800)
        return
      }
    }

    // Credenciales inválidas
    setResult({
      success: false,
      message: `❌ Acceso denegado - Intenta con admin / password123 o una inyección ${attackType || ''}`
    })
  }

  return (
    <div className="simple-login">
      <div className="login-box">
        <div className="login-title">
          <Lock size={24} color="#3b82f6" />
          <h3>Sistema de Prueba</h3>
          {attackType && <span className="attack-badge">{attackType}</span>}
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setResult(null)
              }}
              placeholder="admin o payload"
              className="form-input"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setResult(null)
              }}
              placeholder="password123 o payload"
              className="form-input"
              autoComplete="off"
            />
          </div>

          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
        </form>

        {result && (
          <div className={`login-result ${result.success ? 'success' : 'error'}`}>
            <div className="result-content">
              {result.success ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <p>{result.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimpleLogin
