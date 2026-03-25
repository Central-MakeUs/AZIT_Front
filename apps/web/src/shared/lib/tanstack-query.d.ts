import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      errorMessages?: Record<string, string>;
    };
  }
}
