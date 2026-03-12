import React from 'react'
import { LogOut, User, Shield, Clock, CheckCircle } from 'lucide-react'
import './ProfilePage.css'

function ProfilePage({ user, injectionType, onLogout }) {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-icon">
          <User size={60} color="#3b82f6" />
        </div>
        <div className="header-content">
          <h1>Perfil de Usuario</h1>
          <p className="subtitle">Bienvenido, {user.username}!</p>
        </div>
        <button onClick={onLogout} className="btn-logout">
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </div>

      <div className="profile-grid">
        <div className="profile-card primary">
          <div className="card-icon">👤</div>
          <div className="card-content">
            <h3>Usuario</h3>
            <p className="card-value">{user.username}</p>
          </div>
        </div>

        <div className="profile-card primary">
          <div className="card-icon">🔑</div>
          <div className="card-content">
            <h3>Contraseña</h3>
            <p className="card-value">{'•'.repeat(user.password.length)}</p>
          </div>
        </div>

        <div className="profile-card success">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <h3>Estado de Autenticación</h3>
            <p className="card-value">Verificado</p>
          </div>
        </div>

        <div className="profile-card info">
          <div className="card-icon">🎯</div>
          <div className="card-content">
            <h3>Tipo de Inyección</h3>
            <p className="card-value">{injectionType || 'Credenciales Válidas'}</p>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h2>Datos de Inicio de Sesión</h2>
        <div className="details-grid">
          <div className="detail-item">
            <label>Usuario Ingresado:</label>
            <code>{user.username}</code>
          </div>
          <div className="detail-item">
            <label>Contraseña Ingresada:</label>
            <code>{'•'.repeat(user.password.length)}</code>
          </div>
          <div className="detail-item">
            <label>Método de Acceso:</label>
            <code>{injectionType ? `${injectionType} Injection` : 'Credenciales Legítimas'}</code>
          </div>
          <div className="detail-item">
            <label>Fecha y Hora:</label>
            <code>{new Date().toLocaleString('es-ES')}</code>
          </div>
        </div>
      </div>

      {injectionType && (
        <div className="injection-info">
          <h3>ℹ️ Información de la Inyección</h3>
          <div className="injection-details">
            <p>
              <strong>Tipo Detectado:</strong> {injectionType} Injection
            </p>
            <p>
              <strong>Estado:</strong> Se detectó un patrón de inyección en los datos ingresados
            </p>
            <p>
              <strong>Resultado:</strong> La inyección fue interceptada y procesada correctamente
            </p>
            <p>
              <strong>Lección:</strong> Este es un ejemplo educativo de cómo funcionan las inyecciones.
              En una aplicación real, estas vulnerabilidades comprometería la seguridad del sistema.
            </p>
          </div>
        </div>
      )}

      <div className="security-tips">
        <h3>🛡️ Consejos de Seguridad</h3>
        <ul>
          <li>Nunca compartas tus credenciales con terceros</li>
          <li>Usa contraseñas fuertes y únicas para cada servicio</li>
          <li>Valida siempre la entrada de datos en el servidor</li>
          <li>Usa consultas preparadas para evitar inyecciones SQL</li>
          <li>Implementa rate limiting para prevenir ataques de fuerza bruta</li>
          <li>Mantén tus sistemas y dependencias actualizadas</li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePage
