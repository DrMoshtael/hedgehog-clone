"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import MonthPicker from "./ui/month-picker"
import { useState } from "react"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, InfoIcon } from "lucide-react"

const formSchema = z.object({
	registration: z.string().min(2, {
		message: "Registration number must be at least 2 characters.",
	}),
	purchased: z.boolean(),
	purchaseDate: z.string().optional(),
	value: z.number(),
	usage: z.string(),
	mileage: z.number(),
})

export function CarDetailsForm() {
	const [purchaseDate, setPurchaseDate] = useState(new Date())
	const [purchaseDatePopoverOpen, setPurchaseDatePopoverOpen] = useState(false)
	const [purchaseDateVisible, setPurchaseDateVisible] = useState(false)
	const [tooltipOpen, setTooltipOpen] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
				<FormField
					control={form.control}
					name="registration"
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-row justify-between">
								<FormLabel className="text-xl">Car registration</FormLabel>
								<Popover open={tooltipOpen} onOpenChange={setTooltipOpen}>
									<PopoverTrigger asChild>
										<Button
											variant={"ghost"}
											onClick={() => setTooltipOpen(!tooltipOpen)}
											onMouseEnter={() => setTooltipOpen(true)}
											onMouseLeave={() => setTooltipOpen(false)}
										>
											<InfoIcon className="p-0 h-full w-full" />
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="md:max-w-sm max-w-2xs bg-green-500 items-center justify-center"
										onMouseEnter={() => setTooltipOpen(true)}
										onMouseLeave={() => setTooltipOpen(false)}
										sideOffset={0}
									>
										<p className="p-2 text-sm text-white">
											If you enter your registration, we&apos;ll use it to look up the car details for you. If you don&apos;t know it, or the car details don&apos;t appear, leave this question blank and click on the &quot;Don&apos;t know your registration?&quot; link. However we will need the registration eventually to sell you a policy.
										</p>
									</PopoverContent>
								</Popover>
							</div>
							<FormControl>
								<div className="flex flex-row">

									<Input placeholder="Enter car registration" {...field} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="purchased"
					render={({ }) => (
						<FormItem>
							<FormLabel className="text-xl">Has the car been purchased yet?</FormLabel>
							<FormControl>
								<ToggleGroup type="single" size="lg" variant={"outline"} onValueChange={(value) => value === "true" ? setPurchaseDateVisible(true) : setPurchaseDateVisible(false)}>
									<ToggleGroupItem value="true">Yes</ToggleGroupItem>
									<ToggleGroupItem value="false">No</ToggleGroupItem>
								</ToggleGroup>
							</FormControl>
						</FormItem>
					)}
				/>
				{purchaseDateVisible && <FormField
					control={form.control}
					name="purchaseDate"
					render={({ }) => (
						<FormItem>
							<FormLabel className="text-xl">When was the car purchased?</FormLabel>
							<FormControl>
								<Popover open={purchaseDatePopoverOpen} onOpenChange={setPurchaseDatePopoverOpen}>
									<PopoverTrigger asChild>
										<Button variant={"outline"}
											className={cn(
												"w-full justify-start text-left font-normal",
												!purchaseDate && "text-muted-foreground"
											)}
											onClick={() => setPurchaseDatePopoverOpen(!purchaseDatePopoverOpen)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{purchaseDate ? format(purchaseDate, "MMMM y") : <span>Pick a date</span>}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<MonthPicker currentMonth={purchaseDate} onMonthChange={(value) => {
											setPurchaseDate(value)
											setPurchaseDatePopoverOpen(false)
										}} />
									</PopoverContent>
								</Popover>
							</FormControl>
						</FormItem>
					)}
				/>}
				<Button type="submit">Next</Button>
			</form>
		</Form>
	)
}