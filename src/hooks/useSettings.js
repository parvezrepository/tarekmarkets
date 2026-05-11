import { useState, useEffect } from 'react';

export const useSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'TradeKit',
    whatsapp: '',
    telegram: '',
    bkash: '',
    nagad: '',
    announcement: '',
    usd_rate: 120,
    testimonials: [],
    faqs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`);
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setSettings(data);
        }
      } catch (err) {
        console.error('Settings hook error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return { settings, loading };
};
