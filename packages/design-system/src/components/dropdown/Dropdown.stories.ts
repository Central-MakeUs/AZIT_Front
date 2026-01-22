import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    options: {
      control: false,
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '지역을 선택해주세요',
    options: [
      { value: 'seoul', label: '서울' },
      { value: 'busan', label: '부산' },
      { value: 'daegu', label: '대구' },
    ],
  },
};

export const WithSelectedValue: Story = {
  args: {
    placeholder: '지역을 선택해주세요',
    value: 'seoul',
    options: [
      { value: 'seoul', label: '서울' },
      { value: 'busan', label: '부산' },
      { value: 'daegu', label: '대구' },
    ],
  },
};

export const WithManyOptions: Story = {
  args: {
    placeholder: '옵션을 선택해주세요',
    options: [
      { value: '1', label: '옵션 1' },
      { value: '2', label: '옵션 2' },
      { value: '3', label: '옵션 3' },
      { value: '4', label: '옵션 4' },
      { value: '5', label: '옵션 5' },
    ],
  },
};
