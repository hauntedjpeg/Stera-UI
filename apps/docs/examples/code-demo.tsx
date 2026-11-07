import { Code } from "@/components/ui/code"

export default function CodeDemo() {
  return (
    <p className="max-w-sm st-body-md text-ink-subtler">
      Run <Code>npx stera-ui@latest init</Code> to set up your project, then add
      components to <Code>components/ui</Code>.
    </p>
  )
}
