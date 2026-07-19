import { db, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  query, 
  orderBy, 
  getDoc 
} from 'firebase/firestore';

export interface Offer {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string; // Base64 or URL
  mapsLink: string;
  enabled: boolean;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  isBumper: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OfferConfig {
  popupBehavior: 'once_24h' | 'always';
}

const LOCAL_STORAGE_KEY = 'neelakanta_offers_db';
const CONFIG_STORAGE_KEY = 'neelakanta_offer_config';

// Seed default offers
const DEFAULT_OFFERS: Offer[] = [
  {
    id: "OFF-BUMP-01",
    title: "NEELAKANTA MEGA BUMPER FESTIVAL PACK",
    description: "Our supreme bumper deal! Complete multi-point mechanical diagnostic review, computerized 3D wheel alignment, high-pressure foam wash, liquid wax polish, engine oil level correction, AC service, and full interior dashboard dresser treatment.",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600", // High quality auto shop image
    mapsLink: "https://share.google/Eb9hZf8VUOwKefX2c",
    enabled: true,
    startDate: new Date().toISOString().split('T')[0], // Today
    endDate: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0], // +60 Days (60 days duration)
    isBumper: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "OFF-SHINE-20",
    title: "Premium Ceramic Paint Protection & Glaze",
    description: "Dual-layer hydrophobic ceramic coat application. Prevents micro-scratches, blocks intense UV fading, and provides deep showroom mirror gloss. Signed warranty sheet.",
    price: "₹14,999",
    image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=600",
    mapsLink: "https://share.google/Eb9hZf8VUOwKefX2c",
    enabled: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
    isBumper: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_CONFIG: OfferConfig = {
  popupBehavior: 'always'
};

// -------------------------------------------------------------
// LOCAL FALLBACK OPERATIONS
// -------------------------------------------------------------
function getLocalOffers(): Offer[] {
  let data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    data = localStorage.getItem('neelkanth_offers_db');
  }
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_OFFERS));
    return DEFAULT_OFFERS;
  }
  let list = JSON.parse(data) as Offer[];
  let changed = false;
  list = list.map(off => {
    if (off.id === "OFF-BUMP-01") {
      if (off.price !== "₹3,499") {
        off.price = "₹3,499";
        changed = true;
      }
      // Set to 60 days as requested by user
      const targetEndDate = new Date(new Date(off.startDate).getTime() + 60 * 86400000).toISOString().split('T')[0];
      if (off.endDate !== targetEndDate) {
        off.endDate = targetEndDate;
        changed = true;
      }
      if (off.title === "NEELKANTH MEGA BUMPER FESTIVAL PACK" || off.title === "NEELAKANTA MEGA BUMPER FESTIVAL PACK") {
        off.title = "NEELAKANTA MEGA BUMPER FESTIVAL PACK";
        changed = true;
      }
    }
    return off;
  });
  if (changed) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  }
  return list;
}

function saveLocalOffers(offers: Offer[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(offers));
  // Dispatch custom storage change event for same-window updates
  window.dispatchEvent(new Event('storage_offers_updated'));
}

function getLocalConfig(): OfferConfig {
  let data = localStorage.getItem(CONFIG_STORAGE_KEY);
  if (!data) {
    data = localStorage.getItem('neelkanth_offer_config');
  }
  if (!data) {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
  return JSON.parse(data);
}

function saveLocalConfig(config: OfferConfig) {
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new Event('storage_offers_updated'));
}

// -------------------------------------------------------------
// SERVICE EXPORTS
// -------------------------------------------------------------

export async function getOffers(): Promise<Offer[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'offers'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const list: Offer[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Offer);
      });
      // Synchronize back to local storage for instant offline previews
      if (list.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
      }
      return list.length > 0 ? list : getLocalOffers();
    } catch (e) {
      console.error("Firebase getOffers failed, using local storage", e);
      return getLocalOffers();
    }
  }
  return getLocalOffers();
}

export async function getActiveOffer(): Promise<Offer | null> {
  const offers = await getOffers();
  const today = new Date().toISOString().split('T')[0];

  // Filter offers that are:
  // 1. Enabled
  // 2. Today is between startDate and endDate (inclusive)
  const activeOffers = offers.filter(off => {
    const isStartDateValid = !off.startDate || off.startDate <= today;
    const isEndDateValid = !off.endDate || off.endDate >= today;
    return off.enabled && isStartDateValid && isEndDateValid;
  });

  if (activeOffers.length === 0) return null;

  // Prefer isBumper = true, then newest
  const bumperOffer = activeOffers.find(o => o.isBumper);
  if (bumperOffer) return bumperOffer;

  // Return newest active offer
  return activeOffers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
}

export async function createOrUpdateOffer(offer: Omit<Offer, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<Offer> {
  const now = new Date().toISOString();
  
  if (isFirebaseConfigured && db) {
    try {
      const collRef = collection(db, 'offers');
      if (offer.id) {
        // Update operation
        const docRef = doc(db, 'offers', offer.id);
        const updatedData = {
          ...offer,
          updatedAt: now
        };
        await setDoc(docRef, updatedData, { merge: true });
        
        // Also handle un-bumpering others in Firebase if this one is bumper
        if (offer.isBumper) {
          const all = await getOffers();
          for (const item of all) {
            if (item.id !== offer.id && item.isBumper) {
              await setDoc(doc(db, 'offers', item.id), { isBumper: false }, { merge: true });
            }
          }
        }

        return { ...updatedData } as Offer;
      } else {
        // Create operation
        const docData = {
          ...offer,
          createdAt: now,
          updatedAt: now
        };
        
        // If this new offer is marked as bumper, turn off bumper on other existing ones
        if (offer.isBumper) {
          const all = await getOffers();
          for (const item of all) {
            if (item.isBumper) {
              await setDoc(doc(db, 'offers', item.id), { isBumper: false }, { merge: true });
            }
          }
        }

        const docRef = await addDoc(collRef, docData);
        return { id: docRef.id, ...docData } as Offer;
      }
    } catch (e) {
      console.error("Firebase createOrUpdateOffer failed, applying locally", e);
    }
  }

  // Local implementation fallback
  const localList = getLocalOffers();
  let resultOffer: Offer;

  if (offer.id) {
    // Update local
    const index = localList.findIndex(o => o.id === offer.id);
    const existing = localList[index];
    resultOffer = {
      ...existing,
      ...offer,
      id: offer.id,
      updatedAt: now
    } as Offer;

    let updatedList = [...localList];
    if (offer.isBumper) {
      updatedList = updatedList.map(o => ({ ...o, isBumper: o.id === offer.id }));
    }
    updatedList[index] = resultOffer;
    saveLocalOffers(updatedList);
  } else {
    // Create local
    const newId = "OFF-" + Math.random().toString(36).substring(2, 11).toUpperCase();
    resultOffer = {
      ...offer,
      id: newId,
      createdAt: now,
      updatedAt: now
    } as Offer;

    let updatedList = localList;
    if (offer.isBumper) {
      updatedList = updatedList.map(o => ({ ...o, isBumper: false }));
    }
    updatedList.push(resultOffer);
    saveLocalOffers(updatedList);
  }

  return resultOffer;
}

export async function deleteOffer(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'offers', id));
    } catch (e) {
      console.error("Firebase deleteDoc failed", e);
    }
  }

  const localList = getLocalOffers();
  const updated = localList.filter(o => o.id !== id);
  saveLocalOffers(updated);
}

export async function getOfferConfig(): Promise<OfferConfig> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'settings', 'offer_config');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const config = docSnap.data() as OfferConfig;
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
        return config;
      } else {
        // Set default config
        await setDoc(docRef, DEFAULT_CONFIG);
        return DEFAULT_CONFIG;
      }
    } catch (e) {
      console.error("Firebase getOfferConfig failed, using local", e);
      return getLocalConfig();
    }
  }
  return getLocalConfig();
}

export async function saveOfferConfig(config: OfferConfig): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'settings', 'offer_config');
      await setDoc(docRef, config, { merge: true });
    } catch (e) {
      console.error("Firebase saveOfferConfig failed", e);
    }
  }
  saveLocalConfig(config);
}

export function resetOffersToDefault() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_OFFERS));
  localStorage.setItem('neelkanth_offers_db', JSON.stringify(DEFAULT_OFFERS));
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
  localStorage.setItem('neelkanth_offer_config', JSON.stringify(DEFAULT_CONFIG));
  window.dispatchEvent(new Event('storage_offers_updated'));
}

