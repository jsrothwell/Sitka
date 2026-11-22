const pages = figma.root.children.map(p => ({ name: p.name, id: p.id, childCount: p.children.length }));
const componentResults = [];
for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  page.findAll(n => {
    if (n.type === 'COMPONENT' || n.type === 'COMPONENT_SET')
      componentResults.push({ page: page.name, name: n.name, type: n.type, id: n.id });
    return false;
  });
}
return { pages, components: componentResults };
