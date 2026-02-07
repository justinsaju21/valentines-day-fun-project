"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { themes, defaultNoMessages, ThemeKey } from "@/lib/themes";

export default function CustomizePage() {
    const params = useParams();
    const router = useRouter();
    const refId = params.refId as string;

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [copied, setCopied] = useState(false);

    const [formData, setFormData] = useState({
        creatorName: "",
        crushName: "",
        theme: "classic" as ThemeKey,
        customMessages: defaultNoMessages,
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/proposal/${refId}`);
                const data = await res.json();
                if (data.success && data.proposal) {
                    setFormData({
                        creatorName: data.proposal.creatorName || "",
                        crushName: data.proposal.crushName || "",
                        theme: (data.proposal.theme as ThemeKey) || "classic",
                        customMessages: (function () {
                            try {
                                if (data.proposal.customMessages) {
                                    const parsed = JSON.parse(data.proposal.customMessages);
                                    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                                }
                            } catch (e) { console.error(e); }
                            return defaultNoMessages;
                        })(),
                    });
                }
            } catch {
                console.error("Failed to load proposal");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [refId]);

    const handleSave = async () => {
        if (!formData.creatorName.trim()) {
            setError("Please enter your name (the one shown on the proposal)");
            return;
        }

        if (!formData.crushName.trim()) {
            setError("Please enter your crush's name");
            return;
        }

        setSaving(true);
        setError("");

        try {
            const res = await fetch("/api/customize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    refId,
                    creatorName: formData.creatorName,
                    crushName: formData.crushName,
                    theme: formData.theme,
                    customMessages: JSON.stringify(formData.customMessages),
                }),
            });

            const data = await res.json();
            if (data.success) {
                setSuccess(true);
            } else {
                setError(data.error || "Failed to save");
            }
        } catch {
            setError("Failed to save. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const shareLink = typeof window !== "undefined"
        ? `${window.location.origin}/v/${refId}`
        : `${process.env.NEXT_PUBLIC_APP_URL}/v/${refId}`;

    const copyLink = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const updateMessage = (index: number, value: string) => {
        const newMessages = [...formData.customMessages];
        newMessages[index] = value;
        setFormData({ ...formData, customMessages: newMessages });
    };

    if (loading) {
        return (
            <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)" }}>
                <div style={{ fontSize: "24px", color: "#dc2626" }}>Loading... 💕</div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: "100vh", padding: "32px 16px", background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)" }}>
            {/* Floating Hearts */}
            <div className="hearts-container">
                {[
                    { left: 5, size: 20, duration: 4.5, delay: 0.2, emoji: "💕" },
                    { left: 15, size: 28, duration: 5.2, delay: 1.5, emoji: "❤️" },
                    { left: 25, size: 22, duration: 4.8, delay: 0.8, emoji: "💖" },
                    { left: 35, size: 25, duration: 6.0, delay: 2.3, emoji: "💗" },
                    { left: 45, size: 18, duration: 5.5, delay: 3.1, emoji: "✨" },
                    { left: 55, size: 30, duration: 4.2, delay: 0.5, emoji: "💕" },
                    { left: 65, size: 24, duration: 5.8, delay: 1.8, emoji: "❤️" },
                    { left: 75, size: 20, duration: 4.6, delay: 2.8, emoji: "💖" },
                    { left: 82, size: 26, duration: 5.0, delay: 0.3, emoji: "💗" },
                    { left: 88, size: 22, duration: 6.2, delay: 1.2, emoji: "✨" },
                    { left: 93, size: 28, duration: 4.4, delay: 3.5, emoji: "💕" },
                    { left: 98, size: 19, duration: 5.3, delay: 2.0, emoji: "❤️" },
                ].map((heart, i) => (
                    <span key={i} className="heart" style={{ left: `${heart.left}%`, fontSize: `${heart.size}px`, animationDuration: `${heart.duration}s`, animationDelay: `${heart.delay}s` }}>
                        {heart.emoji}
                    </span>
                ))}
            </div>

            <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10 }}>
                <div className="glass-card animate-fade-in-up" style={{ padding: "40px" }}>
                    <Link href="/" className="link-back" style={{ display: "inline-block", marginBottom: "20px" }}>← Back to Home</Link>

                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <div style={{ fontSize: "56px", marginBottom: "12px" }}>🎨</div>
                        <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#dc2626", marginBottom: "8px" }}>Customize Your Proposal</h1>
                        <p style={{ color: "#6b7280" }}>
                            Your Reference ID: <code style={{ background: "#fef2f2", padding: "4px 10px", borderRadius: "6px", color: "#dc2626", fontWeight: "600" }}>{refId}</code>
                        </p>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", border: "2px solid #10b981", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
                            <div style={{ fontSize: "20px", fontWeight: "700", color: "#065f46", marginBottom: "12px" }}>🎉 Your proposal is ready!</div>
                            <p style={{ color: "#047857", marginBottom: "16px" }}>Share this link with your crush:</p>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                <input type="text" value={shareLink} readOnly style={{ flex: 1, minWidth: "200px", padding: "12px 16px", border: "2px solid #10b981", borderRadius: "12px", background: "white", fontSize: "14px" }} />
                                <button onClick={copyLink} style={{ padding: "12px 20px", background: "#10b981", color: "white", border: "none", borderRadius: "12px", fontWeight: "600", cursor: "pointer" }}>
                                    {copied ? "Copied! ✓" : "Copy"}
                                </button>
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(`Hey! I made something special for you 💕\n\n${shareLink}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ padding: "12px 20px", background: "#25D366", color: "white", border: "none", borderRadius: "12px", fontWeight: "600", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                                >
                                    📱 WhatsApp
                                </a>
                            </div>
                            <div style={{ marginTop: "16px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                                <Link href={`/v/${refId}?preview=1`} target="_blank" style={{ color: "#047857", fontWeight: "500" }}>Preview →</Link>
                                <Link href="/dashboard" style={{ color: "#047857", fontWeight: "500" }}>Dashboard →</Link>
                            </div>
                            <div style={{ marginTop: "16px", padding: "12px", background: "rgba(255,255,255,0.5)", borderRadius: "8px", fontSize: "13px", color: "#065f46" }}>
                                💡 <strong>Save your Reference ID:</strong> <code style={{ background: "#d1fae5", padding: "2px 6px", borderRadius: "4px" }}>{refId}</code> — You'll need it to check the dashboard later!
                            </div>
                            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #10b981" }}>
                                <p style={{ fontSize: "14px", color: "#065f46", marginBottom: "12px" }}>☕ Enjoying this? Support the creator!</p>
                                <a
                                    href={`upi://pay?pa=justinsaju21@oksbi&pn=Valentine%20Builder&am=50&cu=INR`}
                                    style={{ display: "inline-block", padding: "8px 16px", background: "#10b981", color: "white", borderRadius: "20px", textDecoration: "none", fontSize: "13px", fontWeight: "600", marginRight: "8px" }}
                                >₹50</a>
                                <a
                                    href={`upi://pay?pa=justinsaju21@oksbi&pn=Valentine%20Builder&am=100&cu=INR`}
                                    style={{ display: "inline-block", padding: "8px 16px", background: "#10b981", color: "white", borderRadius: "20px", textDecoration: "none", fontSize: "13px", fontWeight: "600", marginRight: "8px" }}
                                >₹100</a>
                                <a
                                    href={`upi://pay?pa=justinsaju21@oksbi&pn=Valentine%20Builder&am=150&cu=INR`}
                                    style={{ display: "inline-block", padding: "8px 16px", background: "#10b981", color: "white", borderRadius: "20px", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}
                                >₹150</a>
                            </div>
                        </div>
                    )}

                    <div className="customize-grid">
                        {/* Left Column */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            <div>
                                <label className="input-label">Your Name (shown on proposal) *</label>
                                <input type="text" value={formData.creatorName} onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })} placeholder="e.g., Justin" className="input-field" />
                            </div>

                            <div>
                                <label className="input-label">Crush&apos;s Name *</label>
                                <input type="text" value={formData.crushName} onChange={(e) => setFormData({ ...formData, crushName: e.target.value })} placeholder="e.g., Sarah" className="input-field" />
                            </div>

                            <div>
                                <label className="input-label">Choose Theme</label>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "8px" }}>
                                    {(Object.keys(themes) as ThemeKey[]).map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => setFormData({ ...formData, theme: key })}
                                            className={`theme-option ${formData.theme === key ? "selected" : ""}`}
                                            style={{ background: themes[key].background, textAlign: "center" }}
                                        >
                                            <div style={{ fontWeight: "700", color: themes[key].textColor, fontSize: "16px" }}>{themes[key].name}</div>
                                            <div style={{ fontSize: "12px", color: themes[key].textColor, opacity: 0.8, marginTop: "4px" }}>{themes[key].description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Messages */}
                        <div>
                            <label className="input-label">Custom &quot;No&quot; Button Messages</label>
                            <p className="input-hint" style={{ marginBottom: "12px" }}>These appear when your crush clicks &quot;No&quot;</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "400px", overflowY: "auto" }}>
                                {formData.customMessages.map((msg, index) => (
                                    <input key={index} type="text" value={msg} onChange={(e) => updateMessage(index, e.target.value)} className="input-field" style={{ padding: "12px 16px", fontSize: "14px" }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Error */}
                    {error && <div className="alert-error" style={{ marginTop: "24px" }}>{error}</div>}

                    {/* Save Button */}
                    <div style={{ marginTop: "32px", textAlign: "center" }}>
                        <button onClick={handleSave} disabled={saving} className="btn-primary btn-grow" style={{ opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}>
                            {saving ? "Saving..." : "Save & Get Link 💕"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
