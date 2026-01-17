export default function TermsPage() {
    return (
        <main style={{
            minHeight: "100vh",
            padding: "40px 20px",
            background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)",
            color: "#1f2937"
        }}>
            <div className="glass-card animate-fade-in-up" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "24px", color: "#dc2626" }}>Terms of Service</h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px", lineHeight: "1.6" }}>
                    <section>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>1. Acceptance of Terms</h2>
                        <p>By using Valentine Builder, you agree to these terms. This service is provided "as is" and is intended for entertainment purposes only.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>2. User Responsibilities</h2>
                        <p>You are responsible for:</p>
                        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                            <li>The content you create (please keep it appropriate!).</li>
                            <li>Keeping your password safe (though we hash it, it's best to be careful).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>3. Disclaimer</h2>
                        <p>We are not responsible for rejected proposals, broken hearts, or excessive happiness resulting from successful proposals. Use at your own emotional risk! 💕</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>4. Safety</h2>
                        <p>Do not use this service to harass or spam others. We reserve the right to remove inappropriate content.</p>
                    </section>
                </div>

                <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.1)", textAlign: "center" }}>
                    <a href="/" style={{ color: "#dc2626", textDecoration: "none", fontWeight: "600" }}>← Back to Home</a>
                </div>
            </div>
        </main>
    );
}
