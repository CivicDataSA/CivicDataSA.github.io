---
layout: analysis
title: "Who's Watching San Antonio's Vacant Buildings?"
description: "Using the city's Vacant Building Program dataset, Census tract boundaries, and the CDC/ATSDR Social Vulnerability Index, this analysis checks whether the program's coverage zones track social vulnerability, and finds a District 2 cluster of properties that hasn't been reinspected in over a year."
tag: Housing
date: 2026-09-06
github: https://github.com/CivicDataSA/VacantBuildings
findings:
  - Named overlay zones don't track vulnerability — properties outside them are slightly more vulnerable
  - Inspection recency differs significantly by vulnerability quartile, but non-linearly
  - The gap traces to a single 2025 inspection sweep in District 2, never followed up on
methods:
  - CoSA Vacant Building Program
  - U.S. Census Bureau TIGER/Line
  - CDC/ATSDR Social Vulnerability Index (2022)
search_tags: [vacant buildings, code enforcement, San Antonio, Bexar County, social vulnerability index, SVI, housing, District 2, inspection]
---

Vacant buildings carry real risks for the surrounding neighborhood: fire, pest problems, falling property values for neighbors, and sites for dumping or unauthorized entry. Registries like San Antonio's [Vacant Building Program](https://www.sa.gov/Directory/Departments/DSD/CES/Vacant-Buildings) exist to make sure these properties are tracked and revisited over time, not just identified once. This analysis checks whether that follow-through is actually happening.
 
In 2026, San Antonio City Council members raised concerns about the city's Vacant Building Program. Councilwoman Adriana Rocha Garcia specifically [called for a public-facing tool](https://sanantonioreport.org/san-antonio-city-council-owners-vacant-nuisance-buildings/) overlaying property status, zoning, and crime data for residents. This analysis uses the city's own open data to ask two questions: does the program's zone-based structure line up with social vulnerability, and are some vacant properties going longer without inspection than others?
 
The dataset covers 1,019 properties from the city's Vacant Building Program. About 11% lacked coordinates and were geocoded via the Census Bureau's batch geocoder; after excluding 18 properties whose coordinates fell outside Bexar County's tract boundaries, the final analysis set covers 1,001 properties, or about 98% of the original list.
 
## Named overlay zones don't track vulnerability the way you'd expect
 
The program flags certain properties as falling within specially designated areas: historic districts, neighborhood conservation districts, TIRZ zones, or military base buffers. Comparing the census-tract SVI scores of properties inside versus outside these named zones shows a small but statistically significant difference (Mann-Whitney U test, p < 0.0001): properties outside named zones actually sit in slightly more vulnerable tracts (mean SVI 0.83) than properties inside them (mean SVI 0.78).
 
In other words, the zone system isn't calibrated to social vulnerability. It's built around historic, planning, and land-use designations that happen to correlate weakly, and in the opposite direction from what a vulnerability-targeting framework would produce.
 
<!-- MAP EMBED -->
<div style="border:1px solid #e5e5e5;border-radius:4px;overflow:hidden;margin:1.5rem 0 0.5rem;">
  <iframe src="/assets/maps/sa_vacant_buildings_map.html" width="100%" height="500" frameborder="0" style="display:block;"></iframe>
</div>
<p style="font-size:0.8rem;color:#888;margin-bottom:2rem;">Properties colored by days since last inspection or by social vulnerability (toggle above the map). District 2's August 2025 sweep cluster is outlined in red. Base map: CARTO/OpenStreetMap. Source: City of San Antonio Vacant Building Program, CDC/ATSDR SVI 2022.</p>
## Inspection recency varies significantly, but not in a simple pattern
 
Grouping properties into vulnerability quartiles and comparing days since each property's last inspection shows a statistically significant difference across groups (Kruskal-Wallis test, p = 0.0073), but not a straight line from least to most vulnerable. The second-lowest vulnerability quartile (Q2) has the longest average gap at 263 days.
 
<!-- QUARTILE CHART EMBED -->
<div style="border:1px solid #e5e5e5;border-radius:4px;overflow:hidden;margin:1.5rem 0 0.5rem;">
  <iframe src="/assets/maps/sa_vacant_buildings_quartile_chart.html" width="100%" height="140" frameborder="0" style="display:block;"></iframe>
</div>
<p style="font-size:0.8rem;color:#888;margin-bottom:2rem;">Average days since last inspection by social vulnerability quartile (Q1 = least vulnerable, Q4 = most vulnerable).</p>
Q2's elevated average isn't spread evenly, though. The chart below breaks Q2 down by council district.
 
<!-- CHART EMBED -->
<div style="border:1px solid #e5e5e5;border-radius:4px;overflow:hidden;margin:1.5rem 0 0.5rem;">
  <iframe src="/assets/maps/sa_vacant_buildings_chart.html" width="100%" height="170" frameborder="0" style="display:block;"></iframe>
</div>
<p style="font-size:0.8rem;color:#888;margin-bottom:2rem;">Average days since inspection for Q2 (second-lowest vulnerability quartile) properties, by council district. Districts with fewer than 5 Q2 properties omitted.</p>
## Tracing it to its source
 
The Q2 pattern breaks down as follows:
 
- **Geography** — nearly 40% of Q2 properties sit in Council District 2, which also has the longest average inspection gap of any district (281 days) among Q2 properties.
- **Not an administrative backlog** — within District 2, it isn't properties stuck in "Pending" registration status driving the gap. Those actually have shorter inspection gaps (265 days) than fully "Registered" properties (300 days), the opposite of what an administrative-delay explanation would predict.
- **Not an outlier artifact** — an IQR-based outlier check on the District 2 "Registered" subgroup (52 properties) found zero outliers. The elevated average is a genuine pattern across the group, not a few extreme values skewing the mean.
- **Not a single-owner issue** — the properties with the longest inspection gaps include a cluster of 17 properties that all share the exact same last-inspection date (August 22, 2025), mostly in the Dignowity Hill area, and have gone unrevisited since. Checking ownership records for these 17 properties found 17 distinct owners with no overlap, ruling out any single landlord's portfolio as the explanation.

## What this suggests
 
The pattern points to an operational rather than an equity story: this pocket of District 2 appears to have received a single inspection sweep in August 2025 that covered a cluster of unrelated properties, and hasn't been revisited since, over a year as of this writing. That's consistent with periodic area-based sweeps rather than an ongoing per-property inspection cadence, at least in this part of the city.
 
## What better data would make possible
 
City Council has already called for a public-facing tool that overlays vacant building status for residents. This analysis is a rough version of that, but it also surfaced exactly where the underlying data falls short of supporting it:
 
- **Inspection history, not just the latest date.** The dataset provides a single `LatestInspectionDate` per property. Publishing a full inspection log, every visit, not just the most recent one, would let a tool distinguish "inspected once and never followed up" from "inspected regularly and currently in a normal cycle," which this analysis could only infer indirectly.
- **A linked, bulk-exportable complaint and enforcement record.** The city's [Accela-based code enforcement search](https://aca.sanantonio.gov/CitizenAccess/Default.aspx) returns individual complaint records with a filed date and status, but not a resolution or closed date, and only through a one-at-a-time or full-export search, not a documented bulk API. A published dataset joining complaint records to specific properties, with both open and close timestamps, would allow the response-time analysis this project originally set out to do.
- **A documented reason when a sweep isn't followed up.** Nothing in the data distinguishes a property that's fallen out of the inspection cycle from one that's been deliberately deprioritized (for example, pending litigation or an ownership dispute). Even a simple status flag for "reason not yet reinspected" would remove the guesswork this analysis had to do to rule out other explanations.
None of these are large asks. The Vacant Building Program dataset is already well-structured and publicly available. What's missing is the time dimension: when something happened, and when it happened again. That's specifically what turns a property inventory into an enforcement-accountability tool.
 
The city already maintains a [vacant building dashboard](https://cosagis.maps.arcgis.com/apps/dashboards/e0cc5ae462d84cce9a216281cf0804a2#) showing current inventory status. As it stands, it doesn't include the violation/citation list, zoning, or crime overlay Rocha Garcia specifically described, which is the gap this analysis is aimed at.
 
## Caveats
 
About 2% of the original dataset (18 of 1,019 properties) was excluded because their coordinates fell outside Bexar County's tract boundaries. SVI quartiles are based on the tract a property falls within, not building-level characteristics. "Days since inspection" reflects only the most recent inspection date on record; it does not capture inspection frequency or the reason a property was or wasn't revisited. This analysis reflects program data as of the pull date above and is a point-in-time snapshot, not a trend over time.