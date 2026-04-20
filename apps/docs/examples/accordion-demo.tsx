import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Arc?</AccordionTrigger>
        <AccordionContent>Arc is a design system for building modern UIs.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It uses Base UI primitives with full keyboard and screen reader support.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I customise it?</AccordionTrigger>
        <AccordionContent>Yes. All components accept a className prop and are built with Tailwind CSS.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
