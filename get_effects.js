const effectStyles = await figma.getLocalEffectStylesAsync();
const results = effectStyles.map(s => ({
  name: s.name,
  id: s.id,
  effects: s.effects
}));
return results;
