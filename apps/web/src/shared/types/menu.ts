interface BaseMenuItem {
  id: string;
  label: string;
}

export interface NavigationMenuItem extends BaseMenuItem {
  type: 'navigation';
  onNavigate: () => void;
}

export interface ActionMenuItem extends BaseMenuItem {
  type: 'action';
  onAction: () => void;
  getStatusLabel?: () => Promise<string>;
}

export interface InfoMenuItem extends BaseMenuItem {
  type: 'info';
  value: string;
}

export type MenuItem = NavigationMenuItem | ActionMenuItem | InfoMenuItem;

export interface MenuGroup {
  id: string;
  title: string;
  items: MenuItem[];
}
