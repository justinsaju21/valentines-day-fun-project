import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{
            padding: "32px 20px",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "14px",
            position: "relative",
            zIndex: 10,
            background: "transparent",
            marginTop: "auto",
        }}>
            <div style={{
                maxWidth: "600px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center"
            }}>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                    <Link href="/privacy" style={{ color: "#4b5563", textDecoration: "none", transition: "color 0.2s" }} className="hover:text-red-500">
                        Privacy Policy
                    </Link>
                    <span>•</span>
                    <Link href="/terms" style={{ color: "#4b5563", textDecoration: "none", transition: "color 0.2s" }} className="hover:text-red-500">
                        Terms of Service
                    </Link>
                </div>

                <div>
                    © {new Date().getFullYear()} Valentine Builder
                </div>

                <div style={{
                    marginTop: "8px",
                    padding: "6px 16px",
                    background: "rgba(255, 255, 255, 0.4)",
                    borderRadius: "20px",
                    display: "inline-block",
                    backdropFilter: "blur(4px)"
                }}>
                    Made with ❤️ by <span style={{ fontWeight: "600", color: "#dc2626" }}>Justin</span>
                </div>
            </div>
        </footer>
    );
}
