import { IProduct } from './@types';

// Illustrative catalog for the public, browser-only showcase.
// Products, prices and images are fictitious; no real ordering is possible.
const iconImage = (emoji: string, background: string): string =>
  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="240" viewBox="0 0 340 240">
      <rect width="340" height="240" rx="22" fill="${background}"/>
      <circle cx="170" cy="120" r="92" fill="#ffffff" opacity="0.6"/>
      <text x="170" y="153" font-family="sans-serif" font-size="112" text-anchor="middle">${emoji}</text>
    </svg>`
  );

export const demoProducts: IProduct[] = [
  { id: 1, name: 'Burger Clássico (demo)', category: 'Sanduíches', price: 22.9, img: iconImage('🍔', '#ffdab6') },
  { id: 2, name: 'Burger Duplo (demo)', category: 'Sanduíches', price: 29.9, img: iconImage('🍔', '#f9d4a9') },
  { id: 3, name: 'Batata Frita (demo)', category: 'Acompanhamentos', price: 13.9, img: iconImage('🍟', '#ffebb0') },
  { id: 4, name: 'Nuggets (demo)', category: 'Acompanhamentos', price: 16.9, img: iconImage('🍗', '#fff1bf') },
  { id: 5, name: 'Refrigerante (demo)', category: 'Bebidas', price: 7.9, img: iconImage('🥤', '#d0f0ff') },
  { id: 6, name: 'Suco (demo)', category: 'Bebidas', price: 9.9, img: iconImage('🧃', '#d9efc5') },
];
