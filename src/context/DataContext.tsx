import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Handler {
  id: string;
  unique_id: string;
  name: string;
  location: string;
  total_generation: number;
  active_status: boolean;
  consumers: string[]; // array of consumer IDs
}

export interface Consumer {
  id: string;
  unique_id: string;
  name: string;
  location: string;
  handler_id: string;
  meter_id: string;
  current_usage: number; // kWh
  total_cost: number;
}

interface DataContextType {
  handlers: Handler[];
  consumers: Consumer[];
  totalGeneration: number;
  totalConsumption: number;
  addConsumer: (handlerId: string, consumerData: Omit<Consumer, 'id' | 'unique_id'>) => void;
  removeConsumer: (consumerId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Function to generate 1284 handlers
  const generateHandlers = (): Handler[] => {
    const handlersList: Handler[] = [];
    const indianCities = [
      'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 
      'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 
      'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 
      'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 
      'Aurangabad', 'Dhanbad', 'Amritsar', 'Ranchi', 'Howrah', 'Jabalpur', 'Gwalior', 
      'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh'
    ];
    
    for (let i = 1; i <= 1284; i++) {
      const city = indianCities[Math.floor(Math.random() * indianCities.length)];
      const idPrefix = city.substring(0, 3).toUpperCase();
      
      handlersList.push({
        id: `h${i}`,
        unique_id: `HDL-${idPrefix}-${i.toString().padStart(4, '0')}`,
        name: `${city} Node ${i}`,
        location: `${city}, India`,
        total_generation: 30000 + Math.floor(Math.random() * 5000), // ~30,000 to 35,000 kWh
        active_status: Math.random() > 0.05, // 95% active
        consumers: []
      });
    }
    return handlersList;
  };

  const [handlers, setHandlers] = useState<Handler[]>(generateHandlers());

  const [consumers, setConsumers] = useState<Consumer[]>([
    {
      id: 'c1',
      unique_id: 'CUS-AP-0001',
      name: 'Alice Johnson',
      location: 'Hyderabad, India',
      handler_id: 'h1',
      meter_id: 'MTR-0001',
      current_usage: 125.5,
      total_cost: 1004.0
    },
    {
      id: 'c2',
      unique_id: 'CUS-AP-0002',
      name: 'Bob Smith',
      location: 'Bangalore, India',
      handler_id: 'h1',
      meter_id: 'MTR-0002',
      current_usage: 88.2,
      total_cost: 705.6
    },
    {
      id: 'c3',
      unique_id: 'CUS-AP-0003',
      name: 'Charlie Brown',
      location: 'Mumbai, India',
      handler_id: 'h2',
      meter_id: 'MTR-0003',
      current_usage: 210.0,
      total_cost: 1680.0
    }
  ]);

  // Update handlers with initial consumer IDs
  useEffect(() => {
    const updatedHandlers = [...handlers];
    consumers.forEach(c => {
      const handler = updatedHandlers.find(h => h.id === c.handler_id);
      if (handler && !handler.consumers.includes(c.id)) {
        handler.consumers.push(c.id);
      }
    });
    setHandlers(updatedHandlers);
  }, []);

  // Real-time usage simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setConsumers(prev => prev.map(c => {
        const newUsage = +(c.current_usage + Math.random() * 0.1).toFixed(2);
        return {
          ...c,
          current_usage: newUsage,
          total_cost: +(newUsage * 8).toFixed(2)
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalGeneration = handlers.reduce((acc, h) => acc + h.total_generation, 0);
  const totalConsumption = consumers.reduce((acc, c) => acc + c.current_usage, 0);

  // Ensure generated electricity >= consumed electricity logic
  // In a real app, this might be a validation or adjustment.
  // Here we'll just ensure the values reflect this in any summary components.
  
  const addConsumer = (handlerId: string, consumerData: Omit<Consumer, 'id' | 'unique_id'>) => {
    const handler = handlers.find(h => h.id === handlerId);
    if (handler && handler.consumers.length < 4) {
      const newId = `c${consumers.length + 1}`;
      const newConsumer: Consumer = {
        ...consumerData,
        id: newId,
        unique_id: `CUS-AP-${(consumers.length + 1).toString().padStart(4, '0')}`,
      };
      setConsumers([...consumers, newConsumer]);
      setHandlers(handlers.map(h => 
        h.id === handlerId ? { ...h, consumers: [...h.consumers, newId] } : h
      ));
    }
  };

  const removeConsumer = (consumerId: string) => {
    setConsumers(consumers.filter(c => c.id !== consumerId));
    setHandlers(handlers.map(h => ({
      ...h,
      consumers: h.consumers.filter(id => id !== consumerId)
    })));
  };

  return (
    <DataContext.Provider value={{ handlers, consumers, totalGeneration, totalConsumption, addConsumer, removeConsumer }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
