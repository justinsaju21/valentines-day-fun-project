export default function PrivacyPage() {
    return (
        <main style={{
            minHeight: "100vh",
            padding: "40px 20px",
            background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)",
            color: "#1f2937"
        }}>
            <div className="glass-card animate-fade-in-up" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "24px", color: "#dc2626" }}>Privacy Policy</h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px", lineHeight: "1.6" }}>
                    <section>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>1. Data Collection</h2>
                        <p>We believe in privacy first. We only collect the bare minimum information needed to make this service work:</p>
                        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                            <li>The names you enter for the proposal.</li>
                            <li>A hashed version of your password (we cannot see your actual password).</li>
                            <li>The status of your proposal (pending, opened, answered).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>2. Data Storage</h2>
                        <p>Your data is securely stored in a Google Sheet database. We use industry-standard encryption methods (bcrypt) to hash passwords before they are ever sent to our database. This means even we cannot read your password.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>3. Cookies & Tracking</h2>
                        <p>We do not use third-party tracking cookies or sell your data to advertisers. We use essential local storage to keep you logged in to your dashboard.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>4. Open Source</h2>
                        <p>This project is open source. You can view the code to verify our security practices.</p>
                    </section>
                </div>

                <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.1)", textAlign: "center" }}>
                    <a href="/" style={{ color: "#dc2626", textDecoration: "none", fontWeight: "600" }}>← Back to Home</a>
                </div>
            </div>
        </main>
    );
}
