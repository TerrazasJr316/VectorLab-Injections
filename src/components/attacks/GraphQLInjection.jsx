import React, { useState } from 'react'
import AttackModule from '../AttackModule'
import SimpleLogin from '../SimpleLogin'
import '../attacks.css'

function GraphQLInjection({ onLoginSuccess }) {
  const [userInput, setUserInput] = useState('')
  const [result, setResult] = useState(null)

  const handleTest = () => {
    const graphqlPatterns = ['{', '}', 'query', 'mutation', '__', 'alias:']
    const isVulnerable = graphqlPatterns.some(pattern => 
      userInput.includes(pattern)
    )
    
    setResult({
      vulnerable: isVulnerable,
      message: isVulnerable 
        ? '⚠️ Patrón de inyección GraphQL detectado!'
        : '✅ Entrada segura'
    })
  }

  const payloads = [
    { name: 'Introspection', code: '__schema' },
    { name: 'Direct Query Injection', code: '{ users { id } }' },
    { name: 'Alias Attack', code: 'a: user(id: 1) { id }' },
  ]

  const examples = [
    {
      title: 'Ejemplo 1: GraphQL Introspection',
      payload: '{ __schema { types { name } } }',
      description: 'Explora el schema de GraphQL para obtener información de la API'
    },
    {
      title: 'Ejemplo 2: Query Injection',
      payload: '{ user { id email __typename } }',
      description: 'Inyecta campos adicionales para obtener datos sensibles'
    },
    {
      title: 'Ejemplo 3: Alias-based Injection',
      payload: 'a: user(id: 1) { id } b: user(id: 2) { id }',
      description: 'Usa aliases para realizar múltiples queries'
    },
    {
      title: 'Ejemplo 4: Batch Query Attack',
      payload: '[{query: "..."}, {query: "..."}]',
      description: 'Envía múltiples queries en un batch'
    }
  ]

  return (
    <AttackModule
      title="GraphQL Injection"
      icon="🚀"
      description="GraphQL Injection permite a atacantes manipular consultas GraphQL para acceder a datos no autorizados o realizar operaciones maliciosas."
    >
      <SimpleLogin attackType="GraphQL" onLoginSuccess={onLoginSuccess} />

      <div className="module-grid">
        <div className="content-section">
          <h3>¿Qué es GraphQL Injection?</h3>
          <p>
            GraphQL es un lenguaje de consulta para APIs. La inyección ocurre cuando entrada de usuario
            no validada se concatena en queries GraphQL, permitiendo manipular la consulta para acceder
            a campos no autorizados o ejecutar mutaciones maliciosas.
          </p>

          <h4>Vectores de Ataque Comunes:</h4>
          <ul className="impact-list">
            <li>Introspection queries para mapear el schema</li>
            <li>Field injection para acceder a datos sensibles</li>
            <li>Alias-based attacks para queries múltiples</li>
            <li>Batch queries para bypass de rate limiting</li>
            <li>Mutation injection para modificar datos</li>
          </ul>

          <h4>Vulnerabilidades Frecuentes:</h4>
          <ul className="prevention-list">
            <li>Introspection habilitado en producción</li>
            <li>Falta de validación de entrada</li>
            <li>Queries muy complejas (DoS)</li>
            <li>Errores informativos en respuestas</li>
          </ul>
        </div>

        <div className="testing-section">
          <div className="test-lab">
            <h3>🧪 Laboratorio de Pruebas</h3>
            <div className="input-group">
              <label>Ingresa una query GraphQL:</label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Ejemplo: { user { id email } }'
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
            <h4>Operaciones Comunes:</h4>
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
            <pre>{`// Node.js - VULNERABLE
const query = \`
  query {
    user(id: \${userId}) {
      \${fields}
    }
  }
\`;
const result = graphql(schema, query);`}</pre>
          </div>
          <div className="code-block secure">
            <h5>✅ SEGURO</h5>
            <pre>{`// Node.js - SEGURO
const allowedFields = ['id', 'name'];
const safeFields = fields
  .split(',')
  .filter(f => allowedFields.includes(f));

const query = \`
  query {
    user(id: $userId) {
      \${safeFields.join(' ')}
    }
  }
\`;
const result = graphql(schema, query, 
  null, null, { userId });`}</pre>
          </div>
        </div>
      </div>
    </AttackModule>
  )
}

export default GraphQLInjection
