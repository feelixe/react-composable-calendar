import dayjs from "dayjs";
import CalendarRange from "./components/calendar.tsx";
import "dayjs/locale/en-gb";
import CalendarCombo from "./components/calendar-combo.tsx";
dayjs.locale("en-gb");

export default function App() {
	return (
		<div className="grid gap-6 p-4">
			<CalendarRange />
			<CalendarCombo />
		</div>
	);
}
