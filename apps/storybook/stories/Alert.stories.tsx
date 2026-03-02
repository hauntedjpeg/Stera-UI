import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "@arc/ui";
import { Terminal, AlertCircle } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Arc UI/Alert",
  component: Alert,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <Terminal className="size-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle className="size-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};
