// lib/data/home/collections.ts
export type CollectionItem = {
  id: number;
  src: string;
  alt: string;
};

export const collectionsData: CollectionItem[] = [
  { id: 1, src: "/images/placeholder.jpg", alt: "Model 1" },
  { id: 2, src: "/images/placeholder.jpg", alt: "Model 2" },
  { id: 3, src: "/images/placeholder.jpg", alt: "Model 3" },
  { id: 4, src: "/images/placeholder.jpg", alt: "Model 4" },
];