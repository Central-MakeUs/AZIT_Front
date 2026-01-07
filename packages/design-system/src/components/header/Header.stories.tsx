import type { Meta, StoryObj } from '@storybook/react-vite';
import logo from '../../shared/assets/logo.svg';
import bell from '../../shared/assets/icon/bell.svg';
import chevronLeft from '../../shared/assets/icon/chevron-left.svg';

import { fn } from 'storybook/test';
import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    left: {
      control: false,
    },
    center: {
      control: false,
    },
    right: {
      control: false,
    },
  },
  args: { onBackClick: fn() },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    left: <img src={logo} alt="logo" />,
    right: <img src={bell} alt="go back" />,
  },
};

export const Schedule: Story = {
  args: {
    center: <span>일정</span>,
  },
};

export const Detail: Story = {
  args: {
    left: <img src={chevronLeft} alt="go back" />,
    center: <span>주문/결제</span>,
  },
};
