export type WheelPickerItem = {
  label: string;
  value: string | number;
};

export type WheelPickerProps = {
  items: WheelPickerItem[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  visibleCount?: number; // 화면에 보이는 아이템 개수
  loop?: boolean;
  disabled?: boolean;
};
