import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionDefaultOpen() {
  return (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Pre-opened item</AccordionTrigger>
        <AccordionContent>This item is open by default on first render.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Closed item</AccordionTrigger>
        <AccordionContent>This item starts closed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
