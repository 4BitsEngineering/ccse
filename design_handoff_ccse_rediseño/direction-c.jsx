// Direction C — "Plaza" — Architectural, navy ink + ochre, grided academic feel
// Like a museum/library app

const C_TOKENS = {
  paper: '#EFE9DC',
  paperSoft: '#E8E1D0',
  paperDeep: '#DCD2BC',
  ink: '#15233E',
  inkSoft: '#3D4A66',
  inkMuted: '#7A8298',
  rule: '#C5B99E',
  ruleSoft: '#D6CBB0',
  ochre: '#B4863A',
  ochreDeep: '#8A6320',
  ochreLight: '#E0BC74',
  brick: '#9D4A38',
  green: '#3F5840',
  display: '"Cormorant Garamond", "Cormorant", Georgia, serif',
  sans: '"IBM Plex Sans", system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
};

// Section header with chapter marker
function CHead({ kicker, title, italic }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{
        fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 2,
        textTransform: 'uppercase', color: C_TOKENS.ochreDeep, margin: 0,
        fontWeight: 500,
      }}>{kicker}</p>
      <h1 style={{
        fontFamily: C_TOKENS.display, fontWeight: 500, fontSize: 38,
        lineHeight: 1, letterSpacing: -0.5, margin: '8px 0 0',
        color: C_TOKENS.ink,
      }}>
        {italic ? <em>{title}</em> : title}
      </h1>
    </div>
  );
}

// Page frame with grid background
function CShell({ children, withGrid = true }) {
  return (
    <div style={{
      minHeight: '100%', boxSizing: 'border-box',
      background: C_TOKENS.paper,
      backgroundImage: withGrid
        ? `linear-gradient(${C_TOKENS.ruleSoft} 1px, transparent 1px),
           linear-gradient(90deg, ${C_TOKENS.ruleSoft} 1px, transparent 1px)`
        : 'none',
      backgroundSize: withGrid ? '32px 32px' : 'auto',
      backgroundPosition: '-1px -1px',
      color: C_TOKENS.ink,
      fontFamily: C_TOKENS.sans,
      paddingTop: 52, paddingBottom: 24,
      position: 'relative',
    }}>
      {children}
    </div>
  );
}

// ════════ C-1 · Landing ════════
function CLanding() {
  return (
    <CShell>
      {/* Top thin rule with brand */}
      <div style={{
        padding: '0 22px 18px',
        borderBottom: `1.5px solid ${C_TOKENS.ink}`,
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: C_TOKENS.display, fontSize: 22, fontStyle: 'italic',
            fontWeight: 600, letterSpacing: -0.3,
          }}>CCSE<sup style={{ fontSize: 10, marginLeft: 3, color: C_TOKENS.ochreDeep, fontStyle: 'normal' }}>·26</sup></span>
          <span style={{
            fontFamily: C_TOKENS.mono, fontSize: 10, letterSpacing: 1.5,
            color: C_TOKENS.inkMuted, textTransform: 'uppercase',
          }}>edición 2026</span>
        </div>
      </div>

      <div style={{ padding: '0 22px' }}>
        <p style={{
          fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 2,
          textTransform: 'uppercase', color: C_TOKENS.ochreDeep, margin: 0,
          fontWeight: 500,
        }}>preparación oficial</p>

        <h1 style={{
          fontFamily: C_TOKENS.display, fontWeight: 500, fontSize: 56,
          lineHeight: 0.95, letterSpacing: -1.5, margin: '12px 0 0',
          color: C_TOKENS.ink,
        }}>
          Aprueba<br/>
          <em style={{ color: C_TOKENS.ochreDeep }}>el examen</em><br/>
          y obtén la
          <br/>
          nacionalidad.
        </h1>

        <p style={{
          fontFamily: C_TOKENS.display, fontSize: 19, lineHeight: 1.45,
          color: C_TOKENS.inkSoft, margin: '22px 0 24px', fontStyle: 'italic',
          textWrap: 'pretty',
        }}>
          Los apuntes, las 300 preguntas razonadas y los simulacros con cronómetro real. Hecho con cariño por quienes saben lo que es estar en un país que no es el tuyo.
        </p>

        {/* Stat strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0, borderTop: `1px solid ${C_TOKENS.rule}`,
          borderBottom: `1px solid ${C_TOKENS.rule}`,
          padding: '14px 0', marginBottom: 24,
        }}>
          {[['300', 'preguntas'], ['5', 'tareas'], ['25', 'minutos · simulacro'], ['9,99 €', 'al año']].map(([n, l], i) => (
            <div key={i} style={{
              padding: '0 8px', borderRight: i < 3 ? `1px solid ${C_TOKENS.rule}` : 'none',
            }}>
              <p style={{ fontFamily: C_TOKENS.display, fontSize: 22, fontWeight: 600, color: C_TOKENS.ink, margin: 0, lineHeight: 1 }}>{n}</p>
              <p style={{ fontFamily: C_TOKENS.mono, fontSize: 8.5, color: C_TOKENS.inkMuted, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1.2 }}>{l}</p>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%', padding: '16px',
          background: C_TOKENS.ink, color: C_TOKENS.paper,
          border: 'none', borderRadius: 0,
          fontFamily: C_TOKENS.sans, fontSize: 15, fontWeight: 600,
          letterSpacing: 0.4, textTransform: 'uppercase',
        }}>Probar 10 preguntas →</button>

        <p style={{
          fontFamily: C_TOKENS.mono, fontSize: 10, color: C_TOKENS.inkMuted,
          margin: '10px 0 0', textAlign: 'center', letterSpacing: 0.8,
        }}>sin registro · sin tarjeta</p>

        {/* Index / tabla de contenidos */}
        <div style={{
          marginTop: 36, padding: '20px 0',
          borderTop: `2px solid ${C_TOKENS.ink}`,
        }}>
          <p style={{
            fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.8,
            textTransform: 'uppercase', color: C_TOKENS.inkMuted,
            margin: '0 0 16px', fontWeight: 500,
          }}>contenido</p>

          {[
            ['I', 'Apuntes oficiales en lenguaje claro', '5 temas'],
            ['II', 'Las 300 preguntas razonadas', 'con explicación'],
            ['III', 'Simulacros con cronómetro', '4 disponibles'],
            ['IV', 'Repaso espaciado de fallos', 'algoritmo SM-2'],
            ['V', 'Estadísticas y progreso', 'siempre visible'],
          ].map(([n, t, s]) => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: '34px 1fr auto',
              gap: 10, padding: '10px 0',
              borderBottom: `1px dotted ${C_TOKENS.rule}`,
              alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: C_TOKENS.display, fontStyle: 'italic',
                fontSize: 18, color: C_TOKENS.ochreDeep, fontWeight: 500,
              }}>{n}.</span>
              <span style={{ fontFamily: C_TOKENS.sans, fontSize: 14, color: C_TOKENS.ink }}>{t}</span>
              <span style={{ fontFamily: C_TOKENS.mono, fontSize: 10, color: C_TOKENS.inkMuted, letterSpacing: 0.4 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </CShell>
  );
}

// ════════ C-2 · Dashboard ════════
function CDashboard() {
  const { temas, progreso } = window.CCSE_DATA;
  return (
    <CShell>
      {/* Header rail */}
      <div style={{
        padding: '0 22px 14px',
        borderBottom: `1.5px solid ${C_TOKENS.ink}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: C_TOKENS.display, fontSize: 19, fontWeight: 600, fontStyle: 'italic' }}>CCSE<sup style={{ fontSize: 9, color: C_TOKENS.ochreDeep, fontStyle: 'normal' }}>·26</sup></span>
          <span style={{ fontFamily: C_TOKENS.mono, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: C_TOKENS.inkMuted }}>28 abr · día 23</span>
        </div>
      </div>

      <div style={{ padding: '22px 22px 0' }}>
        <CHead kicker="bienvenida, Daniela" title="Tu mesa de" italic />
        <p style={{
          fontFamily: C_TOKENS.display, fontSize: 38, fontStyle: 'italic',
          fontWeight: 500, color: C_TOKENS.ochreDeep, margin: '-12px 0 0',
          letterSpacing: -0.5, lineHeight: 1,
        }}>estudio.</p>

        {/* Statistic strip */}
        <div style={{
          marginTop: 22, padding: '14px 0',
          borderTop: `1px solid ${C_TOKENS.rule}`,
          borderBottom: `1px solid ${C_TOKENS.rule}`,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
        }}>
          {[
            ['12', 'días racha'],
            ['142 / 300', 'dominadas'],
            ['4 / 6', 'simulacros'],
          ].map(([n, l], i) => (
            <div key={i} style={{
              borderRight: i < 2 ? `1px solid ${C_TOKENS.rule}` : 'none',
              padding: '0 10px', textAlign: i === 0 ? 'left' : 'center',
            }}>
              <p style={{ fontFamily: C_TOKENS.display, fontSize: 24, fontWeight: 600, color: C_TOKENS.ink, margin: 0, lineHeight: 1 }}>{n}</p>
              <p style={{ fontFamily: C_TOKENS.mono, fontSize: 9, color: C_TOKENS.inkMuted, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: 0.8 }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Continuar */}
        <div style={{
          marginTop: 22, padding: '18px',
          background: C_TOKENS.ink, color: C_TOKENS.paper,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 14, right: 14,
            width: 30, height: 30, border: `1px solid ${C_TOKENS.ochreLight}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: C_TOKENS.display, fontStyle: 'italic',
            color: C_TOKENS.ochreLight, fontSize: 13,
          }}>I</div>
          <p style={{ fontFamily: C_TOKENS.mono, fontSize: 9.5, letterSpacing: 1.6, textTransform: 'uppercase', color: C_TOKENS.ochreLight, margin: 0, fontWeight: 500 }}>continuar leyendo</p>
          <p style={{ fontFamily: C_TOKENS.display, fontSize: 26, fontWeight: 500, margin: '6px 0 4px', lineHeight: 1.1, letterSpacing: -0.3, fontStyle: 'italic' }}>
            Las Cortes Generales
          </p>
          <p style={{ fontFamily: C_TOKENS.mono, fontSize: 11, letterSpacing: 0.4, color: 'rgba(239, 233, 220, 0.7)', margin: '8px 0 14px' }}>
            tarea 1 · cap. 3 · página 14 / 28
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 1.5, background: 'rgba(239, 233, 220, 0.25)' }}>
              <div style={{ width: '50%', height: '100%', background: C_TOKENS.ochreLight }}/>
            </div>
            <span style={{ fontFamily: C_TOKENS.mono, fontSize: 10, color: 'rgba(239, 233, 220, 0.7)' }}>50%</span>
          </div>
        </div>

        {/* Las 5 tareas */}
        <p style={{
          fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.8,
          textTransform: 'uppercase', color: C_TOKENS.inkMuted,
          margin: '28px 0 4px', fontWeight: 500,
        }}>las cinco tareas</p>

        <div style={{ borderTop: `1.5px solid ${C_TOKENS.ink}`, marginBottom: 22 }}>
          {temas.map(t => (
            <div key={t.n} style={{
              display: 'grid', gridTemplateColumns: '24px 1fr 60px',
              padding: '14px 0', gap: 14,
              borderBottom: `1px solid ${C_TOKENS.rule}`,
              alignItems: 'center',
            }}>
              <span style={{
                fontFamily: C_TOKENS.display, fontSize: 22, fontWeight: 500,
                color: C_TOKENS.ochreDeep, fontStyle: 'italic', lineHeight: 1,
              }}>{['I','II','III','IV','V'][t.n - 1]}</span>
              <div>
                <p style={{ fontFamily: C_TOKENS.sans, fontSize: 14, color: C_TOKENS.ink, margin: 0, lineHeight: 1.3, fontWeight: 500 }}>{t.titulo}</p>
                <p style={{ fontFamily: C_TOKENS.mono, fontSize: 10.5, color: C_TOKENS.inkMuted, margin: '3px 0 0', letterSpacing: 0.4 }}>
                  {Math.round(t.completado * t.preguntas)} / {t.preguntas}
                </p>
              </div>
              {/* Tiny inline chart */}
              <div style={{
                height: 22, position: 'relative',
                borderBottom: `1px solid ${C_TOKENS.rule}`,
              }}>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: `${t.completado * 100}%`, height: '100%',
                  background: t.completado > 0.5 ? C_TOKENS.green : C_TOKENS.ochre,
                  opacity: 0.85,
                }}/>
                <span style={{
                  position: 'absolute', top: -2, right: 0,
                  fontFamily: C_TOKENS.mono, fontSize: 10,
                  color: C_TOKENS.ink, letterSpacing: 0.3,
                }}>{Math.round(t.completado * 100)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Simulacro CTA — minimal & austere */}
        <div style={{
          padding: '20px',
          border: `2px solid ${C_TOKENS.ink}`,
          background: C_TOKENS.paper,
        }}>
          <p style={{ fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.6, textTransform: 'uppercase', color: C_TOKENS.ochreDeep, margin: 0, fontWeight: 500 }}>simulacro próximo</p>
          <p style={{ fontFamily: C_TOKENS.display, fontSize: 28, fontWeight: 500, margin: '6px 0 4px', letterSpacing: -0.3, lineHeight: 1, fontStyle: 'italic' }}>Examen nº 7</p>
          <p style={{ fontFamily: C_TOKENS.sans, fontSize: 13, color: C_TOKENS.inkSoft, margin: '8px 0 14px' }}>
            25 preguntas · 45 min · distribución oficial 60/40
          </p>
          <button style={{
            padding: '12px 18px',
            background: C_TOKENS.ink, color: C_TOKENS.paper,
            border: 'none',
            fontFamily: C_TOKENS.sans, fontSize: 13, fontWeight: 600,
            letterSpacing: 0.4, textTransform: 'uppercase',
          }}>empezar →</button>
        </div>
      </div>
    </CShell>
  );
}

// ════════ C-3 · Práctica pregunta con respuesta revelada ════════
function CPractica() {
  const q = window.CCSE_DATA.preguntas[0];
  return (
    <CShell withGrid={false}>
      {/* breadcrumb */}
      <div style={{
        padding: '0 22px 12px', borderBottom: `1.5px solid ${C_TOKENS.ink}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.4, color: C_TOKENS.inkMuted, textTransform: 'uppercase' }}>
          tarea 1 · gobierno
        </span>
        <span style={{ fontFamily: C_TOKENS.mono, fontSize: 10.5, color: C_TOKENS.inkMuted, letterSpacing: 0.4 }}>03 / 25</span>
      </div>

      <div style={{ padding: '22px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontFamily: C_TOKENS.display, fontStyle: 'italic',
            fontSize: 50, fontWeight: 500, color: C_TOKENS.ochreDeep,
            lineHeight: 0.85, letterSpacing: -1.5,
          }}>nº</span>
          <span style={{
            fontFamily: C_TOKENS.display, fontSize: 50, fontWeight: 500,
            color: C_TOKENS.ink, lineHeight: 0.85, letterSpacing: -1.5,
          }}>{q.idOficial}</span>
        </div>

        <h2 style={{
          fontFamily: C_TOKENS.display, fontSize: 30, fontWeight: 500,
          margin: '18px 0 16px', lineHeight: 1.15, letterSpacing: -0.3,
          color: C_TOKENS.ink,
        }}>{q.enunciado}</h2>

        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Object.entries(q.opciones).map(([letra, texto]) => {
            const isCorrect = letra === q.correcta;
            return (
              <li key={letra} style={{
                display: 'grid', gridTemplateColumns: '30px 1fr 18px',
                padding: '14px 0', gap: 12,
                borderBottom: `1px solid ${C_TOKENS.rule}`,
                alignItems: 'baseline',
                background: isCorrect ? 'rgba(63, 88, 64, 0.07)' : 'transparent',
                paddingLeft: 8, paddingRight: 8,
                marginLeft: -8, marginRight: -8,
              }}>
                <span style={{
                  fontFamily: C_TOKENS.display, fontStyle: 'italic',
                  fontSize: 22, color: isCorrect ? C_TOKENS.green : C_TOKENS.inkMuted,
                  fontWeight: 600,
                }}>{letra}.</span>
                <span style={{
                  fontFamily: C_TOKENS.display, fontSize: 18, color: C_TOKENS.ink,
                  lineHeight: 1.3,
                  fontWeight: isCorrect ? 600 : 400,
                }}>{texto}</span>
                {isCorrect && (
                  <span style={{
                    width: 18, height: 18,
                    border: `1.5px solid ${C_TOKENS.green}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: C_TOKENS.green, fontSize: 11, lineHeight: 1,
                  }}>✓</span>
                )}
              </li>
            );
          })}
        </ol>

        {/* Marginal explanation */}
        <div style={{
          marginTop: 22, padding: '18px 0',
          borderTop: `2px solid ${C_TOKENS.ink}`,
        }}>
          <p style={{
            fontFamily: C_TOKENS.mono, fontSize: 10, letterSpacing: 1.8,
            textTransform: 'uppercase', color: C_TOKENS.ochreDeep,
            margin: 0, fontWeight: 500,
          }}>nota</p>
          <p style={{
            fontFamily: C_TOKENS.display, fontSize: 17, lineHeight: 1.5,
            color: C_TOKENS.ink, margin: '8px 0 0', textWrap: 'pretty',
          }}>
            {q.explicacion}
          </p>
        </div>

        {/* Distractor table */}
        <p style={{
          fontFamily: C_TOKENS.mono, fontSize: 10, letterSpacing: 1.8,
          textTransform: 'uppercase', color: C_TOKENS.inkMuted,
          margin: '20px 0 8px', fontWeight: 500,
        }}>otras opciones</p>
        {Object.entries(q.distractores).map(([letra, txt]) => (
          <div key={letra} style={{
            display: 'grid', gridTemplateColumns: '18px 1fr',
            gap: 10, padding: '10px 0',
            borderTop: `1px dotted ${C_TOKENS.rule}`,
          }}>
            <span style={{
              fontFamily: C_TOKENS.display, fontStyle: 'italic',
              fontSize: 16, color: C_TOKENS.brick, fontWeight: 600,
            }}>{letra}.</span>
            <p style={{
              fontFamily: C_TOKENS.sans, fontSize: 13, color: C_TOKENS.inkSoft,
              margin: 0, lineHeight: 1.45,
            }}>{txt}</p>
          </div>
        ))}

        {/* Footer rail */}
        <div style={{
          marginTop: 24, padding: '14px 0',
          borderTop: `1.5px solid ${C_TOKENS.ink}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{
            fontFamily: C_TOKENS.mono, fontSize: 10, letterSpacing: 0.8,
            color: C_TOKENS.inkMuted, textTransform: 'uppercase',
          }}>pág. {q.paginaManual} del manual</span>
          <span style={{ flex: 1 }}/>
          <button style={{
            padding: '10px 18px', background: C_TOKENS.ink, color: C_TOKENS.paper,
            border: 'none', fontFamily: C_TOKENS.sans, fontSize: 13,
            fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase',
          }}>siguiente →</button>
        </div>
      </div>
    </CShell>
  );
}

// ════════ C-4 · Simulacro running ════════
function CSimulacro() {
  return (
    <CShell withGrid={false}>
      {/* Timer rail */}
      <div style={{
        padding: '0 22px 14px',
        background: C_TOKENS.ink, color: C_TOKENS.paper,
        marginTop: -52, paddingTop: 56,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.6, textTransform: 'uppercase', color: C_TOKENS.ochreLight, margin: 0, fontWeight: 500 }}>simulacro nº 7</p>
            <p style={{ fontFamily: C_TOKENS.display, fontSize: 19, fontStyle: 'italic', margin: '2px 0 0', color: C_TOKENS.paper }}>pregunta 12 de 25</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{
              fontFamily: C_TOKENS.display, fontSize: 38, fontWeight: 600,
              color: C_TOKENS.ochreLight, margin: 0, lineHeight: 1,
              letterSpacing: -1, fontVariantNumeric: 'tabular-nums',
            }}>27:14</p>
            <p style={{ fontFamily: C_TOKENS.mono, fontSize: 9, letterSpacing: 1.2, color: 'rgba(239, 233, 220, 0.6)', textTransform: 'uppercase', margin: '2px 0 0' }}>restante</p>
          </div>
        </div>

        {/* progress segments */}
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(25, 1fr)', gap: 2 }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{
              height: 4,
              background: i < 11 ? C_TOKENS.ochreLight : i === 11 ? C_TOKENS.paper : 'rgba(239, 233, 220, 0.2)',
            }}/>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 22px 0' }}>
        <p style={{
          fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.8,
          textTransform: 'uppercase', color: C_TOKENS.ochreDeep, margin: 0, fontWeight: 500,
        }}>tarea II · derechos y deberes</p>

        <h1 style={{
          fontFamily: C_TOKENS.display, fontSize: 30, fontWeight: 500,
          margin: '10px 0 26px', lineHeight: 1.15, letterSpacing: -0.4,
          textWrap: 'balance',
        }}>¿A qué edad se obtiene el derecho al voto en España?</h1>

        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[['a', 'A los 16 años.'], ['b', 'A los 18 años.', true], ['c', 'A los 21 años.']].map(([l, t, sel]) => (
            <li key={l} style={{
              display: 'grid', gridTemplateColumns: '36px 1fr 18px',
              padding: '16px 14px', gap: 12,
              background: sel ? C_TOKENS.ink : 'transparent',
              color: sel ? C_TOKENS.paper : C_TOKENS.ink,
              border: `1.5px solid ${sel ? C_TOKENS.ink : C_TOKENS.rule}`,
              marginBottom: 8,
              alignItems: 'center',
            }}>
              <span style={{
                width: 28, height: 28,
                border: `1.5px solid ${sel ? C_TOKENS.ochreLight : C_TOKENS.ink}`,
                color: sel ? C_TOKENS.ochreLight : C_TOKENS.ink,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: C_TOKENS.display, fontStyle: 'italic', fontSize: 16,
                fontWeight: 600,
              }}>{l}</span>
              <span style={{ fontFamily: C_TOKENS.display, fontSize: 18, lineHeight: 1.3, fontWeight: sel ? 600 : 400 }}>{t}</span>
              {sel && <span style={{
                fontFamily: C_TOKENS.mono, fontSize: 10, color: C_TOKENS.ochreLight,
                letterSpacing: 0.6,
              }}>·</span>}
            </li>
          ))}
        </ol>

        <div style={{
          marginTop: 16, padding: '10px 14px',
          background: 'rgba(180, 134, 58, 0.1)',
          border: `1px dashed ${C_TOKENS.ochre}`,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            fontFamily: C_TOKENS.mono, fontSize: 10, letterSpacing: 1.4,
            textTransform: 'uppercase', color: C_TOKENS.ochreDeep, fontWeight: 600,
          }}>⌖ marcar para revisar</span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
          <button style={{
            flex: 1, padding: '14px',
            background: C_TOKENS.paperSoft, color: C_TOKENS.inkSoft,
            border: `1.5px solid ${C_TOKENS.rule}`,
            fontFamily: C_TOKENS.sans, fontSize: 13, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 0.4,
          }}>← anterior</button>
          <button style={{
            flex: 1.6, padding: '14px',
            background: C_TOKENS.ink, color: C_TOKENS.paper,
            border: 'none',
            fontFamily: C_TOKENS.sans, fontSize: 13, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 0.4,
          }}>siguiente →</button>
        </div>
      </div>
    </CShell>
  );
}

// ════════ C-5 · Resultado / Diploma ════════
function CResultado() {
  const r = window.CCSE_DATA.simulacroResultado;
  return (
    <CShell withGrid={false}>
      {/* "Diploma" panel */}
      <div style={{
        margin: '0 18px', padding: '24px 22px',
        border: `2px solid ${C_TOKENS.ink}`,
        background: C_TOKENS.paper,
        position: 'relative',
      }}>
        {/* corner ornaments */}
        {[[8,8],[8,'right'],[ 'bottom', 8],['bottom','right']].map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            ...(p[0] === 'bottom' ? { bottom: 8 } : { top: p[0] }),
            ...(p[1] === 'right' ? { right: 8 } : { left: p[1] }),
            width: 6, height: 6, border: `1.5px solid ${C_TOKENS.ochreDeep}`,
          }} />
        ))}

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: C_TOKENS.mono, fontSize: 10, letterSpacing: 2.4,
            textTransform: 'uppercase', color: C_TOKENS.ochreDeep,
            margin: 0, fontWeight: 600,
          }}>resultado · 28 abril 2026</p>

          <p style={{
            fontFamily: C_TOKENS.display, fontStyle: 'italic',
            fontSize: 24, fontWeight: 500, color: C_TOKENS.ink,
            margin: '16px 0 0', letterSpacing: -0.3, lineHeight: 1.1,
          }}>Simulacro nº 7</p>

          <div style={{
            margin: '12px auto', width: 60, height: 1.5, background: C_TOKENS.ochreDeep,
          }}/>

          <p style={{
            fontFamily: C_TOKENS.display, fontSize: 18, fontStyle: 'italic',
            color: C_TOKENS.inkSoft, margin: 0,
          }}>se declara</p>

          <p style={{
            fontFamily: C_TOKENS.display, fontWeight: 500, fontSize: 56,
            color: C_TOKENS.ochreDeep, letterSpacing: -1.5, margin: '6px 0 0',
            lineHeight: 0.95,
          }}>Aprobado</p>

          <p style={{
            fontFamily: C_TOKENS.display, fontSize: 18, fontStyle: 'italic',
            color: C_TOKENS.inkSoft, margin: '14px 0 0',
          }}>con</p>

          <p style={{
            fontFamily: C_TOKENS.display, fontSize: 88, fontWeight: 500,
            color: C_TOKENS.ink, margin: '4px 0', lineHeight: 0.85,
            letterSpacing: -3,
          }}>
            {r.aciertos}
            <span style={{ fontSize: 32, color: C_TOKENS.inkMuted, fontStyle: 'italic', verticalAlign: 'middle', marginLeft: 6 }}>/{r.total}</span>
          </p>

          <p style={{
            fontFamily: C_TOKENS.display, fontStyle: 'italic',
            fontSize: 15, color: C_TOKENS.inkSoft, margin: '10px 0 0',
            lineHeight: 1.4,
          }}>tiempo empleado <strong style={{ fontFamily: C_TOKENS.mono, fontStyle: 'normal', fontSize: 14, color: C_TOKENS.ink }}>{r.tiempo}</strong> · mínimo para aprobar <strong style={{ fontFamily: C_TOKENS.mono, fontStyle: 'normal', fontSize: 14, color: C_TOKENS.ink }}>{r.minimoAprobar}</strong></p>
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ padding: '24px 22px 0' }}>
        <p style={{
          fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.8,
          textTransform: 'uppercase', color: C_TOKENS.inkMuted, fontWeight: 500,
          margin: '0 0 8px',
        }}>desglose por tarea</p>

        <div style={{ borderTop: `1.5px solid ${C_TOKENS.ink}` }}>
          {r.porBloque.map(b => {
            const pct = b.aciertos / b.total;
            const allRight = pct === 1;
            return (
              <div key={b.tarea} style={{
                display: 'grid', gridTemplateColumns: '28px 1fr 80px 50px',
                padding: '12px 0', gap: 10,
                borderBottom: `1px solid ${C_TOKENS.rule}`,
                alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: C_TOKENS.display, fontStyle: 'italic',
                  fontSize: 18, color: C_TOKENS.ochreDeep, fontWeight: 600,
                }}>{['I','II','III','IV','V'][b.tarea - 1]}</span>
                <span style={{ fontFamily: C_TOKENS.sans, fontSize: 13.5, color: C_TOKENS.ink }}>{b.label}</span>
                <div style={{
                  position: 'relative', height: 16,
                  borderBottom: `1px solid ${C_TOKENS.rule}`,
                }}>
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: `${pct * 100}%`, height: '100%',
                    background: allRight ? C_TOKENS.green : C_TOKENS.brick,
                    opacity: 0.85,
                  }}/>
                </div>
                <span style={{
                  fontFamily: C_TOKENS.mono, fontSize: 12, textAlign: 'right',
                  color: allRight ? C_TOKENS.green : C_TOKENS.ink,
                  fontVariantNumeric: 'tabular-nums', letterSpacing: 0.4,
                }}>{b.aciertos}/{b.total}</span>
              </div>
            );
          })}
        </div>

        {/* Para repasar */}
        <p style={{
          fontFamily: C_TOKENS.mono, fontSize: 10.5, letterSpacing: 1.8,
          textTransform: 'uppercase', color: C_TOKENS.brick, fontWeight: 600,
          margin: '24px 0 8px',
        }}>para repasar — 2 falladas</p>
        {r.fallidas.map(f => (
          <div key={f.idOf} style={{
            padding: '12px 0', borderTop: `1px dotted ${C_TOKENS.rule}`,
            display: 'grid', gridTemplateColumns: '46px 1fr',
            gap: 10, alignItems: 'baseline',
          }}>
            <span style={{ fontFamily: C_TOKENS.mono, fontSize: 10, color: C_TOKENS.inkMuted, letterSpacing: 0.4 }}>nº{f.idOf}</span>
            <span style={{ fontFamily: C_TOKENS.display, fontStyle: 'italic', fontSize: 15.5, color: C_TOKENS.ink, lineHeight: 1.35 }}>{f.enunciado}</span>
          </div>
        ))}

        <div style={{
          marginTop: 22, display: 'flex', gap: 8,
        }}>
          <button style={{
            flex: 1, padding: '13px',
            background: 'transparent', color: C_TOKENS.ink,
            border: `1.5px solid ${C_TOKENS.ink}`,
            fontFamily: C_TOKENS.sans, fontSize: 12.5, fontWeight: 600,
            letterSpacing: 0.4, textTransform: 'uppercase',
          }}>otro simulacro</button>
          <button style={{
            flex: 1, padding: '13px',
            background: C_TOKENS.ink, color: C_TOKENS.paper,
            border: 'none',
            fontFamily: C_TOKENS.sans, fontSize: 12.5, fontWeight: 600,
            letterSpacing: 0.4, textTransform: 'uppercase',
          }}>repasar fallos →</button>
        </div>
      </div>
    </CShell>
  );
}

Object.assign(window, {
  C_TOKENS, CLanding, CDashboard, CPractica, CSimulacro, CResultado,
});
