const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const staticVeiluxCatalog = [
  // ==================== MEN'S CLOTHING (10 Products) ====================
  {
    id: 1,
    title: "Veilux Cashmere Double-Breasted Overcoat",
    price: 749.99,
    description: "Crafted from exceptionally soft, premium Italian cashmere and wool. Features a tailored double-breasted silhouette, structured shoulders, and an elegant long drape. The ultimate luxury statement for cold seasons.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.9, count: 88 }
  },
  {
    id: 2,
    title: "Veilux Signature Italian Linen Blazer",
    price: 420.00,
    description: "Tailored in a relaxed silhouette from pure Italian linen, this lightweight beige blazer is fully unlined for breathability and features horn buttons and patch pockets. Perfect for summer events.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.6, count: 95 }
  },
  {
    id: 3,
    title: "Veilux Tailored French Cuff Dress Shirt",
    price: 185.00,
    description: "Woven in Switzerland from 120s two-ply extra-long staple cotton. Features structured spread collar, classic French cuffs, and natural mother-of-pearl buttons. Tailored slim fit.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.7, count: 180 }
  },
  {
    id: 4,
    title: "Veilux Premium Merino Knit Polo",
    price: 165.00,
    description: "Knitted from super-fine 100% Australian merino wool. Extremely breathable and temperature-regulating, featuring a seamless three-button placket and ribbed cuffs.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.7, count: 92 }
  },
  {
    id: 5,
    title: "Veilux Tailored Italian Wool Suit Trousers",
    price: 280.00,
    description: "Classic flat-front dress trousers tailored from premium Super 130s Italian wool crepe. Featuring button-through welt pockets, curtained waistband, and a modern straight-leg silhouette.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.7, count: 48 }
  },
  {
    id: 6,
    title: "Veilux Suede Bomber Jacket",
    price: 520.00,
    description: "Handcrafted from buttery-soft premium calf suede, featuring a rib-knit mock neck, cuffs, and hem. Gunmetal hardware and clean lines elevate this transitional staple.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.8, count: 74 }
  },
  {
    id: 7,
    title: "Veilux Textured Cable Knit Sweater",
    price: 210.00,
    description: "Woven in a heavy wool-alpaca blend, featuring intricate classic Aran cabling and a relaxed crew neckline. Thick, exceptionally warm, and incredibly soft.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.5, count: 62 }
  },
  {
    id: 8,
    title: "Veilux Sartorial Seersucker Shirt",
    price: 140.00,
    description: "Crafted from breathable puckered cotton seersucker, featuring a crisp button-down collar and natural mother-of-pearl buttons. Keeps you cool in warm seasons.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.4, count: 39 }
  },
  {
    id: 9,
    title: "Veilux Cotton Twill Chino Pants",
    price: 175.00,
    description: "Tailored from mid-weight mercerized organic cotton twill with a touch of stretch. Feature a clean flat front, slanted side pockets, and a modern tapered hem.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.6, count: 112 }
  },
  {
    id: 10,
    title: "Veilux Heritage Wool Trench Coat",
    price: 690.00,
    description: "An elegant, double-breasted trench coat constructed from heavy water-repellent virgin wool. Detailed with classic epaulets, storm flaps, and a removable waist belt.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.9, count: 81 }
  },

  // ==================== WOMEN'S CLOTHING (10 Products) ====================
  {
    id: 11,
    title: "Veilux Monogram Belted Trench Coat",
    price: 620.00,
    description: "A timeless, water-resistant trench coat featuring a double-breasted front, storm flaps, and a custom monogram jacquard lining. Belted waist provides a structured, flattering feminine shape.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.8, count: 124 }
  },
  {
    id: 12,
    title: "Veilux Silk Chiffon Evening Gown",
    price: 890.00,
    description: "An ethereal floor-length evening gown draped in layered mulberry silk chiffon. Featuring a pleated bodice, subtle sweetheart neckline, and flowing skirt that catches the light beautifully.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.7, count: 42 }
  },
  {
    id: 13,
    title: "Veilux Pleated Crepe Midi Skirt",
    price: 245.00,
    description: "Flowing midi skirt cut from heavy satin crepe, featuring permanent crisp accordion pleats and an elasticized satin waistband. Moves with beautiful fluid motion.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.5, count: 75 }
  },
  {
    id: 14,
    title: "Veilux Satin Lapel Cropped Blazer",
    price: 380.00,
    description: "A modern cropped silhouette featuring structured shoulders, clean open-front lines, and peak lapels accented in lustrous black silk satin. An elegant evening separate.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.6, count: 32 }
  },
  {
    id: 15,
    title: "Veilux Silk Slip Midi Dress",
    price: 195.00,
    description: "An elegant slip dress crafted from fluid mulberry silk. Features a cowl neckline, adjustable delicate spaghetti straps, and a bias-cut drape that gracefully contours the body.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.8, count: 54 }
  },
  {
    id: 16,
    title: "Veilux Cashmere Draped Cardigan",
    price: 320.00,
    description: "Knitted from premium long-fiber Mongolian cashmere, featuring an open front, elegant shawl collar, and a relaxed, cozy drape. Luxurious warmth and softness.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.7, count: 68 }
  },
  {
    id: 17,
    title: "Veilux Linen Halter Midi Dress",
    price: 265.00,
    description: "An incredibly elegant sun dress cut from breathable slubbed organic linen. Features a halter neckline, tailored waist darts, and a flowing tiered skirt. Ideal for resort wear.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1610483569720-6d43e2f5b4cb?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.6, count: 59 }
  },
  {
    id: 18,
    title: "Veilux Silk Georgette Tie Blouse",
    price: 215.00,
    description: "Elegantly semi-sheer georgette silk blouse, featuring a chic pussy-bow necktie, gathered balloon sleeves, and covered satin button-cuffs. High luxury fashion.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1489648022197-d865c27f7c46?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.8, count: 41 }
  },
  {
    id: 19,
    title: "Veilux Sartorial Tweed Jacket",
    price: 450.00,
    description: "Woven from texturized wool bouclé blend, detailed with frayed edges, gold coin buttons, and a structured padded shoulder profile. Fully lined with monogram satin.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.7, count: 83 }
  },
  {
    id: 20,
    title: "Veilux Satin Pleated Wrap Dress",
    price: 340.00,
    description: "Crafted in heavy silk satin, this wrap dress features long sleeves, a gathered surplice bodice, and an elegant side-tie closure that cascades down into an asymmetrical hem.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.9, count: 52 }
  },

  // ==================== JEWELRY (15 Products) ====================
  {
    id: 21,
    title: "Veilux 18K Gold Link Chain Bracelet",
    price: 1250.00,
    description: "Exquisitely cast in solid 18K yellow gold, this chunky cable link bracelet features a hand-polished finish and a secure, bespoke T-bar toggle clasp engraved with the classic Veilux seal.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.9, count: 64 }
  },
  {
    id: 22,
    title: "Veilux Diamond Pavé Stud Earrings",
    price: 950.00,
    description: "Bespoke stud earrings cast in 18K white gold, encrusted with brilliant-cut pavé diamonds totaling 0.5 carats. Designed to reflect maximum light with a low-profile, minimalist design.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.9, count: 110 }
  },
  {
    id: 23,
    title: "Veilux Baroque Pearl Drop Necklace",
    price: 480.00,
    description: "A one-of-a-kind natural freshwater baroque pearl with highly iridescent luster, suspended from a delicate 14K solid gold chain. Individually unique pearl shapes.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.8, count: 50 }
  },
  {
    id: 24,
    title: "Veilux Sterling Silver Engraved Band",
    price: 299.99,
    description: "Handcrafted from 925 sterling silver, this 6mm comfort-fit band is intricately engraved with custom classical Roman scrolls and features a brushed satin interior finish.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.4, count: 15 }
  },
  {
    id: 25,
    title: "Veilux Emerald Cut Sapphire Pendant",
    price: 1450.00,
    description: "A gorgeous, deep blue emerald-cut natural sapphire gemstone claw-set in solid 18K white gold, accented with a delicate halo of sparkling micro-pavé diamonds.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 5.0, count: 28 }
  },
  {
    id: 26,
    title: "Veilux Diamond Pavé Eternity Band",
    price: 1850.00,
    description: "A solid 18K yellow gold band encrusted with continuous row-set brilliant-cut diamonds totaling 1.2 carats. Sits beautifully as a stack or a standalone piece.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.9, count: 43 }
  },
  {
    id: 27,
    title: "Veilux Platinum Signet Ring",
    price: 780.00,
    description: "Cast in dense, premium 950 platinum with a sleek comfort-fit high-polish finish. Features a clean face suitable for personal monogram engraving.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1598560963139-389f4b4c4e7f?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.8, count: 31 }
  },
  {
    id: 28,
    title: "Veilux Sapphire Emerald Studs",
    price: 1100.00,
    description: "Stunning ear studs combining deep green square-cut emeralds and surrounding brilliant sapphire halos. Cast in high-grade 18K white gold settings.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.7, count: 19 }
  },
  {
    id: 29,
    title: "Veilux Baroque Pearl Drop Earrings",
    price: 380.00,
    description: "Lustrous, organic teardrop freshwater pearls suspended from elegant solid 14K gold loops. A perfect blend of organic beauty and clean sophistication.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.9, count: 33 }
  },
  {
    id: 30,
    title: "Veilux 18K Yellow Gold Bangle",
    price: 1650.00,
    description: "A classic solid 18K yellow gold bangle featuring a hand-polished micro-brushed finish and a hidden spring hinge closure. Understated luxury for everyday wear.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1569397249-166e60b2d35c?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 5.0, count: 22 }
  },
  {
    id: 31,
    title: "Veilux Imperial Ruby Studs",
    price: 1290.00,
    description: "Deep-red pigeon blood natural rubies handset in solid 18K rose gold studs. Elegant, classic, and radiating striking color.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1603561591410-b9f041444de8?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.8, count: 15 }
  },
  {
    id: 32,
    title: "Veilux Atelier Gold Cuff Bracelet",
    price: 890.00,
    description: "A bold, modern minimalist cuff bracelet cast in solid 14K yellow gold with a hand-hammered finish. Elegant and stackable.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a40d534f?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.7, count: 24 }
  },
  {
    id: 33,
    title: "Veilux Sovereign Solitaire Ring",
    price: 1950.00,
    description: "A classic brilliant round-cut handset diamond solitaire ring claw-set on a delicate, tapered solid platinum band.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1618406180553-6a9754f480bf?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 5.0, count: 12 }
  },
  {
    id: 34,
    title: "Veilux Heavy Gold Link Chain",
    price: 1480.00,
    description: "A thick, statement-making Cuban link chain necklace cast in solid 14K yellow gold. Hand-polished to a radiant high shine.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1622316447813-f9380a1e0df1?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.9, count: 36 }
  },
  {
    id: 35,
    title: "Veilux Heritage Gemstone Bracelet",
    price: 1150.00,
    description: "A gorgeous array of handset multi-colored premium gemstones including sapphire, amethyst, and topaz, linked in a delicate sterling silver chain.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1623880340277-2da3ccf96b6a?auto=format&fit=crop&q=80&w=800",
    rating: { rate: 4.8, count: 29 }
  }
];

const seedProducts = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully.');

    console.log('Clearing old product catalog...');
    await Product.deleteMany({});
    console.log('Product catalog cleared.');

    console.log(`Seeding ${staticVeiluxCatalog.length} High-Curated Static Veilux Products into MongoDB...`);

    const formattedProducts = staticVeiluxCatalog.map(p => ({
      id: Number(p.id),
      title: p.title,
      price: Number(p.price),
      description: p.description,
      category: p.category,
      image: p.image,
      rating: {
        rate: Number(p.rating.rate),
        count: Number(p.rating.count)
      }
    }));

    await Product.insertMany(formattedProducts);
    console.log(`Database seeded successfully with all ${formattedProducts.length} premium products!`);
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
