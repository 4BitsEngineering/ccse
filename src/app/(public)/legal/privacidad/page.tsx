export const metadata = {
  title: "Política de privacidad — CCSE",
  description:
    "Cómo tratamos tus datos personales en la plataforma CCSE: qué recogemos, con quién compartimos y tus derechos conforme al RGPD.",
};

const FECHA = "13 de mayo de 2026";
const VERSION = "1.0";

export default function PrivacidadPage() {
  return (
    <>
      <h1>Política de privacidad</h1>
      <p>
        <em>
          Versión {VERSION} — Última actualización: {FECHA}.
        </em>
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>4 BITS ENGINEERING SL</strong>
        </li>
        <li>CIF: B27563725</li>
        <li>
          Domicilio: C/ Jose Luis Navarro Campello 1, 03202 Elche (Alicante),
          España
        </li>
        <li>
          Contacto: <code>info@4bitsengineering.com</code>
        </li>
      </ul>

      <h2>2. Datos que recogemos</h2>
      <ul>
        <li>
          <strong>Correo electrónico</strong>: identificación de la cuenta,
          envío del enlace de acceso (magic link) y los recibos de compra.
        </li>
        <li>
          <strong>Datos de pago</strong>: gestionados íntegramente por
          Stripe. No almacenamos datos de tarjeta. Conservamos únicamente un
          identificador interno de la compra y la fecha de expiración del
          acceso, para saber qué contenido tienes habilitado.
        </li>
        <li>
          <strong>Progreso de estudio</strong>: preguntas vistas, acertadas
          o falladas y resultados de los simulacros. Se almacenan en tu
          navegador y se sincronizan con tu cuenta cuando hay sesión activa,
          para que puedas continuar desde cualquier dispositivo.
        </li>
        <li>
          <strong>Métricas de uso anónimas</strong>: número de páginas
          vistas, tiempo medio, dispositivo y país a nivel agregado. No
          identifican a personas.
        </li>
        <li>
          <strong>Registro de aceptación de términos</strong>: fecha y
          versión de las condiciones aceptadas en el momento del registro o
          de la compra.
        </li>
      </ul>

      <h2>3. Finalidades y base legitimadora</h2>
      <ul>
        <li>
          <strong>Prestación del servicio y acceso a la plataforma</strong>{" "}
          (ejecución de contrato, art. 6.1.b RGPD): crear y mantener tu
          cuenta, procesar la compra y dar acceso al material y a los
          simulacros.
        </li>
        <li>
          <strong>Envío del enlace de acceso (magic link)</strong>{" "}
          (ejecución de contrato): habilitar el inicio de sesión sin
          contraseña.
        </li>
        <li>
          <strong>Comunicaciones sobre el servicio</strong> (interés
          legítimo, art. 6.1.f RGPD): notificaciones sobre cambios del
          material adquirido, novedades del manual oficial o incidencias en
          la cuenta. No enviamos correos comerciales sin tu consentimiento.
        </li>
        <li>
          <strong>Cumplimiento de obligaciones legales</strong> (art. 6.1.c
          RGPD): conservación de facturas, registros fiscales y registros
          de aceptación de condiciones.
        </li>
      </ul>

      <h2>4. Plazo de conservación</h2>
      <ul>
        <li>
          <strong>Datos de la cuenta y progreso</strong>: mientras tengas la
          cuenta activa o un acceso comprado vigente. Si solicitas el
          borrado o han pasado 24 meses desde tu última compra sin renovar,
          los eliminamos.
        </li>
        <li>
          <strong>Datos de facturación</strong>: 6 años, por obligación
          legal (Código de Comercio art. 30 y Ley General Tributaria art.
          66).
        </li>
        <li>
          <strong>Registro de aceptación de términos</strong>: durante la
          relación contractual más 3 años adicionales.
        </li>
        <li>
          <strong>Métricas anónimas</strong>: sin periodo de caducidad,
          porque no identifican a personas.
        </li>
      </ul>

      <h2>5. Destinatarios y transferencias internacionales</h2>
      <p>
        Los datos pueden ser comunicados a los siguientes encargados del
        tratamiento, todos sujetos a contratos de encargo conforme al art.
        28 RGPD:
      </p>
      <ul>
        <li>
          <strong>Stripe Payments Europe Ltd.</strong> (procesamiento de
          pagos) — sede en Irlanda (UE). Puede implicar transferencia a
          Stripe Inc. (EE.UU.) bajo las cláusulas contractuales tipo
          aprobadas por la Comisión Europea.
        </li>
        <li>
          <strong>Supabase Inc.</strong> (autenticación, base de datos e
          infraestructura) — datos almacenados en servidores de la Unión
          Europea (Frankfurt).
        </li>
        <li>
          <strong>Vercel Inc.</strong> (alojamiento web y métricas básicas
          de visitas) — implica transferencia a EE.UU. bajo las cláusulas
          contractuales tipo aprobadas por la Comisión Europea.
        </li>
      </ul>
      <p>
        No vendemos tus datos a terceros. No los usamos para perfilado
        publicitario. No se aplican decisiones automatizadas con efectos
        jurídicos sobre ti.
      </p>

      <h2>6. Derechos del interesado</h2>
      <p>
        Conforme al Reglamento General de Protección de Datos (RGPD) puedes
        ejercer en cualquier momento, sin coste, los siguientes derechos
        dirigiéndote a <code>info@4bitsengineering.com</code>:
      </p>
      <ul>
        <li>
          <strong>Acceso</strong>: conocer qué datos tratamos sobre ti.
        </li>
        <li>
          <strong>Rectificación</strong>: corregir datos inexactos o
          incompletos.
        </li>
        <li>
          <strong>Supresión</strong>: solicitar la eliminación de tus datos
          ("derecho al olvido").
        </li>
        <li>
          <strong>Oposición</strong>: oponerte al tratamiento basado en
          interés legítimo.
        </li>
        <li>
          <strong>Portabilidad</strong>: recibir tus datos en formato
          estructurado (JSON).
        </li>
        <li>
          <strong>Limitación</strong>: solicitar la restricción del
          tratamiento en determinados supuestos.
        </li>
      </ul>
      <p>
        Respondemos en un plazo máximo de 30 días. Tienes derecho a
        presentar una reclamación ante la{" "}
        <strong>Agencia Española de Protección de Datos</strong> (
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
        >
          aepd.es
        </a>
        ) si consideras que el tratamiento no se ajusta a la normativa
        vigente.
      </p>

      <h2>7. Menores de edad</h2>
      <p>
        No dirigimos el servicio a menores de 14 años. Si tenemos
        constancia de que un usuario es menor de 14, eliminamos su cuenta y
        los datos asociados.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Este sitio utiliza únicamente cookies técnicas necesarias para el
        funcionamiento de la plataforma (sesión de usuario, preferencias).
        No se utilizan cookies de seguimiento ni publicitarias de terceros.
        Más detalle en la <a href="/legal/cookies">política de cookies</a>.
      </p>

      <h2>9. Cambios en esta política</h2>
      <p>
        Si modificamos algo relevante, te avisamos por correo y queda
        registrado en <a href="/cambios">/cambios</a>. La fecha y la
        versión de la última actualización aparecen al inicio del
        documento.
      </p>
    </>
  );
}
