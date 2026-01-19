import { Dispatch, SetStateAction } from "react";

export const createEntityOperations = <T extends { id: string }>(
  setEntities: Dispatch<SetStateAction<T[]>>
) => ({
  create: (entity: T) => {
    setEntities(prev => [...prev, entity]);
  },
  
  update: (entity: T) => {
    setEntities(prev => prev.map(e => e.id === entity.id ? entity : e));
  },
  
  remove: (id: string) => {
    setEntities(prev => prev.filter(e => e.id !== id));
  }
});