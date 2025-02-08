// generate TEMPLATED_BY
// these link in world objects to their data
MATCH (gt:GameobjectTemplate)
MATCH (g:Gameobject)
WHERE g.id = gt.entry
MERGE (g)-[:GO_TEMPLATED_BY]->(gt);

// generate STARTS_QUEST
MATCH (g:GameobjectTemplate)
MATCH (gs:GameobjectQueststarter)
MATCH (q:QuestTemplate)
WHERE g.entry = gs.id AND q.id = gs.quest
MERGE (g)-[:STARTS_QUEST]->(q);
