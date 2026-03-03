import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@arc/ui";

const meta: Meta<typeof Checkbox> = {
  title: "Arc UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="terms-basic" />
        <FieldLabel htmlFor="terms-basic">Accept terms and conditions</FieldLabel>
      </Field>
    </FieldGroup>
  ),
};

export const CardStyle: Story = {
  render: () => (
    <FieldGroup>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="notifications-card" />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="terms-desc" />
        <FieldContent>
          <FieldLabel htmlFor="terms-desc">Accept terms and conditions</FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms and conditions.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const CheckedState: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox
            id="terms-controlled"
            checked={checked}
            onCheckedChange={(val) => setChecked(val === true)}
          />
          <FieldLabel htmlFor="terms-controlled">Accept terms and conditions</FieldLabel>
        </Field>
      </FieldGroup>
    );
  },
};

export const Invalid: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal" data-invalid="true">
        <Checkbox id="terms-invalid" aria-invalid />
        <FieldContent>
          <FieldLabel htmlFor="terms-invalid">Accept terms and conditions</FieldLabel>
          <FieldDescription>By clicking this checkbox, you agree to the terms.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal" data-disabled="true">
        <Checkbox id="notifications-disabled" disabled />
        <FieldContent>
          <FieldLabel htmlFor="notifications-disabled">Enable notifications</FieldLabel>
          <FieldDescription>
            You can enable or disable notifications at any time.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const Group: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Show these items on the desktop:</FieldLegend>
      <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="hard-disks" defaultChecked />
          <FieldLabel htmlFor="hard-disks">Hard disks</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="external-disks" defaultChecked />
          <FieldLabel htmlFor="external-disks">External disks</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="cds-dvds" />
          <FieldLabel htmlFor="cds-dvds">CDs, DVDs, and iPods</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="connected-servers" />
          <FieldLabel htmlFor="connected-servers">Connected servers</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

const tableData = [
  { name: "Sarah Chen", email: "sarah.chen@example.com", role: "Admin" },
  { name: "Marcus Rodriguez", email: "marcus.rodriguez@example.com", role: "User" },
  { name: "Priya Patel", email: "priya.patel@example.com", role: "User" },
  { name: "David Kim", email: "david.kim@example.com", role: "Editor" },
];

export const WithTable: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Set<string>>(new Set());
    const allSelected = selected.size === tableData.length;
    const someSelected = selected.size > 0 && !allSelected;

    const toggleAll = () => {
      setSelected(allSelected ? new Set() : new Set(tableData.map((r) => r.email)));
    };

    const toggleRow = (email: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(email) ? next.delete(email) : next.add(email);
        return next;
      });
    };

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                data-state={someSelected ? "indeterminate" : undefined}
                onCheckedChange={toggleAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.email} data-selected={selected.has(row.email)}>
              <TableCell>
                <Checkbox
                  checked={selected.has(row.email)}
                  onCheckedChange={() => toggleRow(row.email)}
                  aria-label={`Select ${row.name}`}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};
