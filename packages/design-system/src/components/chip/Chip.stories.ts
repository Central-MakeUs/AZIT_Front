import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'opacity', 'gray', 'green'],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: '정기런',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: '번개런',
  },
};

export const Opacity: Story = {
  args: {
    type: 'opacity',
    children: '리더',
  },
};

export const Gray: Story = {
  args: {
    type: 'gray',
    children: '5km',
  },
};

export const Green: Story = {
  args: {
    type: 'green',
    children: '멤버',
  },
};
