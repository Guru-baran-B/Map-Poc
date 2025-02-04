import type { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";
import Checkbox from "../Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Base Components/Checkbox",
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const checkbox: Story = {
  args: {
    checked: true,
    disabled: false,
    onChange: fn(),
  },
};
