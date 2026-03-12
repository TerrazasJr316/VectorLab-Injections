import React, { useState } from 'react'
import AttackModule from '../AttackModule'
import SimpleLogin from '../SimpleLogin'
import '../attacks.css'

function LDAPInjection({ onLoginSuccess }) {
  const [userInput, setUserInput] = useState('')
  const [result, setResult] = useState(null)

  const handleTest = () => {
    const ldapPatterns = ['*', '&', '|', ')', '(', '\\', '\\00']
    const isVulnerable = ldapPatterns.some(pattern => 
      userInput.includes(pattern)
    )
    
    setResult({
      vulnerable: isVulnerable,
      message: isVulnerable 
        ? '⚠️ Patrón de inyección LDAP detectado!'
        : '✅ Entrada segura'
    })
  }

  const payloads = [
    { name: 'Wildcard Match', code: '*' },
    { name: 'OR Logic', code: '*)(uid=*))(&(uid=*' },
    { name: 'Bypass Auth', code: 'admin*))(&(password=*' },
  ]

  const examples = [
    {
      title: 'Ejemplo 1: Filtro Comodín',
      payload: '*',
      description: 'Usa * para matchear cualquier valor'
    },
    {
      title: 'Ejemplo 2: OR Injection',
      payload: 'admin*))(&(cn=*',
      description: 'Inyecta operadores OR para bypass de autenticación'
    },
    {
      title: 'Ejemplo 3: Bypass de Contraseña',
      payload: '*))(&(password=*',
      description: 'Manipula la estructura del filtro LDAP'
    },
    {
      title: 'Ejemplo 4: Extracción de Atributos',
      payload: 'admin)(|(uid=*',
      description: 'Extrae múltiples atributos usando OR lógico'
    }
  ]

  return (
    <AttackModule
      title="LDAP Injection"
      icon="🔐"
      description="LDAP Injection permite a atacantes manipular consultas LDAP inyectando filtros maliciosos en aplicaciones que usan servicios LDAP."
    >
      <SimpleLogin attackType="LDAP" onLoginSuccess={onLoginSuccess} />

      <div className="module-grid">
        <div className="content-section">
          <h3>¿Qué es LDAP Injection?</h3>
          <p>
            LDAP (Lightweight Directory Access Protocol) es un protocolo para acceder a servicios de directorio.
            LDAP Injection ocurre cuando entrada de usuario no validada se concatena en filtros LDAP,
            permitiendo manipular la estructura de la consulta.
          </p>

          <h4>Casos de Uso Comunes:</h4>
          <ul className="impact-list">
            <li>Autenticación de usuarios en Active Directory</li>
            <li>Búsqueda de usuarios en directorios corporativos</li>
            <li>Validación de pertenencia a grupos</li>
            <li>Enumeración de atributos de usuario</li>
          </ul>

          <h4>Ejemplos de Filtros LDAP:</h4>
          <ul className="prevention-list">
            <li><code>(&(uid=user)(password=pass))</code> - Autenticación</li>
            <li><code>(cn=John Doe)</code> - Búsqueda por nombre</li>
            <li><code>(|(uid=admin)(uid=root))</code> - OR lógico</li>
            <li><code>(&(cn=*)(objectClass=*))</code> - Wildcards</li>
          </ul>
        </div>

        <div className="testing-section">
          <div className="test-lab">
            <h3>🧪 Laboratorio de Pruebas</h3>
            <div className="input-group">
              <label>Ingresa un payload LDAP:</label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ejemplo: *"
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
            <h4>Caracteres Especiales:</h4>
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
            <pre>{`// Java - VULNERABLE
String filter = "(&(uid=" + username + 
  ")(password=" + password + "))";
NamingEnumeration results = 
  ctx.search("", filter, controls);

// Si username = admin*
// Filtro: (&(uid=admin*)(password=X))`}</pre>
          </div>
          <div className="code-block secure">
            <h5>✅ SEGURO</h5>
            <pre>{`// Java - SEGURO
String user = LdapName.escapeRDNValue(
  username).toString();
String filter = "(&(uid=" + user + 
  ")(password=" + password + "))";
NamingEnumeration results = 
  ctx.search("", filter, controls);`}</pre>
          </div>
        </div>
      </div>
    </AttackModule>
  )
}

export default LDAPInjection
