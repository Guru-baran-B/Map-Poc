import { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";
import Modal from "../Modals";


const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const modal: Story = {
args: {
  children: "Message to be displayed for the user to interact",
  type: "prompt",
  onConfirm: fn(),
  onReject: fn(),
  onModalClose: fn(),
}}
