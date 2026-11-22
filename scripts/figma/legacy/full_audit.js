const collections = await figma.variables.getLocalVariableCollectionsAsync();
const varResults = [];
for (const collection of collections) {
  const collectionData = {
    name: collection.name,
    modes: collection.modes,
    variables: []
  };
  for (const varId of collection.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(varId);
    collectionData.variables.push({
      name: v.name,
      valuesByMode: v.valuesByMode,
      type: v.resolvedType
    });
  }
  varResults.push(collectionData);
}

const effectStyles = await figma.getLocalEffectStylesAsync();
const effectResults = effectStyles.map(s => ({
  name: s.name,
  effects: s.effects
}));

const pages = figma.root.children.map(p => ({ name: p.name, id: p.id }));

return { variables: varResults, effects: effectResults, pages };
