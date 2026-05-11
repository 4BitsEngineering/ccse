// Datos compartidos para las pantallas de CCSE
window.CCSE_DATA = {
  preguntas: [
    {
      id: 'CCSE-2026-1001',
      idOficial: '1001',
      tarea: 1,
      tareaTitulo: 'Gobierno, legislación y participación',
      enunciado: 'España es…',
      opciones: {
        a: 'una monarquía parlamentaria.',
        b: 'una república federal.',
        c: 'una monarquía federal.',
      },
      correcta: 'a',
      paginaManual: 18,
      explicacion: 'La Constitución de 1978 (art. 1.3) establece que la forma política del Estado español es la Monarquía parlamentaria. Hay un rey como jefe del Estado, pero no gobierna; gobierna un Gobierno elegido a partir del Parlamento.',
      distractores: {
        b: 'España no es una república: la jefatura del Estado es hereditaria (la Corona), no se elige por votación.',
        c: 'España es una monarquía, pero no es federal. Su organización territorial es el Estado de las Autonomías.',
      },
      mnemo: 'Mona-Parla → MOnarquía PARLAmentaria.',
      dificultad: 'fácil',
      bloque: 'Bloque 2 · Forma del Estado',
    },
    {
      id: 'CCSE-2026-1002',
      idOficial: '1002',
      tarea: 1,
      tareaTitulo: 'Gobierno, legislación y participación',
      enunciado: 'La ley fundamental de España se llama…',
      opciones: {
        a: 'Constitución.',
        b: 'Ley básica.',
        c: 'Código civil.',
      },
      correcta: 'a',
      paginaManual: 6,
      explicacion: 'La Constitución española, aprobada en 1978, es la norma suprema del ordenamiento jurídico. Todas las demás leyes están subordinadas a ella.',
      distractores: {
        b: '"Ley básica" no es un término que se use en España; sí en Alemania (Grundgesetz).',
        c: 'El Código Civil regula relaciones entre personas (familia, herencias…), no la estructura del Estado.',
      },
      mnemo: '1978 + suprema = Constitución.',
      dificultad: 'fácil',
      bloque: 'Bloque 1 · Constitución',
    },
    {
      id: 'CCSE-2026-2004',
      idOficial: '2004',
      tarea: 2,
      tareaTitulo: 'Derechos y deberes',
      enunciado: '¿A qué edad se obtiene el derecho al voto en España?',
      opciones: {
        a: 'A los 16 años.',
        b: 'A los 18 años.',
        c: 'A los 21 años.',
      },
      correcta: 'b',
      paginaManual: 32,
      explicacion: 'El art. 23 reconoce el derecho de sufragio activo y la mayoría de edad se alcanza a los 18 años (art. 12), edad en la que se ejerce el voto.',
      distractores: {
        a: '16 años es la edad mínima para trabajar con autorización, no para votar.',
        c: '21 era la mayoría de edad en muchos países antes; en España es 18 desde 1978.',
      },
      mnemo: '1-8 = derechos completos. Dieciocho.',
      dificultad: 'fácil',
      bloque: 'Bloque 1 · Derechos políticos',
    },
  ],

  temas: [
    { n: 1, titulo: 'Gobierno, legislación y participación', preguntas: 120, completado: 0.62 },
    { n: 2, titulo: 'Derechos y deberes fundamentales', preguntas: 36, completado: 0.41 },
    { n: 3, titulo: 'Organización territorial', preguntas: 24, completado: 0.20 },
    { n: 4, titulo: 'Historia y cultura', preguntas: 36, completado: 0.08 },
    { n: 5, titulo: 'Vida diaria, costumbres y geografía', preguntas: 84, completado: 0.55 },
  ],

  temaEjemplo: {
    n: 1,
    titulo: 'Gobierno, legislación y participación',
    parteActual: 'Las Cortes Generales',
    paginas: { actual: 14, total: 28 },
    parrafos: [
      {
        kind: 'lead',
        text: 'Las Cortes Generales son el lugar donde se hacen las leyes en España. Tienen dos partes, y juntas representan al pueblo español.',
      },
      {
        kind: 'p',
        text: 'La primera parte se llama Congreso de los Diputados. Está formado por 350 diputados. Las personas con derecho a voto los eligen cada cuatro años. El Congreso aprueba las leyes y elige al Presidente del Gobierno.',
      },
      {
        kind: 'p',
        text: 'La segunda parte se llama Senado. Representa a los territorios (a las comunidades autónomas y a las provincias). Tiene 265 senadores. Algunos los elige el pueblo y otros los eligen los parlamentos autonómicos.',
      },
      {
        kind: 'callout',
        title: 'Idea clave',
        text: 'Congreso = pueblo. Senado = territorios. Ambos juntos = Cortes Generales.',
      },
      {
        kind: 'h',
        text: '¿Quién puede ser diputado?',
      },
      {
        kind: 'p',
        text: 'Cualquier persona mayor de 18 años, con nacionalidad española y que esté en pleno uso de sus derechos políticos. No hace falta tener estudios ni una profesión concreta.',
      },
    ],
  },

  progreso: {
    racha: 12,
    diasEstudiados: 23,
    preguntasVistas: 187,
    preguntasDominio: 142,
    simulacrosTotales: 6,
    simulacrosAprobados: 4,
    mediaSimulacros: 22.5,
    porTema: [
      { tema: 'Tarea 1 · Gobierno', dominio: 0.74, total: 120 },
      { tema: 'Tarea 2 · Derechos', dominio: 0.55, total: 36 },
      { tema: 'Tarea 3 · Territorial', dominio: 0.30, total: 24 },
      { tema: 'Tarea 4 · Historia', dominio: 0.18, total: 36 },
      { tema: 'Tarea 5 · Vida diaria', dominio: 0.62, total: 84 },
    ],
    ultimoSimulacro: {
      fecha: 'Hoy · 19:42',
      resultado: 23,
      tiempo: '38:14',
      aprobado: true,
    },
  },

  simulacroResultado: {
    total: 25,
    aciertos: 23,
    fallos: 2,
    enBlanco: 0,
    tiempo: '38:14',
    aprobado: true,
    minimoAprobar: 15,
    porBloque: [
      { tarea: 1, label: 'Gobierno', aciertos: 8, total: 10 },
      { tarea: 2, label: 'Derechos', aciertos: 3, total: 3 },
      { tarea: 3, label: 'Territorial', aciertos: 2, total: 2 },
      { tarea: 4, label: 'Historia', aciertos: 3, total: 3 },
      { tarea: 5, label: 'Vida diaria', aciertos: 7, total: 7 },
    ],
    fallidas: [
      { idOf: '1142', enunciado: 'El número de diputados del Congreso es…', tarea: 1 },
      { idOf: '4087', enunciado: '¿Cuándo se firmó el Tratado de Adhesión a la CEE?', tarea: 4 },
    ],
  },
};
