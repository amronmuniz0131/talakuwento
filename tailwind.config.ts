import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        story: {
          creation: "hsl(var(--creation))",
          "creation-glow": "hsl(var(--creation-glow))",
          noah: "hsl(var(--noah))",
          "noah-glow": "hsl(var(--noah-glow))",
          moses: "hsl(var(--moses))",
          "moses-glow": "hsl(var(--moses-glow))",
          david: "hsl(var(--david))",
          "david-glow": "hsl(var(--david-glow))",
          jesus: "hsl(var(--jesus))",
          "jesus-glow": "hsl(var(--jesus-glow))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
        panel: "var(--shadow-panel)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "move-left": {
          "0%": { transform: "translateX(450px)" },
          "100%": { transform: "translateX(-450px)" },
        },
        "move-right": {
          "0%": { transform: "translateX(-450px)" },
          "100%": { transform: "translateX(450px)" },
        },
        "ant-move": {
          "0%": { transform: "translateX(0px)", right: "50rem", display: "block" },
          "100%": { transform: "translateX(70rem)", right: "0", display: "none" },
        },
        "move-up": {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-180px)" },
        },
        "move-down": {
          "0%": { transform: "translateY(-180px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "shake": {
          "0%, 20%, 40%, 60%, 80%, 100%": { transform: "translateX(10px)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(0px)" },
        },
        "fade": {
          "0%": { "opacity": "100%" },
          "100%": { "opacity": "0%" },
        },
        "show": {
          "0%": {
            "opacity": "0%"
          },
          "100%": {
            "opacity": "100%"
          }
        },
        "move-bird": {
          "0%": { transform: "translateX(0) rotateY(180deg)" },
          "50%": { transform: "translateX(500px) rotateY(180deg)" },
          "75%": { transform: "translateX(250px) rotateY(0deg)" },
          "100%": { transform: "translateX(0) rotateY(0deg)" }
        },
        "move-cloud": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(80vw)" },
          "100%": { transform: "translateX(0)" }
        },
        "move-sun": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-80vw)" }
        },
        "move-moon": {
          "0%": { transform: "translateX(80vw)" },
          "100%": { transform: "translateX(0)" },
        },
        "out-moon": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(80vw)" },
        },
        "out-sun": {
          "0%": { transform: "translateX(-80vw)" },
          "100%": { transform: "translateX(0)" },
        },
        "morning-sun": {
          "0%": { backgroundColor: "#06b6d4"},
          "50%": { backgroundColor: "orange" },
          "100%": { backgroundColor: "black" },
        },
        "evening-moon": {
          "0%": { backgroundColor: "black"},
          "50%": { backgroundColor: "orange" },
          "100%": { backgroundColor: "#06b6d4" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "move-left": "move-left 2s ease-in-out",
        "move-right": "move-right 2s ease-in-out",
        "move-cloud": "move-cloud 60s ease-in-out infinite",
        "move-up": "move-up 2s ease-in-out",
        "shake": "shake 4s ease-in",
        "move-down": "move-down 2s ease-in-out",
        "fade": "fade 1s ease-in-out",
        "show": "show 1s ease-in-out",
        "move-bird": "move-bird 10s ease-in-out infinite",
        "move-sun": "move-sun 3s ease-in-out",
        "move-moon": "move-moon 3s ease-in-out",
        "out-moon": "out-moon 3s ease-in-out",
        "out-sun": "out-sun 3s ease-in-out",
        "morning-sun": "morning-sun 3s ease-in-out",
        "evening-moon": "evening-moon 3s ease-in-out",
        "ant-move": "ant-move 10s ease-out" 
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
