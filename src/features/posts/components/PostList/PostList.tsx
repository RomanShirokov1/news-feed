import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../../../components/Loader/Loader';

import { RootState, AppDispatch } from '@/store/store';

import { fetchPosts } from '../../postsSlice';

import { PostCard } from '../index';

import styles from './index.module.css';

export const PostList = () => {
  const { posts, loading, page, hasMore } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchPosts(page));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch, page],
  );

  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts(0));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {posts.map((post, index) => {
        const isLast = index === posts.length - 1;
        return (
          <div ref={isLast ? lastPostRef : null} key={post.id}>
            <PostCard post={post} />
          </div>
        );
      })}
      {loading && <Loader />}
    </div>
  );
};
