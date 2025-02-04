import type { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";
import Tasklist from "../Tasklist";


 const meta: Meta<typeof Tasklist> = {
  title: "Components/Tasklist",
  component: Tasklist,
}

export default meta;

type Story = StoryObj<typeof Tasklist>;


export const tasklist: Story = {
  args: {
    data: [
      { isCompleted: false, task: "doSomething", id: "0521051" },
      { isCompleted: true, task: "doSomething", id: "0521052" },
      { isCompleted: false, task: "doSomething", id: "0521053" },
    ], 
    onToggle: fn(),
    onDelete: fn(),
    onUpdate: fn(),
  }
}

