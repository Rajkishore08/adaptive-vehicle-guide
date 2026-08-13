import { useSyncExternalStore } from "react";
import type { QueryResult } from "./types";

let results: QueryResult[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const investigationStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => results,
  add(result: QueryResult) {
    results = [result, ...results.filter((r) => r.query !== result.query)].slice(0, 10);
    emit();
  },
  clear() {
    results = [];
    emit();
  },
};

const EMPTY: QueryResult[] = [];

export function useInvestigations(): QueryResult[] {
  return useSyncExternalStore(
    investigationStore.subscribe,
    investigationStore.getSnapshot,
    () => EMPTY,
  );
}
