import { Order } from '../types';

const ORDERS_KEY = 'bn_orders';

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

export function listOrders(userEmail: string): Order[] {
  const orders = load<Order[]>(ORDERS_KEY, []);
  return orders.filter(o => o.userEmail.toLowerCase() === userEmail.toLowerCase());
}

export function addOrder(order: Omit<Order, 'id' | 'date'>): Order {
  const orders = load<Order[]>(ORDERS_KEY, []);
  const full: Order = { ...order, id: String(Date.now()), date: new Date().toISOString() };
  orders.push(full);
  save<Order[]>(ORDERS_KEY, orders);
  return full;
}

export function getOrderById(id: string): Order | null {
  const orders = load<Order[]>(ORDERS_KEY, []);
  return orders.find(o => o.id === id) || null;
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const orders = load<Order[]>(ORDERS_KEY, []);
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return null;
  const updated = { ...orders[idx], ...updates } as Order;
  orders[idx] = updated;
  save<Order[]>(ORDERS_KEY, orders);
  return updated;
}
