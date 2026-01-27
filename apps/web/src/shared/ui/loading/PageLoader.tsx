import { pageLoaderContainer, spinner } from './PageLoader.css.ts';

export function PageLoader() {
  return (
    <div className={pageLoaderContainer}>
      <div className={spinner} />
    </div>
  );
}
