// generate TEMPLATED_BY
// these link in world creature to their data
MATCH (ct:CreatureTemplate)
MATCH (c:Creature)
WHERE c.id1 = ct.entry OR c.id2 = ct.entry OR c.id3 = ct.entry
MERGE (c)-[:CREATURE_TEMPLATED_BY]->(ct);

