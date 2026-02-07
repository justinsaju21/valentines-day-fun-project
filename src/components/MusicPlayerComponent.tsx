"use client";

import { useState, useRef, useEffect } from "react";

export default function MusicPlayerComponent() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Auto-play attempt on first user interaction
    useEffect(() => {
        const handleInteraction = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch((e) => console.log("Autoplay blocked:", e));
            }
            // Remove listener after first interaction attempt
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [isPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <audio
                ref={audioRef}
                src="https://od.lk/s/OTZfNjc4OTM2ODlf/glue-song.mp3"
                loop
            />
            <button
                onClick={togglePlay}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-110 border border-pink-200"
                aria-label={isPlaying ? "Mute music" : "Play music"}
            >
                {isPlaying ? (
                    <span className="text-2xl">🔊</span>
                ) : (
                    <span className="text-2xl">🔇</span>
                )}
            </button>
        </div>
    );
}
