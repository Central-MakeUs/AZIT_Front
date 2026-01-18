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
    defaultValue: {
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
    width: '335px',
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
    width: '335px',
    placeholder: '지역을 선택해주세요',
    defaultValue: 'seoul',
    options: [
      { value: 'seoul', label: '서울' },
      { value: 'busan', label: '부산' },
      { value: 'daegu', label: '대구' },
    ],
  },
};

// export const Disabled: Story = {
//   args: {
//     width: '335px',
//     placeholder: '지역을 선택해주세요',
//     options: [
//       { value: 'seoul', label: '서울' },
//       { value: 'busan', label: '부산' },
//     ],
//   },
// };

export const WithDisabledOption: Story = {
  args: {
    width: '335px',
    placeholder: '지역을 선택해주세요',
    options: [
      { value: 'seoul', label: '서울' },
      { value: 'busan', label: '부산', disabled: true },
      { value: 'daegu', label: '대구' },
    ],
  },
};

export const WithLabel: Story = {
  args: {
    width: '335px',
    label: '지역',
    placeholder: '지역을 선택해주세요',
    options: [
      { value: 'seoul', label: '서울' },
      { value: 'busan', label: '부산' },
    ],
  },
};
