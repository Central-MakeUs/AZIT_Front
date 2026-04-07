import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { createElement, useState, type FC } from 'react';
import { WheelPicker } from './WheelPicker';

const hourItems = Array.from({ length: 24 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: i,
}));

const minuteItems = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: i,
}));

const fruitItems = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '체리', value: 'cherry' },
  { label: '포도', value: 'grape' },
  { label: '망고', value: 'mango' },
  { label: '오렌지', value: 'orange' },
  { label: '딸기', value: 'strawberry' },
];

const meta = {
  title: 'Components/WheelPicker',
  component: WheelPicker,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story: FC) =>
      createElement('div', { style: { width: '335px' } }, createElement(Story)),
  ],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof WheelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: fruitItems,
    defaultValue: 'cherry',
  },
};

export const Hours: Story = {
  args: {
    items: hourItems,
    defaultValue: 12,
  },
};

export const Minutes: Story = {
  args: {
    items: minuteItems,
    defaultValue: 30,
  },
};

export const Loop: Story = {
  args: {
    items: fruitItems,
    defaultValue: 'cherry',
    loop: true,
  },
};

export const Disabled: Story = {
  args: {
    items: fruitItems,
    defaultValue: 'apple',
    disabled: true,
  },
};

export const FewItems: Story = {
  args: {
    items: fruitItems.slice(0, 3),
    defaultValue: 'banana',
    visibleCount: 3,
  },
};

const amPmItems = [
  { label: '오전', value: 'am' },
  { label: '오후', value: 'pm' },
];

const TimePicker: FC = () => {
  const [amPm, setAmPm] = useState<string | number>('am');
  const [hour, setHour] = useState<string | number>(8);
  const [minute, setMinute] = useState<string | number>(30);

  return createElement(
    'div',
    {
      style: {
        display: 'flex',
        width: '335px',
      },
    },
    createElement(
      'div',
      { style: { flex: 1 } },
      createElement(WheelPicker, {
        items: amPmItems,
        value: amPm,
        onChange: setAmPm,
      })
    ),
    createElement(
      'div',
      { style: { flex: 1 } },
      createElement(WheelPicker, {
        items: hourItems,
        value: hour,
        onChange: setHour,
      })
    ),
    createElement(
      'div',
      { style: { flex: 1 } },
      createElement(WheelPicker, {
        items: minuteItems,
        value: minute,
        onChange: setMinute,
      })
    )
  );
};

export const TimePick: StoryObj = {
  render: () => createElement(TimePicker),
};
