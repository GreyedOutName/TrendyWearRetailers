
export type HeroSlide = {
  title: string;
  description: string;
  href: string;
  image: string;
};

export type StackedCard = {
  id: number;
  title: string;
  image: string;
};

// Carousel slides
export const heroSlides: HeroSlide[] = [
  {
    title: "Blouse Collection",
    description: "Description ng tshirt blah blah blah blah.",
    href: "/collections/blouse",
    image: "/images/placeholder.jpg",
  },
  {
    title: "Summer Collection",
    description: "Explore fun summer styles for the sunny days ahead.",
    href: "/collections/summer",
    image: "/images/placeholder.jpg",
  },
];

// Right stacked small cards
export const stackedCards: StackedCard[] = [
  { id: 1, title: "#TrendyWear", image: "/images/placeholder.jpg" },
  { id: 2, title: "#FunForTheSummer", image: "/images/placeholder.jpg" },
];