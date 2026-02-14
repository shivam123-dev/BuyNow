import { User } from '../types';

const USERS_KEY = 'bn_users';
const SESSION_KEY = 'bn_session';

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

export function getUsers(): User[] {
  return load<User[]>(USERS_KEY, []);
}

export function saveUsers(users: User[]) {
  save<User[]>(USERS_KEY, users);
}

export function register(name: string, email: string, password: string): { ok: boolean; message?: string } {
  const users = getUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { ok: false, message: 'Email already registered' };
  }
  users.push({ name, email, password });
  saveUsers(users);
  return { ok: true };
}

export function login(email: string, password: string): { ok: boolean; message?: string } {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return { ok: false, message: 'Invalid credentials' };
  }
  save(SESSION_KEY, { email: user.email });
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated(): boolean {
  return !!load<{ email: string } | null>(SESSION_KEY, null);
}

export function getCurrentUser(): User | null {
  const session = load<{ email: string } | null>(SESSION_KEY, null);
  if (!session) return null;
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === session.email.toLowerCase()) || null;
}
