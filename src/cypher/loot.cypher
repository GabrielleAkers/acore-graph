// generate DROPS
MATCH (c:CreatureTemplate)
MATCH (i:ItemTemplate)
MATCH (loot_template:CreatureLootTemplate)
WHERE c.lootid = loot_template.entry AND loot_template.reference = 0 AND loot_template.item = i.entry
CALL (*) {
    MERGE (c)-[:DROPS {min: loot_template.minCount, max: loot_template.maxCount, chance: loot_template.chance}]->(i)
} IN TRANSACTIONS OF 1000 ROWS;
// ref loot
MATCH (c:CreatureTemplate)
MATCH (i:ItemTemplate)
MATCH (loot_template:CreatureLootTemplate)
MATCH (ref_loot_template:ReferenceLootTemplate)
WHERE c.lootid = loot_template.entry AND loot_template.reference <> 0 AND loot_template.reference = ref_loot_template.entry AND ref_loot_template.item = i.entry
CALL (*) {
    MERGE (c)-[:DROPS {min: loot_template.minCount, max: loot_template.maxCount, chance: loot_template.chance}]->(i)
} IN TRANSACTIONS OF 1000 ROWS;
