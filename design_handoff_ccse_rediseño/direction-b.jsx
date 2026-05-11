// Direction B — "Tierra" — Warm earth, terracotta + olive, interactive prototype
// Modern interpretation with personality. Fully clickable.

const B_TOKENS = {
  paper: '#F8F2E7',
  paperWarm: '#F1E8D6',
  paperEdge: '#EBE0C9',
  ink: '#2A211A',
  inkSoft: '#5C4F40',
  inkMuted: '#8C7B65',
  rule: '#D9CCB5',
  terracotta: '#B85533',
  terracottaDeep: '#8E3F25',
  terracottaSoft: '#E1A084',
  olive: '#6B7448',
  oliveSoft: '#A1A87B',
  cream: '#FFFAF0',
  serif: '"Newsreader", "Source Serif Pro", Georgia, serif',
  sans: '"DM Sans", system-ui, sans-serif',
};

// Hand-drawn underline SVG
function BUnderline({ color = B_TOKENS.terracotta, width = 140 }) {
  return (
    <svg width={width} height="6" viewBox="0 0 140 6" style={{ display: 'block', marginTop: -4 }}>
      <path d="M2 4 Q 40 1, 80 3 T 138 2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

// Soft sun/circle decoration (NOT a flag)
function BSeal({ size = 38, color = B_TOKENS.terracotta }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 38">
      <circle cx="19" cy="19" r="17" fill="none" stroke={color} strokeWidth="0.6" />
      <circle cx="19" cy="19" r="12" fill="none" stroke={color} strokeWidth="0.6" />
      <circle cx="19" cy="19" r="5" fill={color} />
    </svg>
  );
}

// ════ Shell with status-bar-aware padding ════
function BShell({ children, bg = B_TOKENS.paper }) {
  return (
    <div style={{
      minHeight: '100%', background: bg,
      color: B_TOKENS.ink, fontFamily: B_TOKENS.sans,
      paddingTop: 50, paddingBottom: 24,
      boxSizing: 'border-box', position: 'relative',
    }}>
      {children}
    </div>
  );
}

// ════════════════════ B-1 · Landing ════════════════════
function BLanding({ onCta }) {
  return (
    <BShell>
      <div style={{ padding: '0 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
          <BSeal size={28} />
          <span style={{ fontFamily: B_TOKENS.serif, fontSize: 18, fontWeight: 500, letterSpacing: 0.5 }}>CCSE</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: B_TOKENS.sans, fontSize: 13, color: B_TOKENS.inkMuted }}>iniciar sesión</span>
        </div>

        <p style={{
          fontFamily: B_TOKENS.sans, fontSize: 12.5, fontWeight: 500,
          letterSpacing: 1.4, textTransform: 'uppercase',
          color: B_TOKENS.terracotta, margin: 0,
        }}>Edición 2026 · 300 preguntas oficiales</p>

        <h1 style={{
          fontFamily: B_TOKENS.serif, fontSize: 44, fontWeight: 400,
          lineHeight: 1.0, letterSpacing: -1, margin: '14px 0 12px',
          textWrap: 'balance', color: B_TOKENS.ink,
        }}>
          El examen de
          <br/>
          <span style={{ fontStyle: 'italic', color: B_TOKENS.terracottaDeep, position: 'relative' }}>
            nacionalidad
          </span>
          <br/>
          al alcance.
        </h1>
        <BUnderline width={160} />

        <p style={{
          fontFamily: B_TOKENS.serif, fontSize: 17, lineHeight: 1.5,
          color: B_TOKENS.inkSoft, margin: '22px 0 28px',
          textWrap: 'pretty',
        }}>
          Apuntes claros, las <em>300 preguntas</em> con explicación y simulacros reales. Sin trampas. <strong style={{ color: B_TOKENS.ink, fontFamily: B_TOKENS.sans, fontWeight: 600 }}>9,99 €</strong> un año entero.
        </p>

        <button onClick={onCta} style={{
          width: '100%', padding: '16px 18px',
          background: B_TOKENS.terracotta, color: B_TOKENS.cream,
          border: 'none', borderRadius: 14,
          fontFamily: B_TOKENS.sans, fontSize: 16, fontWeight: 600,
          letterSpacing: 0.2,
          boxShadow: '0 1px 0 rgba(142, 63, 37, 0.4)',
        }}>
          Probar 10 preguntas gratis →
        </button>

        <p style={{
          fontFamily: B_TOKENS.sans, fontSize: 11.5, color: B_TOKENS.inkMuted,
          margin: '12px 0 0', textAlign: 'center',
        }}>Sin registro · Sin tarjeta</p>
      </div>

      {/* Lo que incluye - tira de tarjetas */}
      <div style={{
        margin: '34px 0 0', padding: '24px 22px',
        background: B_TOKENS.paperWarm,
      }}>
        <h2 style={{
          fontFamily: B_TOKENS.serif, fontSize: 24, fontWeight: 500,
          margin: '0 0 18px', letterSpacing: -0.4, lineHeight: 1.15,
        }}>
          Cuatro cosas que <span style={{ fontStyle: 'italic' }}>sí</span> marcan la diferencia.
        </h2>
        {[
          ['Cada pregunta, razonada', 'Por qué es la correcta. Y por qué fallan las otras dos.'],
          ['Simulacros con cronómetro real', '25 preguntas. 45 minutos. Distribución oficial.'],
          ['Repaso de lo que fallas', 'Espaciado en el tiempo. No se olvida antes del examen.'],
          ['Apuntes en español sencillo', '5 temas claros. PDF descargable. Sin jerga.'],
        ].map(([t, d], i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, padding: '14px 0',
            borderTop: i === 0 ? 'none' : `1px solid ${B_TOKENS.rule}`,
          }}>
            <div style={{
              fontFamily: B_TOKENS.serif, fontSize: 22, fontStyle: 'italic',
              color: B_TOKENS.terracotta, lineHeight: 1, paddingTop: 4,
              width: 28, flexShrink: 0,
            }}>0{i+1}</div>
            <div>
              <p style={{ fontFamily: B_TOKENS.sans, fontSize: 15, fontWeight: 600, color: B_TOKENS.ink, margin: 0, lineHeight: 1.3 }}>{t}</p>
              <p style={{ fontFamily: B_TOKENS.serif, fontSize: 14.5, color: B_TOKENS.inkSoft, margin: '4px 0 0', lineHeight: 1.45 }}>{d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonio */}
      <div style={{ padding: '28px 22px 8px', textAlign: 'center' }}>
        <p style={{
          fontFamily: B_TOKENS.serif, fontSize: 19, fontStyle: 'italic',
          color: B_TOKENS.ink, margin: 0, lineHeight: 1.4, textWrap: 'pretty',
        }}>
          "Llevaba dos años con la app oficial sin enterarme.<br/>Aprobé al primer simulacro."
        </p>
        <p style={{
          fontFamily: B_TOKENS.sans, fontSize: 12, color: B_TOKENS.inkMuted,
          margin: '12px 0 0', letterSpacing: 0.8, textTransform: 'uppercase',
        }}>Daniela · Quito → Madrid</p>
      </div>
    </BShell>
  );
}

// ════════════════════ B-2 · Dashboard ════════════════════
function BDashboard({ onGo }) {
  const { temas, progreso } = window.CCSE_DATA;
  return (
    <BShell>
      <div style={{ padding: '0 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <BSeal size={26} />
          <span style={{ fontFamily: B_TOKENS.serif, fontSize: 16, fontWeight: 500 }}>CCSE</span>
          <span style={{ flex: 1 }} />
          <div style={{
            width: 32, height: 32, borderRadius: 16,
            background: B_TOKENS.terracottaSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: B_TOKENS.serif, fontSize: 13, color: B_TOKENS.terracottaDeep, fontWeight: 600,
          }}>DG</div>
        </div>

        <p style={{ fontFamily: B_TOKENS.sans, fontSize: 13, color: B_TOKENS.inkMuted, margin: 0 }}>
          martes, 28 de abril · 19:42
        </p>
        <h1 style={{
          fontFamily: B_TOKENS.serif, fontSize: 32, fontWeight: 500,
          margin: '4px 0 0', letterSpacing: -0.6, lineHeight: 1.05,
        }}>
          Hola, Daniela.
          <br/>
          <span style={{ fontStyle: 'italic', color: B_TOKENS.terracottaDeep }}>
            Sigue así.
          </span>
        </h1>
        <BUnderline width={110} />

        {/* Racha tarjeta */}
        <div style={{
          marginTop: 22, padding: '16px 18px',
          background: B_TOKENS.cream,
          borderRadius: 18,
          border: `1px solid ${B_TOKENS.rule}`,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            fontFamily: B_TOKENS.serif, fontSize: 44, fontWeight: 500,
            color: B_TOKENS.terracotta, lineHeight: 1, letterSpacing: -1,
          }}>{progreso.racha}</div>
          <div>
            <p style={{ fontFamily: B_TOKENS.sans, fontSize: 14, fontWeight: 600, color: B_TOKENS.ink, margin: 0 }}>días seguidos</p>
            <p style={{ fontFamily: B_TOKENS.serif, fontStyle: 'italic', fontSize: 13.5, color: B_TOKENS.inkSoft, margin: '2px 0 0' }}>
              tu mejor racha hasta ahora
            </p>
          </div>
          <span style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 3 }}>
            {[1,2,3,4,5,6,7].map(i => (
              <div key={i} style={{
                width: 7, height: 22, borderRadius: 3,
                background: i <= 5 ? B_TOKENS.terracotta : B_TOKENS.rule,
              }}/>
            ))}
          </div>
        </div>

        {/* Continuar — destacado */}
        <p style={{
          fontFamily: B_TOKENS.sans, fontSize: 11.5, letterSpacing: 1.4,
          textTransform: 'uppercase', color: B_TOKENS.inkMuted,
          fontWeight: 600, margin: '26px 0 8px',
        }}>donde lo dejaste</p>

        <button onClick={onGo} style={{
          width: '100%', padding: '20px',
          background: B_TOKENS.ink, color: B_TOKENS.cream,
          border: 'none', borderRadius: 18, textAlign: 'left',
          fontFamily: B_TOKENS.sans,
        }}>
          <p style={{ fontFamily: B_TOKENS.sans, fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: B_TOKENS.terracottaSoft, margin: 0, fontWeight: 600 }}>
            tarea 1 · capítulo 3
          </p>
          <p style={{ fontFamily: B_TOKENS.serif, fontSize: 22, fontWeight: 500, margin: '6px 0 4px', letterSpacing: -0.3, lineHeight: 1.2 }}>
            Las Cortes Generales
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
            <div style={{ flex: 1, height: 4, background: 'rgba(255, 250, 240, 0.2)', borderRadius: 2 }}>
              <div style={{ width: '50%', height: '100%', background: B_TOKENS.terracotta, borderRadius: 2 }}/>
            </div>
            <span style={{ fontFamily: B_TOKENS.sans, fontSize: 12, color: 'rgba(255, 250, 240, 0.7)' }}>14 / 28 pág</span>
          </div>
        </button>
      </div>

      {/* Tareas */}
      <p style={{
        fontFamily: B_TOKENS.sans, fontSize: 11.5, letterSpacing: 1.4,
        textTransform: 'uppercase', color: B_TOKENS.inkMuted, fontWeight: 600,
        margin: '28px 22px 10px',
      }}>las 5 tareas</p>

      <div style={{ padding: '0 22px' }}>
        {temas.map(t => (
          <div key={t.n} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 0', borderBottom: `1px solid ${B_TOKENS.rule}`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: t.completado > 0.5 ? B_TOKENS.olive : t.completado > 0.2 ? B_TOKENS.oliveSoft : B_TOKENS.paperWarm,
              border: `1px solid ${B_TOKENS.rule}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: B_TOKENS.serif, fontSize: 17, fontWeight: 500,
              color: t.completado > 0.2 ? B_TOKENS.cream : B_TOKENS.inkSoft,
              flexShrink: 0, fontStyle: 'italic',
            }}>{t.n}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: B_TOKENS.sans, fontSize: 14.5, fontWeight: 500, color: B_TOKENS.ink, margin: 0, lineHeight: 1.3 }}>
                {t.titulo}
              </p>
              <p style={{ fontFamily: B_TOKENS.sans, fontSize: 12, color: B_TOKENS.inkMuted, margin: '2px 0 0' }}>
                {Math.round(t.completado * t.preguntas)} de {t.preguntas} dominadas
              </p>
            </div>
            <span style={{ fontFamily: B_TOKENS.serif, fontSize: 18, fontStyle: 'italic', color: B_TOKENS.terracotta }}>
              {Math.round(t.completado * 100)}%
            </span>
          </div>
        ))}
      </div>

      {/* Simulacro CTA */}
      <div style={{
        margin: '24px 22px 0',
        padding: '20px',
        background: B_TOKENS.terracotta,
        color: B_TOKENS.cream,
        borderRadius: 18,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -30, right: -30, opacity: 0.18,
        }}>
          <BSeal size={130} color={B_TOKENS.cream} />
        </div>
        <p style={{ fontFamily: B_TOKENS.sans, fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', margin: 0, fontWeight: 600, opacity: 0.85 }}>
          examen real, en casa
        </p>
        <p style={{ fontFamily: B_TOKENS.serif, fontSize: 23, fontWeight: 500, margin: '6px 0 4px', letterSpacing: -0.3, lineHeight: 1.15, fontStyle: 'italic' }}>
          ¿Hacemos el<br/>simulacro nº 7?
        </p>
        <p style={{ fontFamily: B_TOKENS.sans, fontSize: 13, margin: '8px 0 14px', opacity: 0.85 }}>
          25 preguntas · 45 minutos
        </p>
        <button onClick={onGo} style={{
          background: B_TOKENS.cream, color: B_TOKENS.terracottaDeep,
          border: 'none', borderRadius: 10, padding: '10px 16px',
          fontFamily: B_TOKENS.sans, fontSize: 14, fontWeight: 600,
        }}>Empezar →</button>
      </div>

      <div style={{ height: 30 }} />
    </BShell>
  );
}

// ════════════════════ B-3 · Práctica interactiva ════════════════════
function BPractica({ onBack }) {
  const q = window.CCSE_DATA.preguntas[0];
  const [selected, setSelected] = React.useState(null);
  const [showExpl, setShowExpl] = React.useState(false);

  const handleClick = (letra) => {
    if (selected) return;
    setSelected(letra);
    setTimeout(() => setShowExpl(true), 350);
  };

  const handleNext = () => {
    setSelected(null);
    setShowExpl(false);
  };

  return (
    <BShell>
      <div style={{ padding: '0 22px' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: 'none',
            fontFamily: B_TOKENS.sans, fontSize: 22, color: B_TOKENS.inkSoft,
            padding: 0, cursor: 'pointer',
          }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{
              height: 4, background: B_TOKENS.rule, borderRadius: 2, overflow: 'hidden',
            }}>
              <div style={{ width: '12%', height: '100%', background: B_TOKENS.terracotta }} />
            </div>
          </div>
          <span style={{ fontFamily: B_TOKENS.serif, fontStyle: 'italic', fontSize: 14, color: B_TOKENS.inkSoft }}>3 / 25</span>
        </div>

        {/* Etiquetas */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          <span style={{
            padding: '4px 10px', borderRadius: 999,
            background: B_TOKENS.paperWarm, border: `1px solid ${B_TOKENS.rule}`,
            fontFamily: B_TOKENS.sans, fontSize: 11.5, color: B_TOKENS.inkSoft, fontWeight: 500,
            letterSpacing: 0.3,
          }}>Tarea 1 · Gobierno</span>
          <span style={{
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(107, 116, 72, 0.12)', color: B_TOKENS.olive,
            fontFamily: B_TOKENS.sans, fontSize: 11.5, fontWeight: 500,
          }}>fácil</span>
        </div>

        <h1 style={{
          fontFamily: B_TOKENS.serif, fontSize: 32, fontWeight: 500,
          margin: '0 0 6px', letterSpacing: -0.5, lineHeight: 1.15,
          textWrap: 'balance',
        }}>{q.enunciado}</h1>
        {!selected && <BUnderline width={70} />}

        {/* Opciones */}
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Object.entries(q.opciones).map(([letra, texto]) => {
            const isSel = selected === letra;
            const isCorrect = letra === q.correcta;
            const revealed = selected != null;
            let bg = B_TOKENS.cream, border = B_TOKENS.rule, ink = B_TOKENS.ink, bub = B_TOKENS.paperWarm, bubInk = B_TOKENS.ink;
            if (revealed && isCorrect) { bg = '#EFF1E0'; border = B_TOKENS.olive; bub = B_TOKENS.olive; bubInk = B_TOKENS.cream; }
            else if (revealed && isSel && !isCorrect) { bg = '#F8E6DE'; border = B_TOKENS.terracotta; bub = B_TOKENS.terracotta; bubInk = B_TOKENS.cream; }
            else if (revealed) { ink = B_TOKENS.inkMuted; }
            return (
              <button key={letra} onClick={() => handleClick(letra)} style={{
                display: 'flex', gap: 14, padding: '16px 16px',
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: 14, textAlign: 'left',
                alignItems: 'flex-start', cursor: 'pointer',
                transition: 'all 0.25s ease',
                fontFamily: B_TOKENS.sans,
              }}>
                <span style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: bub, color: bubInk,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: B_TOKENS.serif, fontStyle: 'italic',
                  fontSize: 15, fontWeight: 500, flexShrink: 0,
                }}>{revealed && isCorrect ? '✓' : revealed && isSel && !isCorrect ? '✗' : letra}</span>
                <span style={{
                  fontSize: 16, lineHeight: 1.35, color: ink, paddingTop: 5,
                  fontWeight: revealed && isCorrect ? 600 : 400,
                }}>{texto}</span>
              </button>
            );
          })}
        </div>

        {/* Explicación */}
        {showExpl && (
          <div style={{
            marginTop: 22, padding: '20px',
            background: B_TOKENS.paperWarm,
            borderRadius: 16,
            animation: 'bFadeIn 0.35s ease',
          }}>
            <p style={{
              fontFamily: B_TOKENS.sans, fontSize: 11, letterSpacing: 1.4,
              textTransform: 'uppercase', color: B_TOKENS.terracotta,
              fontWeight: 600, margin: 0,
            }}>Por qué</p>
            <p style={{
              fontFamily: B_TOKENS.serif, fontSize: 16, lineHeight: 1.5,
              color: B_TOKENS.ink, margin: '8px 0 0', textWrap: 'pretty',
            }}>{q.explicacion}</p>

            <div style={{
              marginTop: 14, padding: '10px 12px',
              background: B_TOKENS.cream, borderRadius: 10,
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <span style={{ fontFamily: B_TOKENS.serif, fontSize: 18, fontStyle: 'italic', color: B_TOKENS.terracotta }}>“</span>
              <span style={{ fontFamily: B_TOKENS.serif, fontStyle: 'italic', fontSize: 14, color: B_TOKENS.inkSoft, flex: 1 }}>
                {q.mnemo}
              </span>
            </div>

            <button onClick={handleNext} style={{
              width: '100%', marginTop: 16, padding: '14px',
              background: B_TOKENS.terracotta, color: B_TOKENS.cream,
              border: 'none', borderRadius: 12,
              fontFamily: B_TOKENS.sans, fontSize: 15, fontWeight: 600,
            }}>siguiente pregunta →</button>
          </div>
        )}
      </div>
      <style>{`@keyframes bFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </BShell>
  );
}

// ════════════════════ B-4 · Simulacro en curso ════════════════════
function BSimulacro({ onFinish }) {
  return (
    <BShell bg={B_TOKENS.cream}>
      {/* Sticky header with timer */}
      <div style={{
        padding: '0 22px 14px',
        borderBottom: `1px solid ${B_TOKENS.rule}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div>
            <p style={{ fontFamily: B_TOKENS.sans, fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: B_TOKENS.inkMuted, fontWeight: 600, margin: 0 }}>Simulacro nº 7</p>
            <p style={{ fontFamily: B_TOKENS.serif, fontSize: 15, fontStyle: 'italic', color: B_TOKENS.inkSoft, margin: '2px 0 0' }}>pregunta 12 de 25</p>
          </div>
          <span style={{ flex: 1 }} />
          <div style={{
            padding: '8px 14px', background: B_TOKENS.ink,
            color: B_TOKENS.cream, borderRadius: 10,
            fontFamily: '"Geist Mono", monospace', fontSize: 18, fontWeight: 500,
            letterSpacing: 0.5, fontVariantNumeric: 'tabular-nums',
          }}>27:14</div>
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 3 }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 6, borderRadius: 2,
              background: i < 11 ? B_TOKENS.ink : i === 11 ? B_TOKENS.terracotta : B_TOKENS.rule,
            }}/>
          ))}
        </div>
      </div>

      <div style={{ padding: '22px 22px 0' }}>
        <p style={{ fontFamily: B_TOKENS.sans, fontSize: 11.5, letterSpacing: 1.4, textTransform: 'uppercase', color: B_TOKENS.olive, margin: 0, fontWeight: 600 }}>
          tarea 2 · derechos
        </p>
        <h1 style={{
          fontFamily: B_TOKENS.serif, fontSize: 28, fontWeight: 500,
          margin: '8px 0 26px', letterSpacing: -0.4, lineHeight: 1.2,
          textWrap: 'balance',
        }}>¿A qué edad se obtiene el derecho al voto en España?</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[['a', 'A los 16 años.'], ['b', 'A los 18 años.', true], ['c', 'A los 21 años.']].map(([l, t, sel]) => (
            <div key={l} style={{
              display: 'flex', gap: 14, padding: '15px 16px',
              background: sel ? B_TOKENS.ink : 'transparent',
              border: `1.5px solid ${sel ? B_TOKENS.ink : B_TOKENS.rule}`,
              borderRadius: 14, alignItems: 'center',
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%',
                background: sel ? B_TOKENS.cream : B_TOKENS.paperWarm,
                color: sel ? B_TOKENS.ink : B_TOKENS.ink,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: B_TOKENS.serif, fontStyle: 'italic',
                fontSize: 14, fontWeight: 500, flexShrink: 0,
              }}>{l}</span>
              <span style={{
                fontFamily: B_TOKENS.serif, fontSize: 17,
                color: sel ? B_TOKENS.cream : B_TOKENS.ink,
              }}>{t}</span>
            </div>
          ))}
        </div>

        <button style={{
          marginTop: 14, width: '100%', padding: '10px',
          background: 'transparent', color: B_TOKENS.inkMuted,
          border: `1px dashed ${B_TOKENS.rule}`, borderRadius: 10,
          fontFamily: B_TOKENS.sans, fontSize: 13,
        }}>marcar para revisar ⌖</button>

        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button style={{
            flex: 1, padding: '14px',
            background: B_TOKENS.paperWarm, color: B_TOKENS.inkSoft,
            border: 'none', borderRadius: 12,
            fontFamily: B_TOKENS.sans, fontSize: 15, fontWeight: 500,
          }}>← anterior</button>
          <button onClick={onFinish} style={{
            flex: 2, padding: '14px',
            background: B_TOKENS.terracotta, color: B_TOKENS.cream,
            border: 'none', borderRadius: 12,
            fontFamily: B_TOKENS.sans, fontSize: 15, fontWeight: 600,
          }}>siguiente →</button>
        </div>
      </div>
    </BShell>
  );
}

// ════════════════════ B-5 · Resultado simulacro ════════════════════
function BResultado({ onBack }) {
  const r = window.CCSE_DATA.simulacroResultado;
  return (
    <BShell>
      <div style={{ padding: '0 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', fontSize: 22, color: B_TOKENS.inkSoft }}>←</button>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: B_TOKENS.sans, fontSize: 13, color: B_TOKENS.inkMuted }}>compartir</span>
        </div>

        <p style={{
          fontFamily: B_TOKENS.sans, fontSize: 11.5, letterSpacing: 1.4,
          textTransform: 'uppercase', color: B_TOKENS.olive,
          fontWeight: 700, margin: 0,
        }}>aprobado</p>

        <h1 style={{
          fontFamily: B_TOKENS.serif, fontSize: 32, fontWeight: 500,
          margin: '6px 0 0', letterSpacing: -0.5, lineHeight: 1.1,
        }}>
          Si fuera el examen<br/>
          <span style={{ fontStyle: 'italic', color: B_TOKENS.terracottaDeep }}>de verdad, hoy</span><br/>
          ya tendrías la nacionalidad.
        </h1>
        <BUnderline width={180} />

        {/* Big score */}
        <div style={{
          marginTop: 26, padding: '24px 22px',
          background: B_TOKENS.cream, borderRadius: 22,
          border: `1px solid ${B_TOKENS.rule}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{
              fontFamily: B_TOKENS.serif, fontSize: 96, fontWeight: 500,
              color: B_TOKENS.terracotta, lineHeight: 0.8, letterSpacing: -3,
            }}>{r.aciertos}</span>
            <span style={{
              fontFamily: B_TOKENS.serif, fontStyle: 'italic', fontSize: 26,
              color: B_TOKENS.inkMuted, fontWeight: 400,
            }}>/ {r.total}</span>
          </div>
          <p style={{ fontFamily: B_TOKENS.sans, fontSize: 13, color: B_TOKENS.inkMuted, margin: '12px 0 0' }}>
            necesitabas <strong style={{ color: B_TOKENS.ink }}>{r.minimoAprobar}</strong> · te sobraron <strong style={{ color: B_TOKENS.ink }}>06:46 min</strong>
          </p>
        </div>

        {/* Desglose por tarea */}
        <p style={{
          fontFamily: B_TOKENS.sans, fontSize: 11.5, letterSpacing: 1.4,
          textTransform: 'uppercase', color: B_TOKENS.inkMuted, fontWeight: 600,
          margin: '28px 0 12px',
        }}>desglose por tarea</p>
        {r.porBloque.map(b => {
          const pct = b.aciertos / b.total;
          const allRight = pct === 1;
          return (
            <div key={b.tarea} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0', borderBottom: `1px solid ${B_TOKENS.rule}`,
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: 8,
                background: allRight ? B_TOKENS.olive : B_TOKENS.terracottaSoft,
                color: B_TOKENS.cream,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: B_TOKENS.serif, fontSize: 13, fontStyle: 'italic',
                flexShrink: 0,
              }}>{b.tarea}</span>
              <span style={{ flex: 1, fontFamily: B_TOKENS.sans, fontSize: 14.5, color: B_TOKENS.ink }}>{b.label}</span>
              <div style={{
                width: 80, height: 4, background: B_TOKENS.rule, borderRadius: 2,
              }}>
                <div style={{
                  width: `${pct * 100}%`, height: '100%',
                  background: allRight ? B_TOKENS.olive : B_TOKENS.terracotta, borderRadius: 2,
                }}/>
              </div>
              <span style={{
                fontFamily: B_TOKENS.serif, fontStyle: 'italic', fontSize: 14.5,
                color: B_TOKENS.ink, width: 36, textAlign: 'right',
                fontVariantNumeric: 'tabular-nums',
              }}>{b.aciertos}/{b.total}</span>
            </div>
          );
        })}

        {/* Lo que fallaste */}
        <div style={{
          marginTop: 22, padding: '18px',
          background: 'rgba(184, 85, 51, 0.07)',
          borderRadius: 16,
        }}>
          <p style={{
            fontFamily: B_TOKENS.sans, fontSize: 11.5, letterSpacing: 1.4,
            textTransform: 'uppercase', color: B_TOKENS.terracottaDeep, fontWeight: 700, margin: 0,
          }}>2 para repasar</p>
          {r.fallidas.map(f => (
            <p key={f.idOf} style={{
              fontFamily: B_TOKENS.serif, fontSize: 15, fontStyle: 'italic',
              color: B_TOKENS.ink, margin: '10px 0 0', lineHeight: 1.4,
            }}>
              <span style={{ fontFamily: B_TOKENS.sans, fontSize: 11, color: B_TOKENS.inkMuted, fontStyle: 'normal', marginRight: 6, fontWeight: 600 }}>nº{f.idOf}</span>
              {f.enunciado}
            </p>
          ))}
          <button style={{
            marginTop: 14, padding: '10px 14px',
            background: B_TOKENS.terracotta, color: B_TOKENS.cream,
            border: 'none', borderRadius: 10,
            fontFamily: B_TOKENS.sans, fontSize: 13.5, fontWeight: 600,
          }}>repasarlas ahora →</button>
        </div>

        <button onClick={onBack} style={{
          width: '100%', marginTop: 22, padding: '14px',
          background: 'transparent', color: B_TOKENS.ink,
          border: `1.5px solid ${B_TOKENS.ink}`, borderRadius: 12,
          fontFamily: B_TOKENS.sans, fontSize: 15, fontWeight: 600,
        }}>volver al inicio</button>
      </div>
    </BShell>
  );
}

// ════════════════════ B-6 · Progreso ════════════════════
function BProgreso() {
  const p = window.CCSE_DATA.progreso;
  return (
    <BShell>
      <div style={{ padding: '0 22px' }}>
        <h1 style={{
          fontFamily: B_TOKENS.serif, fontSize: 30, fontWeight: 500,
          margin: 0, letterSpacing: -0.4,
        }}>Tu <span style={{ fontStyle: 'italic', color: B_TOKENS.terracottaDeep }}>progreso</span>.</h1>
        <BUnderline width={100} />

        {/* Number cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
          marginTop: 22,
        }}>
          <div style={{
            padding: '16px', background: B_TOKENS.cream,
            borderRadius: 16, border: `1px solid ${B_TOKENS.rule}`,
          }}>
            <p style={{ fontFamily: B_TOKENS.serif, fontSize: 38, color: B_TOKENS.ink, margin: 0, lineHeight: 1, fontWeight: 500 }}>{p.preguntasDominio}</p>
            <p style={{ fontFamily: B_TOKENS.sans, fontSize: 12, color: B_TOKENS.inkMuted, margin: '6px 0 0', lineHeight: 1.3 }}>de 300 preguntas dominadas</p>
            <div style={{ height: 4, background: B_TOKENS.rule, borderRadius: 2, marginTop: 12 }}>
              <div style={{ width: `${p.preguntasDominio / 3}%`, height: '100%', background: B_TOKENS.terracotta, borderRadius: 2 }}/>
            </div>
          </div>
          <div style={{
            padding: '16px', background: B_TOKENS.terracotta, color: B_TOKENS.cream,
            borderRadius: 16,
          }}>
            <p style={{ fontFamily: B_TOKENS.serif, fontSize: 38, margin: 0, lineHeight: 1, fontWeight: 500 }}>{p.simulacrosAprobados}<span style={{ fontSize: 22, opacity: 0.7 }}>/{p.simulacrosTotales}</span></p>
            <p style={{ fontFamily: B_TOKENS.sans, fontSize: 12, margin: '6px 0 0', lineHeight: 1.3, opacity: 0.85 }}>simulacros aprobados</p>
            <p style={{ fontFamily: B_TOKENS.serif, fontStyle: 'italic', fontSize: 13, margin: '8px 0 0', opacity: 0.95 }}>
              media: {p.mediaSimulacros}/25
            </p>
          </div>
        </div>

        {/* Heatmap-ish weekly */}
        <div style={{
          marginTop: 16, padding: '18px',
          background: B_TOKENS.paperWarm, borderRadius: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: B_TOKENS.sans, fontSize: 11.5, letterSpacing: 1.2, textTransform: 'uppercase', color: B_TOKENS.inkMuted, fontWeight: 600, margin: 0 }}>últimas 4 semanas</p>
            <p style={{ fontFamily: B_TOKENS.serif, fontSize: 14, fontStyle: 'italic', color: B_TOKENS.inkSoft, margin: 0 }}>{p.diasEstudiados} días</p>
          </div>
          <div style={{
            marginTop: 12, display: 'grid',
            gridTemplateColumns: 'repeat(28, 1fr)', gap: 4,
          }}>
            {Array.from({ length: 28 }).map((_, i) => {
              const intensities = [0, 0.3, 0, 0.7, 1, 0.5, 0,
                                    0.4, 0.6, 0.8, 0.5, 0, 1, 0.3,
                                    0.5, 0.9, 0.6, 1, 0.8, 0.4, 0,
                                    0.7, 1, 0.9, 0.6, 1, 0.8, 1];
              const v = intensities[i];
              return (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 3,
                  background: v === 0 ? B_TOKENS.rule
                    : v < 0.4 ? B_TOKENS.terracottaSoft
                    : v < 0.7 ? B_TOKENS.terracotta
                    : B_TOKENS.terracottaDeep,
                  opacity: v === 0 ? 0.5 : 1,
                }}/>
              );
            })}
          </div>
        </div>

        {/* Por tema */}
        <p style={{
          fontFamily: B_TOKENS.sans, fontSize: 11.5, letterSpacing: 1.4,
          textTransform: 'uppercase', color: B_TOKENS.inkMuted, fontWeight: 600,
          margin: '24px 0 10px',
        }}>dominio por tarea</p>
        {p.porTema.map(t => (
          <div key={t.tema} style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: B_TOKENS.sans, fontSize: 14, color: B_TOKENS.ink }}>{t.tema}</span>
              <span style={{ fontFamily: B_TOKENS.serif, fontStyle: 'italic', fontSize: 13.5, color: B_TOKENS.inkSoft }}>{Math.round(t.dominio * 100)}%</span>
            </div>
            <div style={{ height: 5, background: B_TOKENS.rule, borderRadius: 3, marginTop: 6 }}>
              <div style={{
                width: `${t.dominio * 100}%`, height: '100%',
                background: t.dominio > 0.5 ? B_TOKENS.olive : B_TOKENS.terracotta,
                borderRadius: 3,
              }}/>
            </div>
          </div>
        ))}
        <div style={{ height: 30 }} />
      </div>
    </BShell>
  );
}

// ════════════════ Interactive shell: switches screens ════════════════
function BApp() {
  const [screen, setScreen] = React.useState('landing');
  const screens = {
    landing: <BLanding onCta={() => setScreen('dashboard')} />,
    dashboard: <BDashboard onGo={() => setScreen('practica')} />,
    practica: <BPractica onBack={() => setScreen('dashboard')} />,
    simulacro: <BSimulacro onFinish={() => setScreen('resultado')} />,
    resultado: <BResultado onBack={() => setScreen('dashboard')} />,
    progreso: <BProgreso />,
  };
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {screens[screen]}
      {/* tab bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '10px 16px 26px',
        background: 'rgba(248, 242, 231, 0.85)',
        backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${B_TOKENS.rule}`,
        display: screen === 'landing' ? 'none' : 'flex',
        gap: 4, justifyContent: 'space-around',
        fontFamily: B_TOKENS.sans,
      }}>
        {[
          ['dashboard', 'Inicio'],
          ['practica', 'Practicar'],
          ['simulacro', 'Examen'],
          ['progreso', 'Progreso'],
        ].map(([k, l]) => (
          <button key={k} onClick={() => setScreen(k)} style={{
            background: 'transparent', border: 'none', padding: '6px 8px',
            fontFamily: B_TOKENS.sans, fontSize: 12,
            color: screen === k ? B_TOKENS.terracotta : B_TOKENS.inkMuted,
            fontWeight: screen === k ? 600 : 500,
            cursor: 'pointer',
          }}>
            <span style={{
              display: 'block', width: 6, height: 6, borderRadius: 3,
              background: screen === k ? B_TOKENS.terracotta : 'transparent',
              margin: '0 auto 4px',
            }}/>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  B_TOKENS, BApp, BLanding, BDashboard, BPractica, BSimulacro, BResultado, BProgreso,
});
