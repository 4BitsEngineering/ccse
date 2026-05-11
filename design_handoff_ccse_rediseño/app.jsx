// App.jsx — Composes the design canvas with all 3 directions

function FrameWrap({ children, dark = false }) {
  return (
    <IOSDevice width={390} height={844} dark={dark}>
      <div style={{ height: '100%', width: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {children}
      </div>
    </IOSDevice>
  );
}

function CanvasApp() {
  return (
    <DesignCanvas>
      <DCSection id="A" title="Dirección A · Manual" subtitle="Editorial · papel crema, tipografía serif, tinta granate. Sensación de manual oficial encuadernado.">
        <DCArtboard id="a1" label="A.1 · Landing" width={390} height={844}>
          <FrameWrap><ALanding /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="a2" label="A.2 · Mesa de estudio" width={390} height={844}>
          <FrameWrap><ADashboard /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="a3" label="A.3 · Lectura de tema" width={390} height={844}>
          <FrameWrap><AEstudiar /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="a4" label="A.4 · Pregunta" width={390} height={844}>
          <FrameWrap><APractica /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="a5" label="A.5 · Pregunta resuelta" width={390} height={844}>
          <FrameWrap><APracticaResp /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="a6" label="A.6 · Simulacro" width={390} height={844}>
          <FrameWrap><ASimulacro /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="a7" label="A.7 · Resultado" width={390} height={844}>
          <FrameWrap><AResultado /></FrameWrap>
        </DCArtboard>
      </DCSection>

      <DCSection id="B" title="Dirección B · Tierra" subtitle="Moderno cálido · terracota + oliva. Toca cualquier opción de la pregunta para ver la interacción real, navega entre pantallas con la barra inferior.">
        <DCArtboard id="b1" label="B · Prototipo interactivo" width={390} height={844}>
          <FrameWrap><BApp /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="b2" label="B.2 · Landing" width={390} height={844}>
          <FrameWrap><BLanding onCta={() => {}} /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="b3" label="B.3 · Dashboard" width={390} height={844}>
          <FrameWrap><BDashboard onGo={() => {}} /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="b4" label="B.4 · Simulacro" width={390} height={844}>
          <FrameWrap><BSimulacro onFinish={() => {}} /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="b5" label="B.5 · Resultado" width={390} height={844}>
          <FrameWrap><BResultado onBack={() => {}} /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="b6" label="B.6 · Progreso" width={390} height={844}>
          <FrameWrap><BProgreso /></FrameWrap>
        </DCArtboard>
      </DCSection>

      <DCSection id="C" title="Dirección C · Plaza" subtitle="Académica · azul tinta + ocre, retícula visible, sensación de manual universitario o monolito de plaza pública.">
        <DCArtboard id="c1" label="C.1 · Landing" width={390} height={844}>
          <FrameWrap><CLanding /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="c2" label="C.2 · Dashboard" width={390} height={844}>
          <FrameWrap><CDashboard /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="c3" label="C.3 · Pregunta resuelta" width={390} height={844}>
          <FrameWrap><CPractica /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="c4" label="C.4 · Simulacro" width={390} height={844}>
          <FrameWrap><CSimulacro /></FrameWrap>
        </DCArtboard>
        <DCArtboard id="c5" label="C.5 · Diploma resultado" width={390} height={844}>
          <FrameWrap><CResultado /></FrameWrap>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CanvasApp />);
