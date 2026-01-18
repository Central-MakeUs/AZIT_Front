import type { Meta, StoryObj } from '@storybook/react-vite';
import BellIconComponent from './BellIcon';
import {
  AddImageIcon,
  BankNoteIcon,
  BellIcon,
  CalendarIcon,
  CheckCircleBrokenIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ClockIcon,
  CoinsStackedIcon,
  CopyIcon,
  FlagIcon,
  HomeIcon,
  MarkerPin04Icon,
  MarkerPinIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckIcon,
  UploadIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from './index';

const meta = {
  title: 'Components/Icon',
  component: BellIconComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
    size: {
      control: 'number',
    },
  },
} satisfies Meta<typeof BellIconComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'default',
  },
};

export const Primary: Story = {
  args: {
    size: 24,
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    size: 24,
    color: 'secondary',
  },
};

const iconComponents = [
  { name: 'AddImageIcon', component: AddImageIcon },
  { name: 'BankNoteIcon', component: BankNoteIcon },
  { name: 'BellIcon', component: BellIcon },
  { name: 'CalendarIcon', component: CalendarIcon },
  { name: 'CheckCircleBrokenIcon', component: CheckCircleBrokenIcon },
  { name: 'CheckIcon', component: CheckIcon },
  { name: 'ChevronDownIcon', component: ChevronDownIcon },
  { name: 'ChevronLeftIcon', component: ChevronLeftIcon },
  { name: 'ChevronRightIcon', component: ChevronRightIcon },
  { name: 'ChevronUpIcon', component: ChevronUpIcon },
  { name: 'ClockIcon', component: ClockIcon },
  { name: 'CoinsStackedIcon', component: CoinsStackedIcon },
  { name: 'CopyIcon', component: CopyIcon },
  { name: 'FlagIcon', component: FlagIcon },
  { name: 'HomeIcon', component: HomeIcon },
  { name: 'MarkerPin04Icon', component: MarkerPin04Icon },
  { name: 'MarkerPinIcon', component: MarkerPinIcon },
  { name: 'MinusIcon', component: MinusIcon },
  { name: 'PlusIcon', component: PlusIcon },
  { name: 'SearchIcon', component: SearchIcon },
  { name: 'ShareIcon', component: ShareIcon },
  { name: 'ShoppingBagIcon', component: ShoppingBagIcon },
  { name: 'ShoppingCartIcon', component: ShoppingCartIcon },
  { name: 'TruckIcon', component: TruckIcon },
  { name: 'UploadIcon', component: UploadIcon },
  { name: 'UserIcon', component: UserIcon },
  { name: 'UsersIcon', component: UsersIcon },
  { name: 'XIcon', component: XIcon },
];

export const AllIcons: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '24px',
        padding: '24px',
        maxWidth: '1200px',
      }}
    >
      {iconComponents.map(({ name, component: IconComponent }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
          }}
        >
          <IconComponent {...args} />
          <span
            style={{
              fontSize: '12px',
              color: '#666',
              textAlign: 'center',
              wordBreak: 'break-word',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
  args: {
    size: 24,
    color: 'default',
  },
  parameters: {
    layout: 'padded',
  },
};
