import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 relative overflow-hidden flex flex-col">
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10 w-full">
        <div className="glass-card animate-fade-in-up p-8 md:p-12 max-w-2xl w-full text-center">
          {/* Logo */}
          <div className="text-6xl md:text-7xl mb-6 animate-bounce-slow">
            💘
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent mb-4 leading-tight">
            Valentine Builder
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Create a personalized Valentine proposal for your crush.
            <br />
            <span className="text-red-500 font-bold block mt-2">They can&apos;t say no! 💕</span>
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { emoji: "🎨", text: "4 Themes" },
              { emoji: "✏️", text: "Custom Messages" },
              { emoji: "🔗", text: "Shareable Link" },
              { emoji: "📊", text: "Track Status" },
            ].map((feature, i) => (
              <div key={i} className="feature-card flex flex-col items-center justify-center p-4">
                <div className="text-3xl mb-2">{feature.emoji}</div>
                <div className="text-sm font-bold text-gray-700">{feature.text}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link href="/create" className="btn-primary btn-grow w-full sm:w-auto text-center">
              Create Your Proposal 💕
            </Link>
            <Link href="/dashboard" className="btn-secondary btn-grow w-full sm:w-auto text-center">
              View Dashboard 📊
            </Link>
          </div>

          {/* How It Works */}
          <div className="mt-12 text-left w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
              How It Works
            </h2>

            <div className="flex flex-col gap-5">
              {[
                { step: 1, title: "Create Your Proposal", desc: "Set a password, customize names, choose a theme" },
                { step: 2, title: "Share the Link", desc: "Send the unique link to your crush" },
                { step: 3, title: 'Wait for "Yes!" 🎉', desc: "Check your dashboard to see when they say yes!" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-rose-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-base">{item.title}</div>
                    <div className="text-gray-500 text-sm mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips & FAQ */}
          <div className="mt-8 text-left bg-white/40 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
              💡 Good to Know
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              <div>✅ <strong>Multiple crushes?</strong> Create as many proposals as you want. Each gets a unique link!</div>
              <div>✅ <strong>They refreshed the page?</strong> We only count the first open. No duplicate stats.</div>
              <div>✅ <strong>Preview your proposal?</strong> Use the "Preview" button or add <code className="bg-red-50 text-red-600 px-1 rounded">?preview=1</code> to the URL.</div>
              <div>✅ <strong>100% Free & Private.</strong> No signup required. Your data stays between you two. 💕</div>
            </div>
          </div>

          <p className="text-gray-500 mt-8 text-xs">
            Made with ❤️ by Justin
          </p>
        </div>
      </div>
    </main>
  );
}
