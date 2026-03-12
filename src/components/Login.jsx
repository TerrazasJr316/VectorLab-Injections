import React, { useState } from 'react'
import { AlertCircle, CheckCircle, Lock, Lightbulb, Crosshair, FileText } from 'lucide-react'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(null)
  const [attackType, setAttackType] = useState(null)

  // Usuario y contraseña correctos
  const CORRECT_USERNAME = 'admin'
  const CORRECT_PASSWORD = 'password123'

  const detectInjectionType = (input) => {
    // SQL Injection
    if (/(--|;|'|"|\bOR\b|\bUNION\b|\bDROP\b|\bDELETE\b)/i.test(input)) {
      return 'SQL'
    }
    // NoSQL Injection
    if (/(\$ne|\$gt|\$lt|\$regex|\$where|\{|\})/i.test(input)) {
      return 'NoSQL'
    }
    // LDAP Injection
    if (/(\*|\(|\)|&|\||\\\00)/i.test(input)) {
      return 'LDAP'
    }
    // XPath Injection
    if (/(or|and|'|"|=|\[|\])/i.test(input)) {
      return 'XPath'
    }
    // GraphQL Injection
    if (/(__schema|query|mutation|{|}|alias:)/i.test(input)) {
      return 'GraphQL'
    }
    return null
  }

  const handleLogin = () => {
    setResult(null)
    setAttackType(null)

    if (!username || !password) {
      setResult({
        success: false,
        message: 'Por favor completa ambos campos'
      })
      return
    }

    // Validación correcta
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setResult({
        success: true,
        message: '¡Bienvenido! Credenciales válidas.'
      })
      return
    }

    // Detectar tipo de inyección
    const usernameInjection = detectInjectionType(username)
    const passwordInjection = detectInjectionType(password)

    if (usernameInjection || passwordInjection) {
      const injection = usernameInjection || passwordInjection
      setAttackType(injection)

      // Simular bypass de autenticación con inyecciones
      const bypassPatterns = {
        SQL: {
          patterns: [/'\s+(or|--)/i, /'\s*or\s*'1'\s*=\s*'1/i],
          message: 'SQL Injection detectado y EJECUTADO',
          description: 'La consulta SQL ha sido manipulada para bypassear autenticación'
        },
        NoSQL: {
          patterns: [/\$ne|"\$ne"/i, /\$gt/i],
          message: 'NoSQL Injection detectado y EJECUTADO',
          description: 'Un operador NoSQL fue inyectado exitosamente'
        },
        LDAP: {
          patterns: [/\*|\(\|/i],
          message: 'LDAP Injection detectado y EJECUTADO',
          description: 'El filtro LDAP fue alterado'
        },
        XPath: {
          patterns: [/'\s+or\s+'/i],
          message: 'XPath Injection detectado y EJECUTADO',
          description: 'La expresión XPath fue manipulada'
        },
        GraphQL: {
          patterns: [/__schema|query/i],
          message: 'GraphQL Injection detectado y EJECUTADO',
          description: 'La query GraphQL fue alterada'
        }
      }

      const injectionConfig = bypassPatterns[injection]
      const hasValidBypass = injectionConfig.patterns.some(pattern => 
        pattern.test(username + password)
      )

      setResult({
        success: hasValidBypass,
        message: hasValidBypass ? injectionConfig.message : `Inyección detectada pero sin acceso`,
        description: injectionConfig.description,
        details: {
          username: username,
          password: password,
          type: injection
        }
      })
    } else {
      // Credenciales inválidas sin inyección
      setResult({
        success: false,
        message: 'Credenciales inválidas',
        hint: `Intenta: "${CORRECT_USERNAME}" / "${CORRECT_PASSWORD}"`,
        tryInjection: true
      })
    }
  }

  const applyPayload = (payload) => {
    setUsername(payload)
    setResult(null)
    setAttackType(null)
  }

  const payloads = [
    {
      type: 'SQL',
      username: "admin' --",
      password: "anything",
      description: 'Comentario SQL para ignorar validación'
    },
    {
      type: 'SQL',
      username: "' OR '1'='1",
      password: "' OR '1'='1",
      description: 'OR lógico para bypassear condiciones'
    },
    {
      type: 'NoSQL',
      username: '{"$ne": null}',
      password: '{"$ne": null}',
      description: 'Operador NoSQL $ne (not equal)'
    },
    {
      type: 'NoSQL',
      username: '{"$gt": ""}',
      password: '{"$gt": ""}',
      description: 'Operador NoSQL $gt (greater than)'
    },
    {
      type: 'LDAP',
      username: '*',
      password: '*',
      description: 'Wildcard para matchear cualquier valor'
    },
    {
      type: 'LDAP',
      username: 'admin*))(&(cn=*',
      password: 'anything',
      description: 'Inyección de filtro LDAP'
    },
    {
      type: 'XPath',
      username: "admin' or '1'='1",
      password: "' or '1'='1",
      description: 'XPath con condición siempre verdadera'
    },
    {
      type: 'GraphQL',
      username: '{query}',
      password: '__schema',
      description: 'GraphQL Introspection attempt'
    }
  ]

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Lock size={40} color="#3b82f6" />
          <h2>Sistema de Login</h2>
          <p>Prueba diferentes tipos de inyecciones</p>
        </div>

        <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setResult(null)
              }}
              placeholder="username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setResult(null)
              }}
              placeholder="password"
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
        </form>

        {result && (
          <div className={`result-box ${result.success ? 'success' : 'error'}`}>
            <div className="result-header">
              {result.success ? (
                <CheckCircle size={24} color="#10b981" />
              ) : (
                <AlertCircle size={24} color="#ef4444" />
              )}
              <p className="result-message">{result.message}</p>
            </div>
            {result.description && (
              <p className="result-description">{result.description}</p>
            )}
            {result.hint && (
              <p className="result-hint"><Lightbulb size={16} style={{display: 'inline', marginRight: '4px'}} /> Hint: {result.hint}</p>
            )}
            {result.details && (
              <div className="result-details">
                <p><strong>Tipo de Ataque:</strong> {result.details.type}</p>
                <p><strong>Usuario Enviado:</strong> <code>{result.details.username}</code></p>
                <p><strong>Contraseña Enviada:</strong> <code>{result.details.password}</code></p>
              </div>
            )}
          </div>
        )}

        <div className="credentials-info">
          <h4><FileText size={20} style={{display: 'inline', marginRight: '8px'}} />Credenciales Válidas</h4>
          <p><strong>Usuario:</strong> <code>admin</code></p>
          <p><strong>Contraseña:</strong> <code>password123</code></p>
          <p className="info-text">O intenta con alguno de los payloads de inyección de abajo</p>
        </div>
      </div>

      <div className="payloads-container">
        <h3><Crosshair size={24} style={{display: 'inline', marginRight: '8px'}} />Payloads por Tipo de Inyección</h3>
        
        {['SQL', 'NoSQL', 'LDAP', 'XPath', 'GraphQL'].map(type => (
          <div key={type} className="payload-group">
            <h4>{type} Injection</h4>
            <div className="payload-cards">
              {payloads.filter(p => p.type === type).map((payload, idx) => (
                <div key={idx} className="payload-card">
                  <p className="payload-description">{payload.description}</p>
                  <div className="payload-inputs">
                    <div className="payload-input">
                      <span className="input-label">User:</span>
                      <code>{payload.username}</code>
                    </div>
                    <div className="payload-input">
                      <span className="input-label">Pass:</span>
                      <code>{payload.password}</code>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setUsername(payload.username)
                      setPassword(payload.password)
                      setResult(null)
                    }}
                    className="btn-apply"
                  >
                    Probar Payload
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Login
