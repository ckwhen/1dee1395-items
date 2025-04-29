import { useEffect, useRef } from 'react';

interface Props {
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  children: React.ReactNode;
}

function InfiniteScroll({
  loadMore,
  isLoading,
  hasMore,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, hasMore, isLoading]);

  return (
    <>
      {children}
      <div ref={ref} className="h-10" />
      {isLoading && <p className="text-center py-2">Loading...</p>}
    </>
  );
}

export default InfiniteScroll;
