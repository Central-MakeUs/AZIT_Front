import type { Meta, StoryObj } from '@storybook/react-vite';
import logo from '../../shared/assets/logo.svg';
import { BellIcon } from '../../shared/assets/icon/BellIcon';
import { ChevronLeftIcon } from '../../shared/assets/icon/ChevronLeftIcon';

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
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    width: '375px',
    left: <img src={logo} alt="logo" />,
    right: <BellIcon />,
  },
};

export const Schedule: Story = {
  args: {
    width: '375px',
    center: <span>일정</span>,
  },
};

export const Detail: Story = {
  args: {
    width: '375px',
    left: <ChevronLeftIcon />,
    center: <span>주문/결제</span>,
  },
};
