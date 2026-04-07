"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Preview } from "@/components/preview"

export function AccordionDefault() {
  return (
    <Preview>
      <Accordion className="w-96">
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
    </Preview>
  )
}

export function AccordionMultiple() {
  return (
    <Preview>
      <Accordion multiple className="w-96">
        <AccordionItem value="item-1">
          <AccordionTrigger>First item</AccordionTrigger>
          <AccordionContent>This item can be open at the same time as others.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second item</AccordionTrigger>
          <AccordionContent>Multiple items can be expanded simultaneously.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Third item</AccordionTrigger>
          <AccordionContent>Toggle any combination of items independently.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Preview>
  )
}

export function AccordionDefaultOpen() {
  return (
    <Preview>
      <Accordion defaultValue={["item-1"]} className="w-96">
        <AccordionItem value="item-1">
          <AccordionTrigger>Pre-opened item</AccordionTrigger>
          <AccordionContent>This item is open by default on first render.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Closed item</AccordionTrigger>
          <AccordionContent>This item starts closed.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Preview>
  )
}
