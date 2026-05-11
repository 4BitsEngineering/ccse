export const metadata = {
  title: "Condiciones de uso — CCSE",
  description:
    "Condiciones del servicio CCSE: qué ofrecemos, precio, política de acceso, reembolsos y responsabilidades.",
};

const FECHA = "10 de mayo de 2026";

export default function CondicionesPage() {
  return (
    <>
      <h1>Condiciones de uso</h1>
      <p>
        <em>Última actualización: {FECHA}.</em>
      </p>

      <h2>1. Quién presta el servicio</h2>
      <p>
        El servicio lo presta <strong>4Bits Engineering</strong>{" "}
        (en adelante "nosotros"). Si necesitas escribirnos para algo
        legal, contacta con <code>contacto@4bits.engineering</code>.
      </p>

      <h2>2. Qué ofrecemos</h2>
      <p>
        Una plataforma web para preparar la prueba CCSE (Conocimientos
        Constitucionales y Socioculturales de España) del Instituto
        Cervantes, requisito para obtener la nacionalidad española por
        residencia. La plataforma incluye:
      </p>
      <ul>
        <li>Las 300 preguntas oficiales del banco con explicación.</li>
        <li>Apuntes de los 5 temas del manual en español B1.</li>
        <li>5 simulacros con cronómetro de 45 minutos.</li>
        <li>
          Repaso espaciado, tracking de progreso y descargas en PDF.
        </li>
      </ul>
      <p>
        El examen oficial CCSE lo organiza el Instituto Cervantes; nosotros
        no tenemos relación con él más allá del uso del manual oficial,
        que es de dominio público.
      </p>

      <h2>3. Precio y modalidad</h2>
      <ul>
        <li>
          <strong>4,99 €</strong>, IVA incluido, una vez. No es una
          suscripción.
        </li>
        <li>
          El acceso dura <strong>365 días naturales</strong> desde el
          momento del pago.
        </li>
        <li>
          No se renueva sola. Si quieres seguir, vuelves a comprar tú
          mismo.
        </li>
        <li>
          Durante esos 365 días, te servimos el manual vigente del
          Cervantes. Si publican un manual nuevo en mitad de tu año, tu
          acceso pasa al material nuevo sin pagar extra.
        </li>
      </ul>

      <h2>4. Reembolsos</h2>
      <p>
        No ofrecemos reembolso una vez activado el acceso. La razón:
      </p>
      <ul>
        <li>
          La convocatoria fallida del CCSE ya está cubierta por el propio
          Instituto Cervantes con una segunda convocatoria gratuita
          dentro de 18 meses.
        </li>
        <li>
          Para evitar dudas antes de pagar, ofrecemos una demo gratuita
          de 10 preguntas y la Tarea 1 entera abiertas sin registro.
        </li>
      </ul>
      <p>
        Esta exclusión es válida por la naturaleza digital del servicio
        y por haberte ofrecido una muestra equivalente, conforme al
        artículo 103.m del Real Decreto Legislativo 1/2007 (TRLGDCU).
      </p>

      <h2>5. Política de erratas</h2>
      <p>
        Si detectamos un error en una explicación o pista, lo corregimos
        en silencio (sin notificación masiva) y queda anotado en la
        página <a href="/cambios">/cambios</a>.
      </p>

      <h2>6. Uso permitido</h2>
      <p>
        Puedes usar la plataforma para preparar tu propio examen. No
        puedes:
      </p>
      <ul>
        <li>Copiar el contenido y publicarlo en otra web o servicio.</li>
        <li>Compartir tu acceso con varias personas a la vez.</li>
        <li>
          Hacer scraping automatizado de las páginas de pregunta o tema.
        </li>
      </ul>
      <p>
        Las 300 preguntas son del banco oficial del Instituto Cervantes
        (dominio público). Nuestras explicaciones, mnemotécnicos y
        apuntes son obra original protegida por derechos de autor.
      </p>

      <h2>7. Responsabilidad</h2>
      <p>
        Hacemos todo lo posible para que el contenido sea correcto y la
        plataforma funcione 24/7. Aun así:
      </p>
      <ul>
        <li>
          No garantizamos que apruebes el examen. El resultado depende
          de ti y del propio Cervantes.
        </li>
        <li>
          No respondemos por interrupciones puntuales del servicio
          causadas por nuestros proveedores (Vercel, Stripe).
        </li>
        <li>
          Nuestra responsabilidad económica máxima frente a cualquier
          reclamación está limitada al importe pagado por ti
          (4,99 €).
        </li>
      </ul>

      <h2>8. Cambios al servicio</h2>
      <p>
        Podemos añadir, modificar o retirar funcionalidades. Si retiramos
        algo importante prometido en el momento de tu compra (por
        ejemplo los simulacros), te lo comunicamos y te ofrecemos un
        reembolso proporcional al tiempo restante.
      </p>

      <h2>9. Cancelación</h2>
      <p>
        Puedes cancelar tu cuenta cuando quieras desde{" "}
        <a href="/cuenta">/cuenta</a>. Esto borra tus datos personales
        (manteniendo los datos fiscales por la obligación legal de 6
        años). El acceso comprado se pierde sin reembolso.
      </p>

      <h2>10. Ley aplicable y jurisdicción</h2>
      <p>
        Estas condiciones se rigen por la ley española. Para cualquier
        controversia, las partes se someten a los juzgados y tribunales
        del domicilio del consumidor cuando éste actúe como tal,
        conforme al artículo 90.2 del TRLGDCU.
      </p>
    </>
  );
}
