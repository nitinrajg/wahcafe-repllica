'use client';

import { useState } from 'react';

export default function LeadForm({ formType = 'customize-menu' as const }: { formType?: 'customize-menu' | 'contact' }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [formTs] = useState(() => Date.now().toString());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setPending(true);
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          email: data.get('email'),
          phone: data.get('phone'),
          formType,
          _hp: data.get('_hp'),
          _ts: formTs,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(json.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h3 className="font-bold text-lg mb-2" style={{ color: '#034230' }}>Thank you!</h3>
        <p className="text-sm">Your details have been submitted. We will connect with you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      {/* Honeypot (hidden) */}
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="absolute opacity-0 h-0 w-0 -z-10" aria-hidden="true" />

      <p className="text-xs text-gray-400 mb-4">Step {step} of 3</p>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">First name *</label>
            <input type="text" name="firstName" required className="w-full border border-gray-300 p-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Last name *</label>
            <input type="text" name="lastName" required className="w-full border border-gray-300 p-2 text-sm" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email *</label>
            <input type="email" name="email" required className="w-full border border-gray-300 p-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Phone *</label>
            <input type="tel" name="phone" required className="w-full border border-gray-300 p-2 text-sm" />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email *</label>
            <input type="email" name="email" required className="w-full border border-gray-300 p-2 text-sm" readOnly />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Phone *</label>
            <input type="tel" name="phone" required className="w-full border border-gray-300 p-2 text-sm" readOnly />
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      <div className="flex gap-4 mt-6">
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)} className="btn-wah">
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={pending}
          className="btn-wah"
        >
          {pending ? 'Submitting...' : step < 3 ? 'Next' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
