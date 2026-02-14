import { Item } from '../types';

const ITEMS_KEY = 'bn_items';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

const DEFAULT_ITEMS: Item[] = [
  {
    id: '1001',
    title: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones with 30h battery life.',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Headphones'
  },
  {
    id: '1002',
    title: 'Smartwatch Series X',
    description: 'Fitness tracking, heart rate, GPS, and mobile notifications.',
    price: 199.0,
    imageUrl: 'https://via.placeholder.com/300x200?text=Smartwatch'
  },
  {
    id: '1003',
    title: 'Gaming Mouse',
    description: 'Ergonomic mouse with 7 programmable buttons and RGB.',
    price: 49.5,
    imageUrl: 'https://via.placeholder.com/300x200?text=Mouse'
  }
];

function ensureSeed() {
  const items = load<Item[]>(ITEMS_KEY, []);
  if (!items || items.length === 0) {
    save<Item[]>(ITEMS_KEY, DEFAULT_ITEMS);
  }
}

export function listItems(search?: string): Item[] {
  ensureSeed();
  const items = load<Item[]>(ITEMS_KEY, DEFAULT_ITEMS);
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter(i => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
}

export function getItemById(id: string): Item | null {
  ensureSeed();
  const items = load<Item[]>(ITEMS_KEY, DEFAULT_ITEMS);
  return items.find(i => i.id === id) || null;
}
