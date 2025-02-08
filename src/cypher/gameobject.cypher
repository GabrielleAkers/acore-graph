// generate TEMPLATED_BY
// these link in world objects to their data
MATCH (gt:GameobjectTemplate)
MATCH (g:Gameobject)
WHERE g.id = gt.entry
MERGE (g)-[:GO_TEMPLATED_BY]->(gt);

