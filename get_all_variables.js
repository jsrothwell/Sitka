const collections = await figma.variables.getLocalVariableCollectionsAsync();
const results = [];
for (const collection of collections) {
  const variables = await Promise.all(collection.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
  const collectionData = {
    name: collection.name,
    modes: collection.modes,
    variables: variables.map(v => ({
      name: v.name,
      valuesByMode: v.valuesByMode,
      type: v.resolvedType
    }))
  };
  results.push(collectionData);
}
return results;
