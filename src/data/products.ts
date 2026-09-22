import type { Product } from "../types/product";

export const jewelryProducts: Product[] = [
  // Necklaces
  { id: 1, title: "Golden Lotus Layered Necklace", price: 145.0, image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&q=80", category: "Necklaces" },
  { id: 2, title: "Emerald Vine Statement Necklace", price: 260.0, image: "https://images.unsplash.com/photo-1599643478524-fb66f72807f4?w=500&q=80", category: "Necklaces" },
  { id: 3, title: "Rose Gold Infinity Necklace", price: 110.0, image: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=500&q=80", category: "Necklaces" },
  { id: 4, title: "Turquoise Beaded Necklace", price: 65.0, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80", category: "Necklaces" },

  // Chokers
  { id: 5, title: "Handmade Silver Choker", price: 85.5, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80", category: "Chokers" },
  { id: 6, title: "Kundan Bridal Choker", price: 320.0, image: "https://images.unsplash.com/photo-1631982690223-8aa4c528d1c8?w=500&q=80", category: "Chokers" },
  { id: 7, title: "Pearl Studded Choker", price: 140.0, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80", category: "Chokers" },

  // Pendants
  { id: 8, title: "Emerald & Gold Pendant", price: 250.0, image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500&q=80", category: "Pendants" },
  { id: 9, title: "Vintage Pearl Drop Pendant", price: 145.0, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80", category: "Pendants" },
  { id: 10, title: "Ruby Heart Pendant", price: 180.0, image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=500&q=80", category: "Pendants" },

  // Chains
  { id: 11, title: "Minimalist Gold Chain", price: 55.0, image: "https://images.unsplash.com/photo-1599459183478-b0aa5b0f2d21?w=500&q=80", category: "Chains" },
  { id: 12, title: "Twisted Rope Chain", price: 72.0, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80", category: "Chains" },

  // Statement
  { id: 13, title: "Artisan Ruby Statement Piece", price: 310.0, image: "https://images.unsplash.com/photo-1658428587056-b04003d162f4?w=500&q=80", category: "Statement" },
  { id: 14, title: "Bohemian Amber Necklace", price: 95.0, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10ee?w=500&q=80", category: "Statement" },

  // Rings (new)
  { id: 15, title: "Rose Gold Solitaire Ring", price: 210.0, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80", category: "Rings" },
  { id: 16, title: "Classic Diamond Band", price: 275.0, image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500&q=80", category: "Rings" },
  { id: 17, title: "Sapphire Halo Ring", price: 240.0, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80", category: "Rings" },
  { id: 18, title: "Vintage Filigree Ring", price: 165.0, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80", category: "Rings" },
  { id: 19, title: "Stackable Gold Bands (Set of 3)", price: 130.0, image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&q=80", category: "Rings" },
  { id: 20, title: "Emerald Cut Engagement Ring", price: 450.0, image: "https://images.unsplash.com/photo-1605100804567-1f5e6f4a3f2f?w=500&q=80", category: "Rings" },

  // Earrings (new)
  { id: 21, title: "Gold Hoop Earrings", price: 78.0, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80", category: "Earrings" },
  { id: 22, title: "Pearl Drop Earrings", price: 95.0, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80", category: "Earrings" },
  { id: 23, title: "Diamond Stud Earrings", price: 220.0, image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&q=80", category: "Earrings" },
  { id: 24, title: "Chandelier Statement Earrings", price: 135.0, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80", category: "Earrings" },

  // Bangles (new)
  { id: 25, title: "Classic Gold Bangle Set", price: 190.0, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10ee?w=500&q=80", category: "Bangles" },
  { id: 26, title: "Kundan Studded Bangle", price: 225.0, image: "https://images.unsplash.com/photo-1631982690223-8aa4c528d1c8?w=500&q=80", category: "Bangles" },
  { id: 27, title: "Delicate Rose Gold Bangle", price: 98.0, image: "https://images.unsplash.com/photo-1599459183478-b0aa5b0f2d21?w=500&q=80", category: "Bangles" },
];

export const categories = [
  { name: "Necklaces", image: jewelryProducts[0].image },
  { name: "Rings", image: jewelryProducts[14].image },
  { name: "Earrings", image: jewelryProducts[20].image },
  { name: "Bangles", image: jewelryProducts[24].image },
  { name: "Pendants", image: jewelryProducts[7].image },
  { name: "Chokers", image: jewelryProducts[4].image },
];