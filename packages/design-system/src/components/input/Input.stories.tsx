import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { SearchIcon } from '../icon';
import { iconColor } from '../icon/Icon.css';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
    },
    placeholder: {
      control: 'text',
    },
    icon: {
      control: false,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '크루 이름을 입력해주세요',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '335px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithIcon: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    icon: <SearchIcon size={20} className={iconColor} />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '335px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Error: Story = {
  args: {
    placeholder: '크루 이름을 입력해주세요',
    state: 'error',
    defaultValue: 'AZT123',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '335px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    placeholder: '크루 이름을 입력해주세요',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '335px' }}>
        <Story />
      </div>
    ),
  ],
};

export const DisabledWithIcon: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    icon: <SearchIcon size={20} className={iconColor} />,
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '335px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Number: Story = {
  args: {
    placeholder: '숫자를 입력해주세요',
    type: 'number',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '335px' }}>
        <Story />
      </div>
    ),
  ],
};
