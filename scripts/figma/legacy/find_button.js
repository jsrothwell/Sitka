const results = [];
for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  page.findAll(n => {
    if (n.name.toLowerCase() === 'button' && (n.type === 'COMPONENT' || n.type === 'COMPONENT_SET')) {
      results.push({ page: page.name, name: n.name, type: n.type, id: n.id });
    }
    return false;
  });
}
return results;
