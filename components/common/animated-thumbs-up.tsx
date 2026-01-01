"use client"

import { useState } from "react"
import { ThumbsUp } from "lucide-react"

interface AnimatedThumbsUpProps {
    liked?: boolean
    onChange?: (liked: boolean) => void
    count?: number
    variant?: "default" | "compact"
}

export function AnimatedThumbsUp({ liked = false, onChange, count, variant = "default" }: AnimatedThumbsUpProps) {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(true)
        onChange?.(!liked)
    }

    const handleAnimationEnd = () => {
        setClicked(false)
    }

    return (
        <button
            onClick={handleClick}
            onAnimationEnd={handleAnimationEnd}
            className={`like-button ${clicked ? "animate-pop" : ""} ${variant === "default" ? "p-4" : "p-2"
                } relative inline-flex items-center gap-2 transition-all duration-300 bg-none border-none cursor-pointer`}
            aria-label={liked ? "Unlike" : "Like"}
        >
            {clicked && liked && (
                <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
                                style={{
                                    animation: `burst 0.8s ease-out forwards`,
                                    transformOrigin: "0 0",
                                    transform: `rotate(${(i * 360) / 8}deg) translateY(-20px)`,
                                    animationDelay: `${i * 30}ms`,
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            <div className="relative">
                <ThumbsUp
                    size={variant === "compact" ? 24 : 48}
                    className={`transition-all duration-300 ${liked ? "text-white fill-white drop-shadow-lg" : "text-gray-400 hover:text-gray-600"
                        }`}
                    style={{
                        filter: liked ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))" : "none",
                    }}
                />

                {liked && (
                    <div
                        className="absolute inset-0 -z-10 rounded-full bg-blue-500/20 blur-lg"
                        style={{
                            animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                        }}
                    />
                )}
            </div>

            {count !== undefined && variant === "default" && (
                <span
                    className={`font-bold transition-all duration-300 ${liked ? "text-blue-500 text-lg" : "text-gray-500 text-base"
                        }`}
                >
                    {count}
                </span>
            )}

            <style>{`
        /* Smooth transition for normal state changes (e.g., color change) */
        .like-button {
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease-in-out;
        }

        /* Keyframe animation for a "pop" effect */
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }

        /* Apply the animation when the 'animate-pop' class is present */
        .animate-pop {
          animation: pop 0.3s forwards;
        }

        @keyframes burst {
          0% {
            opacity: 1;
            transform: translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty));
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
        </button>
    )
}
