---
layout: analysis
title: "San Antonio Moves More Riders for Less Money"
description: "Using National Transit Database data from 2019–2024, this analysis compares VIA Metropolitan Transit and Austin's CapMetro across four performance metrics: farebox recovery, cost per rider, riders per revenue mile, and ridership recovery."
tag: Transit
date: 2026-04-03
github: https://github.com/CivicDataSA/VIAOperations
findings:
  - VIA moved 30.7 million riders in 2024 at $8.55 per trip — CapMetro moved fewer riders at $14.75
  - The cost per rider gap has widened every year since 2020, reaching nearly $6 in 2024
  - Neither agency has returned to 2019 ridership levels — VIA at 72%, CapMetro at 85%
methods:
  - NTD Time Series TS2.2 data, Federal Transit Administration
  - Report years 2019–2024
search_tags: [transit, VIA, CapMetro, NTD, ridership, farebox, cost per rider, public transit, Austin, San Antonio]
---

Transit in San Antonio is funded largely by local sales tax, meaning every resident pays into the system whether they ride or not. That makes efficiency not just an operational question but a civic one. How well is that public money actually working?

To answer that question, this analysis pulls National Transit Database figures for VIA Metropolitan Transit and Austin's Capital Metro from 2019 through 2024, across four metrics: what share of costs fares cover, how much it costs to move one rider, how well each system fills its service with actual passengers, and how ridership has recovered from the pandemic collapse.

The headline finding is straightforward: VIA moves more riders at lower cost. What's less obvious is what that gap reveals about two cities taking different approaches to public transit.

## Efficiency

In 2024, VIA moved roughly 30.7 million riders at $8.55 per trip. CapMetro moved 26.5 million at $14.75 — nearly double. That gap has widened every year since 2020 and is the most direct measure of what each agency extracts from its operating budget.

Some of CapMetro's rising costs reflect deliberate investment. Project Connect, Austin's multibillion-dollar transit expansion, has added service and infrastructure ahead of the ridership growth it's designed to attract. This isn't a sign of mismanagement, but rather a deliberate allocation of resources toward long-term infrastructure goals. But it does mean Austin residents are currently paying more per ride, with the payoff still pending.

Earlier in the recovery period, VIA was ahead on this measure. By 2024, CapMetro had pulled to 1.04 riders per revenue mile versus VIA's 0.96. Austin's expanded network appears to be attracting the demand it was built for. VIA's utilization is still climbing back.

## Farebox recovery

Farebox recovery measures what share of operating costs an agency recoups through fares. No U.S. transit system covers its full costs this way; the question is how wide the gap is. VIA recovered about 6.5% of operating costs through fares in 2024, down from 10.3% in 2019. CapMetro's fell more sharply, to 4.1%.

Part of that drop has a specific, documented cause. In 2024, CapMetro experienced a prolonged farebox system failure. Validators went offline for over a month, drivers were told to wave riders through, and more than two million transactions were lost. According to [reporting by KUT News](https://www.kut.org/transportation/2025-03-27/austin-tx-capmetro-app-umo-fare), the agency acknowledged it could never fully reconstruct the revenue lost. The 2024 NTD fare figure likely understates what CapMetro would have collected under normal operations, making this metric less comparable for that year.

## Ridership recovery

![VIA vs CapMetro system performance charts showing farebox recovery, cost per trip, riders per revenue mile, and ridership recovery 2019–2024]({{ site.baseurl }}/assets/images/ntd_comparison.png)
*National Transit Database, 2019–2024. VIA Metropolitan Transit and Capital Metropolitan Transportation Authority.*

Neither system has returned to 2019 ridership levels. VIA carried 72% of its pre-pandemic trips in 2024; CapMetro reached 85%. That gap matters because pre-pandemic ridership represents the baseline of what normal transit demand looked like — the riders who built their lives around the system. At 72%, VIA still has roughly 11 million annual trips that existed in 2019 and don't today. Those aren't just statistics; they're commuters, students, and essential workers who used to ride and don't anymore.

Austin's faster recovery likely reflects its [population and employment boom](https://communityimpact.com/austin/south-central-austin/government/2025/03/17/austin-metro-grows-to-25th-most-populous-in-us-with-more-than-25m-residents/) over this period. The Austin-Round Rock metro grew at a pace San Antonio didn't match through most of this window, bringing new residents who arrived without car-dependent habits already established. VIA's slower recovery may say less about the quality of the system and more about the pace of San Antonio's growth and the depth of car dependence in its existing population.

In absolute terms, VIA still serves more riders. That it does so at lower cost per trip is the more durable finding here.

## A note on comparisons

NTD data is self-reported and reflects differences in accounting practices, service structures, and fiscal year timing. VIA and CapMetro operate in meaningfully different urban contexts — density, land use, and car ownership rates all affect both ridership potential and operating costs in ways this analysis doesn't fully capture. These numbers describe what each system produced, not the ceiling of what each system could produce.