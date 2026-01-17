import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Hearts Background */}
      <div className="hearts-container">
        {[
          { left: 3, size: 18, duration: 4.2, delay: 0.1, emoji: "💕" },
          { left: 8, size: 28, duration: 5.5, delay: 1.8, emoji: "❤️" },
          { left: 14, size: 22, duration: 4.8, delay: 0.5, emoji: "💖" },
          { left: 20, size: 32, duration: 6.2, delay: 2.5, emoji: "💗" },
          { left: 26, size: 16, duration: 4.5, delay: 3.2, emoji: "💓" },
          { left: 32, size: 25, duration: 5.8, delay: 0.8, emoji: "💘" },
          { left: 38, size: 20, duration: 4.3, delay: 1.5, emoji: "💝" },
          { left: 44, size: 30, duration: 5.2, delay: 2.8, emoji: "🌹" },
          { left: 50, size: 18, duration: 6.0, delay: 0.3, emoji: "✨" },
          { left: 56, size: 26, duration: 4.7, delay: 1.2, emoji: "💕" },
          { left: 62, size: 22, duration: 5.4, delay: 3.8, emoji: "❤️" },
          { left: 68, size: 28, duration: 4.1, delay: 2.2, emoji: "💖" },
          { left: 74, size: 16, duration: 5.9, delay: 0.6, emoji: "💗" },
          { left: 80, size: 24, duration: 4.4, delay: 1.9, emoji: "💓" },
          { left: 85, size: 30, duration: 5.1, delay: 3.5, emoji: "💘" },
          { left: 89, size: 20, duration: 6.4, delay: 0.9, emoji: "💝" },
          { left: 93, size: 26, duration: 4.6, delay: 2.1, emoji: "🌹" },
          { left: 96, size: 18, duration: 5.3, delay: 4.2, emoji: "✨" },
          { left: 10, size: 24, duration: 4.9, delay: 1.1, emoji: "💕" },
          { left: 28, size: 22, duration: 5.6, delay: 3.0, emoji: "❤️" },
          { left: 46, size: 28, duration: 4.0, delay: 0.4, emoji: "💖" },
          { left: 64, size: 20, duration: 5.7, delay: 2.6, emoji: "💗" },
          { left: 82, size: 26, duration: 4.8, delay: 1.6, emoji: "💓" },
          { left: 98, size: 16, duration: 6.1, delay: 4.5, emoji: "💘" },
          { left: 5, size: 32, duration: 5.0, delay: 0.7, emoji: "💝" },
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

      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "40px 20px",
        }}
      >
        <div
          className="glass-card animate-fade-in-up"
          style={{
            padding: "48px 40px",
            maxWidth: "680px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <div style={{ fontSize: "72px", marginBottom: "20px" }} className="animate-bounce-slow">
            💘
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #dc2626, #f43f5e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px",
              lineHeight: "1.2",
            }}
          >
            Valentine Builder
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: "20px", color: "#4b5563", marginBottom: "32px", lineHeight: "1.6" }}>
            Create a personalized Valentine proposal for your crush.
            <br />
            <span style={{ color: "#ef4444", fontWeight: "600" }}>They can&apos;t say no! 💕</span>
          </p>

          {/* Features Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            {[
              { emoji: "🎨", text: "4 Themes" },
              { emoji: "✏️", text: "Custom Messages" },
              { emoji: "🔗", text: "Shareable Link" },
              { emoji: "📊", text: "Track Status" },
            ].map((feature, i) => (
              <div key={i} className="feature-card">
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>{feature.emoji}</div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>{feature.text}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/create" className="btn-primary btn-grow">
              Create Your Proposal 💕
            </Link>
            <Link href="/dashboard" className="btn-secondary btn-grow">
              View Dashboard 📊
            </Link>
          </div>

          {/* How It Works */}
          <div style={{ marginTop: "48px", textAlign: "left" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#dc2626",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              How It Works
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { step: 1, title: "Create Your Proposal", desc: "Set a password, customize names, choose a theme" },
                { step: 2, title: "Share the Link", desc: "Send the unique link to your crush" },
                { step: 3, title: 'Wait for "Yes!" 🎉', desc: "Check your dashboard to see when they say yes!" },
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ef4444, #f43f5e)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: "#1f2937", fontSize: "16px" }}>{item.title}</div>
                    <div style={{ color: "#6b7280", fontSize: "14px", marginTop: "2px" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips & FAQ */}
          <div style={{ marginTop: "32px", textAlign: "left", background: "rgba(255,255,255,0.4)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#dc2626", marginBottom: "16px" }}>💡 Good to Know</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "#374151" }}>
              <div>✅ <strong>Multiple crushes?</strong> Create as many proposals as you want. Each gets a unique link!</div>
              <div>✅ <strong>They refreshed the page?</strong> We only count the first open. No duplicates.</div>
              <div>✅ <strong>Preview your proposal?</strong> Use the "Preview" button - it won't count as them opening it.</div>
              <div>✅ <strong>Forgot your Reference ID?</strong> Check your browser history for the customize page URL.</div>
              <div>✅ <strong>100% Free & Private.</strong> No signup required. Your data stays between you two. 💕</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p style={{ color: "#6b7280", marginTop: "32px", fontSize: "14px" }}>
          Made with ❤️ by Justin
        </p>
      </div>
    </main>
  );
}
