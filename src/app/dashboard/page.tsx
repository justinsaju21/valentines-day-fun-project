"use client";

import { useState } from "react";
import Link from "next/link";

interface ProposalData {
    refId: string;
    displayName: string;
    creatorName: string;
    crushName: string;
    theme: string;
    status: string;
    noClicks: number;
    createdAt: string;
    openedAt: string;
    yesAt: string;
}

export default function DashboardPage() {
    const [refId, setRefId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [proposal, setProposal] = useState<ProposalData | null>(null);
    const [copied, setCopied] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/dashboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refId, password }),
            });

            const data = await res.json();
            if (data.success) {
                setProposal(data.proposal);
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch {
            setError("Failed to login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        if (!proposal) return;
        setLoading(true);

        try {
            const res = await fetch("/api/dashboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refId: proposal.refId, password }),
            });

            const data = await res.json();
            if (data.success) {
                setProposal(data.proposal);
            }
        } catch {
            console.error("Failed to refresh");
        } finally {
            setLoading(false);
        }
    };

    const shareLink = typeof window !== "undefined" ? `${window.location.origin}/v/${proposal?.refId}` : "";

    const copyLink = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStatusEmoji = (status: string) => {
        switch (status) {
            case "pending": return "⏳";
            case "opened": return "👀";
            case "yes": return "🎉";
            default: return "❓";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "pending": return "Waiting... They haven't opened it yet";
            case "opened": return "They opened it! 👀";
            case "yes": return "THEY SAID YES! 🎉💕";
            default: return "Unknown";
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleString();
    };

    // Login Form
    if (!proposal) {
        return (
            <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)" }}>
                <div className="hearts-container">
                    {[
                        { left: 5, size: 20, duration: 4.5, delay: 0.2, emoji: "💕" },
                        { left: 15, size: 28, duration: 5.2, delay: 1.5, emoji: "❤️" },
                        { left: 25, size: 22, duration: 4.8, delay: 0.8, emoji: "💖" },
                        { left: 35, size: 25, duration: 6.0, delay: 2.3, emoji: "✨" },
                        { left: 45, size: 18, duration: 5.5, delay: 3.1, emoji: "💕" },
                        { left: 55, size: 30, duration: 4.2, delay: 0.5, emoji: "❤️" },
                        { left: 65, size: 24, duration: 5.8, delay: 1.8, emoji: "💖" },
                        { left: 75, size: 20, duration: 4.6, delay: 2.8, emoji: "✨" },
                        { left: 82, size: 26, duration: 5.0, delay: 0.3, emoji: "💕" },
                        { left: 88, size: 22, duration: 6.2, delay: 1.2, emoji: "❤️" },
                        { left: 93, size: 28, duration: 4.4, delay: 3.5, emoji: "💖" },
                        { left: 98, size: 19, duration: 5.3, delay: 2.0, emoji: "✨" },
                    ].map((heart, i) => (
                        <span key={i} className="heart" style={{ left: `${heart.left}%`, fontSize: `${heart.size}px`, animationDuration: `${heart.duration}s`, animationDelay: `${heart.delay}s` }}>
                            {heart.emoji}
                        </span>
                    ))}
                </div>

                <div className="glass-card animate-fade-in-up" style={{ padding: "48px", maxWidth: "450px", width: "100%", position: "relative", zIndex: 10 }}>
                    <Link href="/" className="link-back" style={{ display: "inline-block", marginBottom: "24px" }}>← Back to Home</Link>

                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <div style={{ fontSize: "64px", marginBottom: "16px" }}>📊</div>
                        <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#dc2626", marginBottom: "8px" }}>Dashboard</h1>
                        <p style={{ color: "#6b7280", fontSize: "16px" }}>Check if your crush said yes!</p>
                    </div>

                    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div>
                            <label className="input-label">Your Reference ID</label>
                            <input type="text" value={refId} onChange={(e) => setRefId(e.target.value)} placeholder="e.g., abc12345" required className="input-field" />
                        </div>

                        <div>
                            <label className="input-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" required className="input-field" />
                        </div>

                        {error && <div className="alert-error">{error}</div>}

                        <button type="submit" disabled={loading} className="btn-secondary" style={{ width: "100%", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer", marginTop: "8px" }}>
                            {loading ? "Loading..." : "View Status 💕"}
                        </button>
                    </form>

                    <p style={{ textAlign: "center", fontSize: "14px", color: "#6b7280", marginTop: "24px" }}>
                        Don&apos;t have a proposal yet? <Link href="/create" style={{ color: "#ef4444" }}>Create one</Link>
                        <br /><span style={{ fontSize: "12px", opacity: 0.7 }}>💡 You can create multiple proposals!</span>
                    </p>
                </div>
            </main>
        );
    }

    // Dashboard View
    return (
        <main style={{ minHeight: "100vh", padding: "32px 16px", background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)" }}>
            <div className="hearts-container">
                {[
                    { left: 8, size: 22, duration: 4.3, delay: 0.4, emoji: "💕" },
                    { left: 18, size: 26, duration: 5.6, delay: 1.2, emoji: "❤️" },
                    { left: 30, size: 20, duration: 4.9, delay: 2.1, emoji: "💖" },
                    { left: 42, size: 28, duration: 5.1, delay: 0.7, emoji: "✨" },
                    { left: 54, size: 24, duration: 6.2, delay: 1.9, emoji: "💕" },
                    { left: 66, size: 18, duration: 4.7, delay: 2.8, emoji: "❤️" },
                    { left: 76, size: 30, duration: 5.4, delay: 0.2, emoji: "💖" },
                    { left: 85, size: 22, duration: 4.5, delay: 3.2, emoji: "✨" },
                    { left: 92, size: 26, duration: 5.8, delay: 1.5, emoji: "💕" },
                    { left: 97, size: 20, duration: 4.1, delay: 2.5, emoji: "❤️" },
                ].map((heart, i) => (
                    <span key={i} className="heart" style={{ left: `${heart.left}%`, fontSize: `${heart.size}px`, animationDuration: `${heart.duration}s`, animationDelay: `${heart.delay}s` }}>
                        {heart.emoji}
                    </span>
                ))}
            </div>

            <div style={{ maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 10 }}>
                <div className="glass-card animate-fade-in-up" style={{ padding: "40px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                        <Link href="/" className="link-back">← Home</Link>
                        <button onClick={() => setProposal(null)} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "14px" }}>Logout</button>
                    </div>

                    {/* Status Card */}
                    <div
                        className={`status-${proposal.status}`}
                        style={{ textAlign: "center", padding: "32px", borderRadius: "20px", marginBottom: "32px" }}
                    >
                        <div style={{ fontSize: "64px", marginBottom: "12px" }}>{getStatusEmoji(proposal.status)}</div>
                        <div style={{ fontSize: "24px", fontWeight: "700", color: proposal.status === "yes" ? "#065f46" : proposal.status === "opened" ? "#92400e" : "#374151" }}>
                            {getStatusText(proposal.status)}
                        </div>
                        {proposal.status === "yes" && <div style={{ fontSize: "18px", color: "#10b981", marginTop: "8px" }}>Congratulations! 🎊💕</div>}
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                        <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
                            <div style={{ fontSize: "36px", fontWeight: "700", color: "#ef4444" }}>{proposal.noClicks}</div>
                            <div style={{ fontSize: "14px", color: "#6b7280" }}>&quot;No&quot; clicks 😂</div>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
                            <div style={{ fontSize: "24px", fontWeight: "700", color: "#ef4444", textTransform: "capitalize" }}>{proposal.theme}</div>
                            <div style={{ fontSize: "14px", color: "#6b7280" }}>Theme</div>
                        </div>
                    </div>

                    {/* Details */}
                    <div style={{ background: "rgba(255,255,255,0.4)", borderRadius: "16px", padding: "20px", marginBottom: "32px" }}>
                        {[
                            { label: "Reference ID", value: proposal.refId },
                            { label: "Your Name", value: proposal.creatorName || "—" },
                            { label: "Crush's Name", value: proposal.crushName || "Not set" },
                            { label: "Created", value: formatDate(proposal.createdAt) },
                            { label: "Opened", value: formatDate(proposal.openedAt) },
                            { label: "Said Yes", value: formatDate(proposal.yesAt) },
                        ].map((item, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 5 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                                <span style={{ color: "#6b7280", fontSize: "14px" }}>{item.label}:</span>
                                <span style={{ fontWeight: "500", fontSize: "14px" }}>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Share Link */}
                    <div style={{ marginBottom: "32px" }}>
                        <label className="input-label">Share this link with your crush:</label>
                        <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                            <input type="text" value={shareLink} readOnly className="input-field" style={{ flex: 1, minWidth: "180px" }} />
                            <button onClick={copyLink} style={{ padding: "12px 20px", background: "#ef4444", color: "white", border: "none", borderRadius: "12px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}>
                                {copied ? "Copied ✓" : "Copy"}
                            </button>
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(`Hey! I made something special for you 💕\n\n${shareLink}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ padding: "12px 20px", background: "#25D366", color: "white", border: "none", borderRadius: "12px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap" }}
                            >
                                📱 WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                        <button onClick={handleRefresh} disabled={loading} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.6)", border: "none", borderRadius: "50px", fontWeight: "600", cursor: "pointer" }}>
                            {loading ? "..." : "🔄 Refresh"}
                        </button>
                        <Link href={`/v/${proposal.refId}?preview=1`} target="_blank" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.6)", borderRadius: "50px", fontWeight: "600", textDecoration: "none", color: "inherit" }}>
                            👁️ Preview
                        </Link>
                        <Link href={`/customize/${proposal.refId}`} style={{ padding: "12px 24px", background: "rgba(255,255,255,0.6)", borderRadius: "50px", fontWeight: "600", textDecoration: "none", color: "inherit" }}>
                            ✏️ Edit
                        </Link>
                    </div>

                    {/* Donation Section */}
                    <div style={{ marginTop: "32px", padding: "20px", background: "rgba(255,255,255,0.5)", borderRadius: "16px", textAlign: "center" }}>
                        <p style={{ fontSize: "16px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>☕ Enjoying Valentine Builder?</p>
                        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>Support the creator with a small tip!</p>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                            <a href="upi://pay?pa=justinsaju21@oksbi&pn=Valentine%20Builder&am=50&cu=INR" style={{ padding: "10px 20px", background: "#ef4444", color: "white", borderRadius: "25px", textDecoration: "none", fontWeight: "600" }}>₹50</a>
                            <a href="upi://pay?pa=justinsaju21@oksbi&pn=Valentine%20Builder&am=100&cu=INR" style={{ padding: "10px 20px", background: "#ef4444", color: "white", borderRadius: "25px", textDecoration: "none", fontWeight: "600" }}>₹100</a>
                            <a href="upi://pay?pa=justinsaju21@oksbi&pn=Valentine%20Builder&am=150&cu=INR" style={{ padding: "10px 20px", background: "#ef4444", color: "white", borderRadius: "25px", textDecoration: "none", fontWeight: "600" }}>₹150</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
