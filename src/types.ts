export type User = {
  name: string;
  email: string;
  password: string;
};

export type Item = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
};

export type Order = {
  id: string;
  userEmail: string;
  itemId: string;
  itemTitle: string;
  price: number;
  quantity: number;
  date: string; // ISO string
  address: string;
  last4: string; // last 4 digits of card
  paymentId?: string;
  method?: 'card' | 'upi' | 'netbanking' | 'wallet';
  status?: 'pending' | 'success' | 'failed';
  failureReason?: string;
};
