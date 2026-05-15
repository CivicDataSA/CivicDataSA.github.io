---
layout: analysis
title: "How Consistent Is VIA Service on San Antonio's Busiest Routes?"
date: 2026-03-29
description: "One week of real-time GTFS data across VIA's five highest-frequency routes — and what it suggests about daily service reliability."
tag: Transportation
github: https://github.com/CivicDataSA/VIAService
findings:
  - All five routes exceeded 80% on-time performance during the study period
  - Four of five routes cleared 82%, clustering closely together
  - Average deviation from schedule was under two minutes across all routes
methods:
  - VIA GTFS-RT vehicle position feed
  - GTFS static schedule (Nov 2025)
  - On-time defined as arrival within 5 minutes of schedule
github: https://github.com/CivicDataSA/VIAService
search_tags: [transportation, via, spatial, transit]
---

San Antonio's relationship with its bus system is complicated. Ask a rider and you'll often hear frustration: late buses, long waits, service that feels unpredictable. But frustration and data don't always tell the same story.

This analysis looks at one week of real-time vehicle position data (November 17 through November 23, 2025) compared against VIA's published schedule. We focused on the five routes with the highest number of weekly trips, since those routes move the most people and their reliability matters most to daily riders.

<div class="chart-embed" style="margin: 2rem 0;">
<style>
  .via-hed { font-family: 'DM Serif Display', serif; font-size: 18px; margin: 0 0 4px; }
  .via-sub { font-size: 12px; opacity: 0.6; margin: 0 0 28px; letter-spacing: 0.01em; }
  .via-bar-wrap { margin-bottom: 12px; }
  .via-bar-meta { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
  .via-bar-name { font-size: 13px; font-weight: 500; }
  .via-bar-val { font-size: 13px; opacity: 0.6; }
  .via-track { width: 100%; height: 24px; background: rgba(100,100,80,0.1); border-radius: 3px; position: relative; overflow: visible; }
  .via-fill { height: 100%; border-radius: 3px; }
  .via-ref { position: absolute; top: -6px; bottom: -6px; width: 1px; background: rgba(100,100,80,0.4); z-index: 2; }
  .via-ref-label { position: absolute; top: -20px; font-size: 10px; opacity: 0.55; transform: translateX(-50%); white-space: nowrap; }
  .via-source { font-size: 11px; opacity: 0.5; margin-top: 20px; border-top: 1px solid rgba(100,100,80,0.2); padding-top: 10px; }
</style>
<p class="via-hed">On-time performance across VIA's five busiest routes</p>
<p class="via-sub">Share of stop arrivals within 5 minutes of schedule &middot; Nov 17&ndash;23, 2025 &middot; Ranked by trip frequency</p>
<div id="via-bars" style="margin-top: 28px;"></div>
<p class="via-source">Source: VIA GTFS-RT vehicle position feed &middot; Analysis: CivicData SA</p>
<script>
(function() {
  var routes = [
    { label: 'Route 103', pct: 83.3 },
    { label: 'Route 20',  pct: 82.9 },
    { label: 'Route 100', pct: 82.7 },
    { label: 'Route 10',  pct: 82.5 },
    { label: 'Route 102', pct: 80.8 },
  ];
  var container = document.getElementById('via-bars');
  var green = '#4a7c3f';
  var amber = '#a0522d';
  routes.forEach(function(r, i) {
    var color = r.pct >= 82 ? green : amber;
    var html = '<div class="via-bar-wrap">'
      + '<div class="via-bar-meta">'
      + '<span class="via-bar-name">' + r.label + '</span>'
      + '<span class="via-bar-val">' + r.pct.toFixed(1) + '%</span>'
      + '</div>'
      + '<div class="via-track">'
      + (i === 0 ? '<div class="via-ref" style="left:80%"><span class="via-ref-label">80% standard</span></div>' : '')
      + '<div class="via-fill" style="width:' + r.pct + '%; background:' + color + '"></div>'
      + '</div></div>';
    container.innerHTML += html;
  });
})();
</script>
</div>

Across all five routes, on-time performance was broadly consistent and better than the public narrative might suggest. Four of the five routes cleared 82%, and none fell below 80%. The average deviation from schedule was under two minutes. That doesn't mean every trip runs smoothly. A bus seven minutes late at a transfer point can still mean a missed connection and a long wait. Schedule adherence is one measure, not the full picture of a rider's experience.

VIA is in the middle of an ambitious effort to improve. <a href="https://www.viainfo.net/2025/03/05/approved_improvements/" target="_blank" rel="noopener">Ridership has grown more than 27% since 2021</a>, and the agency's Better Bus Plan targets wait times of 30 minutes or less across the network. The <a href="https://www.tpr.org/podcast/the-source/2025-07-16/via-focuses-on-improving-service-with-frequency-and-growing-ridership" target="_blank" rel="noopener">Green Line, San Antonio's first Advanced Rapid Transit corridor along San Pedro Avenue, broke ground in June 2025</a> and is set to open in 2027. Delivering reliable service on a bus network operating across a sprawling, car-oriented city is genuinely hard, and the data suggests the core routes are holding up reasonably well while that longer-term work unfolds.

One week of data is a snapshot, not a verdict. But it's also roughly what a regular rider experiences: seven days of trips, transfers, and waiting to see if the bus shows up on time. For most riders on these five routes, this particular week, it usually did.
