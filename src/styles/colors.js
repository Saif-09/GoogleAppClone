export const Colors = {
    // Common Colors
    common: {
        white: '#fff',
        lightGray: '#9d9fa2',
        mediumGray: '#aaa',
        darkGray: '#3c3e45',
        blue: '#8db2f8',
        red: '#EA4335',
        green: '#34A853',
        yellow: '#FBBC05',
        buttonBlue: '#4285F4',
        transparent: 'transparent',
    },

    // Background Colors
    background: {
        primary: '#202124', // Main background color
        secondary: '#303134', // Secondary background (Mic button, containers)
        noQuery: '#1c1c1c', // No query background
        noQueryContainer: '#2a2a2a', // No query container background
        cardBorder: 'common.darkGray', // Border color for cards and containers
        overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlay background
        focusedTab: 'rgba(66, 133, 244, 0.2)', // Focused tab background
        sectionDivider: '#555', // Section divider in modal
        dot: ['common.buttonBlue', 'common.red', 'common.yellow', 'common.green'], // Dot animation colors
    },

    // Text Colors
    text: {
        primary: 'common.white', // Default white text color
        secondary: 'common.lightGray', // Subtitle, placeholder, and empty state text color
        trending: '#E8EAED', // Trending text color
        source: 'common.blue', // News source text color and active tab
        snippet: 'common.mediumGray', // Snippet text color
        noQuerySubtext: 'common.blue', // No query subtext color
        buttonText: 'black', // Text color for buttons
    },

    // Icon Colors
    icon: {
        default: 'common.lightGray', // Default icon color (e.g., back arrow, inactive state)
        active: '#fcfdff', // Active icon color (Mic, Lens, and close icons)
        borderColor:'#6e7075',
        mic: 'common.white', // Mic icon color
    },

    // Profile Colors
    profile: {
        border: '#ccc', // Sign-out button background and modal handle
        signOutText: '#333', // Sign-out button text color
    },

    // Tab Colors
    tab: {
        active: 'common.blue', 
        inactive: 'gray', 
    },

    // Google Colors
    google: {
        stroke: 'common.blue', 
        fill: '#9d9fa4', 
    },

    // Miscellaneous Colors
    misc: {
        shadow: '#000', 
    },
};