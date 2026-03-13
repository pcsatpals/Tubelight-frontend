import { cn } from "@/lib/utils";

export default function LiquidGlassCard({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <>
            <svg className="hidden">
                <filter id="liquid-glass">
                    <feImage
                        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAK3RFWHRDcmVhdGlvbiBUaW1lAE1vbiAxIEp1biAyMDA5IDAwOjUwOjA4ICswMTAwlMZeaQAAAAd0SU1FB9kGAQsgET14njMAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAEZ0FNQQAAsY8L/GEFAAACvUlEQVR42u3TgQkAMAzDsBb2/81ld1gi5APvzKxZde8fVAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkHGmUF/FFYhBoAAAAASUVORK5CYII="
                        preserveAspectRatio="none" />
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="200" xChannelSelector="R"
                        yChannelSelector="G" />
                </filter>
            </svg>
            <div className="w-fit relative p-2 flex glass-card items-center justify-center cursor-pointer rounded-2xl overflow-hidden bg-black/30 ">
                <div className={cn("relative", className)}>
                    {children}
                </div>
            </div>
        </>
    );
}
