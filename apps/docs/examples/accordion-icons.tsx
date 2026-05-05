import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SiSquareDashed } from "stera-icons"

export default function AccordionIcons() {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger><SiSquareDashed />Where are chihuhuas from?</AccordionTrigger>
        <AccordionContent>Chihuahuas are from Mexico, believed to originate from the state of Chihuahua.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger><SiSquareDashed />What chihuahua personalities like?</AccordionTrigger>
        <AccordionContent>Often sassy, confident, and full of attitude, but are also very affectionate and playful with their favorite people..</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger><SiSquareDashed />Are chihuahuas smart?</AccordionTrigger>
        <AccordionContent>Yes, Chihuahuas are quite smart. They pick up on routines and cues quickly, though their stubborn streak can sometimes make training a challenge.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
