import type { Meta, StoryObj } from "@storybook/react";
import {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormDescription, FormMessage,
  Button, Input,
} from "@arc/ui";
import { useForm } from "react-hook-form";

const meta: Meta = {
  title: "Arc UI/Form",
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

function FormDemo() {
  const form = useForm({ defaultValues: { username: "" } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <FormDemo />,
};
