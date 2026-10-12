/**
 * Curated, illustrative stock photos. None portrays a product for sale.
 *
 * Source and photographer credits:
 * 1 Burger Classico — amirali mirhashemian — https://unsplash.com/photos/hamburger-with-cheese-9LV7-Vshkr4
 * 2 Burger Duplo — amirali mirhashemian — https://unsplash.com/photos/hamburger-with-cheese-and-patties-j-MPEwH9LM4
 * 3 Batata Frita — Cindy Bartillon — https://unsplash.com/photos/a-pile-of-golden-french-fries-on-a-white-plate--doMDpFipzQ
 * 4 Nuggets — Charles Chen — https://unsplash.com/photos/a-black-bowl-filled-with-fried-food-on-top-of-a-table-jt6oINJGNRA
 * 5 Refrigerante — Edge2Edge Media — https://unsplash.com/photos/clear-drinking-glass-with-ice-and-red-straw-0KxfiWujzyY
 * 6 Suco — Abhishek Hajare — https://unsplash.com/photos/orange-juice-in-clear-drinking-glass-kkrXVKK-jhg
 *
 * Source license: https://unsplash.com/license
 * Original URLs were sourced from the free-photo pages. Rendering relies on
 * Unsplash image CDN availability; components use the original SVG as fallback.
 * Do not use these photos to imply exact ingredients or availability.
 */
const photoIds: Record<number, string> = {
  1: 'photo-1544719437-1462dac0f482',
  2: 'photo-1542574271-7f3b92e6c821',
  3: 'photo-1768215610440-fcb9631c7ee2',
  4: 'photo-1727867168767-c67974f68508',
  5: 'photo-1605712916345-6ef6bcc2e29c',
  6: 'photo-1600271886742-f049cd451bba',
};

export const getProductPhoto = (id: number, original: string): string => {
  // Preserve any custom product photograph added later to the real catalog.
  if (!original.startsWith('data:image/svg+xml')) return original;
  const photoId = photoIds[id];
  return photoId
    ? `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=80`
    : original;
};
