// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./container/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//       backgroundImage: {
//         'hero-pattern': "url('/images/brandstory/automatic.jpg')",
//         'bretling-pattern': "url('/images/brandstory/bretling.jpg')",
//         'luminox-pattern': "url('/images/brandstory/luminox1440.png')",
//         'ingersoll-pattern': "url('/images/brandstory/ingersoll.jpg')",
//         'signup-pattern': "url('/images/brandstory/signup.webp')",
//         'checkout-pattern': "url('/images/brandstory/brandstroy.jpg')",
//         'paymnet-pattern': "url('/images/brandstory/gallery.webp')",
//         'fail2-pattern': "url('/images/brandstory/fail2.webp')",

//       },
//       fontFamily:{
//         "bnazanin":"bnazanin"
//       }
//     },
//   },
//   plugins: [],
// } satisfies Config;

// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./container/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//       backgroundImage: {
//         'hero-pattern': "url('/images/brandstory/automatic.jpg')",
//         'bretling-pattern': "url('/images/brandstory/bretling.jpg')",
//         'luminox-pattern': "url('/images/brandstory/luminox1440.png')",
//         'ingersoll-pattern': "url('/images/brandstory/ingersoll.jpg')",
//         'signup-pattern': "url('/images/brandstory/signup.webp')",
//         'checkout-pattern': "url('/images/brandstory/brandstroy.jpg')",
//         'paymnet-pattern': "url('/images/brandstory/gallery.webp')",
//         'fail2-pattern': "url('/images/brandstory/fail2.webp')",
//       },
//       fontFamily: {
//         "bnazanin": "bnazanin",
//       },
//       keyframes: {
//         "fade-in-up": {
//           "0%": { opacity: "0", transform: "translateY(40px)" },
//           "100%": { opacity: "1", transform: "translateY(0)" },
//         },
//         shake: {
//           "0%, 100%": { transform: "translateX(0)" },
//           "25%": { transform: "translateX(-15px)" },
//           "75%": { transform: "translateX(15px)" },
//         },
//       },
//       animation: {
//         "fade-in-up": "fade-in-up 5s ease-out",
//         shake: "shake 3s ease-out",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./container/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}", // Added from the provided code
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "hero-pattern": "url('/images/brandstory/automatic.jpg')",
        "bretling-pattern": "url('/images/brandstory/bretling.jpg')",
        "luminox-pattern": "url('/images/brandstory/luminox1440.png')",
        "ingersoll-pattern": "url('/images/brandstory/ingersoll.jpg')",
        "signup-pattern": "url('/images/brandstory/signup.webp')",
        "checkout-pattern": "url('/images/brandstory/checkout.webp')",
        "paymnet-pattern": "url('/images/brandstory/payment3.webp')",
        "fail-pattern": "url('/images/brandstory/fail4.webp')",
        "success-pattern": "url('/images/brandstory/success.webp')",
      },
      fontFamily: {
        bnazanin: "bnazanin",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(200px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        bounce: {
          "0%, 100%": {
            transform: "translateY(-10%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 5s ease-out",

        bounce: "bounce 1.5s infinite",
      },
    },
  },
  plugins: [
    plugin(function (helpers: {
      addUtilities: (utilities: Record<string, any>) => void;
    }) {
      helpers.addUtilities({
        ".animate-fade-in-up": {
          animation: "fade-in-up 0.5s ease-out",
        },
        ".animate-bounce": {
          animation: "bounce 1.5s infinite",
        },
      });
    }),
  ],
} satisfies Config;
