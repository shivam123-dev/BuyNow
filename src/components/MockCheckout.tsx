import { useEffect, useState } from 'react';
import { formatINR } from '../utils/currency';

type Prefill = {
  name?: string;
  email?: string;
  contact?: string;
};

type Props = {
  open: boolean;
  amount: number;
  currency?: 'INR';
  name?: string;
  description?: string;
  prefill?: Prefill;
  onSuccess: (info: { paymentId: string; method: 'card' | 'upi' | 'netbanking' | 'wallet'; last4?: string }) => void;
  onClose: () => void;
  onFailure?: (error: string, method?: 'card' | 'upi' | 'netbanking' | 'wallet') => void;
};

export default function MockCheckout({ open, amount, currency = 'INR', name = 'BuyNow', description, prefill, onSuccess, onClose, onFailure }: Props) {
  const [tab, setTab] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('card');
  const [holder, setHolder] = useState(prefill?.name || '');
  const [email, setEmail] = useState(prefill?.email || '');
  const [contact, setContact] = useState(prefill?.contact || '');
  const [card, setCard] = useState('');
  const [upi, setUpi] = useState('');
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setTab('card');
      setHolder(prefill?.name || '');
      setEmail(prefill?.email || '');
      setContact(prefill?.contact || '');
      setCard('');
      setUpi('');
      setError(null);
      setPaying(false);
    }
  }, [open]);

  if (!open) return null;

  const handlePay = () => {
    setError(null);
    if (!holder || !email) {
      setError('Please fill name and email');
      return;
    }
    if (tab === 'card' && card.replace(/\s+/g, '').length < 8) {
      setError('Enter a valid card number (dummy)');
      return;
    }
    if (tab === 'upi' && !/^[\w.-]+@[\w.-]+$/.test(upi)) {
      setError('Enter a valid UPI ID (e.g., demo@upi)');
      return;
    }
    setPaying(true);
    setTimeout(() => {
      // 20% chance to simulate failure
      if (Math.random() < 0.2) {
        setPaying(false);
        const msg = 'Payment failed by gateway (simulated). Please retry.';
        onFailure ? onFailure(msg, tab) : setError(msg);
        return;
      }
      const paymentId = 'pay_' + Math.random().toString(36).slice(2, 10);
      const last4 = tab === 'card' ? card.slice(-4) : undefined;
      onSuccess({ paymentId, method: tab, last4 });
    }, 700);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{name}</div>
            {description && <div className="muted">{description}</div>}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="amount-row">
          <span>Amount</span>
          <strong>{currency === 'INR' ? formatINR(amount) : amount.toFixed(2)}</strong>
        </div>

        <div className="tabs">
          <button className={tab === 'card' ? 'active' : ''} onClick={() => setTab('card')}>Card</button>
          <button className={tab === 'upi' ? 'active' : ''} onClick={() => setTab('upi')}>UPI</button>
          <button className={tab === 'netbanking' ? 'active' : ''} onClick={() => setTab('netbanking')}>Netbanking</button>
          <button className={tab === 'wallet' ? 'active' : ''} onClick={() => setTab('wallet')}>Wallet</button>
        </div>

        <div className="form grid-form">
          <label>
            Name
            <input value={holder} onChange={e => setHolder(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Contact
            <input value={contact} onChange={e => setContact(e.target.value)} placeholder="optional" />
          </label>

          {tab === 'card' && (
            <label className="span-2">
              Card Number
              <input value={card} onChange={e => setCard(e.target.value)} placeholder="4111 1111 1111 1111" />
            </label>
          )}
          {tab === 'upi' && (
            <label className="span-2">
              UPI ID
              <input value={upi} onChange={e => setUpi(e.target.value)} placeholder="name@upi" />
            </label>
          )}
          {tab === 'netbanking' && (
            <div className="span-2 muted">Simulated Netbanking selected.</div>
          )}
          {tab === 'wallet' && (
            <div className="span-2 muted">Simulated Wallet selected.</div>
          )}
        </div>

        {error && <div className="error" style={{ marginTop: '.5rem' }}>{error}</div>}

        <div className="modal-actions">
          <button className="btn" onClick={onClose} disabled={paying}>Cancel</button>
          <button className="btn" onClick={() => onFailure ? onFailure('Simulated failure clicked', tab) : setError('Simulated failure clicked')} disabled={paying}>Simulate Failure</button>
          <button className="btn primary" onClick={handlePay} disabled={paying}>{paying ? 'Processing…' : 'Pay Now'}</button>
        </div>
      </div>
    </div>
  );
}
