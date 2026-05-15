---
layout: analysis
title: "Who Waits Longest for City Services?"
description: "An analysis of 500K+ 311 service requests finds that San Antonio's lower-income council districts wait longer for city responses — and file more requests to begin with."
tag: City Services
date: 2026-03-18
github: https://github.com/CivicDataSA
findings:
  - District 2 filed 57,431 requests — the most of any district — with the lowest median income
  - 17.6% of all requests citywide were closed late
  - As median household income rises across districts, resolution time consistently falls
methods:
  - 311 records from Open Data SA
  - Income from ACS 5-Year Estimates
  - Matched to council districts via zip code
github: https://github.com
search_tags: [311, council district, census, spatial, income, neighborhood, housing]
---

San Antonio processes hundreds of thousands of 311 requests every year — potholes, stray animals, broken streetlights, dangerous structures. Behind each request is a resident waiting for the city to respond. This analysis asks a simple question: does where you live predict how long you wait?

The answer is yes.

Across San Antonio's 10 council districts, median household income is a consistent predictor of how quickly the city closes a service request. The lowest-income districts wait the longest. The wealthiest districts wait the least — and file fewer requests to begin with.

<img src="{{ site.baseurl }}/assets/images/sa_311_basemap.png" alt="Choropleth map of average 311 resolution time by council district" style="width:75%; display:block; margin: 1.5rem auto;">

The pattern is geographic and hard to dismiss. The inner south and east sides — Districts 2, 3, and 5 — are consistently the darkest on the map. Districts 8, 9, and 10 in the north are the lightest.

## The numbers

District 2 filed more 311 requests than any other district — 57,431 between February 2022 and December 2025 — while averaging over 25 days to close them. District 10, with a median household income nearly $30,000 higher, closes requests in under 15 days on average. Each bubble is a council district. Size and color reflect total request volume, from yellow (highest) to blue (lowest). As income rises, resolution time falls. The city's wealthiest districts not only wait less, they ask for less.

The pattern holds across the board — but not always for the same reasons.

Citywide, 17.6% of all requests were closed late. Some categories are slow regardless of district — pavement marking changes average 447 days to resolve, and homeless outreach requests average 341. These aren't outliers. They signal categories where the city's response system is failing residents broadly, with compounding effects in districts that file the most of them.

<img src="{{ site.baseurl }}/assets/images/income_vs_resolution_volume_scatter.png" alt="Scatter plot of median household income vs resolution time by council district, sized by request volume" style="width:75%; display:block; margin: 1.5rem auto;">

## Digging deeper into Districts 2 and 5

Districts 2 and 5 both sit in the darker end of the map, but they got there differently. D2 and D5 file nearly identical volumes of the city's hardest request types — homeless encampments, sanitation complaints, encampment abatement. But D2 resolves them more slowly. Homeless encampment requests take 49.5 days in D2 versus 42 in D5. Homeless outreach takes 474 days in D2 — more than three times D5's 147.

| Request Type | D2 requests | D5 requests | D10 requests | D2 median days | D5 median days | D10 median days |
|---|---:|---:|---:|---:|---:|---:|
| Homeless Encampment | 220 | 250 | 130 | 49.5 | 42 | 46.5 |
| General Sanitation | 60 | 63 | 40 | 2 | 2 | 3 |
| Encampment Abatement | 5 | 2 | 5 | 19 | 14 | 21 |
| Homeless Outreach | 2 | 1 | 0 | 474 | 147 | — |

<br>
For D5, the slower overall average is driven largely by what residents are asking for — more of the request types that take weeks to close regardless of where they're filed. For D2, the gap reflects both: similar volumes of difficult requests and slower resolution within those categories. The city is slower in D2 even when the problem is the same.

## What this means

The data tells two stories. In District 2, residents file more requests and wait longer — a straightforward gap in service speed that tracks closely with income. In District 5, the wait is driven less by how the city responds and more by what residents are contending with: homeless encampments, sanitation complaints, conditions that take weeks to resolve and fall disproportionately on the city's lowest-income neighborhoods. Both stories point to the same underlying question: when resources and attention are finite, who bears the cost of that scarcity?

## Caveats

A few limitations worth noting. 311 data reflects reported issues only — lower-income neighborhoods may underreport relative to actual need, likely understating the gaps shown here. Resolution time includes weekends and holidays and varies by category depending on whether formal service-level agreements exist. District 2's higher overall request volume may also contribute to its slower resolution times in ways this analysis cannot fully account for without operational data. The D2 and D5 request type comparison covers four categories and shouldn't be read as a complete picture of service equity across either district.
