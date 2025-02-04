import type { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";
import Textinput from "../Textinput";

const meta: Meta<typeof Textinput> = {
  title: "Base Components/Textinput",
  component: Textinput,
};

export default meta;

type Story = StoryObj<typeof Textinput>;

export const textinput: Story = {
  args: {
    title: 'Type',
    isBorderless: false,
    onChange: fn(),
    disabled: false,
    placeholder: "Type Something..",
  },
};




