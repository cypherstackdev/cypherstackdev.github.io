/**
 * D2C Headless Storefront Engine - Product Catalog
 * Curated for Cyber/Dark & Luxury Streetwear, Tech & Wellness D2C Brands
 */

const PRODUCTS_DATA = [
  {
    id: "nv-snk-01",
    name: "CYBER-RUNNER 2099 // V2 MATTE BLACK",
    subtitle: "Aerospace Magnesium Shank • Liquid-Nitrogen Infused Midsole",
    category: "Sneakers",
    price: 6499,
    originalPrice: 11999,
    rating: 4.9,
    reviewsCount: 142,
    badge: "🔥 DROP 04 EXCLUSIVE",
    badgeType: "hot",
    stock: 4,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Stealth Black", hex: "#111111" },
      { name: "Cyber Violet", hex: "#8b5cf6" },
      { name: "Acid Emerald", hex: "#10b981" }
    ],
    description: "Constructed from carbon-reinforced TPU mesh and ballistic nylon. Features our patented Kinetic-Energy rebound outsole engineered for 40% higher shock absorption. Limited run of 300 numbered pairs worldwide.",
    specs: {
      "Upper Material": "Carbon TPU Matrix + Hydrophobic Ripstop",
      "Midsole Tech": "Dual-Density HyperFoam with Magnesium plate",
      "Outsole": "Zero-Slip HexGrip Rubber",
      "Weight": "310g (UK 9)",
      "Origin": "Engineered in Tokyo, Handcrafted in India"
    },
    reviews: [
      { user: "Aarav M.", rating: 5, date: "2 days ago", comment: "The build quality rivals Balenciaga. Comfortable straight out of the box!", verified: true },
      { user: "Rohan S.", rating: 5, date: "1 week ago", comment: "Unreal cushioning. Arrived in Bengaluru within 24 hours of ordering.", verified: true }
    ],
    featured: true,
    isBestseller: true,
    isNewDrop: true
  },
  {
    id: "nv-app-02",
    name: "QUANTUM OVERSIZED HEAVYWEIGHT HOODIE (450 GSM)",
    subtitle: "French Terry 100% Organic Combed Cotton • Distressed Acid Wash",
    category: "Apparel",
    price: 3299,
    originalPrice: 5499,
    rating: 4.8,
    reviewsCount: 89,
    badge: "⚡ SELLING FAST",
    badgeType: "limited",
    stock: 7,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["S (Boxy)", "M (Oversized)", "L (Relaxed)", "XL (Drop Shoulder)"],
    colors: [
      { name: "Obsidian Slate", hex: "#1e1e24" },
      { name: "Vintage Charcoal", hex: "#374151" },
      { name: "Cyber Olive", hex: "#36453b" }
    ],
    description: "A monolith in streetwear construction. 450 GSM ultra-dense loopback French Terry fabric pre-shrunk with double-layered hood, kangaroo pocket with hidden earbud wire channel, and custom oxidized steel drawcord aglets.",
    specs: {
      "GSM": "450 GSM Ultra-Heavy French Terry",
      "Fit": "True Boxy Oversized Drop-Shoulder",
      "Print / Embroidery": "High-Density Puff Print on Back",
      "Care": "Cold wash inside out, do not tumble dry"
    },
    reviews: [
      { user: "Devansh K.", rating: 5, date: "3 days ago", comment: "Heaviest hoodie I own. Sits perfectly on shoulders without drooping.", verified: true }
    ],
    featured: true,
    isBestseller: true,
    isNewDrop: false
  },
  {
    id: "nv-tch-03",
    name: "TITANIUM TITAN 100W GAN HYPER-POWERBANK",
    subtitle: "Grade 5 Titanium Chassis • Real-Time OLED Voltage Screen",
    category: "Tech Accessories",
    price: 4999,
    originalPrice: 7999,
    rating: 4.9,
    reviewsCount: 215,
    badge: "🏆 BEST TECH ACCESSORY",
    badgeType: "highlight",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["20,000 mAh (Airline Safe)", "27,600 mAh (Pro Max)"],
    colors: [
      { name: "Brushed Titanium", hex: "#71717a" },
      { name: "Matte Cyber Black", hex: "#09090b" }
    ],
    description: "Powers your MacBook Pro, iPhone 16 Pro, and mirrorless camera at once with 100W PD 3.0 protocol. The real-time interactive cyber OLED display shows precise battery temperature, output wattage per port, and remaining recharge time.",
    specs: {
      "Capacity": "20,000mAh / 74Wh Airline Safe",
      "Ports": "2x USB-C (100W PD), 1x USB-A (22.5W QC4.0)",
      "Display": "0.96-inch OLED Real-time Telemetry Display",
      "Certifications": "BIS Approved, FCC, CE, RoHS"
    },
    reviews: [
      { user: "Vikramaditya T.", rating: 5, date: "Yesterday", comment: "Charges my M2 Max laptop while flying. Best travel gadget hands down.", verified: true }
    ],
    featured: true,
    isBestseller: false,
    isNewDrop: true
  },
  {
    id: "nv-app-04",
    name: "KINETIC MODULAR CARGO JOGGER // V3",
    subtitle: "Cordura® Ripstop • Fidlock® Magnetic Pocket Latches",
    category: "Apparel",
    price: 3799,
    originalPrice: 6299,
    rating: 4.7,
    reviewsCount: 64,
    badge: "💧 DWR WATER-REPELLENT",
    badgeType: "feature",
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["30 (S)", "32 (M)", "34 (L)", "36 (XL)"],
    colors: [
      { name: "Midnight Black", hex: "#000000" },
      { name: "Industrial Olive", hex: "#3b443b" }
    ],
    description: "Engineered for high-mobility city commuting. Constructed with 4-way stretch Cordura stretch fabric treated with DWR Teflon repellent. Features 8 utility pockets including 2 detachable magnetic Fidlock modules.",
    specs: {
      "Fabric": "88% Cordura Nylon, 12% Spandex",
      "Hardware": "German Fidlock V-Buckles & YKK Aquaguard Zippers",
      "Ankle Cuff": "Custom Zipper-adjustable Tapered Fit",
      "Pocket System": "8 Concealed & Modular Tactical Compartments"
    },
    reviews: [
      { user: "Sameer N.", rating: 5, date: "4 days ago", comment: "Insane attention to detail. The magnetic pockets are super satisfying to use.", verified: true }
    ],
    featured: false,
    isBestseller: true,
    isNewDrop: false
  },
  {
    id: "nv-snk-05",
    name: "PHANTOM HI-TOP CYBER-BOOT // V1",
    subtitle: "Full-Grain Italian Calfskin • Vibram Megagrip Arctic Lug Outsole",
    category: "Sneakers",
    price: 7999,
    originalPrice: 14999,
    rating: 5.0,
    reviewsCount: 38,
    badge: "💎 COLLECTORS EDITION",
    badgeType: "luxury",
    stock: 2,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Onyx Black", hex: "#0f0f10" },
      { name: "Lunar Bone", hex: "#d1d5db" }
    ],
    description: "The apex silhouette bridging avant-garde fashion and combat utility. Hand-lasted full-grain Italian leather paired with authentic Vibram Megagrip lugged outsoles and custom matte alloy quick-lace eyelets.",
    specs: {
      "Leather": "1.8mm Premium Italian Full-Grain Calfskin",
      "Sole Unit": "Vibram® Arctic Grip Compound",
      "Lining": "Breathable Antimicrobial Microfiber",
      "Closure": "Speed-Lace with YKK Lateral Waterproof Zip"
    },
    reviews: [
      { user: "Tushar J.", rating: 5, date: "2 weeks ago", comment: "Museum grade craftsmanship. Worth every single rupee.", verified: true }
    ],
    featured: true,
    isBestseller: false,
    isNewDrop: true
  },
  {
    id: "nv-tch-06",
    name: "CYBER-LINK SMART MECHA-WATCH BAND",
    subtitle: "Aviation Alloy Link • Integrated NFC Business Card / Tap to Pay",
    category: "Tech Accessories",
    price: 2499,
    originalPrice: 4299,
    rating: 4.8,
    reviewsCount: 112,
    badge: "⚡ NFC ENABLED",
    badgeType: "feature",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Apple Watch 44/45/49mm Ultra", "Galaxy Watch 20/22mm"],
    colors: [
      { name: "DLC Titanium Gray", hex: "#4b5563" },
      { name: "Space Black", hex: "#18181b" },
      { name: "Cyber Silver", hex: "#e5e7eb" }
    ],
    description: "Upgrade your Apple Watch or Galaxy Watch with surgical stainless steel mecha links. Includes an embedded dual-chip NFC capsule inside the butterfly clasp to instantly share your digital card, Instagram, or portfolio with a tap.",
    specs: {
      "Material": "316L Surgical Stainless Steel with Diamond-Like Carbon (DLC)",
      "NFC Function": "Dual-Band NTAG213 Smart Clasp (Zero Battery Required)",
      "Compatibility": "Apple Watch Ultra 1/2, Series 7-10, Samsung Galaxy Watch 4-7",
      "Clasp": "Precision Double-Lock Butterfly"
    },
    reviews: [
      { user: "Karan B.", rating: 5, date: "5 days ago", comment: "Tapping someone's phone with my watch clasp to share LinkedIn blows people away.", verified: true }
    ],
    featured: false,
    isBestseller: true,
    isNewDrop: false
  },
  {
    id: "nv-wel-07",
    name: "ZENITH DEEP-RECOVERY INFRARED MASSAGE GUN",
    subtitle: "Brushless 16mm High-Torque Motor • Solid Copper Percussive Heads",
    category: "Wellness",
    price: 5499,
    originalPrice: 9999,
    rating: 4.9,
    reviewsCount: 76,
    badge: "🧘 GYM & RECOVERY PRO",
    badgeType: "highlight",
    stock: 9,
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Pro Hardcase Kit (5 Attachments)"],
    colors: [
      { name: "Graphite Matte", hex: "#27272a" },
      { name: "Metallic Crimson", hex: "#991b1b" }
    ],
    description: "Delivers 3,200 PPM percussive deep-tissue therapy with WhisperQuiet™ 38dB brushless motor. Comes with 5 swappable aerospace titanium & silicone heads and a fast-heating thermal ceramic warm-up head.",
    specs: {
      "Stroke Amplitude": "16mm Deep Percussive Penetration",
      "Stall Force": "65 lbs Peak Resistance",
      "Battery": "3,400 mAh LG Lithium Cell (8h runtime)",
      "Noise Level": "< 38dB at Max Intensity"
    },
    reviews: [
      { user: "Dr. Ananya P.", rating: 5, date: "1 week ago", comment: "As a physiotherapist, this is comparable to commercial ₹30k units.", verified: true }
    ],
    featured: false,
    isBestseller: true,
    isNewDrop: false
  },
  {
    id: "nv-tch-08",
    name: "AEGIS BIOMETRIC MECHA BACKPACK (28L)",
    subtitle: "Fingerprint Scanner Lock • Waterproof Ballistic 1680D Fabric",
    category: "Tech Accessories",
    price: 5999,
    originalPrice: 9499,
    rating: 4.9,
    reviewsCount: 153,
    badge: "🔒 BIOMETRIC SECURITY",
    badgeType: "feature",
    stock: 6,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["28L Daily Commute / Travel"],
    colors: [
      { name: "Cyber Armor Black", hex: "#18181b" },
      { name: "Storm Grey", hex: "#4b5563" }
    ],
    description: "The ultimate cyber travel vault. Equipped with an instant 0.3s capacitive fingerprint padlock, waterproof 1680D Cordura exterior, suspended 17-inch laptop vault, and USB-C pass-through rapid charging dock.",
    specs: {
      "Capacity": "28 Liters (Expandable to 34L)",
      "Lock": "0.3s Biometric Fingerprint + TSA Backup Key",
      "Laptop Sleeve": "Suspended False-Bottom for 14-17 inch Laptops",
      "Weatherproofing": "IPX5 Water Resistant with YKK AquaGuard"
    },
    reviews: [
      { user: "Rahul G.", rating: 5, date: "3 days ago", comment: "The biometric lock is seamless and the bag holds its rigid cyber shape even when empty.", verified: true }
    ],
    featured: true,
    isBestseller: false,
    isNewDrop: true
  },
  {
    id: "nv-app-09",
    name: "CYBERPUNK GLITCH PRINT JACQUARD KNIT SWEATER",
    subtitle: "Heavyweight Mohair-Blend • Engineered Kinetic Cyber Pattern",
    category: "Apparel",
    price: 3999,
    originalPrice: 6999,
    rating: 4.8,
    reviewsCount: 52,
    badge: "✨ ARTISAN KNIT",
    badgeType: "limited",
    stock: 3,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cyber Glitch Multi", hex: "#6366f1" },
      { name: "Monochrome Grid", hex: "#1f2937" }
    ],
    description: "An intricate multi-color jacquard knit weaving 8 distinct yarns to create a holographic visual distortion effect. Ultra-soft mohair-wool blend that stays warm without any itchiness.",
    specs: {
      "Yarn Composition": "40% Mohair, 35% Merino Wool, 25% Anti-pilling Acrylic",
      "Weave": "12-Gauge Double Jacquard Knit",
      "Cut": "Slightly Cropped Streetwear Silhouette"
    },
    reviews: [
      { user: "Pranav V.", rating: 5, date: "5 days ago", comment: "Turn heads everywhere I go. The colors under club/neon lights look insane.", verified: true }
    ],
    featured: false,
    isBestseller: false,
    isNewDrop: true
  },
  {
    id: "nv-wel-10",
    name: "AURA CIRCADIAN SOUNDSCAPES & SLEEP HELMET",
    subtitle: "Bone-Conduction Audio • Faraday Sleep Mask with 100% Blackout",
    category: "Wellness",
    price: 3499,
    originalPrice: 5999,
    rating: 4.9,
    reviewsCount: 94,
    badge: "💤 DEEP SLEEP TECH",
    badgeType: "highlight",
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["One Size (Adjustable Magnetic Strap)"],
    colors: [
      { name: "Stealth Black", hex: "#0a0a0a" },
      { name: "Nebula Purple", hex: "#4c1d95" }
    ],
    description: "Engineered for insomnia relief and high-performance REM sleep cycles. Combines 3D ergonomic memory foam zero-pressure eye cups with ultra-thin bone conduction speakers emitting binaural delta-wave soundscapes.",
    specs: {
      "Audio Engine": "Ultra-Flat Bone Conduction Drivers (Side-Sleeper Approved)",
      "Battery": "14-Hour Continuous Loop Playback",
      "Bluetooth": "5.3 Low-Latency with Auto-Sleep Timer",
      "Fabric": "Mulberry Silk & Breathable Coolmax Lycra"
    },
    reviews: [
      { user: "Meera R.", rating: 5, date: "6 days ago", comment: "Finally cured my flight jetlag and city noise sleep disruptions.", verified: true }
    ],
    featured: false,
    isBestseller: false,
    isNewDrop: true
  },
  {
    id: "nv-snk-11",
    name: "AERO-SLIDE CYBER PLATFORM MULE",
    subtitle: "Self-Molding EVA Foam • Kinetic Ribbed Arch Support",
    category: "Sneakers",
    price: 2199,
    originalPrice: 3999,
    rating: 4.7,
    reviewsCount: 88,
    badge: "☁️ CLOUD COMFORT",
    badgeType: "feature",
    stock: 11,
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: [
      { name: "Oatmeal Bone", hex: "#e7e5e4" },
      { name: "Matte Carbon", hex: "#1c1917" },
      { name: "Neon Cyber Acid", hex: "#84cc16" }
    ],
    description: "Cast from a single mold of nitrogen-blown supercritical EVA foam. Provides supreme squishy rebound with an aggressive serrated bottom tread and ventilated side heat exhausts.",
    specs: {
      "Material": "Supercritical Super-Foam Injection",
      "Heel Height": "45mm Elevated Chunky Stance",
      "Waterproof": "100% Hydrophobic & Washable"
    },
    reviews: [
      { user: "Aditya C.", rating: 5, date: "1 week ago", comment: "Literally walking on marshmallows. Wearing these everywhere daily.", verified: true }
    ],
    featured: false,
    isBestseller: true,
    isNewDrop: false
  },
  {
    id: "nv-tch-12",
    name: "CYBER-DECK MAGNETIC MAGSAFE WALLET STAND",
    subtitle: "Aircraft Grade Aluminum • Holds 4 Cards • 360° Rotating Hinge",
    category: "Tech Accessories",
    price: 1499,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 167,
    badge: "🧲 3500GS STRONG MAGNET",
    badgeType: "hot",
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Universal MagSafe (iPhone 12-16 & MagSafe Cases)"],
    colors: [
      { name: "Anodized Gunmetal", hex: "#3f3f46" },
      { name: "Raw Aluminum", hex: "#d4d4d8" },
      { name: "Midnight Purple", hex: "#581c87" }
    ],
    description: "Precision CNC milled from aerospace aluminium with an adjustable steel torque friction hinge. Features N52 Neodymium rare-earth magnets (3,500 Gauss) ensuring your cards never slip off your phone.",
    specs: {
      "Magnet Strength": "3,500 Gauss (3x standard Apple wallet)",
      "Card Capacity": "Up to 4 Cards + Cash Clip",
      "Stand Angles": "Portrait 60°, Landscape 45°, Floating Video Mode"
    },
    reviews: [
      { user: "Kabir M.", rating: 5, date: "2 days ago", comment: "The magnet is shockingly strong. Stand works great on my office desk.", verified: true }
    ],
    featured: false,
    isBestseller: true,
    isNewDrop: false
  }
];

// Preset Promo Codes available in the engine
const PROMO_CODES = {
  "CYBER20": { type: "percent", value: 20, desc: "20% Off on Entire Order" },
  "NEODROP500": { type: "flat", value: 500, minOrder: 2500, desc: "₹500 Off on orders above ₹2,499" },
  "FREESHIP": { type: "shipping", value: 100, desc: "Free Express Shipping" },
  "VIP10": { type: "percent", value: 10, desc: "10% Extra VIP Member Discount" }
};

// Major Indian Pin Codes database for realistic instant SLA checking
const PINCODE_DATABASE = {
  "560001": { city: "Bengaluru, KA", sla: "🚀 Next Day by 1 PM", cod: true, fast: true },
  "560100": { city: "Electronic City, BLR", sla: "🚀 Next Day by 2 PM", cod: true, fast: true },
  "110001": { city: "New Delhi, DL", sla: "⚡ 24-48 Hours Express", cod: true, fast: true },
  "400001": { city: "Mumbai, MH", sla: "⚡ 24-48 Hours Express", cod: true, fast: true },
  "500001": { city: "Hyderabad, TS", sla: "⚡ 1-2 Business Days", cod: true, fast: true },
  "600001": { city: "Chennai, TN", sla: "⚡ 2 Business Days", cod: true, fast: true },
  "700001": { city: "Kolkata, WB", sla: "📦 2-3 Business Days", cod: true, fast: true },
  "411001": { city: "Pune, MH", sla: "⚡ 24-48 Hours Express", cod: true, fast: true },
  "380001": { city: "Ahmedabad, GJ", sla: "📦 2-3 Business Days", cod: true, fast: true },
  "302001": { city: "Jaipur, RJ", sla: "📦 2-3 Business Days", cod: true, fast: true },
  "682001": { city: "Kochi, KL", sla: "📦 2-3 Business Days", cod: true, fast: true },
  "160001": { city: "Chandigarh, PB", sla: "📦 2-3 Business Days", cod: true, fast: true }
};
