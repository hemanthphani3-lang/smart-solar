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

  // Function to generate consumers for all handlers
  const generateConsumers = (handlersList: Handler[]): Consumer[] => {
    const firstNames = ['Arjun', 'Aditya', 'Aarav', 'Vivaan', 'Vihaan', 'Krishna', 'Sai', 'Ishaan', 'Shaurya', 'Aryan', 'Ananya', 'Diya', 'Ishani', 'Myra', 'Navya', 'Saanvi', 'Zara', 'Kavya', 'Priya', 'Riya'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Patel', 'Reddy', 'Rao', 'Singh', 'Kumar', 'Joshi', 'Mehta', 'Nair', 'Pillai', 'Iyer', 'Kulkarni', 'Deshmukh', 'Banerjee', 'Chatterjee', 'Mukherjee', 'Das', 'Ghosh'];
    
    const consumersList: Consumer[] = [];
    let consumerCount = 1;

    handlersList.forEach(handler => {
      const numConsumers = Math.floor(Math.random() * 3) + 2; // 2 to 4
      for (let i = 0; i < numConsumers; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const city = handler.location.split(',')[0];
        
        const consumerId = `c${consumerCount}`;
        consumersList.push({
          id: consumerId,
          unique_id: `CUS-AP-${consumerCount.toString().padStart(4, '0')}`,
          name: `${firstName} ${lastName}`,
          location: `${city}, India`,
          handler_id: handler.id,
          meter_id: `MTR-${consumerCount.toString().padStart(4, '0')}`,
          current_usage: 50 + Math.random() * 200,
          total_cost: 0 // Will be calculated in simulation
        });
        handler.consumers.push(consumerId);
        consumerCount++;
      }
    });
    return consumersList;
  };

  const initialHandlers = generateHandlers();
  const initialConsumers = generateConsumers(initialHandlers);

  const [handlers, setHandlers] = useState<Handler[]>(initialHandlers);
  const [consumers, setConsumers] = useState<Consumer[]>(initialConsumers);

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
