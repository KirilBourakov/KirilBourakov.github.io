import {Canvas, useThree} from '@react-three/fiber'
import {Bloom, EffectComposer} from "@react-three/postprocessing";
import MainLayout from "./components/index/MainLayout.tsx";


export default function App() {


  return (
    <div style={{ height: '100vh', width: '100vw', margin: '0px' }}>
      <Canvas dpr={[1, 1]}>
          <EffectComposer autoClear={false} multisampling={0}>
              <Bloom luminanceThreshold={1} intensity={2} selectable />
          </EffectComposer>

        <MainLayout />


          {/*<ClippedPlanet />*/}



          {/*<RotatingSun />*/}

          {/*<BackPlanet />*/}

          {/*<CenterShip />*/}

          <ambientLight intensity={2} />
      </Canvas>
    </div>
  )
}
