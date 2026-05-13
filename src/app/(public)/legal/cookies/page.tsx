export const metadata = {
  title: "Política de cookies — CCSE",
  description:
    "Qué cookies y almacenamiento local usamos en la plataforma CCSE y para qué.",
};

const FECHA = "12 de mayo de 2026";

export default function CookiesPage() {
  return (
    <>
      <h1>Política de cookies</h1>
      <p>
        <em>Última actualización: {FECHA}.</em>
      </p>

      <h2>Qué guardamos en tu navegador</h2>
      <p>
        Para que el servicio funcione usamos dos cosas:{" "}
        <strong>cookies</strong> y <strong>localStorage</strong>. Te
        contamos cada una en plata.
      </p>

      <h2>Cookies técnicas (necesarias)</h2>
      <p>
        Son las imprescindibles para que la web funcione. No piden
        consentimiento.
      </p>
      <ul>
        <li>
          <strong>Sesión de autenticación</strong>: identifica tu cuenta
          activa entre páginas. Se borra al cerrar sesión.
        </li>
        <li>
          <strong>Sesión de pago</strong> (solo durante el proceso de
          compra): mantiene tu sesión segura mientras completas el pago
          con Stripe Checkout.
        </li>
      </ul>

      <h2>Cookies de analítica anónima</h2>
      <p>
        Nos ayudan a saber qué páginas se visitan, sin identificar a
        nadie. Son agregadas y respetan tu privacidad.
      </p>
      <ul>
        <li>
          <strong>Vercel Analytics</strong>: cuenta visitas sin cookies
          de tracking ni huella digital.
        </li>
      </ul>

      <h2>localStorage de tu navegador</h2>
      <p>
        Es almacenamiento del propio navegador, no se envía con cada
        petición y solo lo lee esta web. Lo usamos para:
      </p>
      <ul>
        <li>
          <code>ccse:v1:entitlement</code> — caché local del estado de tu
          acceso (activo / expirado) para evitar parpadeos de interfaz.
          Se sincroniza con el servidor al iniciar sesión.
        </li>
        <li>
          <code>ccse:v1:progreso:estados</code> — qué preguntas has
          visto, fallado o dominado.
        </li>
        <li>
          <code>ccse:v1:progreso:simulacros</code> — historial de
          simulacros que has hecho.
        </li>
        <li>
          <code>ccse:v1:progreso:last</code> — la última actividad para
          el «Continuar donde lo dejaste» del panel.
        </li>
      </ul>
      <p>
        Cuando tienes sesión activa, este progreso se sincroniza
        automáticamente con tu cuenta para que puedas continuar desde
        otro dispositivo. Sin sesión, solo vive en este navegador.
      </p>

      <h2>Cookies de terceros publicitarios</h2>
      <p>
        <strong>Ninguna.</strong> No mostramos publicidad, no compartimos
        tus datos con anunciantes, no hay píxeles de Facebook, Google ni
        equivalentes.
      </p>

      <h2>Cómo desactivar todo esto</h2>
      <ul>
        <li>
          <strong>Cookies y localStorage</strong>: desde la configuración
          de privacidad de tu navegador puedes bloquearlas o borrarlas.
          Si lo haces, perderás tu progreso y tu acceso comprado en
          este dispositivo (volvería a verse el paywall).
        </li>
        <li>
          <strong>Borrado limpio del progreso</strong>: en{" "}
          <a href="/cuenta">/cuenta</a> tienes una opción para
          eliminarlo desde la web sin tocar el navegador.
        </li>
      </ul>

      <h2>Cambios en esta política</h2>
      <p>
        Si añadimos un nuevo proveedor o tipo de cookie te avisamos por
        correo (si tienes cuenta) y queda anotado en{" "}
        <a href="/cambios">/cambios</a>.
      </p>
    </>
  );
}
