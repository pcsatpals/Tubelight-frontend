import { ReactNode } from "react"
import LightRays from "../animation/LightRays"

const LightRaysWrapper = ({ children }: { children: ReactNode }) => (
    <div className='w-full min-h-screen relative font-figtree'>
        <LightRays
            raysOrigin="top-center"
            raysColor="#9179af"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
        />
        {children}
    </div >
)

export default LightRaysWrapper