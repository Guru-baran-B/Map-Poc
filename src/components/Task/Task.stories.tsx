import type { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";
import Task from "../Task";

const meta: Meta<typeof Task> = {
  title: 'Components/Task',
  component: Task,
};

export default meta;

type Story = StoryObj<typeof Task>;

export const task: Story = {
  args: {
    id: '01523511',
    isCompleted: false,
    task: 'do Something..',
    onToggle: fn(),
    onDelete: fn(),
    onUpdate: fn(),
  }
};
