import React, { useState } from 'react'
import AttackModule from '../AttackModule'
import SimpleLogin from '../SimpleLogin'
import '../attacks.css'

function NoSQLInjection({ onLoginSuccess }) {
  const [userInput, setUserInput] = useState('')
  const [result, setResult] = useState(null)

  const handleTest = () => {
    const noSqlPatterns = ['$', '{', '}', 'db.', 'find', 'insert']
    const isVulnerable = noSqlPatterns.some(pattern => 
      userInput.includes(pattern)
    )
    
    setResult({
      vulnerable: isVulnerable,
      message: isVulnerable 
        ? '⚠️ Patrón de inyección NoSQL detectado!'
        : '✅ Entrada segura'
    })
  }

  const payloads = [
    { name: 'Bypass Authentication', code: '{"$ne": null}' },
    { name: 'Extract Data', code: '{"username": {"$regex": ".*"}}' },
    { name: 'Operator Injection', code: '{"$where": "function() { return true; }"}' },
  ]

  const examples = [
    {
      title: 'Ejemplo 1: $ne (Not Equal)',
      payload: '{"username": {"$ne": null}, "password": {"$ne": null}}',
      description: 'Bypassea autenticación seleccionando registros donde username y password no son nulos'
    },
    {
      title: 'Ejemplo 2: $regex',
      payload: '{"username": {"$regex": "^admin"}}',
      description: 'Usa expresiones regulares para extraer datos'
    },
    {
      title: 'Ejemplo 3: $where',
      payload: '{"$where": "this.username == \'admin\'"}',
      description: 'Ejecuta código JavaScript arbitrario'
    },
    {
      title: 'Ejemplo 4: $or',
      payload: '{"$or": [{"username": "admin"}, {"username": "root"}]}',
      description: 'Usa operadores lógicos para manipular consultas'
    }
  ]

  return (
    <AttackModule
      title="NoSQL Injection"
      icon="📊"
      description="NoSQL Injection es una vulnerabilidad en aplicaciones que usan bases de datos NoSQL como MongoDB, permitiendo inyectar operadores maliciosos."
    >
      <SimpleLogin attackType="NoSQL" onLoginSuccess={onLoginSuccess} />

      <div className="module-grid">
        <div className="content-section">
          <h3>¿Qué es NoSQL Injection?</h3>
          <p>
            NoSQL Injection ocurre cuando una aplicación concatena entrada de usuario en consultas NoSQL
            sin validación. En lugar de inyectar código SQL, se inyectan operadores NoSQL como $ne, $gt, $regex, etc.
          </p>

          <h4>Diferencias con SQL Injection:</h4>
          <ul className="impact-list">
            <li>Usa operadores NoSQL en lugar de comandos SQL</li>
            <li>A menudo involucra objetos JSON/BSON</li>
            <li>Puede afectar múltiples bases de datos (MongoDB, CouchDB, etc.)</li>
            <li>Sintaxis más variada según la base de datos</li>
          </ul>

          <h4>Métodos Comunes:</h4>
          <ul className="prevention-list">
            <li>Operadores de comparación: $ne, $gt, $lt, $regex</li>
            <li>Operadores lógicos: $or, $and, $nor</li>
            <li>Operadores JavaScript: $where, $function</li>
            <li>Array operators: $elemMatch, $in</li>
          </ul>
        </div>

        <div className="testing-section">
          <div className="test-lab">
            <h3>🧪 Laboratorio de Pruebas</h3>
            <div className="input-group">
              <label>Ingresa un payload NoSQL:</label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Ejemplo: {"$ne": null}'
                className="test-input"
                rows="4"
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
            <h4>Operadores Comunes:</h4>
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
            <pre>{`// MongoDB - VULNERABLE
const user = req.body.username;
db.collection('users')
  .findOne({ username: user });

// Entrada: {"$ne": null}
// Query: {username: {$ne: null}}`}</pre>
          </div>
          <div className="code-block secure">
            <h5>✅ SEGURO</h5>
            <pre>{`// MongoDB - SEGURO
const user = String(req.body.username);
db.collection('users')
  .findOne({ username: user });

// O usar schema validation:
const schema = new Schema({
  username: String
});`}</pre>
          </div>
        </div>
      </div>
    </AttackModule>
  )
}

export default NoSQLInjection
