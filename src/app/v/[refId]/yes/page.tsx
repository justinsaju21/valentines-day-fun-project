"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { themes, ThemeKey } from "@/lib/themes";
import { QRCodeSVG } from "qrcode.react";

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

    // Donation State
    const [customAmount, setCustomAmount] = useState<string>("");
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

    const theme = proposal?.theme ? themes[proposal.theme] : themes.classic;
    const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "justinsaju21@oksbi";
    const predefinedAmounts = [50, 100, 150];

    const finalAmount = customAmount ? parseInt(customAmount) : (selectedAmount || 0);
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=Valentine%20Gift&am=${finalAmount}&cu=INR`;

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

    return (
        <main className={`theme-${proposal?.theme || "classic"}`} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: theme.background, overflow: "hidden", flexDirection: "column" }}>
            <canvas ref={canvasRef} id="confetti-canvas" />

            <div className="hearts-container">
                {hearts.map((heart) => (
                    <span key={heart.id} className="heart" style={{ left: heart.left, fontSize: heart.size, animationDuration: heart.duration }}>
                        {heart.emoji}
                    </span>
                ))}
            </div>

            <div className="glass-card animate-pop-in" style={{ padding: "48px 40px", maxWidth: "520px", width: "100%", textAlign: "center", position: "relative", zIndex: 10, background: theme.cardBg, overflowY: "auto", maxHeight: "90vh" }}>
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
                    style={{ maxWidth: "220px", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.15)", marginBottom: "24px", display: "block", marginLeft: "auto", marginRight: "auto" }}
                />

                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "32px" }}>
                    {["❤️", "💕", "💖", "💗", "💓"].map((emoji, i) => (
                        <span key={i} className="animate-heartbeat" style={{ fontSize: "32px", animationDelay: `${i * 0.1}s` }}>
                            {emoji}
                        </span>
                    ))}
                </div>

                {showDonate && (
                    <div className="animate-fade-in-up" style={{ borderTop: `1px solid ${theme.textColor}20`, paddingTop: "24px" }}>
                        <p style={{ fontSize: "18px", color: theme.textColor, marginBottom: "8px", fontWeight: "600" }}>
                            Send a Gift? 🎁
                        </p>
                        <p style={{ fontSize: "14px", color: theme.textColor, opacity: 0.7, marginBottom: "16px" }}>
                            Treat the creator to a coffee or more!
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
                            {predefinedAmounts.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                                    className="btn-grow"
                                    style={{
                                        padding: "8px 16px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: selectedAmount === amount ? "white" : theme.textColor,
                                        background: selectedAmount === amount ? theme.buttonYes : "rgba(255,255,255,0.5)",
                                        border: `1px solid ${selectedAmount === amount ? theme.buttonYes : theme.textColor + "40"}`,
                                        borderRadius: "20px",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    ₹{amount}
                                </button>
                            ))}
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <input
                                type="number"
                                placeholder="Custom Amount (₹)"
                                value={customAmount}
                                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                                style={{
                                    padding: "10px 16px",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(0,0,0,0.1)",
                                    width: "180px",
                                    textAlign: "center",
                                    background: "rgba(255,255,255,0.8)",
                                    fontSize: "16px",
                                    outline: "none"
                                }}
                            />
                        </div>

                        {finalAmount > 0 ? (
                            <div className="animate-pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                                <div style={{ background: "white", padding: "12px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                                    <QRCodeSVG value={upiLink} size={150} />
                                </div>

                                <a
                                    href={upiLink}
                                    style={{
                                        display: "inline-block",
                                        padding: "12px 32px",
                                        background: theme.buttonYes,
                                        color: "white",
                                        textDecoration: "none",
                                        borderRadius: "50px",
                                        fontWeight: "bold",
                                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                                    }}
                                >
                                    Pay ₹{finalAmount} via UPI
                                </a>
                                <p style={{ fontSize: "12px", opacity: 0.6 }}>Scan with GPay / Paytm / PhonePe</p>
                            </div>
                        ) : (
                            <p style={{ fontSize: "14px", opacity: 0.6, fontStyle: "italic" }}>Select or enter an amount to generate QR code</p>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
