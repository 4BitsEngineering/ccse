export const metadata = {
  title: "Política de privacidad — CCSE",
  description:
    "Cómo tratamos tus datos personales en la plataforma CCSE: qué recogemos, con quién compartimos y tus derechos.",
};

const FECHA = "12 de mayo de 2026";

export default function PrivacidadPage() {
  return (
    <>
      <h1>Política de privacidad</h1>
      <p>
        <em>Última actualización: {FECHA}.</em>
      </p>

      <h2>Quién es responsable de tus datos</h2>
      <p>
        El responsable del tratamiento es <strong>4Bits Engineering</strong>.
        Para cualquier consulta sobre privacidad o ejercer tus derechos,
        escribe a <code>privacidad@4bits.engineering</code>.
      </p>

      <h2>Qué datos recogemos y para qué</h2>
      <p>
        Solo recogemos los datos imprescindibles para que el servicio
        funcione:
      </p>
      <ul>
        <li>
          <strong>Correo electrónico</strong>: para identificar tu cuenta,
          enviarte el enlace de acceso (magic link) y los recibos de compra.
        </li>
        <li>
          <strong>Cuando compras</strong>: el cobro lo procesa Stripe.
          Nosotros no almacenamos datos de tarjeta. Sí guardamos un
          identificador interno de tu compra y la fecha de expiración del
          acceso, para saber qué contenido tienes habilitado.
        </li>
        <li>
          <strong>Tu progreso de estudio</strong>: qué preguntas has visto,
          acertado o fallado, y los resultados de tus simulacros. Se guarda
          en tu navegador y se sincroniza con tu cuenta cuando hay sesión
          activa, para que puedas continuar desde cualquier dispositivo.
        </li>
        <li>
          <strong>Métricas de uso anónimas</strong>: número de páginas
          vistas, tiempo medio, dispositivo, país a nivel general. No
          identifican a personas.
        </li>
      </ul>

      <h2>Con quién compartimos</h2>
      <ul>
        <li>
          <strong>Stripe Payments Europe Ltd.</strong> — procesa los pagos.
          Política propia de Stripe.
        </li>
        <li>
          <strong>Vercel Inc.</strong> — alojamiento de la web y métricas
          básicas de visitas, anónimas.
        </li>
        <li>
          <strong>Proveedor de autenticación y base de datos</strong> —
          almacena tu cuenta, tu progreso y gestiona el envío de los emails
          transaccionales (enlace de acceso). Servidores en la Unión Europea.
        </li>
      </ul>
      <p>
        No vendemos tus datos a terceros. No los usamos para perfilado
        publicitario.
      </p>

      <h2>Cuánto tiempo conservamos los datos</h2>
      <ul>
        <li>
          <strong>Datos de la cuenta</strong>: mientras tengas la cuenta
          activa o un acceso comprado vigente. Si pides el borrado o han
          pasado 24 meses desde tu última compra sin renovar, los
          eliminamos.
        </li>
        <li>
          <strong>Datos de facturación</strong>: 6 años, por obligación
          legal (Ley General Tributaria art. 66).
        </li>
        <li>
          <strong>Métricas anónimas</strong>: agregadas por defecto, no
          tienen periodo de caducidad porque no identifican a personas.
        </li>
      </ul>

      <h2>Tus derechos</h2>
      <p>
        Conforme al Reglamento General de Protección de Datos (RGPD)
        puedes ejercer sin coste:
      </p>
      <ul>
        <li>Acceso a los datos que tenemos sobre ti.</li>
        <li>Rectificación si están incorrectos.</li>
        <li>Supresión ("derecho al olvido").</li>
        <li>Portabilidad: te enviamos tus datos en JSON.</li>
        <li>Oposición y limitación del tratamiento.</li>
        <li>
          Reclamación ante la <strong>Agencia Española de Protección de
          Datos</strong> (aepd.es) si crees que vulneramos tus derechos.
        </li>
      </ul>
      <p>
        Para ejercerlos: <code>privacidad@4bits.engineering</code>.
        Respondemos en menos de 30 días.
      </p>

      <h2>Menores de edad</h2>
      <p>
        No dirigimos el servicio a menores de 14 años. Si creemos que un
        usuario es menor de 14, eliminamos su cuenta.
      </p>

      <h2>Cambios en esta política</h2>
      <p>
        Si cambiamos algo importante, te avisamos por correo y queda
        registrado en <a href="/cambios">/cambios</a>. La fecha de la
        última actualización aparece arriba.
      </p>
    </>
  );
}
