import { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "latte-1",
    name: "Caffè Latte",
    description: "Our dark, rich espresso balanced with steamed milk and a light layer of foam.",
    price: 380,
    category: "espresso",
    imageUrl: "https://picsum.photos/seed/latte/800/600",
    tags: ["Hot", "Coffee", "Milk"],
    nutrition: { calories: 190, caffeine: 150 }
  },
  {
    id: "frapp-1",
    name: "Caramel Frappuccino®",
    description: "Caramel syrup meets coffee, milk and ice for a rendezvous in the blender.",
    price: 450,
    category: "blended",
    imageUrl: "https://picsum.photos/seed/frapp/800/600",
    tags: ["Cold", "Sweet", "Blended"],
    nutrition: { calories: 380, caffeine: 95 }
  },
  {
    id: "coldbrew-1",
    name: "Nitro Cold Brew",
    description: "Our small-batch cold brew is infused with nitrogen to create a sweet flavor without sugar.",
    price: 420,
    category: "brewed",
    imageUrl: "https://picsum.photos/seed/coldbrew/800/600",
    tags: ["Cold", "Strong", "Unsweetened"],
    nutrition: { calories: 5, caffeine: 280 }
  },
  {
    id: "seasonal-1",
    name: "Toffee Nut Latte",
    description: "Rich espresso combined with the flavor of toasted nuts and buttery toffee.",
    price: 480,
    category: "seasonal",
    imageUrl: "https://picsum.photos/seed/seasonal/800/600",
    tags: ["Hot", "Sweet", "Seasonal"],
    nutrition: { calories: 250, caffeine: 150 }
  },
  {
    id: "bakery-1",
    name: "Butter Croissant",
    description: "Classic golden, flaky croissant with rich, buttery flavor.",
    price: 180,
    category: "bakery",
    imageUrl: "https://picsum.photos/seed/croissant/800/600",
    tags: ["Food", "Buttery", "Classic"],
    nutrition: { calories: 260, caffeine: 0 }
  }
];
