/// <reference types="vite/client" />

declare module '*.css' {
  const content: any;
  export default content;
  export = content;
}
