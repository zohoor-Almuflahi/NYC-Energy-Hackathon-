# New York's Energy Mix

Wind and other renewables grew in New York from 2023 to 2025, and they peak in opposite halves of the year. The fossil share still rose.

**[Open the demo](https://zohoor-almuflahi.github.io/NYC-Energy-Hackathon-/)**

That link is the site. A teammate can review the whole dashboard from there. The page covers generation inside New York, January 2023 through December 2025, from NYISO's real-time fuel mix.

## Walk the demo

Use the links at the top of the site, in this order:

1. **Mix.** The circle chart is the 2025 fuel share. The Year, Season, and Fuel menus change the slice and the detail panel. Numbers can show percent or TWh.
2. **36 months.** Every month from January 2023 to December 2025, stacked by fuel. Switch between % share and TWh. Fossil fuels sit at the bottom and the other fuels sit on top.
3. **Findings.** Wind grew from 3.7% to 5.3%. Other renewables grew from 1.8% to 2.3%. The line chart shows they peak in opposite halves of the year.
4. **Eco.** Three yearly bars. Eco is nuclear, hydro, wind, and other renewables. Non-eco is natural gas, dual fuel, and other fossil.
5. **Proposal.** Expand transmission, including projects like Segment A, so more of that renewable output reaches demand instead of being curtailed.

**Light mode** in the top bar switches the page to a light theme. It switches back to dark the same way.

## What we built

This is an Intermediate entry: one interactive dashboard, past the single chart the Minimum level asks for. We did not build the Advanced emissions scenarios.

The site is a static page in `site/`. It has no server and no live feed. `site/app.js` holds the 36 monthly rows from `data/nyiso_fuel_mix_monthly_2023_2025.csv`, so the charts open as soon as the page loads.

| On the page | What it answers |
| --- | --- |
| Summary cards | Total generation, largest source, fossil share, renewable share (hydro + wind + other renewables) |
| Circle chart and fuel menu | Each fuel's share, with a short description and the same fuel in 2023, 2024, and 2025 |
| 36-month stack | How the mix moves month to month, in % share or TWh |
| Findings and season chart | The two required observations, plus the seasonal complement |
| Eco bars | Whether the zero-carbon share rose with wind and other renewables |
| Proposal | The decision this could support: move more of that output to where it is used |

Fuel colors are the same on the circle chart and the 36-month stack: dual fuel, natural gas, nuclear, hydro, wind, other renewables, and other fossil.

## Findings

Each finding names a number from the monthly file.

**Wind grew from 3.7% to 5.3%.** 3.7% in 2023 (4.68 TWh), 4.7% in 2024 (6.12 TWh), 5.3% in 2025 (7.12 TWh).

**Other renewables grew from 1.8% to 2.3%.** 1.8% in 2023 (2.23 TWh), 2.1% in 2024 (2.75 TWh), 2.3% in 2025 (3.02 TWh). Other renewables here are other grid-connected renewables, including utility-scale solar and biomass.

**They peak in opposite halves of the year.** On the season chart, Index 100 is that source's own average month. Wind is stronger than its own average in the colder months. Other renewables are stronger than their own average in the warmer months. GWh per day shows the actual amounts. The chart can show the three-year average or a single year.

**Eco share still fell.** Eco is nuclear + hydro + wind + other renewables. Non-eco is natural gas + dual fuel + other fossil.

| Year | Generation | Eco | Non-eco | Fossil | Renewable (hydro + wind + other) | Largest source |
| --- | --- | --- | --- | --- | --- | --- |
| 2023 | 125.00 TWh | 49.33% | 50.67% | 50.7% | 27.3% | Dual fuel, 27.3% |
| 2024 | 130.72 TWh | 48.18% | 51.82% | 51.8% | 27.4% | Dual fuel, 27.0% |
| 2025 | 133.16 TWh | 47.22% | 52.78% | 52.8% | 25.8% | Dual fuel, 27.5% (36.67 TWh) |

Eco share changed −2.11 percentage points from 2023 to 2025, even though wind and other renewables grew. Nuclear is in Eco and is not counted in the renewable-share card.

## How we did it

We started from the hackathon question: where does New York's electricity come from, and how is the mix changing? We used the monthly file, 36 rows, one row per month. Every fuel column in those rows adds up to `total_mwh`.

Share for a fuel, a year, or a group of fuels is:

`share = fuel MWh ÷ total MWh × 100`

The seven fuel shares in a year add to 100%. The dashboard shows the result as a percent and as TWh. It does not print the division on the page. 1,000,000 MWh = 1 TWh.

The season chart compares months of different lengths. For each month, the daily rate is MWh ÷ days in that month. The index is that rate divided by the unweighted average of the twelve monthly rates, times 100. The three-year line is the average of the three yearly indexes.

Eco and non-eco use the same MWh totals. The yearly bars are those two groups as a share of that year's generation.

GitHub Pages publishes the `site` folder on every push to `main`. The workflow is `.github/workflows/pages.yml`.

We did not use the daily file, the hourly profile, or the emissions factors. Those stay available for a later pass. This demo does not estimate CO₂ and does not run a what-if scenario.

## Challenge criteria

The brief asked for a visual tool and a short demo. This is where the dashboard sits against that ask.

| The brief asked for | Where it is |
| --- | --- |
| Each fuel's share of generation, in percent | Circle chart, fuel menu, and 36-month stack in % share |
| At least one clear, working visualization | The demo link above |
| Two findings, each with a number | Wind 3.7% → 5.3%, and other renewables 1.8% → 2.3% |
| A demo of about three minutes | The walk-through below |
| Data source and time period on the work | Page heading: NYISO data, 2023 to 2025 |
| Interactive comparisons, after the first chart works | Year, season, fuel, percent or TWh, and the 36-month stack |

| What judges weigh | Weight | How this project answers it |
| --- | --- | --- |
| Data and technical execution | 30% | Shares come from the monthly MWh totals. Fuel columns match `total_mwh` in all 36 months. Months of different length are compared as a daily rate. |
| Visualization and insights | 20% | One page: the mix, the 36 months, the two findings, the seasonal complement, and the eco bars. |
| Demo and storytelling | 20% | The story is that wind and other renewables grew and cover different seasons, while the eco share fell. The script below fits in three minutes. |
| Innovation, AI, and automation | 15% | The page calculates every share and chart from the 36 rows when it loads. Filters update the mix without a new file. |
| Potential business impact | 15% | The proposal is to expand transmission, including projects like Segment A, so more renewable output reaches demand instead of being curtailed. |

Before we present:

- [x] One working visualization
- [x] Shares calculated from MWh, and the seven fuels add to 100%
- [x] Two observations, each with a number
- [x] Data source and time period stated on the page
- [ ] Advanced only: emissions factors and a what-if range. We did not take this level.

## Three-minute demo

1. **Question.** Where does New York's power come from, and are the fastest-growing renewable sources making the mix cleaner?
2. **Data.** NYISO generation inside New York, monthly, 2023 through 2025. Open the demo.
3. **Chart.** Show the 2025 circle. Dual fuel is the largest slice, 27.5%. Switch the 36-month chart between % share and TWh.
4. **Findings.** Wind 3.7% to 5.3%. Other renewables 1.8% to 2.3%. On the season chart, they peak in opposite halves of the year. Then the eco bars: 49.33% in 2023 to 47.22% in 2025.
5. **Limit.** This is generation inside New York. Imports are outside the file, and so is rooftop solar. The proposal is to expand transmission so more of the wind and other-renewable output is delivered.

## Limits to say out loud

- The data is generation inside New York. Imports from Canada, New England, PJM, and other neighbors are outside it.
- Rooftop and other behind-the-meter solar are outside it, so solar's real contribution is larger than "Other renewables" shows.
- Say "generated in New York." Generation and consumption are different things.
- Eco includes nuclear. The renewable-share card does not.

## Files

| Path | What it is |
| --- | --- |
| `site/index.html` | Page, title, navigation, and proposal |
| `site/app.js` | The 36 months and every chart |
| `site/styles.css` | Dark theme, light theme, and layout |
| `data/nyiso_fuel_mix_monthly_2023_2025.csv` | Source table: 36 rows, MWh |
| `.github/workflows/pages.yml` | Publishes `site/` to GitHub Pages |

To run the same page on your own computer, from the `site` folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. That address only works on the computer running the command. Teammates should use the demo link at the top.

## Sources

- NYISO real-time fuel mix, report P-63, aggregated to months for January 2023 through December 2025
- New York's climate targets for context: 70% renewable electricity by 2030 and a zero-emission grid by 2040
