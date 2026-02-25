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

export interface PermissionMenuItem extends BaseMenuItem {
  type: 'permission';
  permission: string;
  path?: never;
  url?: never;
}

export type MenuItem = PageMenuItem | ExternalLinkMenuItem | PermissionMenuItem;

export interface MypageMenuGroup {
  id: string;
  title: string;
  items: MenuItem[];
}
