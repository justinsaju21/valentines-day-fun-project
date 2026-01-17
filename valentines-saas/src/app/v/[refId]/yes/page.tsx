"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { themes, ThemeKey } from "@/lib/themes";

interface ProposalData {
    creatorName: string;
    crushName: string;
    theme: ThemeKey;
}

export default function CelebrationPage() {
    const params = useParams();
    const refId = params.refId as string;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [proposal, setProposal] = useState<ProposalData | null>(null);
    const [showDonate, setShowDonate] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; emoji: string }[]>([]);

    const theme = proposal?.theme ? themes[proposal.theme] : themes.classic;
    const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "your-upi-id@bank";
    const donationAmounts = [10, 20, 30, 40, 50];

    useEffect(() => {
        const loadProposal = async () => {
            try {
                const res = await fetch(`/api/proposal/${refId}`);
                const data = await res.json();
                if (data.success) setProposal(data.proposal);
            } catch {
                console.error("Failed to load proposal");
            }
        };
        loadProposal();
    }, [refId]);

    const startConfetti = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ["#ff6b6b", "#ff8e53", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6b95", "#c44dff", "#ff85a2"];

        interface ConfettiPiece {
            x: number;
            y: number;
            size: number;
            color: string;
            speedY: number;
            speedX: number;
            rotation: number;
            rotationSpeed: number;
        }

        const confetti: ConfettiPiece[] = [];

        for (let i = 0; i < 200; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 12 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 4 + 2,
                speedX: Math.random() * 3 - 1.5,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 12 - 6,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach((piece) => {
                piece.y += piece.speedY;
                piece.x += piece.speedX;
                piece.rotation += piece.rotationSpeed;

                if (piece.y > canvas.height) {
                    piece.y = -piece.size;
                    piece.x = Math.random() * canvas.width;
                }

                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate((piece.rotation * Math.PI) / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
                ctx.restore();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    useEffect(() => {
        startConfetti();
        const heartEmojis = theme.hearts;
        const newHearts = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 25 + 15}px`,
            duration: `${Math.random() * 2 + 3}s`,
            emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        }));
        setHearts(newHearts);

        const timer = setTimeout(() => setShowDonate(true), 2500);
        return () => clearTimeout(timer);
    }, [startConfetti, theme.hearts]);

    const handleDonate = (amount: number) => {
        const upiLink = `upi://pay?pa=${UPI_ID}&pn=Valentine%20Builder&am=${amount}&cu=INR`;
        window.location.href = upiLink;
    };

    return (
        <main className={`theme-${proposal?.theme || "classic"}`} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: theme.background, overflow: "hidden" }}>
            <canvas ref={canvasRef} id="confetti-canvas" />

            <div className="hearts-container">
                {hearts.map((heart) => (
                    <span key={heart.id} className="heart" style={{ left: heart.left, fontSize: heart.size, animationDuration: heart.duration }}>
                        {heart.emoji}
                    </span>
                ))}
            </div>

            <div className="glass-card animate-pop-in" style={{ padding: "48px 40px", maxWidth: "520px", width: "100%", textAlign: "center", position: "relative", zIndex: 10, background: theme.cardBg }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }} className="animate-bounce-slow">🎉💕🎊</div>

                <h1 style={{ fontSize: "clamp(32px, 6vw, 48px)", fontWeight: "700", color: theme.textColor, marginBottom: "16px", lineHeight: "1.2" }}>
                    Yay! You said YES!
                </h1>

                <p style={{ fontSize: "20px", color: theme.textColor, opacity: 0.9, marginBottom: "24px" }}>
                    {proposal?.creatorName ? `${proposal.creatorName} is the happiest person right now! 🥰` : "You just made someone very happy! 🥰"}
                </p>

                <img
                    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmo3c3l5ODh3ZGN6NHhhaDE2Mjg1ZjkwOXczdDFxbWM3dTBtaW9zaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9XY4f3FgFTT4QlaYqa/giphy.gif"
                    alt="Celebration"
                    style={{ maxWidth: "220px", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.15)", marginBottom: "24px" }}
                />

                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "32px" }}>
                    {["❤️", "💕", "💖", "💗", "💓"].map((emoji, i) => (
                        <span key={i} className="animate-heartbeat" style={{ fontSize: "32px", animationDelay: `${i * 0.1}s` }}>
                            {emoji}
                        </span>
                    ))}
                </div>

                {showDonate && (
                    <div className="animate-fade-in-up">
                        <p style={{ fontSize: "18px", color: theme.textColor, marginBottom: "8px", fontWeight: "600" }}>
                            Happy with this? 💕
                        </p>
                        <p style={{ fontSize: "14px", color: theme.textColor, opacity: 0.7, marginBottom: "16px" }}>
                            Support the creator with a small tip!
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
                            {donationAmounts.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => handleDonate(amount)}
                                    className="btn-grow"
                                    style={{
                                        padding: "12px 20px",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "white",
                                        background: theme.buttonYes,
                                        border: "none",
                                        borderRadius: "50px",
                                        cursor: "pointer",
                                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    ₹{amount}
                                </button>
                            ))}
                        </div>

                        <p style={{ fontSize: "12px", color: theme.textColor, opacity: 0.5, marginTop: "16px" }}>
                            Payment via UPI (GPay, PhonePe, Paytm)
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
