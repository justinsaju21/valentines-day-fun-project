# Valentine Builder 💕

A premium SaaS-style application to create personalized digital Valentine's Day proposals. Built with Next.js, Tailwind CSS, and Google Sheets.

![Valentine Builder](public/landing.png)

## Features ✨

-   **Custom Proposals**: Create unique, password-protected proposal pages.
-   **Themes**: Choose from multiple romantic themes (Romantic Red, Deep Blue, Cute Pink, etc.).
-   **Live Dashboard**: Track if your crush has viewed the proposal and their answer ("YES!" or "NO").
-   **Google Sheets Database**: All data is securely stored in your own Google Sheet.
-   **Interactive UI**: Floating hearts, confetti explosions, and smooth animations.
-   **Responsive Design**: Looks great on mobile and desktop.

## Tech Stack 🛠️

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS
-   **Database**: Google Sheets API
-   **Security**: bcrypt password hashing

## Getting Started 🚀

### Prerequisites

-   Node.js 18+
-   A Google Cloud Service Account (for Sheets API)

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/justinsaju21/valentines-day-fun-project.git
    cd valentines-day-fun-project
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env.local` file in the root directory:
    ```env
    GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
    GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@..."
    GOOGLE_SHEETS_SPREADSHEET_ID="your-sheet-id"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## Deployment 🌍

The easiest way to deploy is **Vercel**:

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add your environment variables in the Vercel dashboard.
4.  Deploy!

## License 📄

This project is for entertainment purposes. Made with ❤️ by **Justin**.
