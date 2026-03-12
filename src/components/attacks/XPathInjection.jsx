import React, { useState } from 'react'
import AttackModule from '../AttackModule'
import SimpleLogin from '../SimpleLogin'
import '../attacks.css'

function XPathInjection({ onLoginSuccess }) {
  const [userInput, setUserInput] = useState('')
  const [result, setResult] = useState(null)

  const handleTest = () => {
    const xpathPatterns = ["'", '"', 'or', 'and', ')', '[', '//', '=']
    const isVulnerable = xpathPatterns.some(pattern => 
      userInput.toLowerCase().includes(pattern.toLowerCase())
    )
    
    setResult({
      vulnerable: isVulnerable,
      message: isVulnerable 
        ? '⚠️ Patrón de inyección XPath detectado!'
        : '✅ Entrada segura'
    })
  }

  const payloads = [
    { name: 'Bypass Login', code: "admin' or '1'='1" },
    { name: 'Extract Data', code: "' or '" },
    { name: 'Comment', code: "' or 1=1 or ''" },
  ]

  const examples = [
    {
      title: 'Ejemplo 1: Boolean-based XPath',
      payload: "admin' or '1'='1",
      description: 'Inyecta una condición verdadera para bypassear autenticación'
    },
    {
      title: 'Ejemplo 2: String Concatenation',
      payload: "') | //user[(@id='",
      description: 'Interrumpe la expresión XPath original'
    },
    {
      title: 'Ejemplo 3: Union-based XPath',
      payload: "' union //user//password/text()[1]='",
      description: 'Extrae datos usando union (en XPath 2.0+)'
    },
    {
      title: 'Ejemplo 4: Comment Bypass',
      payload: "admin' or '1'='1",
      description: 'Manipula predicados XPath'
    }
  ]

  return (
    <AttackModule
      title="XPath Injection"
      icon="📄"
      description="XPath Injection permite a atacantes manipular consultas XPath inyectando expresiones maliciosas en búsquedas en archivos XML."
    >
      <SimpleLogin attackType="XPath" onLoginSuccess={onLoginSuccess} />

      <div className="module-grid">
        <div className="content-section">
          <h3>¿Qué es XPath Injection?</h3>
          <p>
            XPath es un lenguaje para seleccionar nodos en documentos XML. XPath Injection ocurre cuando
            entrada de usuario no validada se concatena en expresiones XPath, permitiendo manipular
            la consulta y acceder a datos no autorizados.
          </p>

          <h4>Contextos Vulnerables:</h4>
          <ul className="impact-list">
            <li>Archivos de configuración XML</li>
            <li>Bases de datos XML</li>
            <li>Aplicaciones web que parsean XML</li>
            <li>APIs SOAP/XML-RPC</li>
          </ul>

          <h4>Técnicas de Ataque:</h4>
          <ul className="prevention-list">
            <li>Boolean-based XPath Injection</li>
            <li>Time-based XPath Injection</li>
            <li>Error-based XPath Injection</li>
            <li>Union-based XPath Injection (XPath 2.0+)</li>
          </ul>
        </div>

        <div className="testing-section">
          <div className="test-lab">
            <h3>🧪 Laboratorio de Pruebas</h3>
            <div className="input-group">
              <label>Ingresa un payload XPath:</label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ejemplo: admin' or '1'='1"
                className="test-input"
                rows="3"
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
            <pre>{`// PHP - VULNERABLE
$username = $_GET['user'];
$xpath = "//user[name='" . 
  $username . "']/password/text()";
$result = $dom->xpath($xpath);

// XPath Query: //user[name='admin' or 
// '1'='1']/password/text()`}</pre>
          </div>
          <div className="code-block secure">
            <h5>✅ SEGURO</h5>
            <pre>{`// PHP - SEGURO
$username = $_GET['user'];
// Usar XPath variables
$query = "//user[name=\$user]/password";
$xpath = new DOMXPath($dom);
$xpath->registerNamespace('x', 'ns');
$result = $xpath->query($query, 
  null, ['user' => $username]);`}</pre>
          </div>
        </div>
      </div>
    </AttackModule>
  )
}

export default XPathInjection
