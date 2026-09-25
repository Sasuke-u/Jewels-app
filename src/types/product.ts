export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  metals?: string[];   // e.g. ["18K Yellow Gold", "Rose Gold", "Platinum"]
  carats?: string[];   // e.g. ["0.5ct", "1.0ct", "1.5ct"]
}