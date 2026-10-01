import { useMemo } from 'react';
import useAppStore from '../../../app/store';

export function useFilteredPosts() {
  const posts = useAppStore((state) => state.posts);
  const search = useAppStore((state) => state.search);

  return useMemo(() => {
    const term = search.trim().toLocaleLowerCase('tr-TR');
    if (!term) return posts;
    return posts.filter((post) => post.title.toLocaleLowerCase('tr-TR').includes(term));
  }, [posts, search]);
}
