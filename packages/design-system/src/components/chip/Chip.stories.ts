import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from './Chip';

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
      options: ['primary', 'secondary'],
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
