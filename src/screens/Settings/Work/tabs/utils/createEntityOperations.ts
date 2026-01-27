import { Dispatch, SetStateAction } from "react";

export const createEntityOperations = <T extends { id: string }>(
  setEntities: Dispatch<SetStateAction<T[]>>,
  createEntity: (data: Omit<T, "id">) => T,
) => ({
  create: (data: Omit<T, "id">) => {
    setEntities((prev) => [...prev, createEntity(data)]);
  },

  update: (patch: Partial<T> & { id: string }) => {
    setEntities((prev) =>
      prev.map((e) => (e.id === patch.id ? { ...e, ...patch } : e)),
    );
  },

  remove: (id: string) => {
    setEntities((prev) => prev.filter((e) => e.id !== id));
  },
});
