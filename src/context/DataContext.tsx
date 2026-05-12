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
  const [handlers, setHandlers] = useState<Handler[]>([
    {
      id: 'h1',
      unique_id: 'HDL-AP-0001',
      name: 'Downtown Hub',
      location: 'Manhattan, NY',
      total_generation: 4500,
      active_status: true,
      consumers: ['c1', 'c2']
    },
    {
      id: 'h2',
      unique_id: 'HDL-AP-0002',
      name: 'Westside Station',
      location: 'Jersey City, NJ',
      total_generation: 3800,
      active_status: true,
      consumers: ['c3']
    }
  ]);

  const [consumers, setConsumers] = useState<Consumer[]>([
    {
      id: 'c1',
      unique_id: 'CUS-AP-0001',
      name: 'Alice Johnson',
      handler_id: 'h1',
      meter_id: 'MTR-0001',
      current_usage: 125.5,
      total_cost: 1004.0
    },
    {
      id: 'c2',
      unique_id: 'CUS-AP-0002',
      name: 'Bob Smith',
      handler_id: 'h1',
      meter_id: 'MTR-0002',
      current_usage: 88.2,
      total_cost: 705.6
    },
    {
      id: 'c3',
      unique_id: 'CUS-AP-0003',
      name: 'Charlie Brown',
      handler_id: 'h2',
      meter_id: 'MTR-0003',
      current_usage: 210.0,
      total_cost: 1680.0
    }
  ]);

  // Real-time usage simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setConsumers(prev => prev.map(c => ({
        ...c,
        current_usage: +(c.current_usage + Math.random() * 0.1).toFixed(2),
        total_cost: +((c.current_usage + Math.random() * 0.1) * 8).toFixed(2)
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalGeneration = handlers.reduce((acc, h) => acc + h.total_generation, 0);
  const totalConsumption = consumers.reduce((acc, c) => acc + c.current_usage, 0);

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
