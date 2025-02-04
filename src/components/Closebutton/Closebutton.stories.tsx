import type { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";
import Closebutton from "../Closebutton"; 


const meta: Meta<typeof Closebutton> = {
  title: 'Base Components/Closebutton',
  component: Closebutton,
}

export default meta;

type Story = StoryObj<typeof Closebutton>;

export const closebutton: Story = {
  args: {
    isIconOnly: false,
    title: 'Close',
    onClick: fn(),
    disabled: false,
  },
}
