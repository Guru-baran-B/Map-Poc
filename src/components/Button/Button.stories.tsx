import type { Meta, StoryObj } from "@storybook/react/*";
import { fn } from '@storybook/test';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: "Base Components/Button",
  component: Button,
};

export default meta;
 
type Story = StoryObj<typeof Button>;

export const button: Story = {
  args: {
    children: 'Button',
    disabled: false,
    onClick: fn(),
    size: 'lg',
    color: 'default',
    variant: 'primary',
  },
};

   