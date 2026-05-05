const results = [];
for (const page of figma.root.children) {
  results.push({ pageName: page.name, pageId: page.id });
  // We don't need to setCurrentPageAsync just to get names/ids of children if we don't need to deep-search,
  // but for COMPONENT_SET we might want to see where they are.
}
return results;
