import { SiLinkOff } from "stera-icons"
import { postToSandbox } from "../../shared/messages.js"
import { Button } from "../components/Button.js"

const STERA_UI_FIGMA_URL =
  "https://www.figma.com/community/file/1634295119050432145"

type Props = {
  /** The specific problem, shown under the explanation. */
  cause: string
  /**
   * The file's variables could not be read at all, rather than read and found
   * to be shaped wrong — so there is nothing to point at.
   */
  readFailed?: boolean
}

export function UnsupportedView({ cause, readFailed = false }: Props) {
  return (
    <div className="flex h-full flex-col items-center px-6 pt-6 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-surface-secondary text-icon-secondary">
        <SiLinkOff size={20} />
      </div>
      <h1 className="m-0 mt-4 text-[13px] leading-5 font-medium">
        {readFailed
          ? "Couldn't read this file's variables"
          : "This file isn't structured like Stera UI"}
      </h1>
      {!readFailed && (
        <p className="m-0 mt-2 max-w-64 text-text-secondary">
          Stera UI Bridge exports variables from files built on the Stera UI
          Figma file: a Color collection, a Theme collection with Light and Dark
          modes, and an optional Typography collection.
        </p>
      )}
      <p className="m-0 mt-2 max-w-64 text-[10px] leading-4 text-text-tertiary">
        {cause}
      </p>
      {!readFailed && (
        <Button
          className="mt-4"
          onClick={() =>
            postToSandbox({ type: "open-url", url: STERA_UI_FIGMA_URL })
          }
        >
          Get Stera UI
        </Button>
      )}
    </div>
  )
}
