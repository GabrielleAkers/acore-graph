// generate ENDS_AT
MATCH (c:CreatureTemplate)
MATCH (ce:CreatureQuestender)
MATCH (q:QuestTemplate)
WHERE c.entry = ce.id AND q.id = ce.quest
MERGE (q)-[:ENDS_AT]->(c);

// generate ENDS_AT (for GO)
MATCH (g:GameobjectTemplate)
MATCH (ge:GameobjectQuestender)
MATCH (q:QuestTemplate)
WHERE g.entry = ge.id AND q.id = ge.quest
MERGE (q)-[:ENDS_AT]->(g);

// generate REQUIRES_NPC
MATCH (q:QuestTemplate)
MATCH (c:CreatureTemplate)
WHERE q.requiredNpcOrGo1 = c.entry
MERGE (q)-[:REQUIRES_NPC {count:q.requiredNpcOrGoCount1}]->(c);
MATCH (q:QuestTemplate)
MATCH (c:CreatureTemplate)
WHERE q.requiredNpcOrGo2 = c.entry
MERGE (q)-[:REQUIRES_NPC {count:q.requiredNpcOrGoCount2}]->(c);
MATCH (q:QuestTemplate)
MATCH (c:CreatureTemplate)
WHERE q.requiredNpcOrGo3 = c.entry
MERGE (q)-[:REQUIRES_NPC {count:q.requiredNpcOrGoCount3}]->(c);
MATCH (q:QuestTemplate)
MATCH (c:CreatureTemplate)
WHERE q.requiredNpcOrGo4 = c.entry
MERGE (q)-[:REQUIRES_NPC {count:q.requiredNpcOrGoCount4}]->(c);

// generate REQUIRES_GO
MATCH (q:QuestTemplate)
MATCH (c:GameobjectTemplate)
WHERE q.requiredNpcOrGo1 < 0 AND abs(q.requiredNpcOrGo1) = c.entry
MERGE (q)-[:REQUIRES_GO {count:q.requiredNpcOrGoCount1}]->(c);
MATCH (q:QuestTemplate)
MATCH (c:GameobjectTemplate)
WHERE q.requiredNpcOrGo1 < 0 AND abs(q.requiredNpcOrGo2) = c.entry
MERGE (q)-[:REQUIRES_GO {count:q.requiredNpcOrGoCount2}]->(c);
MATCH (q:QuestTemplate)
MATCH (c:GameobjectTemplate)
WHERE q.requiredNpcOrGo1 < 0 AND abs(q.requiredNpcOrGo3) = c.entry
MERGE (q)-[:REQUIRES_GO {count:q.requiredNpcOrGoCount3}]->(c);
MATCH (q:QuestTemplate)
MATCH (c:GameobjectTemplate)
WHERE q.requiredNpcOrGo1 < 0 AND abs(q.requiredNpcOrGo4) = c.entry
MERGE (q)-[:REQUIRES_GO {count:q.requiredNpcOrGoCount4}]->(c);

// generate REQUIRES_ITEM
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.requiredItemId1 = i.entry
MERGE (q)-[:REQUIRES_ITEM {count:q.requiredItemCount1}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.requiredItemId2 = i.entry
MERGE (q)-[:REQUIRES_ITEM {count:q.requiredItemCount2}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.requiredItemId3 = i.entry
MERGE (q)-[:REQUIRES_ITEM {count:q.requiredItemCount3}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.requiredItemId4 = i.entry
MERGE (q)-[:REQUIRES_ITEM {count:q.requiredItemCount4}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.requiredItemId5 = i.entry
MERGE (q)-[:REQUIRES_ITEM {count:q.requiredItemCount4}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.requiredItemId6 = i.entry
MERGE (q)-[:REQUIRES_ITEM {count:q.requiredItemCount4}]->(i);

// generate REWARDS_ITEM
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardItem1 = i.entry
MERGE (q)-[:REWARDS_ITEM {count:q.rewardAmount1}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardItem2 = i.entry
MERGE (q)-[:REWARDS_ITEM {count:q.rewardAmount2}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardItem3 = i.entry
MERGE (q)-[:REWARDS_ITEM {count:q.rewardAmount3}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardItem4 = i.entry
MERGE (q)-[:REWARDS_ITEM {count:q.rewardAmount4}]->(i);

// generate REWARDS_ITEM_CHOICE
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardChoiceItemId1 = i.entry
MERGE (q)-[:REWARDS_ITEM_CHOICE {count:q.rewardChoiceItemQuantity1}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardChoiceItemId2 = i.entry
MERGE (q)-[:REWARDS_ITEM_CHOICE {count:q.rewardChoiceItemQuantity2}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardChoiceItemId3 = i.entry
MERGE (q)-[:REWARDS_ITEM_CHOICE {count:q.rewardChoiceItemQuantity3}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardChoiceItemId4 = i.entry
MERGE (q)-[:REWARDS_ITEM_CHOICE {count:q.rewardChoiceItemQuantity4}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardChoiceItemId5 = i.entry
MERGE (q)-[:REWARDS_ITEM_CHOICE {count:q.rewardChoiceItemQuantity5}]->(i);
MATCH (q:QuestTemplate)
MATCH (i:ItemTemplate)
WHERE q.rewardChoiceItemId6 = i.entry
MERGE (q)-[:REWARDS_ITEM_CHOICE {count:q.rewardChoiceItemQuantity6}]->(i);
