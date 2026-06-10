const { useState } = React;

const DISCO_VARS = [
  { id: "ambiente", label: "Ambiente", question: "¿Cómo describirías el ambiente general dentro de tu organización?", options: ["Muy positivo y colaborativo", "Funcional pero distante", "Tenso o incierto", "Variable según el área"] },
  { id: "liderazgo", label: "Liderazgo", question: "¿Cómo ejerce el liderazgo tu organización?", options: ["Cercano y orientador", "Formal y jerárquico", "Ausente o delegado en exceso", "Mixto según nivel"] },
  { id: "motivacion", label: "Motivación", question: "¿Qué motiva principalmente a tus equipos?", options: ["El propósito y la visión", "El reconocimiento y la compensación", "La estabilidad y la rutina", "Los resultados y los logros"] },
  { id: "autonomia", label: "Autonomía", question: "¿Cuánta autonomía tienen las personas en su trabajo?", options: ["Alta: deciden y actúan", "Media: consultan antes de actuar", "Baja: esperan instrucciones", "Depende del área o rol"] },
  { id: "coordinacion", label: "Coordinación", question: "¿Cómo se coordinan tus equipos?", options: ["Procesos claros y fluidos", "Reuniones frecuentes pero lentas", "Coordinación informal e improvisada", "Silos: cada área opera sola"] },
  { id: "gestion", label: "Gestión", question: "¿Cómo se toman las decisiones importantes?", options: ["Estructura formal y jerárquica", "Consenso colectivo", "El líder decide centralizadamente", "Depende de quién tenga más información"] },
];

const s = {
  wrap: { background: "#0a0a0f", minHeight: "100vh", color: "#e8e6e1", fontFamily: "'Inter', system-ui, sans-serif" },
  banner: { width: "100%", height: "120px", background: "#0a2a4a", display: "flex", alignItems: "center", justifyContent: "center" },
  bannerImg: { width: "100%", display: "block", maxHeight: "300px", objectFit: "contain", background: "#0a1628" },
  hero: { textAlign: "center", padding: "64px 24px 48px", maxWidth: "680px", margin: "0 auto" },
  badge: { display: "inline-block", background: "#c9b99a22", border: "1px solid #c9b99a44", color: "#c9b99a", fontSize: "10px", letterSpacing: "0.2em", padding: "5px 14px", borderRadius: "20px", marginBottom: "24px" },
  h1: { fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, lineHeight: 1.2, color: "#e8e6e1", marginBottom: "16px" },
  gold: { color: "#c9b99a" },
  sub: { fontSize: "14px", color: "#7a7a90", lineHeight: 1.8, marginBottom: "36px" },
  startBtn: { background: "#c9b99a", color: "#0a0a0f", border: "none", borderRadius: "10px", padding: "15px 36px", fontWeight: 800, fontSize: "14px", cursor: "pointer", letterSpacing: "0.05em" },
  statsRow: { display: "flex", justifyContent: "center", gap: "40px", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #1e1e2e" },
  stat: { textAlign: "center" },
  statN: { fontSize: "22px", fontWeight: 800, color: "#c9b99a" },
  statL: { fontSize: "10px", color: "#6b6b80", letterSpacing: "0.1em", marginTop: "2px" },
  card: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "32px", maxWidth: "620px", margin: "0 auto 24px" },
  step: { fontSize: "10px", color: "#6b6b80", letterSpacing: "0.15em", marginBottom: "10px" },
  q: { fontSize: "17px", fontWeight: 700, color: "#e8e6e1", lineHeight: 1.5, marginBottom: "24px" },
  optBtn: (sel) => ({ display: "block", width: "100%", background: sel ? "#1a1a35" : "transparent", border: `1px solid ${sel ? "#c9b99a" : "#1e1e2e"}`, color: sel ? "#c9b99a" : "#9090a8", padding: "13px 18px", borderRadius: "9px", cursor: "pointer", fontSize: "13px", textAlign: "left", marginBottom: "10px", transition: "all 0.18s" }),
  prog: (p) => ({ height: "3px", background: `linear-gradient(90deg, #c9b99a ${p}%, #1e1e2e ${p}%)`, borderRadius: "2px", marginBottom: "28px", maxWidth: "620px", margin: "0 auto 28px" }),
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
  const [phase, setPhase] = useState("hero");
  const [step, setStep] = useState(0);
  const [disco, setDisco] = useState({});
  const [empresa, setEmpresa] = useState("");
  const [sector, setSector] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [report, setReport] = useState(null);

  const progress = (step / DISCO_VARS.length) * 100;
  const cur = DISCO_VARS[step];

  function selectOpt(opt) {
    const nd = { ...disco, [cur.id]: opt };
    setDisco(nd);
    if (step < DISCO_VARS.length - 1) setTimeout(() => setStep(s => s + 1), 280);
  }

  async function generate() {
    setPhase("loading");

    // Enviar lead a Formspree
    try {
      await fetch("https://formspree.io/f/mbdekeee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          empresa,
          sector,
          fecha: new Date().toLocaleString("es-PE"),
          ambiente: disco.ambiente || "",
          liderazgo: disco.liderazgo || "",
          motivacion: disco.motivacion || "",
          autonomia: disco.autonomia || "",
          coordinacion: disco.coordinacion || "",
          gestion: disco.gestion || "",
        })
      });
    } catch (e) {
      console.log("Formspree error:", e);
    }

    try {
      const prompt = `Eres un estratega de marca de Dreizack Studios. Genera un diagnóstico de marca PARCIAL para mostrar como lead magnet. El objetivo es mostrar valor suficiente para que el cliente quiera una sesión completa.

DATOS:
- Empresa: ${empresa}
- Sector: ${sector}
- Nombre: ${nombre}

Diagnóstico Express de Cultura:
${DISCO_VARS.map(v => `- ${v.label}: ${disco[v.id]}`).join("\n")}

Responde SOLO con JSON, sin backticks:
{
  "titular": "una frase impactante de 8-12 palabras que resume el estado de su marca (personalizada con el nombre de la empresa)",
  "diagnostico_breve": "2 párrafos directos y honestos sobre lo que revela el diagnóstico. Nombra la empresa. Sé específico con los datos. Genera sensación de que hay mucho más por descubrir.",
  "pilar1": {"titulo": "primer pilar estratégico urgente", "descripcion": "2 oraciones sobre por qué es crítico para esta empresa"},
  "pilar2": {"titulo": "segundo pilar estratégico urgente", "descripcion": "2 oraciones sobre por qué es crítico para esta empresa"},
  "pilares_ocultos": 3,
  "score": un número entre 35 y 78 que represente la madurez cultural actual,
  "alerta": "una sola frase corta y directa sobre el mayor riesgo que enfrenta esta marca hoy"
}`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("") || "";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setReport(parsed);
      setPhase("report");
    } catch (e) {
      setReport({ error: true });
      setPhase("report");
    }
  }

  return (
    <div style={s.wrap}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} *{box-sizing:border-box} button:hover{opacity:0.82}`}</style>

      {/* BANNER — reemplaza el div por: <img src="URL_DE_TU_BANNER" style={s.bannerImg} /> */}
      <div style={s.banner}>
        <img
          src="https://static.wixstatic.com/media/987718_29dbdf29e29b40599097e5bf2d5f890f~mv2.png"
          style={s.bannerImg}
          alt="Dreizack Studios"
          onError={e => { e.target.style.display='none'; }}
        />
      </div>

      {phase === "hero" && (
        <div style={s.hero}>
          <div style={s.badge}>BRANDING OS · DIAGNÓSTICO EXPRESS DE CULTURA</div>
          <h1 style={s.h1}>¿Tu marca se ve bien afuera<br />pero <span style={s.gold}>nadie la vive adentro?</span></h1>
          <p style={s.sub}>En 5 minutos descubre si tu cultura organizacional está sosteniendo o saboteando tu marca. El DEC revela lo que ningún manual de identidad te dice.</p>
          <button style={s.startBtn} onClick={() => setPhase("disco")}>Iniciar diagnóstico gratuito →</button>
          <div style={s.statsRow}>
            <div style={s.stat}><div style={s.statN}>6</div><div style={s.statL}>VARIABLES ANALIZADAS</div></div>
            <div style={s.stat}><div style={s.statN}>5 min</div><div style={s.statL}>TIEMPO PROMEDIO</div></div>
            <div style={s.stat}><div style={s.statN}>DEC</div><div style={s.statL}>DIAGNÓSTICO EXPRESS DE CULTURA</div></div>
          </div>
        </div>
      )}

      {phase === "disco" && (
        <div style={{ padding: "40px 24px" }}>
          {step === 0 && (
            <div style={{ ...s.card, marginBottom: "20px" }}>
              <div style={s.step}>ANTES DE EMPEZAR</div>
              <div style={s.q}>Cuéntanos sobre tu empresa</div>
              <label style={s.label}>NOMBRE DE LA EMPRESA</label>
              <input style={s.input} placeholder="Ej: Acuario Corp" value={empresa} onChange={e => setEmpresa(e.target.value)} />
              <label style={s.label}>SECTOR / INDUSTRIA</label>
              <input style={s.input} placeholder="Ej: Retail, Servicios, Tecnología..." value={sector} onChange={e => setSector(e.target.value)} />
              <button style={s.btn} disabled={!empresa.trim()} onClick={() => setStep(1)}>Empezar diagnóstico →</button>
            </div>
          )}

          {step > 0 && step <= DISCO_VARS.length && (
            <>
              <div style={s.prog(progress)} />
              <div style={s.card}>
                <div style={s.step}>DEC · {step} DE {DISCO_VARS.length} · {cur?.label?.toUpperCase()}</div>
                <div style={s.q}>{cur?.question}</div>
                {cur?.options.map(opt => (
                  <button key={opt} style={s.optBtn(disco[cur.id] === opt)} onClick={() => selectOpt(opt)}>{opt}</button>
                ))}
                <div style={s.navRow}>
                  {step > 1 && <button style={s.btnO} onClick={() => setStep(s => s - 1)}>← Anterior</button>}
                  {disco[cur?.id] && step < DISCO_VARS.length && (
                    <button style={s.btn} onClick={() => setStep(s => s + 1)}>Siguiente →</button>
                  )}
                </div>
              </div>
              {Object.keys(disco).length === DISCO_VARS.length && (
                <div style={{ ...s.card, marginTop: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "13px", color: "#7a7a90", marginBottom: "8px" }}>✓ Diagnóstico completado</div>
                  <button style={s.btn} onClick={() => setPhase("capture")}>Ver mi diagnóstico →</button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {phase === "capture" && (
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
            <button style={{ ...s.btn, width: "100%", padding: "15px" }} disabled={!nombre.trim() || !email.includes("@")} onClick={generate}>
              Ver mi diagnóstico →
            </button>
            <div style={{ fontSize: "10px", color: "#4a4a60", textAlign: "center", marginTop: "12px" }}>Sin spam. Solo tu informe y, si aplica, una propuesta de Dreizack.</div>
          </div>
        </div>
      )}

      {phase === "loading" && (
        <div style={{ textAlign: "center", padding: "100px 24px" }}>
          <div style={{ ...s.spinner, margin: "0 auto 20px" }} />
          <div style={{ fontSize: "14px", color: "#7a7a90" }}>Analizando la cultura de marca de <strong style={{ color: "#c9b99a" }}>{empresa}</strong>...</div>
        </div>
      )}

      {phase === "report" && report && !report.error && (
        <div style={{ padding: "40px 24px" }}>
          <div style={{ ...s.card, textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", color: "#7a7a90", letterSpacing: "0.15em", marginBottom: "12px" }}>ÍNDICE DE MADUREZ CULTURAL</div>
            <div style={{ fontSize: "64px", fontWeight: 900, color: report.score < 50 ? "#c07070" : report.score < 65 ? "#c9a050" : "#7ab87a", lineHeight: 1 }}>{report.score}</div>
            <div style={{ fontSize: "11px", color: "#6b6b80", marginTop: "6px" }}>de 100</div>
            {report.alerta && (
              <div style={{ background: "#2a1010", border: "1px solid #4a2020", borderRadius: "8px", padding: "10px 16px", marginTop: "16px", fontSize: "12px", color: "#c07070" }}>
                ⚠ {report.alerta}
              </div>
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
                      <div style={{ fontSize: "12px", color: "#8b8b9a" }}>Contenido del pilar estratégico bloqueado.</div>
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
              Este diagnóstico es el punto de partida. En una sesión de trabajo con Dreizack construimos la estrategia completa.
            </div>
            <button style={{ ...s.startBtn, fontSize: "14px" }}
              onClick={() => window.open("mailto:hola@dreizackstudios.com?subject=Quiero mi estrategia completa - " + empresa, "_blank")}>
              Quiero mi estrategia completa →
            </button>
            <div style={{ fontSize: "10px", color: "#4a4a60", marginTop: "14px" }}>Dreizack Studios · Only Branding</div>
          </div>
        </div>
      )}

      {phase === "report" && report?.error && (
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: "13px", color: "#c07070", marginBottom: "16px" }}>Error al generar el diagnóstico. Intenta nuevamente.</div>
          <button style={s.btn} onClick={() => setPhase("capture")}>Reintentar</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
