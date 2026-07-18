import { useState, useEffect, useCallback } from 'react';
import { Offer, OfferConfig, getOffers, getActiveOffer, getOfferConfig, saveOfferConfig } from '../services/offerService';

export function useOffer() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [config, setConfig] = useState<OfferConfig>({ popupBehavior: 'always' });
  const [loading, setLoading] = useState(true);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [allOffers, currentActive, currentConfig] = await Promise.all([
        getOffers(),
        getActiveOffer(),
        getOfferConfig()
      ]);
      setOffers(allOffers);
      setActiveOffer(currentActive);
      setConfig(currentConfig);
    } catch (err) {
      console.error("Error loading offers inside hook:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();

    // Set up real-time notification sync events (especially for the Local Fallback emulator)
    const handleSyncUpdate = () => {
      fetchAllData();
    };

    window.addEventListener('storage_offers_updated', handleSyncUpdate);
    window.addEventListener('storage', handleSyncUpdate);

    return () => {
      window.removeEventListener('storage_offers_updated', handleSyncUpdate);
      window.removeEventListener('storage', handleSyncUpdate);
    };
  }, [fetchAllData]);

  const updateConfigSetting = async (newConfig: OfferConfig) => {
    try {
      await saveOfferConfig(newConfig);
      setConfig(newConfig);
    } catch (err) {
      console.error("Failed to update offer config:", err);
    }
  };

  return {
    offers,
    activeOffer,
    config,
    loading,
    refresh: fetchAllData,
    updateConfig: updateConfigSetting
  };
}
