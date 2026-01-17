// Theme configurations
export const themes = {
    classic: {
        name: 'Classic',
        description: 'Romantic pink & red vibes',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        cardBg: 'rgba(255, 255, 255, 0.25)',
        textColor: '#d32f2f',
        accentColor: '#ff6b95',
        buttonYes: 'linear-gradient(135deg, #4caf50, #8bc34a)',
        buttonNo: 'linear-gradient(135deg, #ff6b6b, #ee5a5a)',
        hearts: ['💕', '❤️', '💖', '💗', '💓', '💘', '💝', '🌹', '✨'],
    },
    dark: {
        name: 'Dark Mode',
        description: 'Elegant night vibes',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
        cardBg: 'rgba(255, 255, 255, 0.08)',
        textColor: '#f0f0f0',
        accentColor: '#e91e63',
        buttonYes: 'linear-gradient(135deg, #00c853, #69f0ae)',
        buttonNo: 'linear-gradient(135deg, #f50057, #ff4081)',
        hearts: ['💜', '💙', '🖤', '✨', '⭐', '💫', '🌙', '💎'],
    },
    neon: {
        name: 'Neon',
        description: 'Cyberpunk glow',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        cardBg: 'rgba(0, 255, 255, 0.05)',
        textColor: '#00ffff',
        accentColor: '#ff00ff',
        buttonYes: 'linear-gradient(135deg, #00ff87, #60efff)',
        buttonNo: 'linear-gradient(135deg, #ff0080, #ff8c00)',
        hearts: ['💎', '💠', '🔮', '⚡', '✨', '🌟', '💫'],
    },
    minimal: {
        name: 'Minimal',
        description: 'Clean & simple',
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        cardBg: 'rgba(0, 0, 0, 0.03)',
        textColor: '#333333',
        accentColor: '#e91e63',
        buttonYes: 'linear-gradient(135deg, #333333, #555555)',
        buttonNo: 'linear-gradient(135deg, #999999, #bbbbbb)',
        hearts: ['♡', '♥', '❤'],
    },
};

export type ThemeKey = keyof typeof themes;

// Default "No" button messages
export const defaultNoMessages = [
    "Are you sure? 🥺",
    "Really sure?? 😢",
    "Are you positive? 💔",
    "Pookie please... 🥹",
    "Just think about it! 💭",
    "I'll be really sad... 😞",
    "Very very sad... 😭",
    "Ok fine, I'll stop... 😔",
    "Just kidding! Say YES! ❤️",
    "Pretty please? 🙏💕"
];
