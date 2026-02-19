import { cn } from "@/lib/utils";

export default function LiquidGlassButton({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className="w-fit relative">
            <svg className="hidden">

                <filter id="liquid-glass" primitiveUnits="objectBoundingBox">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur"></feGaussianBlur>
                    <feDisplacementMap id="disp" in="blur" in2="map" scale="1" xChannelSelector="R" yChannelSelector="G" />
                </filter>

            </svg >
            <div className={cn("h-full w-full absolute top-0 left-0 text-white", className)}>
                {children}
            </div>
            <button type="button" className={cn("relative glassBtn", className)}>
                {children}
            </button>
        </div>
    );
}
