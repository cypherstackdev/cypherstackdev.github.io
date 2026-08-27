/**
 * diner-flow - Menu Data & Restaurant Configuration
 * The Amber Roast & Kitchen - Artisanal Bistro & Wood-Fired Pizzeria
 */

const RESTAURANT_CONFIG = {
  name: "The Amber Roast & Kitchen",
  shortName: "Amber Roast",
  tagline: "Artisanal Wood-Fired Pizza • Craft Burgers • Specialty Brews",
  address: "Plot 42, 100ft Road, Indiranagar, Bengaluru, Karnataka 560038",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210", // International format without +
  upiId: "amberroast@okhdfcbank",
  upiPayeeName: "The Amber Roast Kitchen",
  currency: "₹",
  gstRate: 0.05, // 5% GST (standard Indian restaurant tax)
  packingFeeTakeaway: 30, // ₹30 for packaging
  deliveryFee: 40,
  freeDeliveryThreshold: 500,
  tablesCount: 20,
  coupons: [
    { code: "FIRSTORDER", discountType: "percent", value: 15, maxDiscount: 150, minOrder: 300, desc: "15% OFF up to ₹150 on your first order" },
    { code: "AMBER50", discountType: "flat", value: 50, minOrder: 399, desc: "Flat ₹50 OFF on orders above ₹399" },
    { code: "PIZZAFEST", discountType: "percent", value: 20, maxDiscount: 200, minOrder: 599, desc: "20% OFF up to ₹200 on Wood-Fired Pizzas" }
  ]
};

const MENU_CATEGORIES = [
  { id: "all", name: "All Dishes", icon: "utensils", badge: "All" },
  { id: "appetizers", name: "Appetizers & Starters", icon: "sparkles", badge: "Starters" },
  { id: "pizza", name: "Wood-Fired Pizza", icon: "flame", badge: "Signature" },
  { id: "burgers", name: "Craft Burgers", icon: "sandwich", badge: "Gourmet" },
  { id: "beverages", name: "Gourmet Beverages", icon: "coffee", badge: "Brews & Coolers" },
  { id: "desserts", name: "Artisan Desserts", icon: "cake-slice", badge: "Sweet Endings" }
];

const MENU_ITEMS = [
  // APPETIZERS
  {
    id: "app-1",
    name: "Truffle Parmesan Hand-Cut Fries",
    category: "appetizers",
    categoryName: "Appetizers & Starters",
    price: 260,
    veg: true,
    spiceLevel: 0,
    bestseller: true,
    chefSpecial: false,
    rating: 4.9,
    votes: 342,
    prepTime: "10-12 mins",
    calories: "380 kcal",
    description: "Crispy double-cooked russet potatoes tossed with pure black truffle oil, aged Grana Padano, fresh rosemary & served with garlic aioli.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Dip Selection",
        type: "radio",
        options: [
          { label: "Smoked Garlic Aioli (Included)", price: 0 },
          { label: "Spicy Sriracha Mayo", price: 20 },
          { label: "Truffle Dip Trio (+3 dips)", price: 60 }
        ]
      },
      {
        name: "Extra Cheese",
        type: "checkbox",
        options: [
          { label: "Extra Shaved Grana Padano", price: 50 },
          { label: "Melted Cheddar Cheese Sauce", price: 60 }
        ]
      }
    ]
  },
  {
    id: "app-2",
    name: "Peri-Peri Smoked Chicken Wings (6 pcs)",
    category: "appetizers",
    categoryName: "Appetizers & Starters",
    price: 340,
    veg: false,
    spiceLevel: 2,
    bestseller: true,
    chefSpecial: true,
    rating: 4.8,
    votes: 289,
    prepTime: "15 mins",
    calories: "520 kcal",
    description: "Tender chicken wings glazed in our house-crafted flame-grilled African bird's eye peri-peri glaze, served with cool herb dip & lemon wedge.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Spice Level",
        type: "radio",
        options: [
          { label: "Mild Peri-Peri", price: 0 },
          { label: "Fiery African Flame (Spicy)", price: 0 },
          { label: "Ghost Pepper Reaper (Extreme)", price: 25 }
        ]
      }
    ]
  },
  {
    id: "app-3",
    name: "Burrata Caprese Bruschetta",
    category: "appetizers",
    categoryName: "Appetizers & Starters",
    price: 320,
    veg: true,
    spiceLevel: 0,
    bestseller: false,
    chefSpecial: true,
    rating: 4.9,
    votes: 180,
    prepTime: "10 mins",
    calories: "340 kcal",
    description: "Toasted sourdough loaf topped with creamy artisan Burrata, heirloom cherry tomatoes, cold-pressed olive oil, basil pesto & aged balsamic drizzle.",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Add-ons",
        type: "checkbox",
        options: [
          { label: "Extra Whole Burrata Cheese Ball (100g)", price: 140 },
          { label: "Caramelized Balsamic Fig Glaze", price: 40 }
        ]
      }
    ]
  },
  {
    id: "app-4",
    name: "Crispy Paneer Popcorn with Dip",
    category: "appetizers",
    categoryName: "Appetizers & Starters",
    price: 280,
    veg: true,
    spiceLevel: 1,
    bestseller: true,
    chefSpecial: false,
    rating: 4.7,
    votes: 215,
    prepTime: "12 mins",
    calories: "410 kcal",
    description: "Bite-sized cubes of Malai Paneer breaded with panko & gunpowder spices, flash-fried to golden perfection. Served with tangy mint chutney & tandoori mayo.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Spice Dust",
        type: "radio",
        options: [
          { label: "Gunpowder Masala", price: 0 },
          { label: "Cheesy Sour Cream Dust", price: 20 },
          { label: "Habanero Chili Dust", price: 20 }
        ]
      }
    ]
  },

  // WOOD-FIRED PIZZA
  {
    id: "piz-1",
    name: "Smoked Truffle & Wild Mushroom Pizza (11\")",
    category: "pizza",
    categoryName: "Wood-Fired Pizza",
    price: 520,
    veg: true,
    spiceLevel: 0,
    bestseller: true,
    chefSpecial: true,
    rating: 5.0,
    votes: 412,
    prepTime: "16-18 mins",
    calories: "780 kcal",
    description: "48-hr slow fermented Neapolitan dough with roasted portobello, button mushrooms, Fior di Latte mozzarella, mascarpone base, thyme & black truffle essence.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Crust Type",
        type: "radio",
        options: [
          { label: "Classic Neapolitan Hand-Stretched", price: 0 },
          { label: "Garlic Butter Herb Crust", price: 40 },
          { label: "Cheese Stuffed Crust (Mozzarella)", price: 90 }
        ]
      },
      {
        name: "Extra Toppings",
        type: "checkbox",
        options: [
          { label: "Extra Fior di Latte Mozzarella", price: 70 },
          { label: "Caramelized Garlic Confit", price: 40 },
          { label: "Jalapeño & Pickled Chilies", price: 30 }
        ]
      }
    ]
  },
  {
    id: "piz-2",
    name: "Fiery Tandoori Paneer Tikka Pizza (11\")",
    category: "pizza",
    categoryName: "Wood-Fired Pizza",
    price: 480,
    veg: true,
    spiceLevel: 2,
    bestseller: true,
    chefSpecial: false,
    rating: 4.8,
    votes: 388,
    prepTime: "15-18 mins",
    calories: "820 kcal",
    description: "San Marzano tomato sauce, clay-oven smoked cottage cheese, charred bell peppers, red onions, pickled green chilies, fresh coriander & mint yogurt drizzle.",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Crust Style",
        type: "radio",
        options: [
          { label: "Classic Neapolitan Dough", price: 0 },
          { label: "Thin & Crispy Roman Base", price: 0 },
          { label: "Cheese Stuffed Crust", price: 90 }
        ]
      },
      {
        name: "Spice Boost",
        type: "radio",
        options: [
          { label: "Standard Tandoori Kick", price: 0 },
          { label: "Extra Spicy Kolhapuri Twist", price: 20 }
        ]
      }
    ]
  },
  {
    id: "piz-3",
    name: "Classic Pepperoni & Spicy Chorizo Pizza (11\")",
    category: "pizza",
    categoryName: "Wood-Fired Pizza",
    price: 590,
    veg: false,
    spiceLevel: 2,
    bestseller: true,
    chefSpecial: false,
    rating: 4.9,
    votes: 360,
    prepTime: "16 mins",
    calories: "890 kcal",
    description: "Smoked pork pepperoni cups, spicy chicken chorizo, crushed San Marzano tomatoes, fresh mozzarella, hot honey drizzle & chili flakes.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Crust Style",
        type: "radio",
        options: [
          { label: "Classic Neapolitan Dough", price: 0 },
          { label: "Cheese Stuffed Crust", price: 90 }
        ]
      },
      {
        name: "Drizzle Finish",
        type: "radio",
        options: [
          { label: "Hot Honey Drizzle (Sweet & Spicy)", price: 0 },
          { label: "Extra Virgin Olive Oil & Oregano", price: 0 }
        ]
      }
    ]
  },
  {
    id: "piz-4",
    name: "Smoked Butter Chicken & Burrata Pizza (11\")",
    category: "pizza",
    categoryName: "Wood-Fired Pizza",
    price: 560,
    veg: false,
    spiceLevel: 1,
    bestseller: true,
    chefSpecial: true,
    rating: 4.9,
    votes: 420,
    prepTime: "18 mins",
    calories: "910 kcal",
    description: "Makhani sauce base, tandoor roasted chicken tikka cubes, melted mozzarella, dollops of fresh Italian Burrata, fenugreek leaves & fresh ginger juliennes.",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Crust Style",
        type: "radio",
        options: [
          { label: "Classic Neapolitan Dough", price: 0 },
          { label: "Cheese Stuffed Crust", price: 90 }
        ]
      }
    ]
  },

  // CRAFT BURGERS
  {
    id: "brg-1",
    name: "The Double Smash Tenderloin Burger",
    category: "burgers",
    categoryName: "Craft Burgers",
    price: 490,
    veg: false,
    spiceLevel: 1,
    bestseller: true,
    chefSpecial: true,
    rating: 4.9,
    votes: 310,
    prepTime: "14 mins",
    calories: "740 kcal",
    description: "Twin smashed prime buffalo patties with crispy seared edges, double yellow cheddar, caramelized balsamic onions, house secret sauce on a toasted brioche bun. Served with potato crisps.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Side Option",
        type: "radio",
        options: [
          { label: "House Seasoned Crisps (Included)", price: 0 },
          { label: "Upgrade to Truffle Parmesan Fries", price: 99 },
          { label: "Upgrade to Cheesy Onion Rings", price: 89 }
        ]
      },
      {
        name: "Add-ons",
        type: "checkbox",
        options: [
          { label: "Extra Crispy Bacon Strips (2 pcs)", price: 80 },
          { label: "Fried Sunny-Side Egg", price: 40 },
          { label: "Extra Melted Cheddar Slice", price: 40 }
        ]
      }
    ]
  },
  {
    id: "brg-2",
    name: "Crispy Nashville Hot Fried Chicken Burger",
    category: "burgers",
    categoryName: "Craft Burgers",
    price: 420,
    veg: false,
    spiceLevel: 3,
    bestseller: true,
    chefSpecial: false,
    rating: 4.8,
    votes: 295,
    prepTime: "15 mins",
    calories: "680 kcal",
    description: "24-hr buttermilk marinated chicken thigh dipped in fiery cayenne oil spice blend, crunchy purple slaw, dill pickle chips & creamy ranch on butter-glazed brioche.",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Heat Level",
        type: "radio",
        options: [
          { label: "Nashville Medium Spice", price: 0 },
          { label: "Nashville Extreme Fire 🔥🔥", price: 0 }
        ]
      },
      {
        name: "Side Option",
        type: "radio",
        options: [
          { label: "House Potato Crisps (Included)", price: 0 },
          { label: "Upgrade to Truffle Fries", price: 99 }
        ]
      }
    ]
  },
  {
    id: "brg-3",
    name: "Truffle Portobello & Gouda Melt (Veg)",
    category: "burgers",
    categoryName: "Craft Burgers",
    price: 390,
    veg: true,
    spiceLevel: 0,
    bestseller: false,
    chefSpecial: true,
    rating: 4.7,
    votes: 185,
    prepTime: "12 mins",
    calories: "590 kcal",
    description: "Panko crusted jumbo portobello mushroom cap stuffed with smoked gouda & herb cream cheese, arugula, tomato jam & truffle aioli in artisan bun.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Side Option",
        type: "radio",
        options: [
          { label: "House Potato Crisps (Included)", price: 0 },
          { label: "Upgrade to Truffle Fries", price: 99 }
        ]
      }
    ]
  },
  {
    id: "brg-4",
    name: "Crispy Peri-Peri Paneer & Jalapeño Burger",
    category: "burgers",
    categoryName: "Craft Burgers",
    price: 360,
    veg: true,
    spiceLevel: 2,
    bestseller: true,
    chefSpecial: false,
    rating: 4.8,
    votes: 240,
    prepTime: "12 mins",
    calories: "620 kcal",
    description: "Crunchy peri-peri crusted cottage cheese steak, smoked chipotle sauce, pickled jalapeños, crisp iceberg lettuce & cheese slice on brioche.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Side Option",
        type: "radio",
        options: [
          { label: "House Potato Crisps (Included)", price: 0 },
          { label: "Upgrade to Peri Peri Fries", price: 79 }
        ]
      }
    ]
  },

  // GOURMET BEVERAGES
  {
    id: "bev-1",
    name: "Cold Brew Tonic with Valencia Orange",
    category: "beverages",
    categoryName: "Gourmet Beverages",
    price: 240,
    veg: true,
    spiceLevel: 0,
    bestseller: true,
    chefSpecial: true,
    rating: 4.9,
    votes: 210,
    prepTime: "5 mins",
    calories: "45 kcal",
    description: "18-hr steeped single-origin Arabica cold brew poured over artisanal craft tonic water, dehydrated orange slice & a touch of rosemary smoke.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Sweetness",
        type: "radio",
        options: [
          { label: "No Added Sugar (Pure & Crisp)", price: 0 },
          { label: "Mild Vanilla Agave Infusion", price: 20 }
        ]
      }
    ]
  },
  {
    id: "bev-2",
    name: "Spanish Iced Latte with Condensed Milk",
    category: "beverages",
    categoryName: "Gourmet Beverages",
    price: 260,
    veg: true,
    spiceLevel: 0,
    bestseller: true,
    chefSpecial: false,
    rating: 4.9,
    votes: 395,
    prepTime: "5 mins",
    calories: "220 kcal",
    description: "Double shot of rich dark espresso layered over creamy dulce de leche condensed milk base, chilled whole milk and crystal clear ice rocks.",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Milk Choice",
        type: "radio",
        options: [
          { label: "Farm Fresh Whole Milk", price: 0 },
          { label: "Oat Milk (Oatly Creamy)", price: 50 },
          { label: "Almond Milk", price: 40 }
        ]
      },
      {
        name: "Espresso Shot",
        type: "radio",
        options: [
          { label: "Standard Double Shot", price: 0 },
          { label: "Triple Shot Extra Strong (+1 shot)", price: 40 }
        ]
      }
    ]
  },
  {
    id: "bev-3",
    name: "Taiwanese Brown Sugar Boba Milk Tea",
    category: "beverages",
    categoryName: "Gourmet Beverages",
    price: 280,
    veg: true,
    spiceLevel: 0,
    bestseller: true,
    chefSpecial: false,
    rating: 4.8,
    votes: 310,
    prepTime: "6 mins",
    calories: "320 kcal",
    description: "Warm caramelized Okinawa brown sugar pearls, slow-brewed Assam black tea, silky organic milk & tiger stripe caramel wall.",
    image: "https://images.unsplash.com/photo-1558857563-b37cfb8cb465?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Sweetness Level",
        type: "radio",
        options: [
          { label: "Standard 100% Sweet", price: 0 },
          { label: "Mild 50% Sweet", price: 0 },
          { label: "Low 25% Sweet", price: 0 }
        ]
      },
      {
        name: "Extra Topping",
        type: "checkbox",
        options: [
          { label: "Extra Brown Sugar Boba Pearls", price: 40 },
          { label: "Cheese Foam Cap Layer", price: 50 }
        ]
      }
    ]
  },
  {
    id: "bev-4",
    name: "Wild Berry & Hibiscus Sparkling Iced Cooler",
    category: "beverages",
    categoryName: "Gourmet Beverages",
    price: 220,
    veg: true,
    spiceLevel: 0,
    bestseller: false,
    chefSpecial: true,
    rating: 4.7,
    votes: 145,
    prepTime: "4 mins",
    calories: "95 kcal",
    description: "Brewed organic Egyptian hibiscus flowers infused with crushed blackberries, raspberries, fresh mint leaves & sparkling soda over crushed ice.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Fizziness",
        type: "radio",
        options: [
          { label: "Sparkling Soda (Standard)", price: 0 },
          { label: "Still Natural Water (Iced Tea Style)", price: 0 }
        ]
      }
    ]
  },

  // ARTISAN DESSERTS
  {
    id: "des-1",
    name: "Sizzling Belgian Dark Chocolate Brownie",
    category: "desserts",
    categoryName: "Artisan Desserts",
    price: 290,
    veg: true,
    spiceLevel: 0,
    bestseller: true,
    chefSpecial: true,
    rating: 4.9,
    votes: 490,
    prepTime: "8 mins",
    calories: "510 kcal",
    description: "Warm fudgy 70% Callebaut dark chocolate walnut brownie served on a sizzling hot iron plate, crowned with Madagascar vanilla bean gelato & poured hot chocolate fudge.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Gelato Scoop",
        type: "radio",
        options: [
          { label: "Madagascar Vanilla Bean (Included)", price: 0 },
          { label: "Salted Caramel Gelato", price: 30 },
          { label: "Double Scoop Gelato", price: 60 }
        ]
      },
      {
        name: "Nut Toppings",
        type: "checkbox",
        options: [
          { label: "Toasted Roasted Almond Flakes", price: 30 }
        ]
      }
    ]
  },
  {
    id: "des-2",
    name: "Lotus Biscoff Baked New York Cheesecake",
    category: "desserts",
    categoryName: "Artisan Desserts",
    price: 340,
    veg: true,
    spiceLevel: 0,
    bestseller: true,
    chefSpecial: false,
    rating: 4.9,
    votes: 410,
    prepTime: "5 mins",
    calories: "480 kcal",
    description: "Velvety smooth Philadelphia cream cheese filling on a crunchy spiced speculoos cookie crust, generously smothered in melted Biscoff spread and crushed cookie crumble.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    customizations: [
      {
        name: "Add-ons",
        type: "checkbox",
        options: [
          { label: "Extra Warm Biscoff Lava Shot", price: 40 },
          { label: "Vanilla Bean Gelato Scoop", price: 50 }
        ]
      }
    ]
  },
  {
    id: "des-3",
    name: "Classic Italian Tiramisu al Mascarpone",
    category: "desserts",
    categoryName: "Artisan Desserts",
    price: 320,
    veg: true,
    spiceLevel: 0,
    bestseller: false,
    chefSpecial: true,
    rating: 4.8,
    votes: 270,
    prepTime: "5 mins",
    calories: "420 kcal",
    description: "Savoiardi ladyfingers soaked in freshly pulled espresso & dark cocoa liquor, layered with whipped Italian mascarpone zabaione & dusted with Valrhona cocoa powder.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    customizations: []
  }
];

// Kitchen initial seed orders if storage is empty
const INITIAL_KOT_ORDERS = [
  {
    orderId: "DF-1092",
    orderType: "dine-in",
    tableNumber: "04",
    customerName: "Rohan Verma",
    customerPhone: "+91 98711 22334",
    timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    status: "preparing", // received | preparing | ready | completed
    prepTargetMinutes: 18,
    items: [
      {
        id: "piz-1",
        name: "Smoked Truffle & Wild Mushroom Pizza (11\")",
        qty: 1,
        price: 520,
        veg: true,
        customizations: ["Classic Neapolitan Hand-Stretched", "Extra Shaved Grana"]
      },
      {
        id: "bev-2",
        name: "Spanish Iced Latte with Condensed Milk",
        qty: 2,
        price: 260,
        veg: true,
        customizations: ["Oat Milk (Oatly Creamy)"]
      }
    ],
    notes: "Make the pizza extra crispy on the crust!",
    subtotal: 1040,
    gst: 52,
    discount: 150,
    total: 942,
    paymentStatus: "paid_upi",
    upiRef: "UPI-TXN-984210"
  },
  {
    orderId: "DF-1093",
    orderType: "dine-in",
    tableNumber: "08",
    customerName: "Ananya Deshmukh",
    customerPhone: "+91 98200 44556",
    timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    status: "received",
    prepTargetMinutes: 15,
    items: [
      {
        id: "brg-1",
        name: "The Double Smash Tenderloin Burger",
        qty: 1,
        price: 490,
        veg: false,
        customizations: ["Upgrade to Truffle Parmesan Fries", "Extra Crispy Bacon"]
      },
      {
        id: "bev-1",
        name: "Cold Brew Tonic with Valencia Orange",
        qty: 1,
        price: 240,
        veg: true,
        customizations: ["No Added Sugar"]
      }
    ],
    notes: "No onions in burger please.",
    subtotal: 829,
    gst: 41.45,
    discount: 50,
    total: 820.45,
    paymentStatus: "paid_upi",
    upiRef: "UPI-TXN-984211"
  },
  {
    orderId: "DF-1091",
    orderType: "takeaway",
    tableNumber: null,
    customerName: "Vikram Malhotra",
    customerPhone: "+91 99887 76655",
    deliveryAddress: "Flat 402, Oakwood Palms, Indiranagar",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    status: "ready",
    prepTargetMinutes: 20,
    items: [
      {
        id: "piz-3",
        name: "Classic Pepperoni & Spicy Chorizo Pizza (11\")",
        qty: 1,
        price: 590,
        veg: false,
        customizations: ["Cheese Stuffed Crust", "Hot Honey Drizzle"]
      },
      {
        id: "des-1",
        name: "Sizzling Belgian Dark Chocolate Brownie",
        qty: 1,
        price: 290,
        veg: true,
        customizations: ["Vanilla Bean Gelato"]
      }
    ],
    notes: "Ring bell twice upon delivery.",
    subtotal: 970,
    gst: 48.5,
    discount: 0,
    packingFee: 30,
    deliveryFee: 40,
    total: 1088.5,
    paymentStatus: "paid_upi",
    upiRef: "UPI-TXN-984209"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { RESTAURANT_CONFIG, MENU_CATEGORIES, MENU_ITEMS, INITIAL_KOT_ORDERS };
}
