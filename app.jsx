const { useState } = React;

const MODULOS = [
  {
    id: "ambiente",
    label: "Ambiente",
    preguntas: [
      {
        id: "amb_1",
        question: "¿Cómo describirías el ambiente general dentro de tu organización?",
        options: ["Muy positivo y colaborativo", "Funcional pero distante", "Tenso o incierto", "Variable según el área"]
      },
      {
        id: "amb_2",
        question: "¿Cómo es la disciplina dentro de tu organización?",
        options: ["Muy formal: normas claras de vestimenta, horario y orden", "Moderada: hay normas pero con flexibilidad", "Informal: cada uno maneja su propio estilo", "Depende del área o del líder"]
      },
      {
        id: "amb_3",
        question: "¿Cómo describes el balance entre vida personal y trabajo en tu organización?",
        options: ["Vida y trabajo están totalmente fusionados", "Existe separación clara entre ambos", "Se integran de forma natural según cada persona", "No existe equilibrio, el trabajo siempre gana"]
      }
    ]
  },
  {
    id: "talento",
    label: "Gestión de Talento",
    preguntas: [
      {
        id: "tal_1",
        question: "¿Cómo se selecciona al personal en tu organización?",
        options: ["Por cualificación formal y competencias", "Por lealtad y obediencia al líder", "Por relaciones personales o recomendaciones", "Por potencial de desarrollo y actitud"]
      },
      {
        id: "tal_2",
        question: "¿Qué perfil de persona valora más tu organización al contratar?",
        options: ["Alguien equilibrado en todas las áreas", "Alguien muy técnico y especializado", "Alguien comunicativo y con habilidades sociales", "Alguien innovador y disruptivo"]
      },
      {
        id: "tal_3",
        question: "¿Cómo se desarrolla el talento dentro de tu organización?",
        options: ["Con capacitaciones formales y programas estructurados", "A través de mentorías y relaciones de confianza", "Aprendiendo en el día a día sin estructura formal", "Con proyectos estratégicos y metas de crecimiento"]
      }
    ]
  },
  {
    id: "liderazgo",
    label: "Liderazgo",
    preguntas: [
      {
        id: "lid_1",
        question: "¿Cómo describe mejor al líder principal de tu organización?",
        options: ["Experto técnico que lidera con el ejemplo", "Orientado a resultados y control de tareas", "Sistemático y normativo, fiel a los procesos", "Inspirador con visión de largo plazo"]
      },
      {
        id: "lid_2",
        question: "¿Cómo reacciona el liderazgo ante los errores del equipo?",
        options: ["Con exigencia pero disposición a enseñar", "Con corrección estricta o presión directa", "Con reglas claras sobre cómo evitar repetirlos", "Con reflexión colectiva y aprendizaje compartido"]
      },
      {
        id: "lid_3",
        question: "¿Cómo se toman las decisiones importantes en tu organización?",
        options: ["El líder decide y el equipo ejecuta", "Se consulta al equipo pero decide el líder", "Se decide por consenso colectivo", "Cada quien decide dentro de su área de autonomía"]
      }
    ]
  },
  {
    id: "organizacion",
    label: "Percepción de la Organización",
    preguntas: [
      {
        id: "org_1",
        question: "¿Cómo describirías la estructura de tu organización?",
        options: ["Jerárquica y con cadena de mando clara", "Formal pero con cierta flexibilidad operativa", "Horizontal y colaborativa", "Difusa, sin roles bien definidos"]
      },
      {
        id: "org_2",
        question: "¿Qué valora más tu organización en sus colaboradores?",
        options: ["Obediencia y cumplimiento de normas", "Resultados y eficiencia operativa", "Trabajo en equipo y sentido de comunidad", "Innovación y pensamiento propio"]
      },
      {
        id: "org_3",
        question: "¿Cómo se gestiona la información dentro de tu organización?",
        options: ["De forma centralizada: solo algunos tienen acceso", "Se comparte según jerarquía y necesidad", "Fluye libremente entre equipos", "Cada área maneja su propia información"]
      }
    ]
  },
  {
    id: "autopercepcion",
    label: "Autopercepción del Equipo",
    preguntas: [
      {
        id: "aut_1",
        question: "¿Cómo se ve a sí mismo tu equipo dentro de la organización?",
        options: ["Como un grupo unido que cuida sus tradiciones", "Como ejecutores comprometidos con los resultados", "Como profesionales ordenados que siguen las reglas", "Como personas con aspiraciones de crecimiento"]
      },
      {
        id: "aut_2",
        question: "¿Qué motiva principalmente a las personas de tu equipo?",
        options: ["La seguridad y la estabilidad laboral", "El miedo a las consecuencias de no cumplir", "El orgullo de hacer bien su trabajo", "El entusiasmo y las ganas de superarse"]
      },
      {
        id: "aut_3",
        question: "¿Qué tan abierto es tu equipo al cambio?",
        options: ["Resistente: prefiere lo conocido y estable", "Cauteloso: acepta cambios si hay claridad y orden", "Adaptable: se ajusta según las circunstancias", "Proactivo: busca y propone cambios constantemente"]
      }
    ]
  },
  {
    id: "gestion",
    label: "Sistema de Gestión",
    preguntas: [
      {
        id: "ges_1",
        question: "¿Cómo se planifica el trabajo en tu organización?",
        options: ["Con planes rígidos que se siguen al pie de la letra", "Con planes claros que permiten ajustes cuando es necesario", "Con objetivos generales pero sin planes detallados", "De forma flexible y adaptada al contexto del momento"]
      },
      {
        id: "ges_2",
        question: "¿Cómo se coordinan los equipos entre sí?",
        options: ["A través de jerarquía y órdenes directas del líder", "Con reuniones operativas donde el líder asigna tareas", "Con procesos y acuerdos compartidos entre áreas", "De forma autónoma según madurez de cada equipo"]
      },
      {
        id: "ges_3",
        question: "¿Cómo se resuelven los conflictos en tu organización?",
        options: ["Se ocultan o se evitan para no generar problemas", "El líder interviene y toma la decisión final", "Se abordan con reglas y procesos establecidos", "Se resuelven con diálogo directo entre las partes"]
      }
    ]
  }
];

const TODAS_PREGUNTAS = MODULOS.flatMap(m => m.preguntas.map(p => ({ ...p, modulo: m.label, moduloId: m.id })));
const TOTAL = TODAS_PREGUNTAS.length; // 18

const s = {
  wrap: { background: "#0a0a0f", minHeight: "100vh", color: "#e8e6e1", fontFamily: "'Inter', system-ui, sans-serif" },
  bannerImg: { width: "100%", display: "block", objectFit: "cover", objectPosition: "center" },
  hero: { textAlign: "center", padding: "64px 24px 48px", maxWidth: "680px", margin: "0 auto" },
  badge: { display: "inline-block", background: "#c9b99a22", border: "1px solid #c9b99a44", color: "#c9b99a", fontSize: "10px", letterSpacing: "0.2em", padding: "5px 14px", borderRadius: "20px", marginBottom: "24px" },
  h1: { fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, lineHeight: 1.2, color: "#e8e6e1", marginBottom: "16px" },
  gold: { color: "#c9b99a" },
  sub: { fontSize: "14px", color: "#7a7a90", lineHeight: 1.8, marginBottom: "36px" },
  startBtn: { background: "#c9b99a", color: "#0a0a0f", border: "none", borderRadius: "10px", padding: "15px 36px", fontWeight: 800, fontSize: "14px", cursor: "pointer" },
  statsRow: { display: "flex", justifyContent: "center", gap: "40px", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #1e1e2e" },
  stat: { textAlign: "center" },
  statN: { fontSize: "22px", fontWeight: 800, color: "#c9b99a" },
  statL: { fontSize: "10px", color: "#6b6b80", letterSpacing: "0.1em", marginTop: "2px" },
  card: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "32px", maxWidth: "620px", margin: "0 auto 24px" },
  step: { fontSize: "10px", color: "#6b6b80", letterSpacing: "0.15em", marginBottom: "4px" },
  modulo: { fontSize: "12px", color: "#a078c8", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "14px" },
  q: { fontSize: "17px", fontWeight: 700, color: "#e8e6e1", lineHeight: 1.5, marginBottom: "24px" },
  optBtn: (sel) => ({ display: "block", width: "100%", background: sel ? "#1a1a35" : "transparent", border: `1px solid ${sel ? "#c9b99a" : "#1e1e2e"}`, color: sel ? "#c9b99a" : "#9090a8", padding: "13px 18px", borderRadius: "9px", cursor: "pointer", fontSize: "13px", textAlign: "left", marginBottom: "10px", transition: "all 0.18s" }),
  navRow: { display: "flex", gap: "10px", marginTop: "20px" },
  btn: { background: "#c9b99a", color: "#0a0a0f", border: "none", borderRadius: "8px", padding: "12px 26px", fontWeight: 700, fontSize: "13px", cursor: "pointer" },
  btnO: { background: "transparent", color: "#c9b99a", border: "1px solid #c9b99a44", borderRadius: "8px", padding: "11px 22px", fontWeight: 600, fontSize: "12px", cursor: "pointer" },
  input: { width: "100%", background: "#0a0a0f", border: "1px solid #1e1e2e", borderRadius: "9px", padding: "13px 16px", color: "#e8e6e1", fontSize: "14px", outline: "none", marginBottom: "14px", boxSizing: "border-box" },
  label: { fontSize: "11px", color: "#7a7a90", letterSpacing: "0.08em", display: "block", marginBottom: "6px" },
  spinner: { display: "inline-block", width: "20px", height: "20px", border: "2px solid #c9b99a33", borderTop: "2px solid #c9b99a", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  lockBox: { background: "#13132a", border: "1px solid #3d3d4a", borderRadius: "12px", padding: "24px", marginTop: "20px", position: "relative", overflow: "hidden" },
  blur: { filter: "blur(5px)", pointerEvents: "none", userSelect: "none", opacity: 0.5 },
  lockLabel: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#0a0a0f", border: "1px solid #c9b99a44", borderRadius: "10px", padding: "14px 22px", textAlign: "center", zIndex: 2 },
  ctaBox: { background: "linear-gradient(135deg, #13132a, #1a1030)", border: "1px solid #3d3d60", borderRadius: "14px", padding: "36px", textAlign: "center", maxWidth: "620px", margin: "0 auto" },
};

function App() {
  const [fase, setFase] = useState("hero");
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [empresa, setEmpresa] = useState("");
  const [sector, setSector] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [report, setReport] = useState(null);

  const preguntaActual = TODAS_PREGUNTAS[paso];
  const progreso = (paso / TOTAL) * 100;
  const todasRespondidas = TODAS_PREGUNTAS.every(p => respuestas[p.id]);

  function elegirOpcion(opcion) {
    const nuevas = { ...respuestas, [preguntaActual.id]: opcion };
    setRespuestas(nuevas);
    if (paso < TOTAL - 1) setTimeout(() => setPaso(p => p + 1), 300);
  }

  async function enviarYGenerar() {
    setFase("loading");

    // Enviar a Formspree
    try {
      const payload = { nombre, email, empresa, sector, fecha: new Date().toLocaleString("es-PE") };
      TODAS_PREGUNTAS.forEach((p, i) => { payload[`${i+1}_${p.id}`] = respuestas[p.id] || ""; });
      await fetch("https://formspree.io/f/mbdekeee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (e) { console.log("Formspree error:", e); }

    // Generar informe IA
    try {
      const resumen = MODULOS.map(m => {
        const qs = m.preguntas.map(p => `  · ${p.question.split("?")[0]}: ${respuestas[p.id] || "Sin respuesta"}`).join("\n");
        return `${m.label}:\n${qs}`;
      }).join("\n\n");

      const prompt = `Eres estratega de marca de Dreizack Studios. Genera un diagnóstico PARCIAL como lead magnet basado en el Diagnóstico Express de Cultura (DEC).

EMPRESA: ${empresa} | SECTOR: ${sector} | CONTACTO: ${nombre}

RESULTADOS DEC (18 preguntas / 6 módulos):
${resumen}

Responde SOLO con JSON sin backticks:
{
  "titular": "frase impactante 8-12 palabras sobre el estado real de la marca de ${empresa}",
  "diagnostico_breve": "2 párrafos concretos. Nombra la empresa. Cruza los módulos. Genera necesidad de saber más.",
  "pilar1": {"titulo": "primer pilar estratégico urgente", "descripcion": "2 oraciones de por qué es crítico para ${empresa}"},
  "pilar2": {"titulo": "segundo pilar estratégico urgente", "descripcion": "2 oraciones de por qué es crítico para ${empresa}"},
  "score": numero entre 35 y 78 basado en las respuestas,
  "alerta": "frase directa sobre el mayor riesgo cultural de esta marca hoy"
}`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const texto = data.content?.map(i => i.text || "").join("") || "";
      const parsed = JSON.parse(texto.replace(/```json|```/g, "").trim());
      setReport(parsed);
      setFase("report");
    } catch (e) {
      setReport({ error: true });
      setFase("report");
    }
  }

  return (
    <div style={s.wrap}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} *{box-sizing:border-box} button:hover{opacity:0.85}`}</style>

      <img src="https://static.wixstatic.com/media/987718_584fe7bd8733465ebbc38dbe57ef4433~mv2.jpeg" style={s.bannerImg} alt="Dreizack Studios" onError={e => { e.target.style.display = "none"; }} />

      {/* HERO */}
      {fase === "hero" && (
        <div style={s.hero}>
          <div style={s.badge}>BRANDING OS · DIAGNÓSTICO EXPRESS DE CULTURA</div>
          <h1 style={s.h1}>¿Tu marca se ve bien afuera<br />pero <span style={s.gold}>nadie la vive adentro?</span></h1>
          <p style={s.sub}>En 10 minutos descubre si tu cultura organizacional está sosteniendo o saboteando tu marca. El DEC analiza 6 módulos clave con 18 preguntas.</p>
          <button style={s.startBtn} onClick={() => setFase("previa")}>Iniciar diagnóstico gratuito →</button>
          <div style={s.statsRow}>
            <div style={s.stat}><div style={s.statN}>18</div><div style={s.statL}>PREGUNTAS</div></div>
            <div style={s.stat}><div style={s.statN}>6</div><div style={s.statL}>MÓDULOS</div></div>
            <div style={s.stat}><div style={s.statN}>DEC</div><div style={s.statL}>DIAGNÓSTICO EXPRESS DE CULTURA</div></div>
          </div>
        </div>
      )}

      {/* PREVIA */}
      {fase === "previa" && (
        <div style={{ padding: "40px 24px" }}>
          <div style={s.card}>
            <div style={s.step}>ANTES DE EMPEZAR</div>
            <div style={s.q}>Cuéntanos sobre tu empresa</div>
            <label style={s.label}>NOMBRE DE LA EMPRESA</label>
            <input style={s.input} placeholder="Ej: Acuario Corp" value={empresa} onChange={e => setEmpresa(e.target.value)} />
            <label style={s.label}>SECTOR / INDUSTRIA</label>
            <input style={s.input} placeholder="Ej: Retail, Servicios, Tecnología..." value={sector} onChange={e => setSector(e.target.value)} />
            <button style={{ ...s.btn, opacity: empresa.trim() ? 1 : 0.5 }} disabled={!empresa.trim()} onClick={() => { setPaso(0); setFase("preguntas"); }}>
              Empezar diagnóstico →
            </button>
          </div>
        </div>
      )}

      {/* PREGUNTAS */}
      {fase === "preguntas" && (
        <div style={{ padding: "40px 24px" }}>
          {/* Barra de progreso */}
          <div style={{ height: "3px", background: `linear-gradient(90deg, #c9b99a ${progreso}%, #1e1e2e ${progreso}%)`, borderRadius: "2px", maxWidth: "620px", margin: "0 auto 28px" }} />

          <div style={s.card}>
            <div style={s.step}>DEC · PREGUNTA {paso + 1} DE {TOTAL}</div>
            <div style={s.modulo}>{preguntaActual.modulo.toUpperCase()}</div>
            <div style={s.q}>{preguntaActual.question}</div>

            {preguntaActual.options.map(opt => (
              <button key={opt} style={s.optBtn(respuestas[preguntaActual.id] === opt)} onClick={() => elegirOpcion(opt)}>{opt}</button>
            ))}

            <div style={s.navRow}>
              {paso > 0 && <button style={s.btnO} onClick={() => setPaso(p => p - 1)}>← Anterior</button>}
              {respuestas[preguntaActual.id] && paso < TOTAL - 1 && (
                <button style={s.btn} onClick={() => setPaso(p => p + 1)}>Siguiente →</button>
              )}
            </div>
          </div>

          {todasRespondidas && (
            <div style={{ ...s.card, textAlign: "center" }}>
              <div style={{ fontSize: "13px", color: "#7a7a90", marginBottom: "12px" }}>✓ Diagnóstico completado — {TOTAL} preguntas respondidas</div>
              <button style={s.btn} onClick={() => setFase("capture")}>Ver mi diagnóstico →</button>
            </div>
          )}
        </div>
      )}

      {/* CAPTURE */}
      {fase === "capture" && (
        <div style={{ padding: "40px 24px" }}>
          <div style={s.card}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>🔍</div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#e8e6e1", marginBottom: "8px" }}>Tu diagnóstico está listo</div>
              <div style={{ fontSize: "13px", color: "#7a7a90", lineHeight: 1.7 }}>Ingresa tus datos para acceder a los resultados de <strong style={{ color: "#c9b99a" }}>{empresa}</strong>.</div>
            </div>
            <label style={s.label}>TU NOMBRE</label>
            <input style={s.input} placeholder="Ej: Carlos Mendoza" value={nombre} onChange={e => setNombre(e.target.value)} />
            <label style={s.label}>EMAIL PROFESIONAL</label>
            <input style={s.input} placeholder="carlos@empresa.com" value={email} onChange={e => setEmail(e.target.value)} />
            <button style={{ ...s.btn, width: "100%", padding: "15px", opacity: (nombre.trim() && email.includes("@")) ? 1 : 0.5 }}
              disabled={!nombre.trim() || !email.includes("@")} onClick={enviarYGenerar}>
              Ver mi diagnóstico →
            </button>
            <div style={{ fontSize: "10px", color: "#4a4a60", textAlign: "center", marginTop: "12px" }}>Sin spam. Solo tu informe y, si aplica, una propuesta de Dreizack.</div>
          </div>
        </div>
      )}

      {/* LOADING */}
      {fase === "loading" && (
        <div style={{ textAlign: "center", padding: "100px 24px" }}>
          <div style={{ ...s.spinner, margin: "0 auto 20px" }} />
          <div style={{ fontSize: "14px", color: "#7a7a90" }}>Analizando la cultura de marca de <strong style={{ color: "#c9b99a" }}>{empresa}</strong>...</div>
        </div>
      )}

      {/* INFORME */}
      {fase === "report" && report && !report.error && (
        <div style={{ padding: "40px 24px" }}>
          <div style={{ ...s.card, textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", color: "#7a7a90", letterSpacing: "0.15em", marginBottom: "12px" }}>ÍNDICE DE MADUREZ CULTURAL</div>
            <div style={{ fontSize: "64px", fontWeight: 900, color: report.score < 50 ? "#c07070" : report.score < 65 ? "#c9a050" : "#7ab87a", lineHeight: 1 }}>{report.score}</div>
            <div style={{ fontSize: "11px", color: "#6b6b80", marginTop: "6px" }}>de 100</div>
            {report.alerta && (
              <div style={{ background: "#2a1010", border: "1px solid #4a2020", borderRadius: "8px", padding: "10px 16px", marginTop: "16px", fontSize: "12px", color: "#c07070" }}>⚠ {report.alerta}</div>
            )}
          </div>

          {report.titular && (
            <div style={{ ...s.card, marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", color: "#c9b99a", letterSpacing: "0.15em", marginBottom: "10px" }}>DIAGNÓSTICO · {empresa.toUpperCase()}</div>
              <div style={{ fontSize: "17px", fontWeight: 800, color: "#e8e6e1", marginBottom: "16px", lineHeight: 1.4, fontStyle: "italic" }}>"{report.titular}"</div>
              <div style={{ fontSize: "13px", color: "#a0a0b8", lineHeight: 1.8 }}>{report.diagnostico_breve}</div>
            </div>
          )}

          <div style={{ maxWidth: "620px", margin: "0 auto 16px" }}>
            <div style={{ fontSize: "11px", color: "#7a7a90", letterSpacing: "0.15em", marginBottom: "12px" }}>PILARES ESTRATÉGICOS IDENTIFICADOS</div>
            {[report.pilar1, report.pilar2].map((p, i) => p && (
              <div key={i} style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "10px", padding: "18px", marginBottom: "10px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#c9b99a", marginBottom: "6px" }}>◈ {p.titulo}</div>
                <div style={{ fontSize: "12px", color: "#8b8b9a", lineHeight: 1.6 }}>{p.descripcion}</div>
              </div>
            ))}
            <div style={{ position: "relative" }}>
              <div style={s.lockBox}>
                <div style={s.blur}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "10px", padding: "18px", marginBottom: "10px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#c9b99a", marginBottom: "6px" }}>◈ Pilar estratégico {i + 2}</div>
                      <div style={{ fontSize: "12px", color: "#8b8b9a" }}>Contenido del pilar bloqueado.</div>
                    </div>
                  ))}
                </div>
                <div style={s.lockLabel}>
                  <div style={{ fontSize: "18px", marginBottom: "6px" }}>🔒</div>
                  <div style={{ fontSize: "12px", color: "#c9b99a", fontWeight: 700 }}>+3 pilares estratégicos</div>
                  <div style={{ fontSize: "11px", color: "#6b6b80", marginTop: "4px" }}>Disponibles en la sesión con Dreizack</div>
                </div>
              </div>
            </div>
          </div>

          <div style={s.ctaBox}>
            <div style={{ fontSize: "11px", color: "#a078c8", letterSpacing: "0.15em", marginBottom: "12px" }}>SIGUIENTE PASO</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#e8e6e1", marginBottom: "10px", lineHeight: 1.3 }}>
              Toda marca fuerte necesita<br /><span style={s.gold}>una cultura capaz de sostenerla.</span>
            </div>
            <div style={{ fontSize: "13px", color: "#7a7a90", lineHeight: 1.7, marginBottom: "24px" }}>
              Este diagnóstico es el punto de partida. En una sesión con Dreizack construimos la estrategia completa.
            </div>
            <button style={{ ...s.startBtn, fontSize: "14px" }} onClick={() => window.open("mailto:hola@dreizackstudios.com?subject=Quiero mi estrategia completa - " + empresa, "_blank")}>
              Quiero mi estrategia completa →
            </button>
            <div style={{ fontSize: "10px", color: "#4a4a60", marginTop: "14px" }}>Dreizack Studios · Only Branding</div>
          </div>
        </div>
      )}

      {fase === "report" && report?.error && (
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: "13px", color: "#c07070", marginBottom: "16px" }}>Error al generar el diagnóstico. Intenta nuevamente.</div>
          <button style={s.btn} onClick={() => setFase("capture")}>Reintentar</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
