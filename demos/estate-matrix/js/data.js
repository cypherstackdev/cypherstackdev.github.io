// Estate Matrix - Curated Luxury Real Estate Dataset
// Ultra-Prime listings across Mumbai, Dubai, Bangalore, and Goa

const LUXURY_PROPERTIES = [
  {
    id: "prop-mum-01",
    title: "The Imperial Sky Penthouse",
    tagline: "Unrivaled Horizon Living Above Worli Sea Face",
    locationKey: "mumbai",
    locationName: "Mumbai",
    microLocation: "Worli Sea Face, South Mumbai",
    propertyType: "penthouses",
    propertyTypeLabel: "Duplex Penthouse",
    priceINR: 245000000, // ₹24.5 Cr
    priceUSD: 2950000,   // $2.95M
    priceAED: 10830000,  // AED 10.83M
    priceDisplayINR: "₹24.50 Cr",
    priceDisplayUSD: "$2.95 M",
    priceDisplayAED: "AED 10.83 M",
    pricePerSqFtINR: "₹35,766 / sq.ft",
    carpetAreaSqFt: 6850,
    superBuiltUpSqFt: 8400,
    bedrooms: 5,
    bathrooms: 6,
    parkings: 4,
    facing: "Arabian Sea (West)",
    status: "Ready to Move",
    reraNumber: "P51900008392 (MahaRERA)",
    completionDate: "Q1 2025",
    isFeatured: true,
    isExclusive: true,
    goldenVisaEligible: false,
    rentalYield: "4.2% Est. Yield",
    appreciationRate: "+14.8% YoY",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Sea Facing", "Private Plunge Pool", "Private Elevator", "Duplex Penthouse", "MahaRERA Verified"],
    description: "Perched atop the 48th and 49th floors along Mumbai's coveted Worli Sea Face, The Imperial Sky Penthouse represents the pinnacle of high-altitude luxury. Offering 360-degree unobstructed vistas of the Arabian Sea and the glittering Bandra-Worli Sea Link, this custom-crafted duplex features double-height 24-foot ceilings in the grand salon, a cantilevered private infinity pool, a climate-controlled walk-in wine cellar, and private biometric high-speed elevator access.",
    specifications: {
      carpetArea: "6,850 sq.ft (636 sq.m)",
      superBuiltUp: "8,400 sq.ft",
      ceilingHeight: "24 ft Grand Salon / 12 ft Suites",
      vastuCompliance: "100% Vastu Compliant (East Entrance)",
      smartHome: "Full Crestron Home OS & Lutron Lighting Integration",
      flooring: "Imported Italian Statuario Marble & Hand-scraped Oak",
      kitchen: "Custom Poggenpohl with Miele & Sub-Zero Appliances",
      airConditioning: "Central VRV with Air Purification & Humidity Control"
    },
    floorPlan: {
      levels: "Level 48 (Entertainment & Dining) + Level 49 (Private Suites)",
      rooms: [
        { name: "Grand Salon & Double-Height Living Room", dim: "34' x 22'", icon: "sofa" },
        { name: "Master Presidential Suite with Sea Deck", dim: "28' x 20'", icon: "bed-double" },
        { name: "Infinity Pool Terrace & Sky Deck", dim: "45' x 16'", icon: "waves" },
        { name: "Formal Dining with Show Kitchen", dim: "22' x 18'", icon: "utensils" },
        { name: "Private Media Room & Cigar Lounge", dim: "20' x 16'", icon: "tv" },
        { name: "Private Elevator Foyer & Staff Quarters", dim: "18' x 14'", icon: "shield" }
      ],
      hotspots: [
        {
          id: "hs-1",
          title: "Cantilevered Sky Pool",
          description: "Temperature-controlled 35ft pool projecting toward the Arabian Sea horizon.",
          x: 75,
          y: 25,
          image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "hs-2",
          title: "Master Suite Sanctuary",
          description: "Expansive master chamber with his-and-her walk-in dressing suites and onyx-clad jacuzzi bath.",
          x: 30,
          y: 40,
          image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "hs-3",
          title: "Grand Double-Height Salon",
          description: "Triple-height curtain glass wall with customized automated acoustic curtains.",
          x: 50,
          y: 65,
          image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "hs-4",
          title: "Sommelier Wine Tasting Room",
          description: "Custom brass and glass EuroCave storage for 800+ rare vintages.",
          x: 20,
          y: 75,
          image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "Helipad on Rooftop", icon: "plane" },
      { name: "24/7 White Glove Concierge", icon: "bell-ring" },
      { name: "Private Temperature Pool", icon: "waves" },
      { name: "Biometric High-Speed Lifts", icon: "key-round" },
      { name: "4 Reserved Stilt Parking", icon: "car" },
      { name: "Private Wine Cellar", icon: "glass-water" },
      { name: "Technogym Private Suite", icon: "dumbbell" },
      { name: "Chauffeur & Butler Lounges", icon: "user-check" }
    ]
  },

  {
    id: "prop-dxb-01",
    title: "The Palm Oceanus Water Villa",
    tagline: "Architectural Masterpiece on Frond G Billionaires' Row",
    locationKey: "dubai",
    locationName: "Dubai",
    microLocation: "Palm Jumeirah Frond G, Dubai UAE",
    propertyType: "seafront-villas",
    propertyTypeLabel: "Signature Seafront Villa",
    priceINR: 420000000, // ₹42.0 Cr
    priceUSD: 5050000,   // $5.05M
    priceAED: 18500000,  // AED 18.5M
    priceDisplayINR: "₹42.00 Cr",
    priceDisplayUSD: "$5.05 M",
    priceDisplayAED: "AED 18.50 M",
    pricePerSqFtINR: "₹51,219 / sq.ft",
    carpetAreaSqFt: 8200,
    superBuiltUpSqFt: 10500,
    bedrooms: 6,
    bathrooms: 7,
    parkings: 4,
    facing: "Arabian Gulf / Dubai Marina Skyline (North-West)",
    status: "Brand New / Vacant on Transfer",
    reraNumber: "DLD Permit #7193829104",
    completionDate: "Ready to Move",
    isFeatured: true,
    isExclusive: true,
    goldenVisaEligible: true,
    rentalYield: "7.8% Est. Yield",
    appreciationRate: "+18.4% YoY",
    heroImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Private Beachfront", "UAE Golden Visa", "Infinity Edge Pool", "Dubai Marina Skyline", "DLD Approved"],
    description: "Occupying an ultra-prime beachfront plot on Palm Jumeirah's ultra-exclusive Frond G, this 6-bedroom architectural showpiece merges minimalist modern aesthetic with coastal serenity. Featuring direct private beach access, a 60ft infinity-edge pool spilling into the turquoise waters of the Gulf, private yacht mooring access, and automated floor-to-ceiling glass systems from Reynaers Belgium.",
    specifications: {
      carpetArea: "8,200 sq.ft (762 sq.m)",
      superBuiltUp: "10,500 sq.ft Plot Size",
      ceilingHeight: "14 ft throughout all living chambers",
      vastuCompliance: "Harmonized Feng Shui & Energy Alignment",
      smartHome: "KNX European Smart Home & Basalte Switches",
      flooring: "Greek Thassos White Marble & Teak Decking",
      kitchen: "Boffi Italy Gourmet & Prep Kitchen with Gaggenau 400 Series",
      airConditioning: "Eco-Smart District Cooling with Multi-Zone Inverters"
    },
    floorPlan: {
      levels: "Ground Floor (Beach Walkout & Living) + First Floor (Suites) + Rooftop Terrace",
      rooms: [
        { name: "Open Concept Gulf-Facing Great Room", dim: "42' x 26'", icon: "sofa" },
        { name: "Presidential Beachfront Master Suite", dim: "32' x 22'", icon: "bed-double" },
        { name: "Private Sandy Beach & Sun Deck", dim: "60' x 40'", icon: "sun" },
        { name: "Rooftop Sky Lounge with Marina Views", dim: "38' x 24'", icon: "sparkles" },
        { name: "Private Home Cinema (Dolby Atmos)", dim: "24' x 18'", icon: "film" },
        { name: "Spa & Hammam Wellness Suite", dim: "20' x 15'", icon: "heart-pulse" }
      ],
      hotspots: [
        {
          id: "hs-dxb-1",
          title: "Private White Sand Beach",
          description: "Direct frontage to calm turquoise waters with private sun loungers and jet-ski launch.",
          x: 80,
          y: 70,
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "hs-dxb-2",
          title: "60ft Overflow Infinity Pool",
          description: "Zero-edge pool with underwater sound system and submerged Baja shelf seating.",
          x: 65,
          y: 40,
          image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "hs-dxb-3",
          title: "Master Ensuite with Sea Horizon",
          description: "Custom freestanding stone bathtub overlooking the Palm fronds and calm waters.",
          x: 35,
          y: 30,
          image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "Direct Beach Access", icon: "sun" },
      { name: "UAE Golden Visa Included", icon: "award" },
      { name: "Private 60ft Infinity Pool", icon: "waves" },
      { name: "Dolby Atmos Home Cinema", icon: "film" },
      { name: "Private Wellness Hammam", icon: "sparkles" },
      { name: "Rooftop Stargazing Deck", icon: "eye" },
      { name: "4 Covered Garage Spaces", icon: "car" },
      { name: "24/7 Gated Community Security", icon: "shield-check" }
    ]
  },

  {
    id: "prop-mum-02",
    title: "Bandra Bay Horizon Villa",
    tagline: "Exclusive Seafront Haven on Pali Hill Promontory",
    locationKey: "mumbai",
    locationName: "Mumbai",
    microLocation: "Pali Hill / Bandra West, Mumbai",
    propertyType: "high-rise-condos",
    propertyTypeLabel: "Ultra-Luxury Seafront Condo",
    priceINR: 180000000, // ₹18.0 Cr
    priceUSD: 2150000,   // $2.15M
    priceAED: 7900000,   // AED 7.9M
    priceDisplayINR: "₹18.00 Cr",
    priceDisplayUSD: "$2.15 M",
    priceDisplayAED: "AED 7.90 M",
    pricePerSqFtINR: "₹42,857 / sq.ft",
    carpetAreaSqFt: 4200,
    superBuiltUpSqFt: 5600,
    bedrooms: 4,
    bathrooms: 5,
    parkings: 3,
    facing: "Arabian Sea (West & North-West)",
    status: "Ready to Move",
    reraNumber: "P51800023419 (MahaRERA)",
    completionDate: "Immediate Possession",
    isFeatured: false,
    isExclusive: true,
    goldenVisaEligible: false,
    rentalYield: "4.5% Est. Yield",
    appreciationRate: "+12.5% YoY",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Pali Hill Landmark", "Sea View", "Private Wine Cellar", "MahaRERA Verified", "Triple Height Lobby"],
    description: "Located on the quiet verdant heights of Pali Hill with sweeping panoramas of Bandra's coastline, this residence offers tranquility in the heart of Mumbai's most prestigious enclave. Crafted for discerning collectors, the home features floor-to-ceiling soundproof acoustic Schuco glass, custom Italian joinery, and access to a rooftop sky club.",
    specifications: {
      carpetArea: "4,200 sq.ft (390 sq.m)",
      superBuiltUp: "5,600 sq.ft",
      ceilingHeight: "12.5 ft clear floor-to-ceiling",
      vastuCompliance: "100% Compliant North-East Entry",
      smartHome: "Control4 Smart Lighting & Motorized Sunshades",
      flooring: "Imported Botticino Italian Marble",
      kitchen: "Valcucine Italian Designer Kitchen",
      airConditioning: "Daikin VRV Silent Air Conditioning"
    },
    floorPlan: {
      levels: "Single Floor Exclusive High-Rise Plate",
      rooms: [
        { name: "Expansive Sea-Facing Living & Verandah", dim: "30' x 20'", icon: "sofa" },
        { name: "Master Suite with Walk-in Wardrobe", dim: "24' x 18'", icon: "bed-double" },
        { name: "Junior Master Suite", dim: "20' x 16'", icon: "bed" },
        { name: "Private Library / Home Office", dim: "16' x 14'", icon: "book-open" },
        { name: "Chef's Show Kitchen & Utility", dim: "18' x 14'", icon: "utensils" }
      ],
      hotspots: [
        {
          id: "hs-mum2-1",
          title: "Bandra Sunset Verandah",
          description: "Panoramic curved balcony overlooking the Arabian Sea and heritage bungalows.",
          x: 70,
          y: 35,
          image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "hs-mum2-2",
          title: "Valcucine Gourmet Kitchen",
          description: "Ergonomic glass-faced cabinets with integrated Sub-Zero refrigeration.",
          x: 35,
          y: 60,
          image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "Rooftop Heated Lap Pool", icon: "waves" },
      { name: "Private Wine Tasting Room", icon: "glass-water" },
      { name: "3 EV-Equipped Parking Slots", icon: "car" },
      { name: "Resident's Private Cigar Lounge", icon: "sparkles" },
      { name: "Spa & Steam Chambers", icon: "heart-pulse" }
    ]
  },

  {
    id: "prop-dxb-02",
    title: "Burj Crown Sky Penthouse",
    tagline: "Direct View of Burj Khalifa & The Dubai Fountain",
    locationKey: "dubai",
    locationName: "Dubai",
    microLocation: "Downtown Dubai, UAE",
    propertyType: "penthouses",
    propertyTypeLabel: "Downtown Sky Penthouse",
    priceINR: 222000000, // ₹22.2 Cr
    priceUSD: 2670000,   // $2.67M
    priceAED: 9800000,   // AED 9.8M
    priceDisplayINR: "₹22.20 Cr",
    priceDisplayUSD: "$2.67 M",
    priceDisplayAED: "AED 9.80 M",
    pricePerSqFtINR: "₹43,529 / sq.ft",
    carpetAreaSqFt: 5100,
    superBuiltUpSqFt: 6400,
    bedrooms: 4,
    bathrooms: 5,
    parkings: 3,
    facing: "Burj Khalifa & Fountain (Full Direct View)",
    status: "Brand New Ready",
    reraNumber: "DLD Permit #8923019231",
    completionDate: "Ready to Move",
    isFeatured: true,
    isExclusive: true,
    goldenVisaEligible: true,
    rentalYield: "8.1% Est. Yield",
    appreciationRate: "+17.2% YoY",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Burj Khalifa View", "UAE Golden Visa", "Fountain Views", "Downtown Dubai", "DLD Approved"],
    description: "Located on the 56th floor of Downtown Dubai's most celebrated architectural tower, this duplex penthouse commands front-row, center-stage views of the Burj Khalifa and the Dubai Fountain. Featuring ultra-contemporary interiors curated by Milanese designers, a double-height glass terrace, and immediate direct access to Dubai Mall and the Opera District.",
    specifications: {
      carpetArea: "5,100 sq.ft (474 sq.m)",
      superBuiltUp: "6,400 sq.ft",
      ceilingHeight: "20 ft Double-Height Living Room",
      vastuCompliance: "Optimized Energy & Light Flow",
      smartHome: "Apple HomeKit & Lutron Integration",
      flooring: "Calacatta Gold Marble & Chevron Oak",
      kitchen: "Custom Poliform Kitchen with Gaggenau Appliances",
      airConditioning: "District Chilled Water with Air Filtration"
    },
    floorPlan: {
      levels: "Duplex 56th & 57th Floor",
      rooms: [
        { name: "Burj Panoramic Salon & Gallery", dim: "36' x 22'", icon: "sofa" },
        { name: "Primary Master with Fountain Deck", dim: "26' x 20'", icon: "bed-double" },
        { name: "Guest VIP Suite", dim: "20' x 16'", icon: "bed" },
        { name: "Open Sky Dining & Champagne Bar", dim: "22' x 16'", icon: "utensils" }
      ],
      hotspots: [
        {
          id: "hs-dxb2-1",
          title: "Burj Khalifa Viewing Balcony",
          description: "Nightly private fountain show and laser display from your private elevated deck.",
          x: 75,
          y: 40,
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "Golden Visa 10-Year Fast-Track", icon: "award" },
      { name: "Infinity Pool Facing Burj", icon: "waves" },
      { name: "Direct Dubai Mall VIP Access", icon: "shopping-bag" },
      { name: "Valet & 24/7 Security", icon: "shield" }
    ]
  },

  {
    id: "prop-blr-01",
    title: "Sadashivanagar Legacy Manor",
    tagline: "Bespoke Penthouse in Bangalore's Most Historic VIP Enclave",
    locationKey: "bangalore",
    locationName: "Bangalore",
    microLocation: "Sadashivanagar, Central Bangalore",
    propertyType: "penthouses",
    propertyTypeLabel: "Bespoke Luxury Penthouse",
    priceINR: 165000000, // ₹16.5 Cr
    priceUSD: 1980000,   // $1.98M
    priceAED: 7270000,   // AED 7.27M
    priceDisplayINR: "₹16.50 Cr",
    priceDisplayUSD: "$1.98 M",
    priceDisplayAED: "AED 7.27 M",
    pricePerSqFtINR: "₹30,555 / sq.ft",
    carpetAreaSqFt: 5400,
    superBuiltUpSqFt: 7100,
    bedrooms: 4,
    bathrooms: 5,
    parkings: 3,
    facing: "Lush Canopy / Sankey Tank (North-East)",
    status: "Ready to Move",
    reraNumber: "PRM/KA/RERA/1251/309/PR/180507/001642",
    completionDate: "Ready to Move",
    isFeatured: true,
    isExclusive: false,
    goldenVisaEligible: false,
    rentalYield: "4.9% Est. Yield",
    appreciationRate: "+15.6% YoY",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Sadashivanagar Elite", "Private Heated Pool", "Canopy View", "RERA Approved", "High-Tech Smart Home"],
    description: "Nestled amidst the old-world royal trees of Sadashivanagar, home to Karnataka's foremost industrial and political dynasties, this bespoke penthouse combines classical grandeur with Silicon Valley technological sophistication. Features a private heated rooftop plunge pool, customized solar-hybrid power backup, and acoustic-shielded smart workspace.",
    specifications: {
      carpetArea: "5,400 sq.ft (501 sq.m)",
      superBuiltUp: "7,100 sq.ft",
      ceilingHeight: "13 ft throughout",
      vastuCompliance: "100% Traditional Vastu Certified",
      smartHome: "Full Savant Home Automation & Voice Hubs",
      flooring: "Armani Grey Italian Marble & Solid Burmese Teak",
      kitchen: "Bulthaup b3 Kitchen with Miele Induction & Wok Burner",
      airConditioning: "Toshiba VRF Inverter with Fresh-Air Intakes"
    },
    floorPlan: {
      levels: "Penthouse Level with Rooftop Private Deck",
      rooms: [
        { name: "Grand Living Pavilion", dim: "32' x 20'", icon: "sofa" },
        { name: "Master Suite with Green Canopy Balcony", dim: "26' x 18'", icon: "bed-double" },
        { name: "Private Heated Lap Pool Deck", dim: "35' x 15'", icon: "waves" },
        { name: "Dedicated Tech Executive Studio / Library", dim: "18' x 14'", icon: "laptop" }
      ],
      hotspots: [
        {
          id: "hs-blr-1",
          title: "Rooftop Garden & Heated Pool",
          description: "Private oasis with temperature-controlled pool overlooking century-old Gulmohar canopies.",
          x: 70,
          y: 30,
          image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "Private Heated Pool", icon: "waves" },
      { name: "Savant Smart Home OS", icon: "cpu" },
      { name: "3 EV Fast Chargers", icon: "zap" },
      { name: "Concierge & Private Butler Call", icon: "bell-ring" }
    ]
  },

  {
    id: "prop-blr-02",
    title: "Indiranagar Quadrangle Villa",
    tagline: "Contemporary Zen Sanctuary in the Heart of Indiranagar",
    locationKey: "bangalore",
    locationName: "Bangalore",
    microLocation: "100ft Road Prime, Indiranagar, Bangalore",
    propertyType: "seafront-villas",
    propertyTypeLabel: "Zen Urban Villa",
    priceINR: 125000000, // ₹12.5 Cr
    priceUSD: 1500000,   // $1.50M
    priceAED: 5500000,   // AED 5.50M
    priceDisplayINR: "₹12.50 Cr",
    priceDisplayUSD: "$1.50 M",
    priceDisplayAED: "AED 5.50 M",
    pricePerSqFtINR: "₹27,173 / sq.ft",
    carpetAreaSqFt: 4600,
    superBuiltUpSqFt: 5800,
    bedrooms: 4,
    bathrooms: 5,
    parkings: 3,
    facing: "East (Vastu Compliant)",
    status: "Ready to Move",
    reraNumber: "PRM/KA/RERA/1251/310/PR/190822/002811",
    completionDate: "Ready to Move",
    isFeatured: false,
    isExclusive: true,
    goldenVisaEligible: false,
    rentalYield: "5.2% Est. Yield",
    appreciationRate: "+13.9% YoY",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Indiranagar Prime", "Zen Courtyard", "Koi Pond", "Poliform Kitchen", "RERA Verified"],
    description: "An urban masterpiece concealed behind lush bamboo screens in prime Indiranagar. Features an inward-looking open quadrangle courtyard with Japanese Koi pond, dramatic double-height glass architecture, Italian Poliform cabinetry, and a private rooftop wellness studio.",
    specifications: {
      carpetArea: "4,600 sq.ft (427 sq.m)",
      superBuiltUp: "5,800 sq.ft",
      ceilingHeight: "22 ft Double-Height Living / 11 ft Suites",
      vastuCompliance: "100% East Facing Main Entrance",
      smartHome: "Google Home & Schneider Wiser Automation",
      flooring: "Monolithic Micro-cement & Natural Teak",
      kitchen: "Poliform Varenna with Gaggenau Induction",
      airConditioning: "Mitsubishi Electric Inverter Split Units"
    },
    floorPlan: {
      levels: "Ground + 2 Floors + Rooftop Zen Deck",
      rooms: [
        { name: "Double-Height Courtyard Living", dim: "30' x 20'", icon: "sofa" },
        { name: "Zen Water Courtyard & Koi Pond", dim: "20' x 16'", icon: "waves" },
        { name: "Master Chamber with Open Sky Bath", dim: "24' x 18'", icon: "bed-double" }
      ],
      hotspots: [
        {
          id: "hs-blr2-1",
          title: "Central Japanese Koi Courtyard",
          description: "Double-height open sky atrium with waterfall cascading into private koi pond.",
          x: 50,
          y: 50,
          image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "Private Zen Koi Pond", icon: "sparkles" },
      { name: "Rooftop Yoga Pavilion", icon: "sun" },
      { name: "3 EV Car Garages", icon: "car" }
    ]
  },

  {
    id: "prop-goa-01",
    title: "Villa Seraphina Oceanfront",
    tagline: "Spectacular Cliffside Heritage-Modern Sanctuary",
    locationKey: "goa",
    locationName: "Goa",
    microLocation: "Anjuna Cliffside, North Goa",
    propertyType: "seafront-villas",
    propertyTypeLabel: "Cliffside Oceanfront Estate",
    priceINR: 140000000, // ₹14.0 Cr
    priceUSD: 1680000,   // $1.68M
    priceAED: 6170000,   // AED 6.17M
    priceDisplayINR: "₹14.00 Cr",
    priceDisplayUSD: "$1.68 M",
    priceDisplayAED: "AED 6.17 M",
    pricePerSqFtINR: "₹22,580 / sq.ft",
    carpetAreaSqFt: 6200,
    superBuiltUpSqFt: 12000,
    bedrooms: 5,
    bathrooms: 6,
    parkings: 4,
    facing: "Arabian Sea Sunset (180° West)",
    status: "Ready to Move / Fully Furnished",
    reraNumber: "RERA-GOA-2022-0941",
    completionDate: "Ready to Move",
    isFeatured: true,
    isExclusive: true,
    goldenVisaEligible: false,
    rentalYield: "9.4% Est. Holiday Rental Yield",
    appreciationRate: "+21.0% YoY",
    heroImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["180° Sunset Sea View", "Cliffside Pool", "High Holiday Yield (9.4%)", "Fully Furnished", "RERA Goa"],
    description: "Perched dramatically on the cliff edge of Anjuna with uninhibited 180-degree sunset ocean views, Villa Seraphina represents the gold standard of luxury coastal living in Goa. Harmonizing Indo-Portuguese heritage architecture with ultra-modern glass pavilions, the estate features a 50ft cliff-edge infinity pool, private access pathway to a secluded cove, and an exceptional annual holiday rental yield of 9.4%.",
    specifications: {
      carpetArea: "6,200 sq.ft (576 sq.m)",
      superBuiltUp: "12,000 sq.ft Landscaped Plot",
      ceilingHeight: "18 ft High Pitched Portuguese Timber Ceilings",
      vastuCompliance: "Optimized Coastal Orientation",
      smartHome: "Full Remote iOS & Android Villa Automation",
      flooring: "Custom Handcrafted Portuguese Tiles & Terrazzo",
      kitchen: "Open Chef's Show Kitchen with Spanish Outdoor BBQ",
      airConditioning: "Daikin Inverter ACs throughout all suites"
    },
    floorPlan: {
      levels: "Main Manor Pavilion + Guest Cottages + Cliff Sunset Deck",
      rooms: [
        { name: "Grand Ocean-Facing Sala Living", dim: "36' x 24'", icon: "sofa" },
        { name: "Master Seafront Suite with Private Balcao", dim: "28' x 20'", icon: "bed-double" },
        { name: "Cliff-Edge 50ft Infinity Pool Deck", dim: "60' x 25'", icon: "waves" },
        { name: "Alfresco Barbecue & Sunken Fire Pit", dim: "30' x 20'", icon: "flame" }
      ],
      hotspots: [
        {
          id: "hs-goa-1",
          title: "50ft Cliff-Edge Infinity Pool",
          description: "Overhanging the Arabian Sea waves with seamless glass perimeter and underwater LED illumination.",
          x: 75,
          y: 45,
          image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "hs-goa-2",
          title: "Sunset Cocktail Pergola",
          description: "Handcrafted timber pavilion for unforgettable sunset hosting with built-in cocktail bar.",
          x: 30,
          y: 65,
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "50ft Cliffside Infinity Pool", icon: "waves" },
      { name: "Private Cove Beach Access", icon: "sun" },
      { name: "100% Solar & Generator Backup", icon: "zap" },
      { name: "Turnkey Property Management", icon: "check-check" },
      { name: "Staff Quarters & Driver Dorm", icon: "users" }
    ]
  },

  {
    id: "prop-goa-02",
    title: "The Assagao Palm Sanctum",
    tagline: "Eco-Luxury Designer Forest Villa in Goa's Most Fashionable Enclave",
    locationKey: "goa",
    locationName: "Goa",
    microLocation: "Assagao Valley, North Goa",
    propertyType: "seafront-villas",
    propertyTypeLabel: "Designer Forest Villa",
    priceINR: 98000000, // ₹9.8 Cr
    priceUSD: 1180000,  // $1.18M
    priceAED: 4320000,  // AED 4.32M
    priceDisplayINR: "₹9.80 Cr",
    priceDisplayUSD: "$1.18 M",
    priceDisplayAED: "AED 4.32 M",
    pricePerSqFtINR: "₹20,416 / sq.ft",
    carpetAreaSqFt: 4800,
    superBuiltUpSqFt: 8500,
    bedrooms: 4,
    bathrooms: 5,
    parkings: 3,
    facing: "Valley Forest Canopy (East)",
    status: "Ready to Move",
    reraNumber: "RERA-GOA-2023-1102",
    completionDate: "Ready to Move",
    isFeatured: false,
    isExclusive: false,
    goldenVisaEligible: false,
    rentalYield: "8.8% Est. Holiday Rental Yield",
    appreciationRate: "+19.2% YoY",
    heroImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Assagao Valley", "Private Lap Pool", "Forest Canopy", "Designer Furnished", "High Rental Yield"],
    description: "Tucked inside the serene green hills of Assagao (Goa's Beverly Hills), within walking distance to world-class Michelin-calibre restaurants and art galleries. Designed by an acclaimed architectural studio, this tropical villa features exposed laterite stone walls, floor-to-ceiling glass pavilions, a private black granite lap pool, and a rooftop cocktail lounge.",
    specifications: {
      carpetArea: "4,800 sq.ft (445 sq.m)",
      superBuiltUp: "8,500 sq.ft Plot",
      ceilingHeight: "15 ft Timber Rafter Ceilings",
      vastuCompliance: "100% Vastu Harmonized",
      smartHome: "Lutron Lighting & Sonos Multi-Room Sound",
      flooring: "Polished Kota Stone & Handcrafted Tiles",
      kitchen: "Custom Teak & Quartz Gourmet Kitchen",
      airConditioning: "Daikin VRV Climate Control"
    },
    floorPlan: {
      levels: "Ground Floor + First Floor + Rooftop Teak Lounge",
      rooms: [
        { name: "Forest Living Pavilion with Glass Walls", dim: "30' x 20'", icon: "sofa" },
        { name: "Master Suite with Outdoor Rain Shower", dim: "24' x 18'", icon: "bed-double" },
        { name: "Black Granite Lap Pool & Sunken Bar", dim: "40' x 16'", icon: "waves" }
      ],
      hotspots: [
        {
          id: "hs-goa2-1",
          title: "Black Granite Forest Pool",
          description: "Shaded by mature coconut palms and teak trees with submerged cocktail bar seating.",
          x: 65,
          y: 40,
          image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "Black Granite Lap Pool", icon: "waves" },
      { name: "Sonos Multi-Room Audio", icon: "volume-2" },
      { name: "Outdoor Rain Showers", icon: "cloud-rain" },
      { name: "Organic Kitchen Garden", icon: "flower-2" }
    ]
  },

  {
    id: "prop-dxb-03",
    title: "Emirates Hills Golf Estate",
    tagline: "Palatial Golf-Front Mansion in Dubai's Most Prestigious Gated Haven",
    locationKey: "dubai",
    locationName: "Dubai",
    microLocation: "Sector E, Emirates Hills, Dubai UAE",
    propertyType: "seafront-villas",
    propertyTypeLabel: "Signature Golf Palace",
    priceINR: 345000000, // ₹34.5 Cr
    priceUSD: 4140000,   // $4.14M
    priceAED: 15200000,  // AED 15.2M
    priceDisplayINR: "₹34.50 Cr",
    priceDisplayUSD: "$4.14 M",
    priceDisplayAED: "AED 15.20 M",
    pricePerSqFtINR: "₹44,230 / sq.ft",
    carpetAreaSqFt: 7800,
    superBuiltUpSqFt: 11200,
    bedrooms: 5,
    bathrooms: 6,
    parkings: 4,
    facing: "Montgomerie Golf Course & Lake (South-East)",
    status: "Ready to Move",
    reraNumber: "DLD Permit #4928103982",
    completionDate: "Ready to Move",
    isFeatured: false,
    isExclusive: true,
    goldenVisaEligible: true,
    rentalYield: "6.9% Est. Yield",
    appreciationRate: "+15.8% YoY",
    heroImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Emirates Hills", "Golf Course Frontage", "UAE Golden Visa", "Private Spa & Cinema", "DLD Approved"],
    description: "Set in Dubai's premier residential district of Emirates Hills, this neoclassical palace overlooks the fairways and lakes of the Montgomerie Golf Course. Featuring high-grade Spanish Crema Marfil marble, a private temperature-controlled wine room, a 12-seat Dolby Atmos cinema, and expansive manicured gardens.",
    specifications: {
      carpetArea: "7,800 sq.ft (724 sq.m)",
      superBuiltUp: "11,200 sq.ft Plot",
      ceilingHeight: "16 ft Ground Salon / 12 ft Suites",
      vastuCompliance: "Energy & Orientation Certified",
      smartHome: "Crestron Smart Automation & Biometric Locks",
      flooring: "Spanish Crema Marfil & Parquet",
      kitchen: "Custom Siematic Kitchen with Miele MasterCool",
      airConditioning: "Opal Central District Cooling"
    },
    floorPlan: {
      levels: "Ground Floor + First Floor + Private Spa Suite",
      rooms: [
        { name: "Grand Foyer & Golf-Front Living Room", dim: "38' x 24'", icon: "sofa" },
        { name: "Presidential Master Suite with Lake Terrace", dim: "30' x 20'", icon: "bed-double" },
        { name: "12-Seat Dolby Atmos Cinema Room", dim: "24' x 18'", icon: "film" }
      ],
      hotspots: [
        {
          id: "hs-dxb3-1",
          title: "Montgomerie Golf Terrace",
          description: "Private landscaped terrace extending directly towards the 18th hole fairway.",
          x: 70,
          y: 40,
          image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "Direct Golf Course Views", icon: "sparkles" },
      { name: "10-Year UAE Golden Visa", icon: "award" },
      { name: "12-Seat Private Cinema", icon: "film" },
      { name: "Private Heated Lap Pool", icon: "waves" },
      { name: "Private Steam & Sauna", icon: "heart-pulse" }
    ]
  },

  {
    id: "prop-mum-03",
    title: "Altamount Reserve Sky Mansion",
    tagline: "Billionaires' Row Masterpiece with Arabian Sea Panoramas",
    locationKey: "mumbai",
    locationName: "Mumbai",
    microLocation: "Altamount Road, South Mumbai",
    propertyType: "high-rise-condos",
    propertyTypeLabel: "Sky Mansion",
    priceINR: 320000000, // ₹32.0 Cr
    priceUSD: 3850000,   // $3.85M
    priceAED: 14100000,  // AED 14.1M
    priceDisplayINR: "₹32.00 Cr",
    priceDisplayUSD: "$3.85 M",
    priceDisplayAED: "AED 14.10 M",
    pricePerSqFtINR: "₹42,666 / sq.ft",
    carpetAreaSqFt: 7500,
    superBuiltUpSqFt: 9800,
    bedrooms: 5,
    bathrooms: 6,
    parkings: 5,
    facing: "Arabian Sea & City Skyline (360° Panoramic)",
    status: "Ready to Move",
    reraNumber: "P51900001844 (MahaRERA)",
    completionDate: "Ready to Move",
    isFeatured: true,
    isExclusive: true,
    goldenVisaEligible: false,
    rentalYield: "3.9% Est. Yield",
    appreciationRate: "+16.1% YoY",
    heroImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Billionaires' Boulevard", "Private Sky Deck", "MahaRERA Verified", "Biometric Elevator", "5 Car Parks"],
    description: "Located on Altamount Road, frequently ranked among the world's top ten most expensive residential streets. This full-floor Sky Mansion offers an expansive 7,500 sq.ft of pure luxury with private elevator access directly into your foyer, 360-degree unobstructed vistas of South Mumbai and the Arabian Sea, and world-class concierge service.",
    specifications: {
      carpetArea: "7,500 sq.ft (697 sq.m)",
      superBuiltUp: "9,800 sq.ft",
      ceilingHeight: "14 ft throughout all rooms",
      vastuCompliance: "100% Vastu Gold Certified",
      smartHome: "Lutron Homeworks QS & Crestron System",
      flooring: "Bookmatched Italian Statuario Marble",
      kitchen: "Bespoke Boffi Kitchen with Sub-Zero Refrigerator",
      airConditioning: "Mitsubishi Electric VRF with Medical Grade HEPA"
    },
    floorPlan: {
      levels: "Full Floor Private Plate",
      rooms: [
        { name: "360-Degree Grand Living & Dining Salon", dim: "45' x 28'", icon: "sofa" },
        { name: "Royal Master Chamber with Sky Verandah", dim: "30' x 22'", icon: "bed-double" },
        { name: "Private Wine Tasting & Cigar Room", dim: "20' x 16'", icon: "glass-water" }
      ],
      hotspots: [
        {
          id: "hs-mum3-1",
          title: "Altamount Sunset Panorama",
          description: "Full glass floor-to-ceiling perimeter framing Mumbai harbor and Arabian sunset.",
          x: 80,
          y: 35,
          image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    amenities: [
      { name: "5 Reserved Basements", icon: "car" },
      { name: "Private Biometric Lifts", icon: "key-round" },
      { name: "Quintessentially Concierge", icon: "bell-ring" },
      { name: "Rooftop Heated Infinity Pool", icon: "waves" },
      { name: "Private Temperature Cellar", icon: "glass-water" }
    ]
  }
];

// Market Yields & Insights Data
const MARKET_INSIGHTS = {
  mumbai: {
    city: "Mumbai",
    currency: "INR",
    avgPriceSqFt: "₹45,000 - ₹95,000",
    rentalYield: "3.8% – 4.8%",
    capitalAppreciation: "14.2% YoY",
    hotspots: ["Worli", "Bandra West", "Altamount Road", "Lower Parel"],
    taxRate: "6% Stamp Duty (Maharashtra) + 1% Metro Cess",
    highlights: "Prime wealth destination, strong capital preservation, high rental absorption from MNC executives and family offices."
  },
  dubai: {
    city: "Dubai",
    currency: "AED / USD",
    avgPriceSqFt: "AED 2,200 - AED 5,800",
    rentalYield: "6.8% – 8.5%",
    capitalAppreciation: "17.4% YoY",
    hotspots: ["Palm Jumeirah", "Downtown Dubai", "Emirates Hills", "Dubai Hills"],
    taxRate: "0% Income Tax & Capital Gains, 4% DLD Transfer Fee",
    highlights: "10-Year Golden Visa on properties over AED 2M (₹4.5 Cr), zero capital gains tax, global safe-haven capital inflow."
  },
  bangalore: {
    city: "Bangalore",
    currency: "INR",
    avgPriceSqFt: "₹18,000 - ₹36,000",
    rentalYield: "4.5% – 5.4%",
    capitalAppreciation: "15.0% YoY",
    hotspots: ["Sadashivanagar", "Indiranagar", "Lavelle Road", "Koramangala"],
    taxRate: "5.6% Stamp Duty & Registration",
    highlights: "Tech billionaire wealth hub, thriving startup founders liquidity, massive green enclave penthouses."
  },
  goa: {
    city: "Goa",
    currency: "INR",
    avgPriceSqFt: "₹18,000 - ₹32,000",
    rentalYield: "8.5% – 10.5% (Holiday Villa Rental)",
    capitalAppreciation: "20.5% YoY",
    hotspots: ["Anjuna", "Assagao", "Siolim", "Candolim"],
    taxRate: "5.0% Stamp Duty & Registration",
    highlights: "Highest holiday rental yield in India, explosive luxury lifestyle migration from Mumbai/Delhi HNIs."
  }
};

// Global Currency Settings
const CURRENCY_CONFIG = {
  INR: { symbol: "₹", factor: 1, label: "INR (₹)", format: (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString("en-IN")}`;
  }},
  USD: { symbol: "$", factor: 0.012, label: "USD ($)", format: (val) => {
    const usd = val * 0.012;
    if (usd >= 1000000) return `$${(usd / 1000000).toFixed(2)} M`;
    return `$${Math.round(usd).toLocaleString("en-US")}`;
  }},
  AED: { symbol: "AED ", factor: 0.044, label: "AED (د.إ)", format: (val) => {
    const aed = val * 0.044;
    if (aed >= 1000000) return `AED ${(aed / 1000000).toFixed(2)} M`;
    return `AED ${Math.round(aed).toLocaleString("en-US")}`;
  }}
};
