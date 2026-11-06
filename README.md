# New York's Energy Mix

Where does New York's electricity come from, and how does that mix change over time?

We have three years of real generation data from the New York Independent System Operator (NYISO), the organization that runs the state's power grid: January 1, 2023 through December 31, 2025. In about five hours we turn it into a visual tool and explain what it shows.

New York's climate law calls for 70% renewable electricity by 2030 and a zero-emission grid by 2040. The first step is seeing where power comes from today and how fast that is changing.

No website, live feed, or API is required. A working spreadsheet chart is a complete Minimum entry.

## What we turn in

- Each fuel's share of generation, in percent
- At least one clear, working visualization
- Two findings, each with a number behind it
- A demo of about three minutes

Finish the Minimum deliverable first. Move up only after that chart works.

## Five hours

Get the Minimum chart working by 1:30, then level up.

| When | What |
| --- | --- |
| 0:00–0:30 | Kickoff. Open the monthly file and see the columns. |
| 0:30–1:30 | Build the Minimum chart. |
| **1:30** | **Checkpoint: the chart works.** |
| 1:30–3:45 | Intermediate or Advanced, only if Minimum is done. |
| 3:45–4:30 | Write the findings and clean the chart. |
| 4:30–5:00 | Rehearse the demo. |

Split the work so nobody waits on anyone else.

| Role | Owns |
| --- | --- |
| Data lead | Loading the files, totals, and % calculations. Checks that shares add to 100%. |
| Visualization lead | Charts, labels, colors, and filters. |
| Analyst | The story: comparisons, extremes, the two observations, and emissions math. |
| Presenter | The 3-minute script and the clock. Joins whichever role is behind. |

A team of three can merge Analyst and Presenter. Use a tool the team already knows: Excel or Google Sheets, Python or R, or Power BI, Tableau, or Looker Studio. All of them can reach Advanced.

## Choose a level

| Level | Project | You must deliver | Best data file |
| --- | --- | --- | --- |
| Minimum | Basic energy mix chart | One working chart of % generation by fuel; percentage calculations shown; two observations; a brief demo | Monthly |
| Intermediate | Interactive energy dashboard | Charts or filters that compare months, seasons, days, or hours, and explain what changes | Daily + hourly profile |
| Advanced | Energy mix and emissions analyzer | Estimated CO₂ using the supplied factors, plus at least one what-if scenario comparing mixes | Monthly or daily + emissions factors |

## The data

Every one of the 26,304 hours has a reading for every fuel. The files are cleaned and open in Excel or Google Sheets. The full column list is in `Data_Dictionary.docx`.

| File | Rows | One row is | Use it for |
| --- | --- | --- | --- |
| `nyiso_fuel_mix_monthly_2023_2025.csv` | 36 | one month | Shares by year or month. Start here. |
| `nyiso_fuel_mix_daily_2023_2025.csv` | 1,096 | one day | Seasons, weekdays vs weekends, extreme days |
| `nyiso_hourly_profile_by_month_2023_2025.csv` | 864 | one hour of an average day in a month | How the mix shifts from night to evening peak |
| `emissions_factors.csv` | 7 | one fuel | Advanced CO₂ estimates |

**Units.** NYISO measures power in MW (megawatts, a rate) and energy in MWh (megawatt-hours, an amount). 1 MW running for 1 hour = 1 MWh. Daily and monthly files are in MWh. The hourly profile is average MW. 1,000 MWh = 1 GWh. 1,000,000 MWh = 1 TWh. New York's grid generated about 133 TWh in 2025.

| Fuel | What it is | Fossil? |
| --- | --- | --- |
| Dual Fuel | Plants that burn natural gas and can switch to oil. Mostly New York City and Long Island. | Yes |
| Natural Gas | Plants that burn only gas, from combined-cycle units to peakers. | Yes |
| Nuclear | Nine Mile Point, FitzPatrick, and Ginna, all upstate. | No |
| Hydro | Dams, led by NYPA's Niagara and St. Lawrence–FDR projects. | No |
| Wind | Grid-connected wind farms. | No |
| Other Renewables | Other grid-connected renewables, such as utility-scale solar and biomass. | No |
| Other Fossil Fuels | Oil or kerosene units. Usually under 1%. | Yes |

State these limits in the demo:

- The data is generation inside New York. Imports from Canada, New England, PJM, and other neighbors are outside it.
- Rooftop and other behind-the-meter solar are outside it, so solar's real contribution is larger than "Other Renewables" shows.
- Say "generated in New York." Generation and consumption are different things.

## How we build it

### Minimum: basic energy mix chart

1. Open `nyiso_fuel_mix_monthly_2023_2025.csv` and keep the 12 rows for one year.
2. Sum each fuel column for that year's MWh, then sum those for the year's total.
3. Share = fuel MWh ÷ total MWh × 100. The seven shares add to 100%.
4. Chart the shares. A sorted bar chart is easier to read than a pie with seven slices. Label each bar with its %.
5. Repeat for the other two years and compare.
6. Write two observations. Each one names a number and says what it means.

### Intermediate: interactive dashboard

Keep the Minimum chart, then add at least two ways to explore:

- A stacked bar of all 36 months, with a switch between TWh and % share
- A filter for year, season, or fuel
- The average day for a summer month vs a spring month, from the hourly profile, showing which plants ramp up for the evening peak
- Weekday vs weekend fossil share, from the daily file (`is_weekend`)
- The days with the highest and lowest fossil share, and what was happening then

### Advanced: mix and emissions

1. Join `emissions_factors.csv` to the totals on the `fuel_column` names.
2. Estimate CO₂ for each year and month.
3. Carbon intensity = tonnes CO₂ ÷ MWh generated.
4. Build at least one scenario that moves energy between sources, and compare it to the actual year.
5. Report a range from the low and high factors.

```
CO₂ (tonnes) = Σ (fuel MWh × fuel emissions factor in tCO₂/MWh)
```

| Fuel | Low | Central | High | Central assumes |
| --- | --- | --- | --- | --- |
| Natural Gas | 0.399 | 0.399 | 0.581 | Gas in a combined-cycle plant (7,535 Btu/kWh) |
| Dual Fuel | 0.399 | 0.545 | 0.765 | Gas in an older steam plant (10,293 Btu/kWh) |
| Other Fossil Fuels | 0.765 | 0.765 | 0.975 | Distillate oil in a steam plant (10,319 Btu/kWh) |
| Nuclear, Hydro, Wind, Other Renewables | 0 | 0 | 0 | No combustion emissions |

Factors are tonnes of CO₂ per MWh. They combine EIA CO₂ per unit of heat with EIA 2025 average heat rates. With the central factors, New York's grid emitted about 33.5 million tonnes in 2025, or 0.251 t per MWh. Check our math against that.

These are assumptions, not measurements. Real plant emissions depend on which units ran, how efficiently, and whether dual-fuel plants burned oil. Say that in the demo, and show how the answer moves between the low and high factors.

Scenario ideas, each moving energy from one source to another at that source's average factor:

- 10 TWh of new wind replaces dual-fuel generation
- A nuclear unit producing about 8 TWh a year retires and natural gas fills the gap
- A wet year adds 4 TWh of hydro and cuts the same amount of gas

A yearly swap is a simplification. Real grids balance supply and demand hour by hour. Treat the result as an order-of-magnitude estimate.

## Three-minute demo

Cover, in this order:

1. The question we asked
2. The data we used
3. The chart, live
4. Two or more findings
5. One limitation of the analysis

| Criterion | Weight | What judges look for |
| --- | --- | --- |
| Data & Technical Execution | 30% | Accurate analysis, sound method, sensible assumptions, technical rigor |
| Visualization & Insights | 20% | Clear charts, insights visible at a glance, the right chart type, a dashboard someone can use |
| Demo & Storytelling | 20% | A clear story, plain language, inside the time limit |
| Innovation, AI & Automation | 15% | Creative analytics, AI, machine learning, or automation of loading and processing |
| Potential Business Impact | 15% | Practical value, a real decision this could support, room to scale |

Before we present:

- [ ] One working visualization
- [ ] Percentage calculations shown, adding to 100%
- [ ] Two observations, each with a number
- [ ] Data source and time period stated on the chart or slide
- [ ] Advanced only: emissions factors and their range stated

## If we get stuck

Each of these has a real answer in the data:

- Which single source is largest? How much do natural gas and dual fuel supply together?
- Wind grew every year from 2023 to 2025. Did the zero-carbon share grow with it? If not, which source fell?
- Which month has the highest fossil share, and why would that month need more gas?
- Nuclear output is flat most of the year and drops for a few weeks in spring and fall. What causes those dips?
- How different is a hot July afternoon from a mild April afternoon, hour by hour?
- Are weekends cleaner than weekdays? By how much?

## Checks before we trust a number

- Keep the hourly profile (average MW) separate from the daily and monthly files (MWh).
- Seven shares add to 100%. A miss usually means a fuel column was left out, or the total used the wrong rows.
- Compare months with % shares or a daily average. February has fewer days than July.
- Label the chart as generation inside New York. Imports are outside this dataset.
- Use a sorted bar chart. Seven pie slices are hard to compare.

## Sources

- NYISO real-time fuel mix, report P-63: the 5-minute data behind every file in the kit
- EIA carbon dioxide emissions coefficients: CO₂ per million Btu by fuel
- EIA average heat rates by prime mover and fuel: Btu per kWh by plant type (2025 values used)
