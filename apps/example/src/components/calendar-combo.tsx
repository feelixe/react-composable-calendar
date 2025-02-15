import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ComponentProps } from "react";
import * as Calendar from "react-composable-calendar";

function Button(props: ComponentProps<"button">) {
	const { children, className, ...rest } = props;

	return (
		<button
			className="cursor-pointer rounded-lg border border-gray-300 p-2"
			{...rest}
		>
			{children}
		</button>
	);
}

export function range(length: number) {
	return [...new Array(length)].map((_, i) => i);
}

export default function CalendarCombo() {
	return (
		<div className="p-4">
			<Calendar.Root
				mode="range"
				className="max-w-xl rounded-md border border-gray-300 px-4 pt-3 pb-2 shadow"
			>
				<Calendar.FormInputRange nameFrom="startDate" nameTo="endDate" />
				<div className="mb-2 flex items-center justify-end gap-2">
					<Calendar.OffsetViewButton asChild offset={-1}>
						<Button>
							<ChevronLeftIcon className="size-3" />
						</Button>
					</Calendar.OffsetViewButton>
					<Calendar.OffsetViewButton asChild offset={1}>
						<Button>
							<ChevronRightIcon className="size-3" />
						</Button>
					</Calendar.OffsetViewButton>
					<div className="grow" />
					<Calendar.ValueLabel className="text-sm" />
				</div>

				<div className="grid grid-cols-2 gap-6">
					{range(2).map((viewIndex) => (
						<Calendar.View key={viewIndex} viewOffset={viewIndex}>
							<Calendar.MonthTitle className="mb-4 flex items-center justify-center" />
							<Calendar.Weekdays className="mb-2 grid grid-cols-7 font-light text-gray-500 text-sm">
								<Calendar.WeekdayLabel className="flex items-center justify-center" />
							</Calendar.Weekdays>
							<Calendar.Days className="grid grid-cols-7 gap-y-1">
								<Calendar.Day className="group relative aspect-square w-full cursor-pointer">
									<Calendar.DayInRange className="absolute top-0 right-0 bottom-0 left-0 bg-black/10 data-end:rounded-r-lg data-start:rounded-l-lg" />
									<div className="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center rounded-lg group-data-[selected]:bg-black">
										<Calendar.DayLabel className="group-data-[neighboring]:text-gray-400 group-data-[selected]:text-white" />
									</div>
								</Calendar.Day>
							</Calendar.Days>
						</Calendar.View>
					))}
				</div>
			</Calendar.Root>
		</div>
	);
}
