import { useMemo } from 'react';
import type { ComparisonState } from '../types';

export function useComparison(state: ComparisonState) {
  return useMemo(() => state, [state]);
}
