import "./scss/App.scss";
import { useState } from 'react';
import Input from "./components/Input";
import Switch from "./components/Switch";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;

type UnitType = "F" | "C";
type MonthType = typeof MONTHS[number];
type MonthDataType = {
	monthLabel: MonthType,
	date: number,
	high: number,
	low: number
}[];

function App() {
	const [unit, setUnit] = useState<UnitType>("F");
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [monthData, setMonthData] = useState<MonthDataType>(() => {
		return [...MONTHS].reduce((monthsArray: MonthDataType, currentMonth) => {
			return [
				...monthsArray,
				{
					monthLabel: currentMonth,
					date: 1,
					high: unit === "F" ? 32 : 0,
					low: unit === "F" ? 32 : 0
				}
			]
		}, []);
	});

	function updateTempValue(
		month: MonthType, 
		temp: "high" | "low", 
		newValue: number
	) {
		setMonthData(data => {
			return [...data].map(d => {
				if (d.monthLabel !== month) return d;
				return {
					...d,
					[temp]: newValue
				}
			});
		});
	}

	function updateDateValue(month: MonthType, newValue: number) {
		setMonthData(data => {
			return [...data].map(d => {
				if (d.monthLabel !== month) return d;
				return {
					...d,
					date: newValue
				}
			});
		});
	}

	return (
		<>
			<header>
				<div className="unit-toggle-container">
					<label htmlFor="unitSwitch">
						&deg;F
					</label>
					<Switch
						id="unitSwitch"
						onUpdate={value => setUnit(value ? "C" : "F")}
					/>
					<label htmlFor="unitSwitch">
						&deg;C
					</label>
				</div>

				<h1 className='year-text'>
					<Input 
						type="number"
						value={year}
						onUpdate={value => setYear(+value)}
					/>
				</h1>
			</header>

			<main>
				{monthData.map(({ monthLabel, date, high, low }) => (
					<div 
						key={monthLabel}
						className='month-container'
					>
						<h2 className='month-label'>{ monthLabel }</h2>
						<div className='month-card'>
							<div className="date">
								<Input 
									type="number"
									value={date}
									onUpdate={value => {
										updateDateValue(monthLabel, +value);
									}}
								/>
							</div>

							<div className="temps">
								<div>
									<p>High</p>
									<p className='high-temp'>
										<Input 
											type="number"
											value={high}
											onUpdate={value => {
												updateTempValue(monthLabel, "high", +value);
											}}
										/>

										<span className="degree">
											&deg;{ unit }
										</span>
									</p>
								</div>
								<div>
									<p>Low</p>
									<p className='low-temp'>
										<Input 
											type="number"
											value={low}
											onUpdate={value => {
												updateTempValue(monthLabel, "low", +value);
											}}
										/>

										<span className="degree">
											&deg;{ unit }
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</main>
		</>
	);
}

export default App;