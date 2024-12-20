import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionContextType {
  hasSubscription: boolean;
  subscriptionType: string | null;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState<string | null>(null);

  const refreshSubscription = async () => {
    try {
      const response = await fetch('/api/subscription/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      setHasSubscription(data.isSubscribed);
      setSubscriptionType(data.subscription?.type || null);
    } catch (error) {
      console.error('Error fetching subscription status:', error);
    }
  };

  useEffect(() => {
    refreshSubscription();
  }, []);

  return (
    <SubscriptionContext.Provider value={{
      hasSubscription,
      subscriptionType,
      refreshSubscription
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};