"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { themes, defaultNoMessages, ThemeKey } from "@/lib/themes";

interface ProposalData {
    creatorName: string;
    crushName: string;
    theme: ThemeKey;
    customMessages: string;
}

export default function ProposalPage() {
    const params = useParams();
    const router = useRouter();
    const refId = params.refId as string;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [proposal, setProposal] = useState<ProposalData | null>(null);
    const [messageIndex, setMessageIndex] = useState(0);
    const [yesSize, setYesSize] = useState(24);
    const [noText, setNoText] = useState("No");
    const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; delay: string; emoji: string }[]>([]);
    const [shaking, setShaking] = useState(false);

    const theme = proposal?.theme ? themes[proposal.theme] : themes.classic;
    const messages = proposal?.customMessages ? JSON.parse(proposal.customMessages) : defaultNoMessages;

    const trackOpen = useCallback(async () => {
        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refId, action: "open" }),
            });
        } catch {
            console.error("Failed to track open");
        }
    }, [refId]);

    useEffect(() => {
        const loadProposal = async () => {
            try {
                const res = await fetch(`/api/proposal/${refId}`);
                const data = await res.json();

                if (data.success) {
                    setProposal(data.proposal);
                    trackOpen();
                } else {
                    setError("Proposal not found");
                }
            } catch {
                setError("Failed to load proposal");
            } finally {
                setLoading(false);
            }
        };
        loadProposal();
    }, [refId, trackOpen]);

    useEffect(() => {
        if (!proposal) return;
        const heartEmojis = theme.hearts;
        const newHearts = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 20 + 15}px`,
            duration: `${Math.random() * 3 + 4}s`,
            delay: `${Math.random() * 5}s`,
            emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        }));
        setHearts(newHearts);
    }, [proposal, theme.hearts]);

    const handleNoClick = async () => {
        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refId, action: "no_click" }),
            });
        } catch {
            console.error("Failed to track no click");
        }

        setNoText(messages[messageIndex]);
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setYesSize((prev) => Math.min(prev + 8, 64));
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
    };

    const handleYesClick = async () => {
        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refId, action: "yes" }),
            });
        } catch {
            console.error("Failed to track yes");
        }
        router.push(`/v/${refId}/yes`);
    };

    if (loading) {
        return (
            <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: theme.background }}>
                <div style={{ fontSize: "24px", color: theme.textColor }}>Loading... 💕</div>
            </main>
        );
    }

    if (error || !proposal) {
        return (
            <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: themes.classic.background }}>
                <div className="glass-card" style={{ padding: "48px", textAlign: "center" }}>
                    <div style={{ fontSize: "64px", marginBottom: "16px" }}>💔</div>
                    <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#dc2626" }}>Proposal Not Found</h1>
                    <p style={{ color: "#6b7280", marginTop: "8px" }}>This link may be invalid or expired.</p>
                </div>
            </main>
        );
    }

    const title = proposal.crushName
        ? `${proposal.crushName}, will you be ${proposal.creatorName}'s Valentine?`
        : `Will you be ${proposal.creatorName}'s Valentine?`;

    return (
        <main className={`theme-${proposal.theme}`} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: theme.background }}>
            <div className="hearts-container">
                {hearts.map((heart) => (
                    <span key={heart.id} className="heart" style={{ left: heart.left, fontSize: heart.size, animationDuration: heart.duration, animationDelay: heart.delay }}>
                        {heart.emoji}
                    </span>
                ))}
            </div>

            <div className="glass-card animate-pop-in" style={{ padding: "48px 40px", maxWidth: "520px", width: "100%", textAlign: "center", position: "relative", zIndex: 10, background: theme.cardBg }}>
                <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: "700", color: theme.textColor, marginBottom: "32px", lineHeight: "1.3" }}>
                    {title} 💕
                </h1>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
                    <button
                        onClick={handleYesClick}
                        className={`btn-grow ${shaking ? "animate-shake" : ""}`}
                        style={{
                            padding: "16px 32px",
                            fontSize: `${yesSize}px`,
                            fontWeight: "700",
                            color: "white",
                            background: theme.buttonYes,
                            border: "none",
                            borderRadius: "50px",
                            cursor: "pointer",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        Yes! 💖
                    </button>
                    <button
                        onClick={handleNoClick}
                        style={{
                            padding: "12px 24px",
                            fontSize: "1.1em",
                            fontWeight: "600",
                            color: "white",
                            background: theme.buttonNo,
                            border: "none",
                            borderRadius: "50px",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.2s ease",
                            maxWidth: "200px",
                            wordWrap: "break-word",
                        }}
                    >
                        {noText}
                    </button>
                </div>

                <img
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif"
                    alt="Cute pleading"
                    style={{ maxWidth: "200px", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
                />
            </div>
        </main>
    );
}
