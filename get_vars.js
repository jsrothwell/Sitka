const collections = await figma.variables.getLocalVariableCollectionsAsync();
const variables = await figma.variables.getLocalVariablesAsync();
const effectStyles = await figma.getLocalEffectStylesAsync();
const textStyles = await figma.getLocalTextStylesAsync();

const result = {
  collections: collections.map(c => ({
    id: c.id,
    name: c.name,
    modes: c.modes
  })),
  variables: variables.map(v => ({
    id: v.id,
    name: v.name,
    variableCollectionId: v.variableCollectionId,
    resolvedType: v.resolvedType,
    valuesByMode: v.valuesByMode,
    scopes: v.scopes
  })),
  effectStyles: effectStyles.map(s => ({
    id: s.id,
    name: s.name,
    effects: s.effects
  })),
  textStyles: textStyles.map(s => ({
    id: s.id,
    name: s.name,
    fontSize: s.fontSize,
    textDecoration: s.textDecoration,
    fontName: s.fontName,
    letterSpacing: s.letterSpacing,
    lineHeight: s.lineHeight,
    paragraphIndent: s.paragraphIndent,
    paragraphSpacing: s.paragraphSpacing,
    textCase: s.textCase
  }))
};

return result;
