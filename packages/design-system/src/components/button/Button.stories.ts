import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'check',
      options: ['large'],
    },
    state: {
      control: 'select',
      options: ['active', 'disabled', 'outline'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    width: '375px',
    children: '신청하기',
  },
};

export const Disabled: Story = {
  args: {
    width: '375px',
    state: 'disabled',
    children: '신청하기',
  },
};

export const Outline: Story = {
  args: {
    width: '375px',
    state: 'outline',
    children: '신청하기',
  },
};
