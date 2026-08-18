---
layout: analysis
title: "San Antonio's Most Congested Corridors"
description: "Using TxDOT AADT counts, roadway inventory lane data, and Top 100 Congested Roadways geometry, this analysis calculates volume-to-capacity ratios for all 10 San Antonio segments on TxDOT's 2025 Top 100 list and maps where demand exceeds design capacity."
tag: Transportation
date: 2026-08-01
github: https://github.com/CivicDataSA/TrafficCapacity
findings:
  - All 10 San Antonio segments on TxDOT's 2025 Top 100 Most Congested Roadways list are over capacity
  - IH 35 carries 54–60% more traffic than it was built for
  - Culebra and Potranco have similar V/C ratios but Culebra ranks far worse on delay
methods:
  - TxDOT AADT Traffic Monitoring Program (2025)
  - Lane counts from TxDOT Roadway Inventory (2024)
search_tags: [traffic, congestion, San Antonio, TxDOT, AADT, volume to capacity, IH 35, IH 410, Top 100, transportation]
---

San Antonio placed 10 segments on TxDOT's 2025 Top 100 Most Congested Roadways list, more than any Texas city outside Houston and Dallas-Fort Worth. The list is produced annually by the Texas A&M Transportation Institute using GPS-derived speed data to rank segments by person-hours of delay per mile, a measure of what commuters actually experience. This analysis uses a different metric, volume-to-capacity ratio, to ask a structural question: are these roads carrying more traffic than they were built for, and by how much?
 
The answer across all 10 segments is yes.
 
## The map and the numbers
 
<!-- MAP EMBED -->
<div style="border:1px solid #e5e5e5;border-radius:4px;overflow:hidden;margin:1.5rem 0 0.5rem;">
  <iframe src="/assets/maps/sa_traffic_map.html" width="100%" height="460" frameborder="0" style="display:block;"></iframe>
</div>
<p style="font-size:0.8rem;color:#888;margin-bottom:2rem;">Corridors colored by volume-to-capacity ratio. Red = over capacity. Hover a segment for details. Base roads: U.S. Census TIGER/Line. Source: TxDOT AADT 2025, Top 100 Congested Roadways dataset.</p>
<div style="overflow-x:auto;margin:1.5rem 0;">
<table style="width:100%;border-collapse:collapse;font-size:0.875rem;">
  <thead>
    <tr style="border-bottom:2px solid #1a1a1a;">
      <th style="text-align:left;padding:0.5rem 0.75rem 0.5rem 0;font-weight:600;font-size:0.75rem;letter-spacing:0.05em;text-transform:uppercase;color:#666;">Segment</th>
      <th style="text-align:left;padding:0.5rem 0.75rem;font-weight:600;font-size:0.75rem;letter-spacing:0.05em;text-transform:uppercase;color:#666;">V/C ratio</th>
      <th style="text-align:left;padding:0.5rem 0.75rem;font-weight:600;font-size:0.75rem;letter-spacing:0.05em;text-transform:uppercase;color:#666;">Daily volume / capacity</th>
      <th style="text-align:left;padding:0.5rem 0.75rem;font-weight:600;font-size:0.75rem;letter-spacing:0.05em;text-transform:uppercase;color:#666;">TxDOT project</th>
    </tr>
  </thead>
  <tbody id="corridor-tbody"></tbody>
</table>
</div>
<p style="font-size:0.8rem;color:#888;margin-bottom:2rem;">Bar midpoint marks capacity (V/C = 1.0). Source: TxDOT AADT 2025, TxDOT Roadway Inventory 2024.</p>
<script>
(function() {
  var segments = [
    { name: "Connally Loop N / IH 410", sub: "I-35 to I-10 interchange", vc: 1.65, aadt: 250077, cap: 152000, project: null, year: null },
    { name: "N PanAm Expy / IH 35", sub: "Loop 1604 NE to Loop 410", vc: 1.60, aadt: 182704, cap: 114000, project: "I-35 NEX (Northeast Expansion)", year: 2030 },
    { name: "PanAm Expy / IH 35 / IH 10", sub: "Loop 410 to downtown", vc: 1.54, aadt: 175000, cap: 114000, project: "I-35 NEX (Northeast Expansion)", year: 2030 },
    { name: "IH 35", sub: "Schertz/Cibolo, NE of Loop 1604", vc: 1.54, aadt: 175955, cap: 114000, project: "I-35 NEX (Northeast Expansion)", year: 2030 },
    { name: "Potranco Rd / FM 1957", sub: "Loop 410 to Loop 1604 area", vc: 1.40, aadt: 50452, cap: 36000, project: null, year: null },
    { name: "Charles West Anderson Loop / SL 1604 N", sub: "North section", vc: 1.32, aadt: 99962, cap: 76000, project: null, year: null },
    { name: "Connally Loop NW / IH 410", sub: "Northwest section", vc: 1.23, aadt: 187186, cap: 152000, project: null, year: null },
    { name: "Culebra Rd / FM 471", sub: "West of Loop 1604", vc: 1.23, aadt: 44264, cap: 36000, project: null, year: null },
    { name: "McDermott Fwy / IH 10 / US 87", sub: "East side", vc: 1.20, aadt: 182315, cap: 152000, project: "I-10 West managed lanes", year: 2027 },
    { name: "Jose Lopez Fwy / IH 10 / US 90", sub: "West side", vc: 1.05, aadt: 159709, cap: 152000, project: "I-10 West managed lanes", year: 2027 },
  ];
  function vcColor(vc) {
    if (vc >= 1.0) return "#b33225";
    if (vc >= 0.85) return "#c47d0e";
    return "#3a7d2c";
  }
  function badge(vc) {
    var color = vcColor(vc);
    var bg = vc >= 1.0 ? "#fdf0ee" : vc >= 0.85 ? "#fdf5e6" : "#eef5ec";
    return '<span style="display:inline-block;font-family:monospace;font-size:0.8rem;font-weight:700;padding:2px 7px;border-radius:3px;background:'+bg+';color:'+color+';">'+vc.toFixed(2)+'</span>';
  }
  function bar(vc, aadt, cap) {
    var pct = Math.min(vc / 2.2 * 100, 99).toFixed(1);
    var capPct = (1.0 / 2.2 * 100).toFixed(1);
    var color = vcColor(vc);
    var aLabel = (aadt/1000).toFixed(0)+'k / '+(cap/1000).toFixed(0)+'k';
    return '<div style="display:flex;align-items:center;gap:8px;">'
      + '<div style="flex:1;height:6px;background:#e5e5e5;border-radius:2px;position:relative;">'
      + '<div style="width:'+pct+'%;height:100%;background:'+color+';border-radius:2px;"></div>'
      + '<div style="position:absolute;top:-4px;bottom:-4px;left:'+capPct+'%;width:1.5px;background:#555;"></div>'
      + '</div>'
      + '<span style="font-size:0.75rem;color:#888;white-space:nowrap;">'+aLabel+'</span>'
      + '</div>';
  }
  var tbody = document.getElementById('corridor-tbody');
  segments.forEach(function(s) {
    var proj = s.project
      ? s.project + (s.year ? ' <span style="font-size:0.7rem;font-weight:700;background:#1a1a1a;color:#fff;padding:1px 5px;border-radius:2px;">'+s.year+'</span>' : '')
      : '<span style="color:#aaa;font-style:italic;font-size:0.8rem;">No active project</span>';
    var tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #eee';
    tr.innerHTML =
      '<td style="padding:0.65rem 0.75rem 0.65rem 0;">'
        + '<div style="font-weight:500;">'+s.name+'</div>'
        + '<div style="font-size:0.75rem;color:#999;">'+s.sub+'</div>'
      + '</td>'
      + '<td style="padding:0.65rem 0.75rem;">'+badge(s.vc)+'</td>'
      + '<td style="padding:0.65rem 0.75rem;min-width:160px;">'+bar(s.vc, s.aadt, s.cap)+'</td>'
      + '<td style="padding:0.65rem 0.75rem;font-size:0.825rem;color:#555;">'+proj+'</td>';
    tbody.appendChild(tr);
  });
})();
</script>
 
 
IH 35 has three segments on the list, all between 54% and 60% over capacity. The N PanAm segment running northeast from Loop 1604 toward Schertz is the worst at 1.60, carrying 182,704 vehicles per day against a capacity of 114,000. Two TxDOT projects address parts of this corridor: the PanAm Expressway improvements south of Loop 410 (est. 2029) and the I-35 NEX expansion northeast of the city (est. 2030). Neither is imminent.
 
The IH 410 findings are harder to dismiss. The Connally Loop N segment, which spans the interchange corridor between I-35 and I-10, carries 250,077 vehicles per day, reflecting its role as a connector between two of the city's busiest freeways, and has the highest V/C ratio in the dataset at 1.65. The northwest section is at 1.23. Neither has an active project in the current Alamo Area MPO Transportation Improvement Program through 2028. For commuters on those segments, there is no scheduled relief.
 
SL 1604 N and the McDermott Freeway section of IH 10 are in similar positions: over capacity, no active project. The Jose Lopez Freeway section of IH 10 on the west side, at 1.05, is the closest to the edge: just over capacity, with a managed lanes project due in 2027 that may provide relief before conditions worsen further.
 
## Culebra and Potranco: the same ratio, different experiences
 
Culebra Road and Potranco Road both have a V/C of 1.23, but they land very differently on TxDOT's own ranking. Culebra is 46th on the Top 100; Potranco is 93rd. The gap reflects delay per mile, which is the ranking's actual metric rather than raw capacity overload.
 
Potranco is a newer arterial with fewer signals and cross streets. Traffic moves more freely between stops, so the capacity overload doesn't compound into as much lost time per mile. Culebra runs through more developed corridor with heavier signal density, more driveways, and more cross traffic. The structural problem is similar, but Culebra's geometry converts that overload into more lost time per mile. This is the distinction between V/C and delay per mile: one measures what the road was built for relative to what it's asked to carry, the other measures what commuters actually experience.
 
## What expansion doesn't solve
 
TxDOT's projects on IH 35 and IH 10 will add lanes and managed lane facilities, which reduces delay in the near term. The research on induced demand is consistent, though: new highway capacity attracts new vehicle trips, and congestion typically returns to pre-expansion levels within a few years. A 2030 completion date does not mean a permanently uncongested corridor.
 
The segments without active projects present a harder problem. IH 410's Connally Loop sections and SL 1604 N are significantly over capacity and absent from the current TIP. For commuters on those roads, the current situation is not a temporary construction phase; it is the foreseeable future.
 
## A note on methodology
 
V/C ratios depend on three inputs: traffic volume, lane count, and a capacity assumption per lane. Traffic volumes come from TxDOT AADT count stations matched to each Top 100 segment via nearest-station spatial join; a 50,000 vehicle/day floor was applied for freeway routes to exclude ramp and frontage road stations. Lane counts come from TxDOT Roadway Inventory (2024) KG mainlane roadbed segments, taking the median per route in Bexar County. Freeway capacity is estimated at 19,000 vehicles per lane per day (HCM Level of Service D); arterial capacity at 9,000. These are planning-level approximations; actual capacity varies by grade, interchange spacing, and operating conditions. The Jose Lopez Freeway segment at V/C 1.05 is the closest to the threshold; values near 1.0 carry more uncertainty than values well above it given the margin of error in AADT station placement and lane count assumptions.
 
IH 410 count stations in Bexar County are heavily concentrated at interchange locations. AADT values for both Connally Loop segments were manually verified using ZLEVEL 8 (mainlane-designated) stations rather than the nearest-station spatial join. The Connally Loop N volume of 250,077 reflects a station at the I-35/I-10 interchange corridor; that volume is real and the congestion is real, but it should be understood as reflecting the combined load of an interchange segment rather than a mid-block mainlane count.
 
The Top 100 list uses delay per mile as its ranking metric, not V/C ratio. A road can rank highly on one and not the other. Culebra and Potranco illustrate this directly. V/C describes structural overload; delay per mile describes experienced congestion. Both matter, and neither tells the complete story alone.
 