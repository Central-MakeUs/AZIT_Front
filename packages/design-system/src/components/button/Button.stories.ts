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
      options: ['large', 'small'],
    },
    state: {
      control: 'select',
      options: ['active', 'disabled', 'outline', 'disabled_outline'],
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

export const ActiveSmall: Story = {
  args: {
    size: 'small',
    state: 'active',
    children: '신청하기',
  },
};

export const DisableOutlineSmall: Story = {
  args: {
    size: 'small',
    state: 'disabled_outline',
    children: '신청하기',
  },
};
