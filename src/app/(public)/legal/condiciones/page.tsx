export const metadata = {
  title: "Términos y Condiciones de Venta — CCSE",
  description:
    "Condiciones del servicio CCSE: vendedor, objeto, precio, acceso, desistimiento, propiedad intelectual y responsabilidades.",
};

const FECHA = "13 de mayo de 2026";
const VERSION = "1.0";

export default function CondicionesPage() {
  return (
    <>
      <h1>Términos y Condiciones de Venta</h1>
      <p>
        <em>
          Versión {VERSION} — Última actualización: {FECHA}.
        </em>
      </p>

      <h2>1. Datos del vendedor</h2>
      <p>
        El presente sitio web es operado por{" "}
        <strong>4 BITS ENGINEERING SL</strong>, con CIF B27563725,
        domicilio social en C/ Jose Luis Navarro Campello 1, 03202 Elche
        (Alicante), España, inscrita en el Registro Mercantil de Alicante.
        Contacto: <code>info@4bitsengineering.com</code>.
      </p>

      <h2>2. Objeto del servicio</h2>
      <p>
        La plataforma comercializa material de estudio digital para la
        preparación de la prueba <strong>CCSE</strong> (Conocimientos
        Constitucionales y Socioculturales de España) del Instituto
        Cervantes, requisito para la obtención de la nacionalidad española
        por residencia. El servicio incluye:
      </p>
      <ul>
        <li>Las 300 preguntas oficiales del banco con explicación razonada.</li>
        <li>
          Apuntes de los 5 temas del manual oficial, redactados en
          español B1.
        </li>
        <li>5 simulacros con cronómetro y formato del examen real.</li>
        <li>
          Repaso espaciado de las preguntas falladas, seguimiento de
          progreso y descargas en PDF.
        </li>
      </ul>
      <p>
        El material es de carácter complementario y orientativo.{" "}
        <strong>4 BITS ENGINEERING SL</strong> no es una academia oficial,
        no mantiene relación con el Instituto Cervantes más allá del uso
        del manual y banco de preguntas oficiales (de difusión pública), y
        su contratación <strong>no garantiza el aprobado</strong> del
        examen.
      </p>

      <h2>3. Material generado con asistencia de inteligencia artificial</h2>
      <p>
        Las explicaciones, distractores, pistas mnemotécnicas y apuntes se
        elaboran con el apoyo de herramientas de inteligencia artificial
        generativa y son sometidos a revisión humana antes de su
        publicación. El contenido se basa en el manual oficial del Instituto
        Cervantes y en el banco de 300 preguntas oficiales publicado por el
        propio organismo.
      </p>
      <p>
        El material se actualiza periódicamente para adaptarse a las
        revisiones del manual y a los cambios normativos. No obstante,{" "}
        <strong>4 BITS ENGINEERING SL</strong> no garantiza que el contenido
        esté libre de errores o que refleje en todo momento la última
        modificación legislativa. Se recomienda contrastar el material con
        las fuentes oficiales.
      </p>
      <p>
        Si detectamos un error, lo corregimos en silencio (sin notificación
        individual) y queda anotado en la página{" "}
        <a href="/cambios">/cambios</a>. En ningún caso la empresa será
        responsable de los perjuicios derivados de posibles inexactitudes,
        desactualizaciones o errores en el contenido del material.
      </p>

      <h2>4. Precios y condiciones de pago</h2>
      <ul>
        <li>
          El precio del acceso anual es de <strong>9,99 €</strong>, IVA
          incluido. Compra única, no es una suscripción y no se renueva
          automáticamente.
        </li>
        <li>
          El precio vigente en el momento de completar la compra es el que
          se aplica a la transacción, con independencia de modificaciones
          posteriores.
        </li>
        <li>El pago se realiza en un único cargo a través de Stripe.</li>
      </ul>

      <h2>5. Entrega y acceso al material</h2>
      <p>
        Una vez confirmado el pago, el comprador obtiene acceso inmediato a
        toda la plataforma (apuntes, banco de preguntas, simulacros y
        descargas en PDF) desde su área privada. El acceso tiene una
        duración de <strong>365 días naturales</strong> desde la fecha del
        pago. Si durante ese periodo el Instituto Cervantes publica un
        manual nuevo, el acceso pasa automáticamente al material vigente
        sin coste adicional.
      </p>
      <p>
        El acceso es estrictamente personal: una cuenta por persona. No se
        permite compartir credenciales con terceros.
      </p>

      <h2>6. Derecho de desistimiento</h2>
      <p>
        De conformidad con el artículo 103.m) del Real Decreto Legislativo
        1/2007 (TRLGDCU), el derecho de desistimiento{" "}
        <strong>no es aplicable</strong> a los contratos de suministro de
        contenido digital que no se preste en soporte material cuando la
        ejecución haya comenzado con previo consentimiento expreso del
        consumidor y con el reconocimiento de que perderá su derecho de
        desistimiento.
      </p>
      <p>
        Al aceptar estas condiciones y proceder al pago, el comprador
        reconoce expresamente que consiente el inicio inmediato de la
        entrega del contenido digital y que, por tanto, renuncia a su
        derecho de desistimiento una vez activado el acceso.
      </p>
      <p>
        Para evitar dudas antes del pago, ofrecemos una demo gratuita de 10
        preguntas reales del banco oficial sin necesidad de registro.
        Además, en caso de no superar el examen, el Instituto Cervantes
        contempla una segunda convocatoria gratuita dentro de los 18 meses
        siguientes, durante los cuales el acceso a la plataforma se
        mantiene activo si está en vigor.
      </p>

      <h2>7. Propiedad intelectual y uso permitido</h2>
      <p>
        El comprador puede usar la plataforma para la preparación de su
        propio examen. Las 300 preguntas oficiales son contenido público
        del Instituto Cervantes. Las explicaciones, distractores razonados,
        pistas mnemotécnicas y apuntes son <strong>obra original</strong>{" "}
        de 4 BITS ENGINEERING SL y están protegidos por derechos de autor.
      </p>
      <p>Queda expresamente prohibido:</p>
      <ul>
        <li>
          Reproducir total o parcialmente el contenido, distribuirlo,
          comunicarlo públicamente o transformarlo sin autorización
          expresa.
        </li>
        <li>Compartir el acceso con varias personas a la vez.</li>
        <li>
          Realizar scraping automatizado de las páginas de pregunta o
          tema.
        </li>
      </ul>
      <p>
        El incumplimiento podrá dar lugar a las acciones legales
        correspondientes y a la suspensión inmediata del acceso sin
        derecho a reembolso.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <ul>
        <li>
          La empresa <strong>no garantiza el aprobado</strong> del examen
          CCSE. El resultado depende del esfuerzo del comprador y del
          propio Instituto Cervantes.
        </li>
        <li>
          La empresa no responde de los cambios normativos sobrevenidos
          tras la fecha de compra.
        </li>
        <li>
          La empresa no garantiza la disponibilidad continua e
          ininterrumpida de la plataforma; pueden producirse interrupciones
          puntuales causadas por proveedores externos (Vercel, Stripe,
          Supabase).
        </li>
        <li>
          El uso de los simulacros es orientativo; sus resultados no tienen
          valor oficial ni académico.
        </li>
        <li>
          La responsabilidad económica máxima de la empresa frente a
          cualquier reclamación queda limitada al importe efectivamente
          pagado por el comprador.
        </li>
      </ul>

      <h2>9. Cambios al servicio</h2>
      <p>
        La empresa puede añadir, modificar o retirar funcionalidades de la
        plataforma. Si se retira algo sustancial prometido en el momento
        de la compra (por ejemplo, los simulacros), se comunicará al
        comprador y se ofrecerá un reembolso proporcional al tiempo
        restante de acceso.
      </p>

      <h2>10. Cancelación de la cuenta</h2>
      <p>
        El comprador puede cancelar su cuenta cuando lo desee desde{" "}
        <a href="/cuenta">/cuenta</a>. La cancelación supone el borrado de
        los datos personales asociados, manteniendo los datos fiscales
        durante el plazo legal exigido (6 años). El acceso comprado se
        pierde, sin reembolso, conforme al apartado 6.
      </p>

      <h2>11. Ley aplicable y jurisdicción</h2>
      <p>
        El presente contrato se rige por la legislación española. Para la
        resolución de controversias, las partes se someten a los Juzgados
        y Tribunales del domicilio del consumidor, conforme a lo dispuesto
        en el TRLGDCU, o a los Juzgados de Elche (Alicante) si el
        comprador no ostenta la condición de consumidor.
      </p>
    </>
  );
}
