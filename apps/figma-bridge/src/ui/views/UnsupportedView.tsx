import { SiAlertDiamondFill } from "stera-icons"
import { postToSandbox } from "../../shared/messages.js"
import { Button } from "../components/Button.js"
import { STERA_UI_FIGMA_URL } from "../links.js"

export function UnsupportedView() {
  return (
    <div className="flex h-full flex-col items-center px-6 pt-16 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-surface-secondary text-icon-secondary">
        <SiAlertDiamondFill size={20} />
      </div>
      <h1 className="m-0 mt-4 text-[13px] leading-5 font-medium">
        Unsupported variable structure
      </h1>
      <p className="m-0 mt-2 max-w-64 text-text-secondary">
        This plugin is designed to work with Figma variables using the Stera UI
        pattern
      </p>
      <Button
        className="mt-4"
        onClick={() =>
          postToSandbox({ type: "open-url", url: STERA_UI_FIGMA_URL })
        }
      >
        Get Stera UI
      </Button>
    </div>
  )
}
