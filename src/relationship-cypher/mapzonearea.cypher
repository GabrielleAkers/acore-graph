// generate IN_OUTLAND
MATCH (wma:WorldmapareaDbc)
WHERE wma.areaName = "Expansion01"
CALL (*) {
    RETURN wma as outland
}
WITH outland
MATCH (wma:WorldmapareaDbc)
WHERE outland.mapId = wma.mapId AND wma.areaName <> outland.areaName
MERGE (outland)-[:IN_OUTLAND]->(wma);

// generate IN_NORTHREND
MATCH (wma:WorldmapareaDbc)
WHERE wma.areaName = "Northrend"
CALL (*) {
    RETURN wma as northrend
}
WITH northrend
MATCH (wma:WorldmapareaDbc)
WHERE northrend.mapId = wma.mapId AND wma.areaName <> northrend.areaName
MERGE (northrend)-[:IN_NORTHREND]->(wma);

// generate IN_KALIMDOR
MATCH (wma:WorldmapareaDbc)
WHERE wma.areaName = "Kalimdor"
CALL (*) {
    RETURN wma as kalimdor
}
WITH kalimdor
MATCH (wma:WorldmapareaDbc)
WHERE kalimdor.mapId = wma.mapId AND wma.areaName <> kalimdor.areaName
MERGE (kalimdor)-[:IN_KALIMDOR]->(wma);

// generate IN_EASTERN_KINGDOM
MATCH (wma:WorldmapareaDbc)
WHERE wma.areaName = "Azeroth"
CALL (*) {
    RETURN wma as eastern_kingdom
}
WITH eastern_kingdom
MATCH (wma:WorldmapareaDbc)
WHERE eastern_kingdom.mapId = wma.mapId AND wma.areaName <> eastern_kingdom.areaName
MERGE (eastern_kingdom)-[:IN_EASTERN_KINGDOM]->(wma);

// generate HAS_SUBAREA
MATCH (wma:WorldmapareaDbc)
MATCH (at:AreatableDbc)
WHERE at.parentAreaId = wma.areaId AND wma.areaId <> 0
MERGE (wma)-[:HAS_SUBAREA]->(at);

// generate CONTAINS_CREATURE
MATCH (wma:WorldmapareaDbc)
MATCH (c:Creature)
WHERE c.map = wma.mapId AND c.positionX < wma.locTop AND c.positionX > wma.locBottom AND c.positionY < wma.locLeft AND c.positionY > wma.locRight
CALL (*) {
    MERGE (wma)-[:CONTAINS_CREATURE]->(c)
} IN TRANSACTIONS OF 1000 ROWS;
