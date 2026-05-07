// !IMPORTANT: The tailwWindPresetEditor.js file is not updated automatically,
// so you must update it manually to reflect the changes in the tailwWindPreset.js file.

export default {
  darkMode: "class",
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      fontSize: {
        "heading-xs": [
          "1rem",
          {
            lineHeight: "1.25",
          },
        ],
        "heading-s": [
          "1.5rem",
          {
            lineHeight: "1.33",
          },
        ],
        "heading-m": [
          "2rem",
          {
            lineHeight: "1.25",
          },
        ],
        "heading-l": [
          "2.5rem",
          {
            lineHeight: "1.2",
          },
        ],
        "heading-xl": [
          "3.75rem",
          {
            lineHeight: "1.2",
          },
        ],
        "heading-2xl": [
          "5rem",
          {
            lineHeight: "1.3",
          },
        ],
        "body-2xl": [
          "3rem",
          {
            lineHeight: "1.33",
          },
        ],
        "body-xl": [
          "2rem",
          {
            lineHeight: "1.25",
          },
        ],
        "body-l": [
          "1.5rem",
          {
            lineHeight: "1.33",
          },
        ],
        "body-m": [
          "1rem",
          {
            lineHeight: "1.5",
          },
        ],
        "body-s": [
          "0.875rem",
          {
            lineHeight: "1.43",
          },
        ],
        "body-xs": [
          "0.75rem",
          {
            lineHeight: "1.33",
          },
        ],
        "spaced-m": [
          "0.875rem",
          {
            lineHeight: "1.14",
            letterSpacing: "0.3em",
          },
        ],
        "spaced-s": [
          "0.6875rem",
          {
            lineHeight: "1.45",
            letterSpacing: "0.3em",
          },
        ],
      },
      backgroundImage: {
        "ltr-gradient": "linear-gradient(90deg, #111729 0%, rgba(32, 41, 58, 0.1) 60%)",
        "ttd-gradient":
          "linear-gradient(180deg, rgba(17, 23, 41, 0.6) 0%, rgba(32, 41, 58, 0.1) 100%)",
        "dtt-gradient":
          "linear-gradient(180deg, rgba(103, 116, 136, 0) 30%, rgba(17, 23, 41, 0.5) 50%, rgba(17, 23, 41, 0.8) 100%)",
        "dtt-gradient-2":
          "linear-gradient(0deg, #111729 0%, rgba(17, 23, 41, 0) 46.35%, rgba(17, 23, 41, 0) 100%)",
        "dtt-gradient-3": "linear-gradient(180deg, rgba(241, 244, 248, 0) 0%, #F1F4F8 100%)",
      },
      boxShadow: {
        none: "none",
        "shadow-1": "0px 0px 2px 0px #0000000F, 0px 1px 8px 0px #00000014", // Cards and other elements
        "shadow-2": "0px 0px 2px 0px #0000000F, 0px 4px 6px 0px #00000014", // Hover states
        "shadow-3": "0px 4px 16px 0px #00000014, 0px 0px 2px 0px #0000000F", // Modal, popups and tooltips
        "shadow-4": "0px 4px 6px 0px #0000001A", // Navigation
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.25rem",
        lg: "1rem",
      },
      colors: {
        blue: {
          900: "#06113B",
          800: "#001A77",
          700: "#003FB4",
          600: "#0061FC",
          500: "#78A9FF",
          400: "#A6C8FF",
          300: "#C3D9FA",
          200: "#DDE9FB",
          100: "#EFF5FD",
        },
        grey: {
          900: "#111729",
          800: "#20293A",
          700: "#4A5567",
          600: "#677488",
          500: "#96A2B5",
          400: "#CCD4DF",
          300: "#E2E7EE",
          200: "#F1F4F8",
          100: "#F7F9FB",
        },
        electric: {
          500: "#67E8F9",
          300: "#A5F3FC",
          100: "#CFFAFE",
        },
        pink: {
          700: "#BE123C",
          500: "#F43F5E",
          300: "#FB7185",
          100: "#FFF1F2",
        },
        yellow: {
          500: "#FBBF24",
          300: "#FDE68A",
          100: "#FFFBEB",
        },
        brown: {
          500: "#92400E",
          300: "#B45309",
          100: "#FB923C",
        },
        green: {
          500: "#16A34A",
          300: "#22C55E",
          100: "#DCFCE7",
        },
        purple: {
          500: "#7C3AED",
          300: "#A855F7",
          100: "#C4B5FD",
        },
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      oswald: ["Oswald", "oswald", "oswald-medium", "sans-serif"],
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".container": {
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          "@screen sm": {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          },
          "@screen md": {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          },
          "@screen lg": {
            paddingLeft: "2rem",
            paddingRight: "2rem",
          },
          "@screen xl": {
            paddingLeft: "3.75rem",
            paddingRight: "3.75rem",
          },
        },
      });
    },
    ({ addBase }) => {
      addBase({
        html: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          scrollBehavior: "smooth",
        },
        body: {
          color: "#20293A",
        },
      });
    },
  ],
};
