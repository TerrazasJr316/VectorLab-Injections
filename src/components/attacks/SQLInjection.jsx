import React, { useState } from 'react'
import AttackModule from '../AttackModule'
import SimpleLogin from '../SimpleLogin'
import '../attacks.css'

function SQLInjection({ onLoginSuccess }) {
  const [userInput, setUserInput] = useState('')
  const [result, setResult] = useState(null)
  const [showVulnerable, setShowVulnerable] = useState(false)

  const handleTest = () => {
    // Simular una inyección SQL
    const maliciousPatterns = ['OR', 'DROP', 'DELETE', '--', ';', 'UNION']
    const isVulnerable = maliciousPatterns.some(pattern => 
      userInput.toUpperCase().includes(pattern)
    )
    
    setResult({
      vulnerable: isVulnerable,
      message: isVulnerable 
        ? '⚠️ Patrón de inyección SQL detectado!'
        : '✅ Entrada segura'
    })
    setShowVulnerable(isVulnerable)
  }

  const examples = [
    {
      title: 'Ejemplo 1: Comentario SQL',
      payload: "admin' --",
      description: 'Usa comentarios para ignorar el resto de la consulta'
    },
    {
      title: 'Ejemplo 2: OR Lógico',
      payload: "' OR '1'='1",
      description: 'Manipula la lógica booleana para bypassear autenticación'
    },
    {
      title: 'Ejemplo 3: UNION-based',
      payload: "' UNION SELECT NULL,NULL,NULL --",
      description: 'Combina resultados de múltiples consultas'
    },
    {
      title: 'Ejemplo 4: Blind SQL Injection',
      payload: "' AND SLEEP(5) --",
      description: 'Inyección basada en timing'
    }
  ]

  const payloads = [
    { name: 'Bypass Login', code: "admin' --" },
    { name: 'Extract Data', code: "' UNION SELECT column_name FROM information_schema.columns --" },
    { name: 'Database Version', code: "' OR 1=1 UNION SELECT @@version,NULL,NULL --" },
  ]

  return (
    <AttackModule
      title="SQL Injection"
      icon="🔍"
      description="SQL Injection es una técnica de ataque que permite a los atacantes insertar código SQL malicioso en consultas de base de datos."
    >
      <SimpleLogin attackType="SQL" onLoginSuccess={onLoginSuccess} />

      <div className="module-grid">
        <div className="content-section">
          <h3>¿Qué es SQL Injection?</h3>
          <p>
            SQL Injection ocurre cuando una aplicación web acepta entrada de usuario sin validarla adecuadamente,
            permitiendo que un atacante inyecte comandos SQL maliciosos que se ejecuten en la base de datos.
          </p>

          <h4>Impacto:</h4>
          <ul className="impact-list">
            <li>Acceso no autorizado a datos sensibles</li>
            <li>Modificación o eliminación de datos</li>
            <li>Bypass de autenticación</li>
            <li>Ejecución de comandos del sistema</li>
          </ul>

          <h4>Prevención:</h4>
          <ul className="prevention-list">
            <li>✓ Usar consultas preparadas (Prepared Statements)</li>
            <li>✓ Validar entrada de datos en servidor</li>
            <li>✓ Usar parameterización</li>
            <li>✓ Aplicar principio de menor privilegio en BD</li>
            <li>✓ Usar WAF (Web Application Firewall)</li>
          </ul>
        </div>

        <div className="testing-section">
          <div className="test-lab">
            <h3>🧪 Laboratorio de Pruebas</h3>
            <div className="input-group">
              <label>Ingresa un payload:</label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ejemplo: admin' --"
                className="test-input"
              />
              <button onClick={handleTest} className="btn-test">Analizar</button>
            </div>

            {result && (
              <div className={`result ${result.vulnerable ? 'vulnerable' : 'safe'}`}>
                <p className="result-message">{result.message}</p>
              </div>
            )}
          </div>

          <div className="payloads-section">
            <h4>Payloads Comunes:</h4>
            <div className="payloads-list">
              {payloads.map((payload, idx) => (
                <div key={idx} className="payload-item">
                  <span className="payload-name">{payload.name}</span>
                  <code className="payload-code">{payload.code}</code>
                  <button 
                    className="btn-copy"
                    onClick={() => {
                      setUserInput(payload.code)
                      setResult(null)
                    }}
                  >
                    Copiar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="examples-section">
        <h3>📚 Ejemplos Educativos</h3>
        <div className="examples-grid">
          {examples.map((example, idx) => (
            <div key={idx} className="example-card">
              <h4>{example.title}</h4>
              <p className="description">{example.description}</p>
              <code className="example-payload">{example.payload}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="code-examples">
        <h3>💻 Código Vulnerable vs Seguro</h3>
        <div className="code-comparison">
          <div className="code-block vulnerable">
            <h5>❌ VULNERABLE</h5>
            <pre>{`// Python - VULNERABLE
query = "SELECT * FROM users WHERE username='" + username + "'"
cursor.execute(query)

// Node.js - VULNERABLE
const query = \`SELECT * FROM users 
  WHERE id = \${userId}\`;
db.query(query);`}</pre>
          </div>
          <div className="code-block secure">
            <h5>✅ SEGURO</h5>
            <pre>{`// Python - SEGURO
query = "SELECT * FROM users WHERE username = %s"
cursor.execute(query, (username,))

// Node.js - SEGURO
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);`}</pre>
          </div>
        </div>
      </div>
    </AttackModule>
  )
}

export default SQLInjection
