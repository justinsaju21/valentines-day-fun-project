"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { themes, defaultNoMessages, ThemeKey } from "@/lib/themes";

interface ProposalData {
    creatorName: string;
    crushName: string;
    theme: ThemeKey;
    customMessages: string;
}

interface ProposalClientProps {
    proposal: ProposalData | null;
    refId: string;
}

export default function ProposalClient({ proposal, refId }: ProposalClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Derived state
    const theme = proposal?.theme ? themes[proposal.theme] : themes.classic;
    const messages = proposal?.customMessages ? JSON.parse(proposal.customMessages) : defaultNoMessages;

    // UI state
    const [messageIndex, setMessageIndex] = useState(0);
    const [yesSize, setYesSize] = useState(24);
    const [noText, setNoText] = useState("No");
    const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; delay: string; emoji: string }[]>([]);
    const [shaking, setShaking] = useState(false);

    // Track open logic
    const trackOpen = useCallback(async () => {
        // Skip if preview mode
        if (searchParams.get('preview')) {
            console.log("Preview mode - tracking skipped");
            return;
        }

        // Skip if already tracked locally
        const trackKey = `tracked_open_${refId}`;
        if (typeof window !== 'undefined' && localStorage.getItem(trackKey)) {
            return;
        }

        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refId, action: "open" }),
            });
            localStorage.setItem(trackKey, 'true');
        } catch (e) {
            console.error("Failed to track open", e);
        }
    }, [refId, searchParams]);

    // Initial load effects
    useEffect(() => {
        if (proposal) {
            trackOpen();
        }
    }, [proposal, trackOpen]);

    useEffect(() => {
        if (!proposal) return;

        // Hydration mismatch avoidance: generate hearts only on client mount
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
            if (!searchParams.get('preview')) {
                await fetch("/api/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refId, action: "no_click" }),
                });
            }
        } catch {
            console.error("Failed to track no click");
        }

        setNoText(messages[messageIndex]);
        setMessageIndex((prev) => (prev + 1) % messages.length);

        // Grow Yes button - NO LIMIT
        setYesSize((prev) => prev * 1.2);

        setShaking(true);
        setTimeout(() => setShaking(false), 400);
    };

    const handleYesClick = async () => {
        try {
            if (!searchParams.get('preview')) {
                await fetch("/api/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refId, action: "yes" }),
                });
            }
        } catch {
            console.error("Failed to track yes");
        }
        router.push(`/v/${refId}/yes`);
    };

    if (!proposal) {
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
        <main className={`theme-${proposal.theme}`} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: theme.background, overflow: "hidden", position: "relative" }}>
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

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
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
                            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Bouncy transition
                            zIndex: 20, // Keep on top
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

                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <img
                        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif"
                        alt="Cute pleading"
                        style={{ maxWidth: "200px", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
                    />
                </div>
            </div>

            {/* Viral CTA */}
            <div style={{ position: "absolute", bottom: "20px", left: 0, right: 0, textAlign: "center", opacity: 0.9, pointerEvents: "none" }}>
                <a
                    href="/"
                    style={{
                        display: "inline-block",
                        padding: "12px 24px",
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: "30px",
                        color: theme.textColor,
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                        border: `1px solid ${theme.textColor}30`,
                        transition: "all 0.2s",
                        pointerEvents: "auto"
                    }}
                >
                    💘 Want one for your crush? Create yours free!
                </a>
            </div>
        </main>
    );
}
