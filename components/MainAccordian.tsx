import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CarDetailsForm } from "./CarDetails"

export function MainAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border border-muted-foreground rounded-2xl px-10 py-4 max-w-2xl"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-4xl">Car details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
					<p className="text-base">
						Like most insurers, we check the details you provide against a number of our own as well as other people&apos;s databases, so to get the best deal from us please make sure all your details are correct.
					</p>
					<p className="text-base">For further details, please see our 
						<a href="https://www.hedgehoginsurance.com/privacy" className="text-red-800" target="_blank"
						rel="noopener noreferrer"> privacy policy</a></p>
          <CarDetailsForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-4xl">Driver details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Next section here
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-4xl">Other details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Final section here
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
