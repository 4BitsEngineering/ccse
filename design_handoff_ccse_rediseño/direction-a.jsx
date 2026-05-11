// Direction A — "Manual" — Editorial cream, classical serif, ink granate
// Sensación de libro encuadernado oficial.

const A_TOKENS = {
  paper: '#F3EDE0',
  paperEdge: '#EAE2D1',
  ink: '#1F1812',
  inkSoft: '#5C4F40',
  inkMuted: '#8A7A65',
  rule: '#C9BCA3',
  ruleSoft: '#DDD0B6',
  granate: '#7A2620',
  granateSoft: '#A14A3F',
  gold: '#A87C2A',
  goldSoft: '#D9B96F',
  green: '#3D5C2A',
  serif: '"Spectral", "Source Serif Pro", Georgia, serif',
  mono: '"Geist Mono", "IBM Plex Mono", ui-monospace, monospace',
};

// Tiny decorative ornament (centered fleuron-ish, no figurative)
function AOrnament({ width = 80, color = A_TOKENS.granate }) {
  return (
    <svg width={width} height="14" viewBox="0 0 80 14" style={{ display: 'block' }}>
      <line x1="0" y1="7" x2="30" y2="7" stroke={color} strokeWidth="0.6" />
      <circle cx="40" cy="7" r="2.2" fill={color} />
      <circle cx="32" cy="7" r="0.9" fill={color} />
      <circle cx="48" cy="7" r="0.9" fill={color} />
      <line x1="50" y1="7" x2="80" y2="7" stroke={color} strokeWidth="0.6" />
    </svg>
  );
}

// Folio number + running head, like a book
function AFolio({ chapter, folio, side = 'l' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '6px 0', fontFamily: A_TOKENS.serif,
      fontSize: 10.5, color: A_TOKENS.inkMuted,
      letterSpacing: 0.6, textTransform: 'uppercase',
      borderBottom: `0.5px solid ${A_TOKENS.rule}`,
      marginBottom: 18,
    }}>
      <span style={{ fontVariant: 'small-caps' }}>{chapter}</span>
      <span style={{ flex: 1, height: 1 }} />
      <span style={{ fontFamily: A_TOKENS.mono, fontSize: 10 }}>— {folio} —</span>
    </div>
  );
}

// Page container with cream paper, generous margins, two-rule footer
function APage({ children, folio = 'i', running = 'CCSE · Manual', dark = false }) {
  return (
    <div style={{
      minHeight: '100%',
      background: A_TOKENS.paper,
      backgroundImage: `radial-gradient(circle at 30% 10%, rgba(255,255,255,0.4), transparent 60%),
                        radial-gradient(circle at 80% 90%, rgba(122, 38, 32, 0.04), transparent 50%)`,
      color: A_TOKENS.ink,
      fontFamily: A_TOKENS.serif,
      padding: '54px 22px 24px',
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      <AFolio chapter={running} folio={folio} />
      {children}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// A-1 · Landing (hero compacto móvil)
// ═════════════════════════════════════════════════════════════
function ALanding() {
  return (
    <APage folio="portada" running="Edición 2026">
      <div style={{ paddingTop: 22, textAlign: 'center' }}>
        <p style={{
          fontFamily: A_TOKENS.mono, fontSize: 10.5,
          letterSpacing: 2, textTransform: 'uppercase',
          color: A_TOKENS.granate, margin: 0,
        }}>
          Instituto Cervantes · Manual 2026
        </p>
        <AOrnament width={120} />
      </div>
      <h1 style={{
        fontFamily: A_TOKENS.serif, fontWeight: 500,
        fontSize: 38, lineHeight: 1.05, letterSpacing: -0.5,
        margin: '24px 0 18px', textAlign: 'center',
        color: A_TOKENS.ink,
      }}>
        Examen <span style={{ fontStyle: 'italic', color: A_TOKENS.granate }}>CCSE</span>
        <br/>
        para la <span style={{ fontStyle: 'italic' }}>nacionalidad</span>
        <br/>
        española.
      </h1>
      <p style={{
        fontFamily: A_TOKENS.serif, fontSize: 16, lineHeight: 1.55,
        color: A_TOKENS.inkSoft, textAlign: 'center',
        maxWidth: 320, margin: '0 auto 28px', textWrap: 'pretty',
      }}>
        Los apuntes oficiales, las 300 preguntas razonadas y cuatro simulacros con cronómetro real. Hecho con cariño para quien se está jugando un papel.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
        <button style={{
          fontFamily: A_TOKENS.serif, fontSize: 17,
          padding: '14px 18px', background: A_TOKENS.ink, color: A_TOKENS.paper,
          border: 'none', borderRadius: 2, letterSpacing: 0.2,
          fontStyle: 'italic',
          boxShadow: `0 1px 0 ${A_TOKENS.granate}`,
        }}>
          Probar 10 preguntas gratis
        </button>
        <button style={{
          fontFamily: A_TOKENS.serif, fontSize: 15,
          padding: '12px 18px', background: 'transparent', color: A_TOKENS.ink,
          border: `0.5px solid ${A_TOKENS.ink}`, borderRadius: 2,
        }}>
          Ver qué incluye  ·  9,99 € / año
        </button>
      </div>

      <div style={{
        marginTop: 36, padding: '18px 0',
        borderTop: `0.5px solid ${A_TOKENS.rule}`,
        borderBottom: `0.5px solid ${A_TOKENS.rule}`,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
        textAlign: 'center',
      }}>
        {[['300', 'preguntas'], ['5', 'temas'], ['∞', 'simulacros']].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: A_TOKENS.serif, fontSize: 28, fontWeight: 500, color: A_TOKENS.granate }}>{n}</div>
            <div style={{ fontFamily: A_TOKENS.mono, fontSize: 9.5, letterSpacing: 1.4, textTransform: 'uppercase', color: A_TOKENS.inkMuted, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: A_TOKENS.serif, fontStyle: 'italic',
        textAlign: 'center', fontSize: 13.5, color: A_TOKENS.inkSoft,
        marginTop: 22, lineHeight: 1.5,
      }}>
        "Llevaba dos años con la app oficial sin enterarme de nada.<br/>Aquí lo aprobé al primer simulacro."
      </p>
      <p style={{
        fontFamily: A_TOKENS.mono, fontSize: 10, letterSpacing: 1.2,
        textTransform: 'uppercase', textAlign: 'center',
        color: A_TOKENS.inkMuted, marginTop: 6,
      }}>
        — D., Quito → Madrid
      </p>
    </APage>
  );
}

// ═════════════════════════════════════════════════════════════
// A-2 · Dashboard ("Tu mesa de estudio")
// ═════════════════════════════════════════════════════════════
function ADashboard() {
  const { temas, progreso } = window.CCSE_DATA;
  return (
    <APage folio="dash" running="Tu mesa de estudio">
      <div>
        <p style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic',
          fontSize: 14, color: A_TOKENS.inkSoft, margin: 0,
        }}>Buenas tardes, Daniel.</p>
        <h2 style={{
          fontFamily: A_TOKENS.serif, fontWeight: 500, fontSize: 30,
          margin: '4px 0 2px', letterSpacing: -0.3, lineHeight: 1.1,
        }}>
          Llevas <span style={{ fontStyle: 'italic', color: A_TOKENS.granate }}>{progreso.racha} días</span>
          <br/> estudiando seguidos.
        </h2>
        <AOrnament width={70} />
      </div>

      {/* Reanudar — featured "bookmark" */}
      <div style={{
        marginTop: 22, padding: '20px 18px',
        background: '#FAF5EA',
        border: `0.5px solid ${A_TOKENS.rule}`,
        borderLeft: `3px solid ${A_TOKENS.granate}`,
        borderRadius: 2,
        position: 'relative',
      }}>
        <p style={{
          fontFamily: A_TOKENS.mono, fontSize: 9.5, letterSpacing: 1.6,
          textTransform: 'uppercase', color: A_TOKENS.granate, margin: 0,
        }}>Marcapáginas</p>
        <h3 style={{
          fontFamily: A_TOKENS.serif, fontSize: 19, fontWeight: 500,
          margin: '6px 0 4px', lineHeight: 1.25,
        }}>Tarea 1 · Las Cortes Generales</h3>
        <p style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic',
          fontSize: 13.5, color: A_TOKENS.inkSoft, margin: 0,
        }}>página 14 de 28 · ayer a las 22:31</p>
        <button style={{
          marginTop: 14, padding: '8px 14px',
          background: A_TOKENS.ink, color: A_TOKENS.paper,
          fontFamily: A_TOKENS.serif, fontSize: 13, fontStyle: 'italic',
          border: 'none', borderRadius: 2,
        }}>Continuar leyendo →</button>
      </div>

      {/* Índice de temas */}
      <h3 style={{
        fontFamily: A_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.8,
        textTransform: 'uppercase', color: A_TOKENS.inkMuted,
        marginTop: 28, marginBottom: 10, fontWeight: 500,
      }}>Índice de tareas</h3>

      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {temas.map((t) => (
          <li key={t.n} style={{
            display: 'grid',
            gridTemplateColumns: '26px 1fr auto',
            gap: 12, padding: '12px 0',
            borderBottom: `0.5px dotted ${A_TOKENS.rule}`,
            alignItems: 'baseline',
          }}>
            <span style={{
              fontFamily: A_TOKENS.serif, fontStyle: 'italic',
              fontSize: 17, color: A_TOKENS.granate,
            }}>{t.n}.</span>
            <div>
              <div style={{ fontFamily: A_TOKENS.serif, fontSize: 15.5, lineHeight: 1.3, color: A_TOKENS.ink }}>
                {t.titulo}
              </div>
              <div style={{
                fontFamily: A_TOKENS.mono, fontSize: 10.5, color: A_TOKENS.inkMuted,
                marginTop: 3, letterSpacing: 0.4,
              }}>
                {Math.round(t.completado * t.preguntas)} / {t.preguntas} preguntas
              </div>
            </div>
            <div style={{
              width: 38, height: 4, background: A_TOKENS.ruleSoft,
              alignSelf: 'center', position: 'relative', borderRadius: 0,
            }}>
              <div style={{
                width: `${Math.round(t.completado * 100)}%`, height: '100%',
                background: A_TOKENS.granate,
              }} />
            </div>
          </li>
        ))}
      </ol>

      {/* Simulacros */}
      <div style={{
        marginTop: 30, padding: '18px 0 6px',
        borderTop: `0.5px solid ${A_TOKENS.rule}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3 style={{
            fontFamily: A_TOKENS.serif, fontSize: 22, fontWeight: 500,
            margin: 0, letterSpacing: -0.2,
          }}>Simulacros</h3>
          <span style={{ fontFamily: A_TOKENS.mono, fontSize: 10.5, color: A_TOKENS.inkMuted, letterSpacing: 0.6 }}>
            {progreso.simulacrosAprobados} / {progreso.simulacrosTotales} aprobados
          </span>
        </div>
        <p style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic',
          fontSize: 14.5, color: A_TOKENS.inkSoft, margin: '8px 0 14px',
          lineHeight: 1.5,
        }}>
          25 preguntas. 45 minutos. Como el examen de verdad.
        </p>
        <button style={{
          width: '100%', padding: '13px 14px',
          background: A_TOKENS.granate, color: A_TOKENS.paper,
          border: 'none', borderRadius: 2,
          fontFamily: A_TOKENS.serif, fontSize: 16, fontStyle: 'italic',
          letterSpacing: 0.2,
        }}>
          Empezar simulacro nº 7
        </button>
      </div>
    </APage>
  );
}

// ═════════════════════════════════════════════════════════════
// A-3 · Estudiar — lectura de tema (libro)
// ═════════════════════════════════════════════════════════════
function AEstudiar() {
  const t = window.CCSE_DATA.temaEjemplo;
  return (
    <APage folio={`${t.paginas.actual} / ${t.paginas.total}`} running={`Tarea ${t.n} · ${t.parteActual}`}>
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <p style={{
          fontFamily: A_TOKENS.mono, fontSize: 9.5, letterSpacing: 2,
          textTransform: 'uppercase', color: A_TOKENS.inkMuted, margin: 0,
        }}>Capítulo {t.n}</p>
        <h1 style={{
          fontFamily: A_TOKENS.serif, fontSize: 26, fontWeight: 500,
          margin: '4px 0 2px', letterSpacing: -0.3, lineHeight: 1.15,
        }}>{t.parteActual}</h1>
        <AOrnament width={60} />
      </div>

      <p style={{
        fontFamily: A_TOKENS.serif, fontSize: 17.5, lineHeight: 1.65,
        color: A_TOKENS.ink, margin: '0 0 16px', textAlign: 'justify',
        textWrap: 'pretty',
      }}>
        <span style={{
          fontSize: 52, fontWeight: 600, lineHeight: 0.85,
          float: 'left', marginRight: 8, marginTop: 4,
          color: A_TOKENS.granate, fontStyle: 'italic',
        }}>L</span>
        as Cortes Generales son el lugar donde se hacen las leyes en España. Tienen dos partes, y juntas representan al pueblo español.
      </p>

      <p style={{
        fontFamily: A_TOKENS.serif, fontSize: 16, lineHeight: 1.65,
        color: A_TOKENS.ink, margin: '0 0 14px', textAlign: 'justify',
        textWrap: 'pretty',
      }}>
        La primera parte se llama <em>Congreso de los Diputados</em>. Está formado por <strong style={{ fontWeight: 600 }}>350 diputados</strong>. Las personas con derecho a voto los eligen cada cuatro años.
      </p>

      <p style={{
        fontFamily: A_TOKENS.serif, fontSize: 16, lineHeight: 1.65,
        color: A_TOKENS.ink, margin: '0 0 18px', textAlign: 'justify',
      }}>
        La segunda parte se llama <em>Senado</em>. Representa a los territorios (a las comunidades autónomas y a las provincias). Tiene <strong style={{ fontWeight: 600 }}>265 senadores</strong>.
      </p>

      {/* Marginalia / callout */}
      <aside style={{
        margin: '20px -4px',
        padding: '16px 18px',
        background: 'rgba(168, 124, 42, 0.08)',
        borderLeft: `2px solid ${A_TOKENS.gold}`,
        position: 'relative',
      }}>
        <p style={{
          fontFamily: A_TOKENS.mono, fontSize: 9.5, letterSpacing: 1.6,
          textTransform: 'uppercase', color: A_TOKENS.gold, margin: 0,
        }}>Idea clave</p>
        <p style={{
          fontFamily: A_TOKENS.serif, fontSize: 15, fontStyle: 'italic',
          color: A_TOKENS.ink, margin: '4px 0 0', lineHeight: 1.5,
        }}>
          Congreso = pueblo. Senado = territorios.<br/>Ambos juntos = Cortes Generales.
        </p>
      </aside>

      <h3 style={{
        fontFamily: A_TOKENS.serif, fontSize: 18, fontStyle: 'italic',
        fontWeight: 500, color: A_TOKENS.ink, margin: '24px 0 8px',
      }}>¿Quién puede ser diputado?</h3>

      <p style={{
        fontFamily: A_TOKENS.serif, fontSize: 16, lineHeight: 1.65,
        color: A_TOKENS.ink, margin: 0, textAlign: 'justify',
      }}>
        Cualquier persona mayor de 18 años, con nacionalidad española y que esté en pleno uso de sus derechos políticos. No hace falta tener estudios ni una profesión concreta.
      </p>

      {/* Pie de página */}
      <div style={{
        marginTop: 28, paddingTop: 12,
        borderTop: `0.5px solid ${A_TOKENS.rule}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: A_TOKENS.mono, fontSize: 10, letterSpacing: 0.6,
        color: A_TOKENS.inkMuted, textTransform: 'uppercase',
      }}>
        <span>← anterior</span>
        <span style={{ color: A_TOKENS.granate }}>practicar este capítulo →</span>
      </div>
    </APage>
  );
}

// ═════════════════════════════════════════════════════════════
// A-4 · Práctica — pregunta limpia
// ═════════════════════════════════════════════════════════════
function APractica() {
  const q = window.CCSE_DATA.preguntas[0];
  return (
    <APage folio="03 / 25" running={q.tareaTitulo}>
      <p style={{
        fontFamily: A_TOKENS.mono, fontSize: 10, letterSpacing: 1.8,
        textTransform: 'uppercase', color: A_TOKENS.inkMuted, margin: 0,
      }}>
        Pregunta nº {q.idOficial} · {q.bloque}
      </p>

      <h2 style={{
        fontFamily: A_TOKENS.serif, fontWeight: 500, fontSize: 28,
        margin: '14px 0 0', lineHeight: 1.18, letterSpacing: -0.3,
        color: A_TOKENS.ink,
      }}>
        {q.enunciado}
      </h2>

      <AOrnament width={50} color={A_TOKENS.granateSoft} />

      <ol style={{ listStyle: 'none', padding: 0, margin: '26px 0 0' }}>
        {Object.entries(q.opciones).map(([letra, texto]) => (
          <li key={letra} style={{
            display: 'flex', gap: 14,
            padding: '16px 14px',
            background: 'rgba(255,255,255,0.4)',
            border: `0.5px solid ${A_TOKENS.rule}`,
            borderRadius: 2, marginBottom: 8,
            alignItems: 'flex-start',
          }}>
            <span style={{
              width: 28, height: 28,
              border: `0.5px solid ${A_TOKENS.ink}`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: A_TOKENS.serif, fontSize: 14, fontStyle: 'italic',
              color: A_TOKENS.ink, flexShrink: 0,
            }}>{letra}</span>
            <span style={{
              fontFamily: A_TOKENS.serif, fontSize: 16.5, lineHeight: 1.4,
              color: A_TOKENS.ink, paddingTop: 3,
            }}>{texto}</span>
          </li>
        ))}
      </ol>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginTop: 22, padding: '14px 0',
        borderTop: `0.5px solid ${A_TOKENS.rule}`,
      }}>
        <span style={{
          fontFamily: A_TOKENS.mono, fontSize: 10.5, letterSpacing: 0.8,
          color: A_TOKENS.inkMuted,
        }}>
          Dificultad
        </span>
        <span style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic',
          fontSize: 13, color: A_TOKENS.green,
        }}>{q.dificultad}</span>
        <span style={{ flex: 1 }} />
        <span style={{
          fontFamily: A_TOKENS.mono, fontSize: 10.5, letterSpacing: 0.6,
          color: A_TOKENS.inkMuted,
        }}>
          pág. {q.paginaManual}
        </span>
      </div>
    </APage>
  );
}

// ═════════════════════════════════════════════════════════════
// A-5 · Práctica — respuesta revelada con explicación
// ═════════════════════════════════════════════════════════════
function APracticaResp() {
  const q = window.CCSE_DATA.preguntas[0];
  return (
    <APage folio="03 / 25" running={q.tareaTitulo}>
      <p style={{
        fontFamily: A_TOKENS.mono, fontSize: 10, letterSpacing: 1.8,
        textTransform: 'uppercase', color: A_TOKENS.inkMuted, margin: 0,
      }}>Pregunta nº {q.idOficial}</p>

      <h2 style={{
        fontFamily: A_TOKENS.serif, fontWeight: 500, fontSize: 22,
        margin: '10px 0 18px', lineHeight: 1.25, color: A_TOKENS.ink,
      }}>{q.enunciado}</h2>

      {/* Opciones con estado */}
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {Object.entries(q.opciones).map(([letra, texto]) => {
          const isCorrect = letra === q.correcta;
          return (
            <li key={letra} style={{
              display: 'flex', gap: 12, padding: '12px 12px',
              background: isCorrect ? 'rgba(61, 92, 42, 0.07)' : 'transparent',
              border: `0.5px solid ${isCorrect ? A_TOKENS.green : A_TOKENS.rule}`,
              borderLeft: isCorrect ? `3px solid ${A_TOKENS.green}` : `0.5px solid ${A_TOKENS.rule}`,
              borderRadius: 2, marginBottom: 7, alignItems: 'flex-start',
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: isCorrect ? A_TOKENS.green : 'transparent',
                border: isCorrect ? 'none' : `0.5px solid ${A_TOKENS.ink}`,
                color: isCorrect ? A_TOKENS.paper : A_TOKENS.ink,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: A_TOKENS.serif, fontStyle: 'italic', fontSize: 12,
                flexShrink: 0, marginTop: 2,
              }}>{isCorrect ? '✓' : letra}</span>
              <span style={{
                fontFamily: A_TOKENS.serif, fontSize: 15.5, lineHeight: 1.4,
                color: A_TOKENS.ink,
              }}>{texto}</span>
            </li>
          );
        })}
      </ol>

      {/* Explicación */}
      <div style={{
        marginTop: 22, padding: '16px 0 0',
        borderTop: `0.5px solid ${A_TOKENS.rule}`,
      }}>
        <p style={{
          fontFamily: A_TOKENS.mono, fontSize: 9.5, letterSpacing: 1.8,
          textTransform: 'uppercase', color: A_TOKENS.granate, margin: 0,
        }}>El porqué</p>
        <p style={{
          fontFamily: A_TOKENS.serif, fontSize: 15.5, lineHeight: 1.55,
          color: A_TOKENS.ink, margin: '6px 0 0', textWrap: 'pretty',
        }}>
          {q.explicacion}
        </p>
      </div>

      {/* Mnemotécnico — pequeña tarjeta de margen */}
      <div style={{
        marginTop: 18, padding: '12px 14px',
        background: 'rgba(168, 124, 42, 0.1)',
        borderLeft: `2px solid ${A_TOKENS.gold}`,
      }}>
        <p style={{
          fontFamily: A_TOKENS.mono, fontSize: 9, letterSpacing: 1.6,
          textTransform: 'uppercase', color: A_TOKENS.gold, margin: 0,
        }}>Mnemotécnico</p>
        <p style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic', fontSize: 14.5,
          color: A_TOKENS.ink, margin: '3px 0 0',
        }}>"{q.mnemo}"</p>
      </div>

      {/* Distractores en notas a pie */}
      <div style={{ marginTop: 18 }}>
        <p style={{
          fontFamily: A_TOKENS.mono, fontSize: 9.5, letterSpacing: 1.4,
          textTransform: 'uppercase', color: A_TOKENS.inkMuted, margin: 0,
        }}>Por qué fallan las otras</p>
        {Object.entries(q.distractores).map(([letra, texto]) => (
          <p key={letra} style={{
            fontFamily: A_TOKENS.serif, fontSize: 13.5,
            color: A_TOKENS.inkSoft, margin: '8px 0 0', lineHeight: 1.5,
            paddingLeft: 18, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 0,
              fontStyle: 'italic', color: A_TOKENS.granate, fontWeight: 500,
            }}>{letra}.</span>
            {texto}
          </p>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 24, paddingTop: 12,
        borderTop: `0.5px solid ${A_TOKENS.rule}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic', fontSize: 13.5,
          background: 'transparent', border: 'none', color: A_TOKENS.inkSoft,
          padding: 0,
        }}>guardar nota</button>
        <button style={{
          fontFamily: A_TOKENS.serif, fontSize: 15, fontStyle: 'italic',
          padding: '10px 18px', background: A_TOKENS.ink, color: A_TOKENS.paper,
          border: 'none', borderRadius: 2,
        }}>siguiente pregunta →</button>
      </div>
    </APage>
  );
}

// ═════════════════════════════════════════════════════════════
// A-6 · Simulacro en curso (cronómetro)
// ═════════════════════════════════════════════════════════════
function ASimulacro() {
  return (
    <div style={{
      minHeight: '100%', background: A_TOKENS.paper,
      color: A_TOKENS.ink, fontFamily: A_TOKENS.serif,
      padding: '50px 22px 24px', boxSizing: 'border-box',
      position: 'relative',
    }}>
      {/* Cronómetro fijo arriba */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingBottom: 12, borderBottom: `0.5px solid ${A_TOKENS.rule}`,
      }}>
        <div>
          <p style={{
            fontFamily: A_TOKENS.mono, fontSize: 9.5, letterSpacing: 1.6,
            textTransform: 'uppercase', color: A_TOKENS.inkMuted, margin: 0,
          }}>Simulacro nº 7</p>
          <p style={{
            fontFamily: A_TOKENS.serif, fontStyle: 'italic', fontSize: 14,
            color: A_TOKENS.ink, margin: '3px 0 0',
          }}>pregunta 12 de 25</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{
            fontFamily: A_TOKENS.serif, fontSize: 34, fontWeight: 500,
            margin: 0, color: A_TOKENS.granate, lineHeight: 1,
            letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums',
          }}>27:14</p>
          <p style={{
            fontFamily: A_TOKENS.mono, fontSize: 9.5, letterSpacing: 1.4,
            color: A_TOKENS.inkMuted, margin: '2px 0 0', textTransform: 'uppercase',
          }}>tiempo restante</p>
        </div>
      </div>

      {/* Progreso de preguntas: cuadrícula con casillas */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(25, 1fr)', gap: 2,
        marginTop: 14,
      }}>
        {Array.from({ length: 25 }).map((_, i) => {
          let bg = A_TOKENS.ruleSoft;
          if (i < 11) bg = A_TOKENS.ink;
          if (i === 11) bg = A_TOKENS.granate;
          return <div key={i} style={{ height: 6, background: bg }} />;
        })}
      </div>

      <p style={{
        fontFamily: A_TOKENS.mono, fontSize: 10, letterSpacing: 1.6,
        textTransform: 'uppercase', color: A_TOKENS.inkMuted,
        margin: '24px 0 6px',
      }}>Tarea 2 · Derechos y deberes</p>

      <h2 style={{
        fontFamily: A_TOKENS.serif, fontWeight: 500, fontSize: 24,
        margin: '0 0 22px', lineHeight: 1.22, color: A_TOKENS.ink,
      }}>
        ¿A qué edad se obtiene el derecho al voto en España?
      </h2>

      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {[['a', 'A los 16 años.'], ['b', 'A los 18 años.'], ['c', 'A los 21 años.']].map(([l, t], i) => (
          <li key={l} style={{
            display: 'flex', gap: 14, padding: '15px 14px',
            background: i === 1 ? '#FBF6EB' : 'rgba(255,255,255,0.35)',
            border: `0.5px solid ${i === 1 ? A_TOKENS.ink : A_TOKENS.rule}`,
            borderRadius: 2, marginBottom: 8, alignItems: 'center',
          }}>
            <span style={{
              width: 28, height: 28, borderRadius: '50%',
              background: i === 1 ? A_TOKENS.ink : 'transparent',
              color: i === 1 ? A_TOKENS.paper : A_TOKENS.ink,
              border: i === 1 ? 'none' : `0.5px solid ${A_TOKENS.ink}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: A_TOKENS.serif, fontSize: 14, fontStyle: 'italic',
              flexShrink: 0,
            }}>{l}</span>
            <span style={{
              fontFamily: A_TOKENS.serif, fontSize: 16.5,
              color: A_TOKENS.ink, lineHeight: 1.35,
            }}>{t}</span>
          </li>
        ))}
      </ol>

      <button style={{
        marginTop: 14, padding: '8px 14px',
        background: 'transparent', color: A_TOKENS.inkMuted,
        border: `0.5px dashed ${A_TOKENS.rule}`, borderRadius: 2,
        fontFamily: A_TOKENS.serif, fontStyle: 'italic', fontSize: 13,
        width: '100%',
      }}>
        marcar para revisar más tarde
      </button>

      <div style={{
        marginTop: 20, paddingTop: 14,
        borderTop: `0.5px solid ${A_TOKENS.rule}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic', fontSize: 14,
          background: 'transparent', border: 'none', color: A_TOKENS.inkSoft,
          padding: 0,
        }}>← anterior</button>
        <button style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic', fontSize: 16,
          padding: '11px 24px', background: A_TOKENS.ink, color: A_TOKENS.paper,
          border: 'none', borderRadius: 2,
        }}>siguiente →</button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// A-7 · Resultado simulacro
// ═════════════════════════════════════════════════════════════
function AResultado() {
  const r = window.CCSE_DATA.simulacroResultado;
  return (
    <APage folio="resultado" running="Simulacro nº 7">
      <div style={{ textAlign: 'center', paddingTop: 6 }}>
        <p style={{
          fontFamily: A_TOKENS.mono, fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase', color: A_TOKENS.green, margin: 0,
        }}>Aprobado · 25 abril 2026</p>

        <p style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic',
          fontSize: 17, color: A_TOKENS.inkSoft,
          margin: '20px 0 0',
        }}>has acertado</p>

        <div style={{
          fontFamily: A_TOKENS.serif, fontWeight: 500, fontSize: 110,
          lineHeight: 0.9, color: A_TOKENS.granate, margin: '6px 0 0',
          letterSpacing: -2,
        }}>{r.aciertos}</div>

        <p style={{
          fontFamily: A_TOKENS.serif, fontStyle: 'italic',
          fontSize: 17, color: A_TOKENS.inkSoft, margin: '4px 0 0',
        }}>de {r.total} preguntas</p>

        <AOrnament width={100} />

        <p style={{
          fontFamily: A_TOKENS.serif, fontSize: 15, color: A_TOKENS.ink,
          margin: '14px 0 0', maxWidth: 280, marginLeft: 'auto', marginRight: 'auto',
          lineHeight: 1.5, textWrap: 'pretty',
        }}>
          Necesitabas <strong>{r.minimoAprobar}</strong> para aprobar.
          Lo hiciste en <strong>{r.tiempo}</strong> de los 45 minutos.
        </p>
      </div>

      {/* Desglose por bloque */}
      <h3 style={{
        fontFamily: A_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.8,
        textTransform: 'uppercase', color: A_TOKENS.inkMuted,
        margin: '32px 0 12px', fontWeight: 500,
      }}>Desglose por tarea</h3>

      <table style={{
        width: '100%', borderCollapse: 'collapse',
        fontFamily: A_TOKENS.serif, fontSize: 14.5,
      }}>
        <tbody>
          {r.porBloque.map((b) => (
            <tr key={b.tarea} style={{
              borderBottom: `0.5px dotted ${A_TOKENS.rule}`,
            }}>
              <td style={{ padding: '11px 0', width: 28, color: A_TOKENS.granate, fontStyle: 'italic' }}>{b.tarea}.</td>
              <td style={{ padding: '11px 0', color: A_TOKENS.ink }}>{b.label}</td>
              <td style={{
                padding: '11px 0', textAlign: 'right',
                fontFamily: A_TOKENS.mono, fontSize: 12.5,
                color: b.aciertos === b.total ? A_TOKENS.green : A_TOKENS.inkSoft,
                fontVariantNumeric: 'tabular-nums',
              }}>{b.aciertos}/{b.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Lo que fallaste */}
      <h3 style={{
        fontFamily: A_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.8,
        textTransform: 'uppercase', color: A_TOKENS.inkMuted,
        margin: '28px 0 8px', fontWeight: 500,
      }}>Para repasar</h3>
      {r.fallidas.map((f) => (
        <div key={f.idOf} style={{
          padding: '12px 0', borderBottom: `0.5px dotted ${A_TOKENS.rule}`,
          display: 'flex', gap: 12, alignItems: 'baseline',
        }}>
          <span style={{ fontFamily: A_TOKENS.mono, fontSize: 10.5, color: A_TOKENS.inkMuted, letterSpacing: 0.4 }}>nº {f.idOf}</span>
          <span style={{ fontFamily: A_TOKENS.serif, fontStyle: 'italic', fontSize: 14, color: A_TOKENS.ink, flex: 1, lineHeight: 1.4 }}>{f.enunciado}</span>
        </div>
      ))}

      <button style={{
        marginTop: 22, width: '100%', padding: '13px',
        background: A_TOKENS.ink, color: A_TOKENS.paper,
        border: 'none', borderRadius: 2,
        fontFamily: A_TOKENS.serif, fontStyle: 'italic', fontSize: 15,
      }}>repasar las falladas →</button>
    </APage>
  );
}

// Wrap each in an iOS frame for the canvas
function AInFrame({ children, title }) {
  return (
    <IOSDevice width={390} height={844}>
      <div style={{
        height: '100%', width: '100%', overflow: 'auto',
        background: A_TOKENS.paper, scrollbarWidth: 'thin',
      }}>
        {children}
      </div>
    </IOSDevice>
  );
}

Object.assign(window, {
  A_TOKENS, ALanding, ADashboard, AEstudiar, APractica, APracticaResp, ASimulacro, AResultado, AInFrame,
});
