const FUELS = [
  {
    key: "dual_fuel_mwh",
    name: "Dual fuel",
    fossil: true,
    renewable: false,
    color: "#2a78d6",
    about: "Plants that burn natural gas and can switch to oil. Mostly New York City and Long Island.",
  },
  {
    key: "natural_gas_mwh",
    name: "Natural gas",
    fossil: true,
    renewable: false,
    color: "#eb6834",
    about: "Plants that burn only gas, from combined-cycle units to peakers.",
  },
  {
    key: "nuclear_mwh",
    name: "Nuclear",
    fossil: false,
    renewable: false,
    color: "#1baf7a",
    about: "Nine Mile Point, FitzPatrick, and Ginna, all upstate. Zero-emission, and not counted as renewable.",
  },
  {
    key: "hydro_mwh",
    name: "Hydro",
    fossil: false,
    renewable: true,
    color: "#eda100",
    about: "Dams, led by NYPA's Niagara and St. Lawrence–FDR projects.",
  },
  {
    key: "wind_mwh",
    name: "Wind",
    fossil: false,
    renewable: true,
    color: "#e87ba4",
    about: "Grid-connected wind farms.",
  },
  {
    key: "other_renewables_mwh",
    name: "Other renewables",
    fossil: false,
    renewable: true,
    color: "#008300",
    about: "Other grid-connected renewables, including utility-scale solar and biomass. Rooftop solar is not in this file.",
  },
  {
    key: "other_fossil_mwh",
    name: "Other fossil",
    fossil: true,
    renewable: false,
    color: "#6250d6",
    about: "Oil or kerosene units. Usually under 1%.",
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
const YEARS = [2023, 2024, 2025];

// natural gas, dual fuel, nuclear, hydro, wind, other renewables, other fossil, total
const RAW = [
  [2023, 1, "Jan", "Winter", 2647071, 2230614, 2471425, 2515014, 317117, 178484, 6363, 10366088],
  [2023, 2, "Feb", "Winter", 1965276, 2518621, 2187373, 2166940, 520180, 136344, 20012, 9514746],
  [2023, 3, "Mar", "Spring", 1829051, 2362288, 2143697, 2349213, 489949, 162649, 11565, 9348412],
  [2023, 4, "Apr", "Spring", 1794058, 2063199, 1772552, 2231050, 447304, 147844, 3504, 8459511],
  [2023, 5, "May", "Spring", 1914483, 2250960, 2458572, 2300320, 330457, 204641, 2064, 9461497],
  [2023, 6, "Jun", "Summer", 2605558, 3063486, 2374817, 2028916, 214409, 194917, 2911, 10485014],
  [2023, 7, "Jul", "Summer", 3632059, 4699530, 2394760, 2316127, 233107, 207995, 47932, 13531510],
  [2023, 8, "Aug", "Summer", 2850572, 3679112, 2416121, 2344227, 298609, 212962, 20384, 11821987],
  [2023, 9, "Sep", "Fall", 2651427, 3243836, 2117568, 2113718, 213372, 198219, 32435, 10570575],
  [2023, 10, "Oct", "Fall", 2287306, 2332811, 2399656, 2157302, 450958, 190985, 9444, 9828462],
  [2023, 11, "Nov", "Fall", 2392281, 2924439, 2379298, 2221031, 623610, 194150, 8197, 10743006],
  [2023, 12, "Dec", "Winter", 2526215, 2700304, 2452672, 2440816, 544946, 196684, 6154, 10867791],
  [2024, 1, "Jan", "Winter", 2641483, 3076616, 2460415, 2529494, 535249, 182299, 16241, 11441797],
  [2024, 2, "Feb", "Winter", 2399791, 2654509, 2295857, 2402828, 555588, 184635, 12365, 10505573],
  [2024, 3, "Mar", "Spring", 2261429, 2458271, 1716707, 2579604, 668033, 203217, 1526, 9888787],
  [2024, 4, "Apr", "Spring", 2006457, 2108287, 2402617, 2390268, 594694, 202450, 3168, 9707941],
  [2024, 5, "May", "Spring", 2180499, 2701460, 2467736, 2270069, 385478, 243463, 3288, 10251993],
  [2024, 6, "Jun", "Summer", 2887864, 3334638, 2363117, 2131211, 454670, 236711, 24807, 11433018],
  [2024, 7, "Jul", "Summer", 3494521, 4607642, 2409170, 2369325, 279682, 265693, 43416, 13469449],
  [2024, 8, "Aug", "Summer", 3180098, 3868161, 2200827, 2219221, 344726, 255373, 19830, 12088236],
  [2024, 9, "Sep", "Fall", 3016537, 2670585, 1798123, 1933105, 351016, 258256, 2048, 10029670],
  [2024, 10, "Oct", "Fall", 2881042, 2150940, 2237740, 1898506, 545960, 259977, 1909, 9976074],
  [2024, 11, "Nov", "Fall", 2614859, 2288204, 2348035, 1985125, 734046, 237526, 1719, 10209514],
  [2024, 12, "Dec", "Winter", 2721994, 3395175, 2436340, 2267314, 670807, 215799, 14457, 11721886],
  [2025, 1, "Jan", "Winter", 2659106, 3548904, 2432100, 2190901, 850166, 207780, 34105, 11923062],
  [2025, 2, "Feb", "Winter", 2645968, 2988714, 2188874, 1733956, 635947, 196444, 7746, 10397649],
  [2025, 3, "Mar", "Spring", 2228039, 2420550, 2196182, 2238593, 945623, 245378, 749, 10275114],
  [2025, 4, "Apr", "Spring", 2221101, 1973903, 2304788, 2142257, 724471, 273700, 2823, 9643043],
  [2025, 5, "May", "Spring", 2169895, 2120730, 2483500, 2347560, 540793, 256721, 2287, 9921486],
  [2025, 6, "Jun", "Summer", 2904557, 3410821, 2386335, 2101608, 492553, 278688, 38255, 11612817],
  [2025, 7, "Jul", "Summer", 3773275, 5272367, 2413395, 2051682, 316427, 301777, 81990, 14210913],
  [2025, 8, "Aug", "Summer", 3403641, 3873343, 2437491, 1881684, 304154, 311755, 17878, 12229946],
  [2025, 9, "Sep", "Fall", 2667762, 2980856, 2359269, 1697469, 258616, 271780, 3056, 10238808],
  [2025, 10, "Oct", "Fall", 2652699, 2267190, 2453643, 1725771, 492714, 246581, 3400, 9841998],
  [2025, 11, "Nov", "Fall", 2927484, 2149763, 2342049, 2024870, 731406, 217741, 1684, 10394997],
  [2025, 12, "Dec", "Winter", 3153829, 3662345, 2488093, 2112358, 829435, 213777, 9660, 12469497],
];

const ROWS = RAW.map(([year, month, name, season, gas, dual, nuclear, hydro, wind, otherR, otherF, total]) => ({
  year,
  month,
  name,
  season,
  natural_gas_mwh: gas,
  dual_fuel_mwh: dual,
  nuclear_mwh: nuclear,
  hydro_mwh: hydro,
  wind_mwh: wind,
  other_renewables_mwh: otherR,
  other_fossil_mwh: otherF,
  total_mwh: total,
}));

const state = {
  year: "2025",
  season: "all",
  month: null,
  fuel: "dual_fuel_mwh",
  unit: "share",
  seasonYear: "avg",
  seasonMode: "index",
  stackMode: "share",
};

const dashboard = document.querySelector("#dashboard");

function pct(part, total) {
  if (!total) return 0;
  return (part / total) * 100;
}

function formatPct(value) {
  if (value > 0 && value < 0.05) return "<0.1%";
  return `${value.toFixed(1)}%`;
}

function formatTwh(mwh) {
  return `${(mwh / 1e6).toFixed(2)} TWh`;
}

function fuelByKey(key) {
  return FUELS.find((fuel) => fuel.key === key);
}

function rowsFor(year, season, month) {
  return ROWS.filter((row) => {
    if (year !== "all" && row.year !== Number(year)) return false;
    if (month) return row.month === month;
    if (season !== "all") return row.season === season;
    return true;
  });
}

function activeRows() {
  return rowsFor(state.year, state.season, state.month);
}

function totals(rows) {
  const sums = { total_mwh: 0 };
  FUELS.forEach((fuel) => {
    sums[fuel.key] = 0;
  });
  rows.forEach((row) => {
    sums.total_mwh += row.total_mwh;
    FUELS.forEach((fuel) => {
      sums[fuel.key] += row[fuel.key];
    });
  });
  return sums;
}

function sliceLabel() {
  const yearText = state.year === "all" ? "2023–2025" : String(state.year);
  if (state.month) return `${MONTHS[state.month - 1]} ${yearText}`;
  if (state.season !== "all") return `${state.season} ${yearText}`;
  return yearText;
}

function rankedFuels(sums) {
  return [...FUELS].sort((a, b) => sums[b.key] - sums[a.key]);
}

function groupShare(sums, predicate) {
  const mwh = FUELS.filter(predicate).reduce((sum, fuel) => sum + sums[fuel.key], 0);
  return { mwh, share: pct(mwh, sums.total_mwh) };
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function dailyRate(year, month, key) {
  const row = ROWS.find((item) => item.year === year && item.month === month);
  return row[key] / daysInMonth(year, month);
}

function monthIndex(year, key) {
  const rates = MONTHS.map((_, index) => dailyRate(year, index + 1, key));
  const average = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
  return rates.map((rate) => (rate / average) * 100);
}

function complementSeries() {
  const years = state.seasonYear === "avg" ? YEARS : [Number(state.seasonYear)];
  if (state.seasonMode === "index") {
    const windSets = years.map((year) => monthIndex(year, "wind_mwh"));
    const otherSets = years.map((year) => monthIndex(year, "other_renewables_mwh"));
    const average = (sets) => sets[0].map((_, index) => sets.reduce((sum, set) => sum + set[index], 0) / sets.length);
    return { wind: average(windSets), other: average(otherSets) };
  }
  const wind = [];
  const other = [];
  for (let month = 1; month <= 12; month += 1) {
    let windMwh = 0;
    let otherMwh = 0;
    let days = 0;
    years.forEach((year) => {
      const row = ROWS.find((item) => item.year === year && item.month === month);
      windMwh += row.wind_mwh;
      otherMwh += row.other_renewables_mwh;
      days += daysInMonth(year, month);
    });
    wind.push(windMwh / days / 1000);
    other.push(otherMwh / days / 1000);
  }
  return { wind, other };
}

function chartValue(value) {
  return state.seasonMode === "index" ? String(Math.round(value)) : value.toFixed(1);
}

function options(pairs, selected) {
  return pairs
    .map(([value, label]) => `<option value="${value}"${String(selected) === String(value) ? " selected" : ""}>${label}</option>`)
    .join("");
}

function renderToolbar() {
  const years = options(
    [["2025", "2025"], ["2024", "2024"], ["2023", "2023"], ["all", "All years"]],
    state.year,
  );
  const seasons = options(
    [["all", "All seasons"], ...SEASONS.map((season) => [season, season])],
    state.month ? "all" : state.season,
  );
  const units = options(
    [["share", "Percent"], ["energy", "TWh"]],
    state.unit,
  );
  const fuels = options(
    FUELS.map((fuel) => [fuel.key, fuel.name]),
    state.fuel,
  );
  return `
    <div class="toolbar">
      <label class="control">Year<select data-action="year">${years}</select></label>
      <label class="control">Season<select data-action="season">${seasons}</select></label>
      <label class="control">Numbers<select data-action="unit">${units}</select></label>
      <label class="control">Fuel<select data-action="fuel">${fuels}</select></label>
      <button type="button" class="text-button" data-action="reset">Reset</button>
    </div>`;
}

function renderStats(sums) {
  const ranked = rankedFuels(sums);
  const top = ranked[0];
  const fossil = groupShare(sums, (fuel) => fuel.fossil);
  const renewable = groupShare(sums, (fuel) => fuel.renewable);
  return `
    <section class="stats" aria-label="Summary for ${sliceLabel()}">
      <article class="stat">
        <span class="stat-value">${formatTwh(sums.total_mwh)}</span>
        <span class="stat-label">Generated in ${sliceLabel()}</span>
      </article>
      <article class="stat">
        <span class="stat-value">${formatPct(pct(sums[top.key], sums.total_mwh))}</span>
        <span class="stat-label">Largest source, ${top.name}</span>
      </article>
      <article class="stat warn">
        <span class="stat-value">${formatPct(fossil.share)}</span>
        <span class="stat-label">Fossil share</span>
      </article>
      <article class="stat good">
        <span class="stat-value">${formatPct(renewable.share)}</span>
        <span class="stat-label">Renewable share, hydro + wind + other</span>
      </article>
    </section>`;
}

function piePath(cx, cy, radius, start, end) {
  const x1 = cx + radius * Math.cos(start);
  const y1 = cy + radius * Math.sin(start);
  const x2 = cx + radius * Math.cos(end);
  const y2 = cy + radius * Math.sin(end);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

function renderBars(sums) {
  const total = sums.total_mwh || 1;
  let angle = -Math.PI / 2;
  const slices = FUELS.map((fuel) => {
    const share = sums[fuel.key] / total;
    const start = angle;
    const end = angle + share * Math.PI * 2;
    angle = end;
    return { fuel, share, start, end };
  });
  const paths = slices
    .filter((slice) => slice.share > 0)
    .map((slice) => {
      const { fuel, share, start, end } = slice;
      const pressed = state.fuel === fuel.key;
      const dim = state.fuel && !pressed ? " dim" : "";
      const mid = (start + end) / 2;
      const labelAt = 62;
      const x = (100 + labelAt * Math.cos(mid)).toFixed(2);
      const y = (100 + labelAt * Math.sin(mid)).toFixed(2);
      const ink = fuel.color === "#eda100" || fuel.color === "#e87ba4" ? "#172033" : "#ffffff";
      const label = share >= 0.12 ? `<text x="${x}" y="${y}" fill="${ink}" text-anchor="middle" dominant-baseline="middle">${formatPct(share * 100)}</text>` : "";
      return `
        <g class="pie-slice${dim}" data-action="fuel" data-value="${fuel.key}" tabindex="0" role="button" aria-pressed="${pressed}" aria-label="${fuel.name}, ${formatPct(share * 100)}">
          <path d="${piePath(100, 100, 96, start, end)}" fill="${fuel.color}"></path>
          ${label}
        </g>`;
    })
    .join("");
  const legend = FUELS.map((fuel) => {
    const share = pct(sums[fuel.key], total);
    const value = state.unit === "share" ? formatPct(share) : formatTwh(sums[fuel.key]);
    return `
      <button type="button" class="pie-key" data-action="fuel" data-value="${fuel.key}" aria-pressed="${state.fuel === fuel.key}">
        <span class="swatch" style="background:${fuel.color}"></span>
        <span>${fuel.name}</span>
        <span class="pie-key-value">${value}</span>
      </button>`;
  }).join("");
  return `
    <section class="panel" aria-label="Share of generation by fuel">
      <h2>Share of generation, ${sliceLabel()}</h2>
      <div class="pie-wrap">
        <svg class="pie" viewBox="0 0 200 200" role="group" aria-label="Seven fuel shares, ${sliceLabel()}">${paths}</svg>
        <div class="pie-legend">${legend}</div>
      </div>
    </section>`;
}

function renderDetail(sums) {
  const fuel = fuelByKey(state.fuel) || FUELS[0];
  const share = pct(sums[fuel.key], sums.total_mwh);
  const mwh = sums[fuel.key];
  const yearly = [2023, 2024, 2025].map((year) => {
    const yearSums = totals(rowsFor(String(year), "all", null));
    return { year, share: pct(yearSums[fuel.key], yearSums.total_mwh) };
  });
  const pills = yearly
    .map((item) => {
      const pressed = String(state.year) === String(item.year) && !state.month && state.season === "all";
      return `<button type="button" class="year-pill" data-action="year" data-value="${item.year}" aria-pressed="${pressed}"><strong>${formatPct(item.share)}</strong><span>${item.year}</span></button>`;
    })
    .join("");
  return `
    <aside class="panel detail">
      <p class="tag">${fuel.fossil ? "Fossil" : "Not fossil"}${fuel.renewable ? " · Renewable" : ""}</p>
      <h3>${fuel.name}</h3>
      <p>${fuel.about}</p>
      <p class="share-line">${formatPct(share)} · ${formatTwh(mwh)} in ${sliceLabel()}</p>
      <div class="year-pills">${pills}</div>
    </aside>`;
}

function renderSeasonChart() {
  const windFuel = fuelByKey("wind_mwh");
  const otherFuel = fuelByKey("other_renewables_mwh");
  const series = complementSeries();
  const indexMode = state.seasonMode === "index";
  const min = indexMode ? 30 : 0;
  const max = indexMode ? 180 : 36;
  const width = 1000;
  const height = 280;
  const pad = { l: 46, r: 16, t: 16, b: 32 };
  const xAt = (index) => pad.l + (index / 11) * (width - pad.l - pad.r);
  const yAt = (value) => pad.t + (1 - (value - min) / (max - min)) * (height - pad.t - pad.b);
  const pathFor = (values) => values.map((value, index) => `${index ? "L" : "M"}${xAt(index).toFixed(1)} ${yAt(value).toFixed(1)}`).join(" ");
  const ticks = indexMode ? [40, 70, 100, 130, 160] : [0, 10, 20, 30];
  const grid = ticks
    .map((tick) => {
      const y = yAt(tick).toFixed(1);
      return `<line x1="${pad.l}" y1="${y}" x2="${width - pad.r}" y2="${y}"></line><text x="${pad.l - 8}" y="${y}" text-anchor="end" dominant-baseline="middle">${tick}</text>`;
    })
    .join("");
  const months = MONTHS.map((name, index) => `<text class="month-label" x="${xAt(index).toFixed(1)}" y="${height - 8}" text-anchor="middle">${name}</text>`).join("");
  const dots = (values, fuel) => values
    .map((value, index) => `<circle cx="${xAt(index).toFixed(1)}" cy="${yAt(value).toFixed(1)}" r="4.5" fill="${fuel.color}"><title>${MONTHS[index]}, ${fuel.name}, ${chartValue(value)}${indexMode ? "" : " GWh/day"}</title></circle>`)
    .join("");
  const baseline = indexMode ? `<line class="baseline" x1="${pad.l}" y1="${yAt(100).toFixed(1)}" x2="${width - pad.r}" y2="${yAt(100).toFixed(1)}"></line>` : "";
  const yearOptions = options(
    [["avg", "3-year avg"], ["2023", "2023"], ["2024", "2024"], ["2025", "2025"]],
    state.seasonYear,
  );
  const modeOptions = options(
    [["index", "Index"], ["gwh", "GWh per day"]],
    state.seasonMode,
  );
  const axis = indexMode
    ? "Index, each source's own average = 100. Above 100 means stronger than usual for that source."
    : "Average generation, GWh per day.";
  return `
    <div class="chart-block">
      <div class="section-head">
        <div>
          <h3>By season: they peak in opposite halves of the year</h3>
          <p class="chart-note">${axis}</p>
        </div>
        <div class="chart-controls">
          <label class="control">Years<select data-action="seasonYear">${yearOptions}</select></label>
          <label class="control">Show<select data-action="seasonMode">${modeOptions}</select></label>
        </div>
      </div>
      <div class="legend">
        <span class="legend-key"><span class="swatch" style="background:${windFuel.color}"></span>Wind</span>
        <span class="legend-key"><span class="swatch" style="background:${otherFuel.color}"></span>Other renewables</span>
      </div>
      <svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Wind and other renewables by month">
        <g class="grid">${grid}</g>
        ${baseline}
        <path d="${pathFor(series.wind)}" fill="none" stroke="${windFuel.color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"></path>
        <path d="${pathFor(series.other)}" fill="none" stroke="${otherFuel.color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"></path>
        ${dots(series.wind, windFuel)}
        ${dots(series.other, otherFuel)}
        ${months}
      </svg>
    </div>`;
}

const ECO_KEYS = ["nuclear_mwh", "hydro_mwh", "wind_mwh", "other_renewables_mwh"];
const NON_ECO_KEYS = ["natural_gas_mwh", "dual_fuel_mwh", "other_fossil_mwh"];

function groupMwh(row, keys) {
  return keys.reduce((sum, key) => sum + row[key], 0);
}

function renderEco() {
  const yearly = YEARS.map((year) => {
    const sums = totals(rowsFor(String(year), "all", null));
    const ecoMwh = groupMwh(sums, ECO_KEYS);
    const nonMwh = groupMwh(sums, NON_ECO_KEYS);
    return {
      year,
      eco: pct(ecoMwh, sums.total_mwh),
      non: pct(nonMwh, sums.total_mwh),
    };
  });
  const change = (yearly[2].eco - yearly[0].eco).toFixed(2);
  const bars = yearly
    .map((row) => `
      <div class="eco-row">
        <span class="eco-year">${row.year}</span>
        <div class="eco-bar" aria-label="${row.year}: eco ${row.eco.toFixed(2)}%, non-eco ${row.non.toFixed(2)}%">
          <span class="eco-part" style="width:${row.eco}%">Eco ${row.eco.toFixed(2)}%</span>
          <span class="non-part" style="width:${row.non}%">Non-eco ${row.non.toFixed(2)}%</span>
        </div>
      </div>`)
    .join("");
  return `
    <section class="panel" id="eco" aria-label="Eco versus non-eco share">
      <h2>Eco vs non-eco share of New York generation</h2>
      <p class="chart-note">Eco share changed ${change} percentage points from 2023 to 2025, even though Wind and Other Renewables grew.</p>
      <div class="eco-chart">${bars}</div>
      <div class="legend">
        <span class="legend-key"><span class="swatch eco-swatch"></span>Eco (Nuclear, Hydro, Wind, Other Renewables)</span>
        <span class="legend-key"><span class="swatch non-swatch"></span>Non-eco (Natural Gas, Dual Fuel, Other Fossil)</span>
      </div>
    </section>`;
}

const STACK_ORDER = [
  "natural_gas_mwh",
  "dual_fuel_mwh",
  "other_fossil_mwh",
  "nuclear_mwh",
  "hydro_mwh",
  "wind_mwh",
  "other_renewables_mwh",
];

function renderMonthStack() {
  const shareMode = state.stackMode === "share";
  const maxTwh = 15;
  const ticks = shareMode
    ? [["100%", 0], ["75%", 25], ["50%", 50], ["25%", 75], ["0%", 100]]
    : [["15", 0], ["12", 20], ["9", 40], ["6", 60], ["3", 80], ["0", 100]];
  const axis = ticks.map(([label, top]) => `<span style="top:${top}%">${label}</span>`).join("");
  const columns = ROWS.map((row) => {
    const parts = STACK_ORDER.map((key) => {
      const fuel = fuelByKey(key);
      const share = pct(row[key], row.total_mwh);
      const height = shareMode ? share : (row[key] / row.total_mwh) * 100;
      return `<span style="height:${height}%;background:${fuel.color}"></span>`;
    }).join("");
    const tip = [`${MONTHS[row.month - 1]} ${row.year}: ${formatTwh(row.total_mwh)}`]
      .concat(STACK_ORDER.slice().reverse().map((key) => {
        const fuel = fuelByKey(key);
        return `${fuel.name}: ${(row[key] / 1e6).toFixed(2)} TWh, ${pct(row[key], row.total_mwh).toFixed(1)}%`;
      }))
      .join("&#10;");
    const columnHeight = shareMode ? 100 : (row.total_mwh / 1e6 / maxTwh) * 100;
    return `<div class="month-col" style="height:${columnHeight}%" title="${tip}">${parts}</div>`;
  }).join("");
  const labels = ROWS.map((row) => `<span>${row.month === 1 ? row.year : ""}</span>`).join("");
  const legend = STACK_ORDER.map((key) => {
    const fuel = fuelByKey(key);
    const group = fuel.fossil ? "Non-eco" : "Eco";
    return `<span class="legend-key"><span class="swatch" style="background:${fuel.color}"></span>${fuel.name} (${group})</span>`;
  }).join("");
  const modeOptions = options([["share", "% share"], ["twh", "TWh"]], state.stackMode);
  return `
    <section class="panel" id="months" aria-label="All 36 months stacked by fuel">
      <div class="section-head">
        <div>
          <h2>All 36 months, stacked by fuel</h2>
          <p class="chart-note">Fossil fuels sit at the bottom. Eco fuels sit on top.</p>
        </div>
        <label class="control">Show<select data-action="stackMode">${modeOptions}</select></label>
      </div>
      <div class="month-stack">
        <div class="month-axis">${axis}</div>
        <div class="month-plot">${columns}</div>
      </div>
      <div class="month-labels"><span></span><div class="month-label-row">${labels}</div></div>
      <div class="legend stack-legend">${legend}</div>
    </section>`;
}

function renderFindings() {
  const windPressed = state.fuel === "wind_mwh";
  const otherPressed = state.fuel === "other_renewables_mwh";
  return `
    <section class="panel" id="findings" aria-label="Findings">
      <h2>Findings</h2>
      <div class="findings">
        <button type="button" class="finding" data-action="finding" data-value="wind_mwh" aria-pressed="${windPressed}">
          <strong>Wind grew from 3.7% to 5.3%.</strong>
          <p>3.7% in 2023 (4.68 TWh), 4.7% in 2024 (6.12 TWh), 5.3% in 2025 (7.12 TWh).</p>
        </button>
        <button type="button" class="finding" data-action="finding" data-value="other_renewables_mwh" aria-pressed="${otherPressed}">
          <strong>Other renewables grew from 1.8% to 2.3%.</strong>
          <p>1.8% in 2023 (2.23 TWh), 2.1% in 2024 (2.75 TWh), 2.3% in 2025 (3.02 TWh).</p>
        </button>
      </div>
      ${renderSeasonChart()}
    </section>`;
}

function render() {
  const active = document.activeElement;
  const restore = active && active.dataset ? { ...active.dataset } : null;
  const sums = totals(activeRows());
  dashboard.innerHTML = `
    ${renderToolbar()}
    ${renderStats(sums)}
    <div class="layout" id="mix">
      ${renderBars(sums)}
      ${renderDetail(sums)}
    </div>
    <div class="stack">${renderMonthStack()}</div>
    <div class="stack">${renderFindings()}</div>
    <div class="stack">${renderEco()}</div>
  `;
  if (!restore || !restore.action) return;
  const selector = restore.value
    ? `[data-action="${restore.action}"][data-value="${restore.value}"]`
    : `[data-action="${restore.action}"]`;
  const next = dashboard.querySelector(selector);
  if (next) next.focus();
}

dashboard.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const target = event.target.closest("[data-action]");
  if (!target || target.tagName === "BUTTON") return;
  event.preventDefault();
  target.click();
});

function applyAction(action, value) {
  if (action === "year") {
    state.year = value;
    state.month = null;
    state.season = "all";
  } else if (action === "season") {
    state.season = value;
    state.month = null;
  } else if (action === "unit") {
    state.unit = value;
  } else if (action === "fuel") {
    state.fuel = value;
  } else if (action === "yearbar") {
    const [year, fuel] = value.split(":");
    state.year = year;
    state.season = "all";
    state.month = null;
    state.fuel = fuel;
  } else if (action === "finding") {
    state.fuel = value;
    state.unit = "share";
  } else if (action === "seasonYear") {
    state.seasonYear = value;
  } else if (action === "seasonMode") {
    state.seasonMode = value;
  } else if (action === "stackMode") {
    state.stackMode = value;
  } else if (action === "reset") {
    state.year = "2025";
    state.season = "all";
    state.month = null;
    state.fuel = "dual_fuel_mwh";
    state.unit = "share";
    state.seasonYear = "avg";
    state.seasonMode = "index";
    state.stackMode = "share";
  }
  render();
}

dashboard.addEventListener("change", (event) => {
  const target = event.target.closest("select[data-action]");
  if (!target) return;
  applyAction(target.dataset.action, target.value);
});

dashboard.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target || target.tagName === "SELECT") return;
  applyAction(target.dataset.action, target.dataset.value);
});

const themeButton = document.querySelector("#theme-toggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("ny-theme", theme);
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.content = theme;
  if (!themeButton) return;
  const showingDark = theme === "dark";
  themeButton.textContent = showingDark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-pressed", showingDark ? "false" : "true");
}

applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
if (themeButton) {
  themeButton.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next);
  });
}

const mismatches = ROWS.filter((row) => {
  const sum = FUELS.reduce((total, fuel) => total + row[fuel.key], 0);
  return sum !== row.total_mwh;
});
if (mismatches.length) {
  dashboard.innerHTML = `<p class="footnote">The fuel columns do not add up to total_mwh in ${mismatches.length} months.</p>`;
} else {
  render();
}
