import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    value: "origin",
    trigger: "Where are chihuhuas from?",
    content:
      "Chihuahuas are from Mexico, believed to originate from the state of Chihuahua.",
  },
  {
    value: "personality",
    trigger: "What chihuahua personalities like?",
    content:
      "Often sassy, confident, and full of attitude, but are also very affectionate and playful with their favorite people.",
  },
  {
    value: "intelligence",
    trigger: "Are chihuahuas smart?",
    content:
      "Yes, Chihuahuas are quite smart. They pick up on routines and cues quickly, though their stubborn streak can sometimes make training a challenge.",
  },
]

export default function AccordionBorders() {
  return (
    <Accordion
      className="rounded-xl border"
      defaultValue={["billing"]}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="not-last:border-b"
        >
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
