import type { Product } from "../types/product";

export const jewelryProducts: Product[] = [
  { id: 1, title: "Afghan Lapis Lazuli Necklace", price: 120.0, image: "https://images.unsplash.com/photo-1599643478524-fb66f72807f4?w=500&q=80", category: "Necklaces" },
  { id: 2, title: "Handmade Silver Choker", price: 85.5, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80", category: "Chokers" },
  { id: 3, title: "Emerald & Gold Pendant", price: 250.0, image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500&q=80", category: "Pendants" },
  { id: 4, title: "Turquoise Beaded Necklace", price: 65.0, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80", category: "Necklaces" },
  { id: 5, title: "Vintage Pearl Drop", price: 145.0, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80", category: "Pendants" },
  { id: 6, title: "Bohemian Amber Necklace", price: 95.0, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10ee?w=500&q=80", category: "Necklaces" },
  { id: 7, title: "Minimalist Gold Chain", price: 55.0, image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&q=80", category: "Chains" },
  { id: 8, title: "Artisan Ruby Statement", price: 310.0, image: "https://images.unsplash.com/photo-1658428587056-b04003d162f4?w=500&q=80", category: "Statement" },
];

export const categories = [
  { name: "Necklaces", image: jewelryProducts[0].image },
  { name: "Chokers", image: jewelryProducts[1].image },
  { name: "Pendants", image: jewelryProducts[2].image },
  { name: "Chains", image: jewelryProducts[6].image },
  { name: "Statement", image: jewelryProducts[7].image },
];