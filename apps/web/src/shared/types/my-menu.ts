interface BaseMenuItem {
  id: string;
  label: string;
}

export interface PageMenuItem extends BaseMenuItem {
  type: 'page';
  path: string;
  url?: never;
  pushParams?: Record<string, unknown>;
}

export interface ExternalLinkMenuItem extends BaseMenuItem {
  type: 'external_link';
  url: string;
  path?: never;
}

export type MenuItem = PageMenuItem | ExternalLinkMenuItem;

export interface MyPageMenuGroup {
  id: string;
  title: string;
  items: MenuItem[];
}
