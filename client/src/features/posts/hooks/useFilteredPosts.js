import { useMemo } from 'react';
import useAppStore from '../../../app/store';

export function useFilteredPosts() {
  const data = useAppStore((state) => state.data);
  const search = useAppStore((state) => state.search);

  return useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((item) => (item.title ?? '').toLowerCase().includes(term));
  }, [data, search]);
}
