"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        displayName: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        if (formData.password.length < 4) {
            setError("Password must be at least 4 characters");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    displayName: formData.displayName,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (data.success) {
                router.push(`/customize/${data.refId}`);
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch {
            setError("Failed to create. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)",
            }}
        >
            {/* Floating Hearts - using deterministic values to avoid hydration mismatch */}
            <div className="hearts-container">
                {[
                    { left: 5, size: 20, duration: 4.5, delay: 0.2, emoji: "💕" },
                    { left: 12, size: 28, duration: 5.2, delay: 1.5, emoji: "❤️" },
                    { left: 20, size: 22, duration: 4.8, delay: 0.8, emoji: "💖" },
                    { left: 28, size: 25, duration: 6.0, delay: 2.3, emoji: "💗" },
                    { left: 35, size: 18, duration: 5.5, delay: 3.1, emoji: "💓" },
                    { left: 42, size: 30, duration: 4.2, delay: 0.5, emoji: "🌹" },
                    { left: 50, size: 24, duration: 5.8, delay: 1.8, emoji: "✨" },
                    { left: 58, size: 20, duration: 4.6, delay: 2.8, emoji: "💕" },
                    { left: 65, size: 26, duration: 5.0, delay: 0.3, emoji: "❤️" },
                    { left: 72, size: 22, duration: 6.2, delay: 1.2, emoji: "💖" },
                    { left: 78, size: 28, duration: 4.4, delay: 3.5, emoji: "💗" },
                    { left: 84, size: 19, duration: 5.3, delay: 2.0, emoji: "💓" },
                    { left: 90, size: 25, duration: 4.9, delay: 0.7, emoji: "🌹" },
                    { left: 95, size: 21, duration: 5.6, delay: 1.0, emoji: "✨" },
                    { left: 98, size: 27, duration: 4.3, delay: 2.5, emoji: "💕" },
                ].map((heart, i) => (
                    <span
                        key={i}
                        className="heart"
                        style={{
                            left: `${heart.left}%`,
                            fontSize: `${heart.size}px`,
                            animationDuration: `${heart.duration}s`,
                            animationDelay: `${heart.delay}s`,
                        }}
                    >
                        {heart.emoji}
                    </span>
                ))}
            </div>

            <div className="glass-card animate-fade-in-up" style={{ padding: "48px", maxWidth: "450px", width: "100%", position: "relative", zIndex: 10 }}>
                <Link href="/" className="link-back" style={{ display: "inline-block", marginBottom: "24px" }}>
                    ← Back to Home
                </Link>

                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div style={{ fontSize: "64px", marginBottom: "16px" }}>💝</div>
                    <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#dc2626", marginBottom: "8px" }}>
                        Create Your Proposal
                    </h1>
                    <p style={{ color: "#6b7280", fontSize: "16px" }}>
                        Set up your account to create a Valentine proposal
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Display Name */}
                    <div>
                        <label className="input-label">Your Name (Optional)</label>
                        <input
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            placeholder="e.g., John"
                            className="input-field"
                        />
                        <p className="input-hint">
                            🔒 Your crush won&apos;t see this - it&apos;s just for your reference
                        </p>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="input-label">Password *</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Create a password"
                            required
                            className="input-field"
                        />
                        <p className="input-hint">
                            You&apos;ll use this to access your dashboard
                        </p>
                        <p className="input-hint" style={{ marginTop: "4px", color: "#059669" }}>
                            🔒 Passwords are securely hashed and never visible to anyone.
                        </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="input-label">Confirm Password *</label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Confirm your password"
                            required
                            className="input-field"
                        />
                    </div>

                    {/* Error */}
                    {error && <div className="alert-error">{error}</div>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{
                            width: "100%",
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                            marginTop: "8px"
                        }}
                    >
                        {loading ? "Creating..." : "Continue to Customize →"}
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: "14px", color: "#6b7280", marginTop: "24px" }}>
                    Already have a proposal?{" "}
                    <Link href="/dashboard" style={{ color: "#ef4444", textDecoration: "none" }}>
                        Go to Dashboard
                    </Link>
                </p>
            </div>
        </main>
    );
}
