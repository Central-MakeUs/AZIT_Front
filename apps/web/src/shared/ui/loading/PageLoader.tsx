import {
  pageLoaderContainer,
  spinner,
} from '@/shared/ui/loading/PageLoader.css.ts';

export function PageLoader() {
  return (
    <div className={pageLoaderContainer}>
      <div className={spinner} />
    </div>
  );
}
