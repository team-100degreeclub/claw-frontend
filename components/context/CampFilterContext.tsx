"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CampFilters {
  location: string | null;
  date: Date | null;
  min_cost: number | null;
  max_cost: number | null;
  min_age: number | null;
  max_age: number | null;
}

interface CampFilterContextType {
  filters: CampFilters;
  setFilters: React.Dispatch<React.SetStateAction<CampFilters>>;
  clearFilters: () => void;
  campCount: number;
  setCampCount: React.Dispatch<React.SetStateAction<number>>;
}

const defaultFilters: CampFilters = {
  location: null,
  date: null,
  min_cost: null,
  max_cost: null,
  min_age: null,
  max_age: null,
};

const CampFilterContext = createContext<CampFilterContextType | undefined>(undefined);

export function CampFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<CampFilters>(defaultFilters);
  const [campCount, setCampCount] = useState<number>(0);

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <CampFilterContext.Provider value={{ filters, setFilters, clearFilters, campCount, setCampCount }}>
      {children}
    </CampFilterContext.Provider>
  );
}

export function useCampFilters() {
  const context = useContext(CampFilterContext);
  if (context === undefined) {
    throw new Error('useCampFilters must be used within a CampFilterProvider');
  }
  return context;
}
