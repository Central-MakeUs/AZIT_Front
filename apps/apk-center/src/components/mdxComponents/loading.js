import * as React from 'react';

const LoadingProvider = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading component.</div>;
  }
  return null;
};

export default LoadingProvider;
