const results = [];
for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  page.findAll(n => {
    if (n.name.toLowerCase().includes('color') || n.name.toLowerCase().includes('typography') || n.name.toLowerCase().includes('token')) {
      results.push({ page: page.name, name: n.name, type: n.type, id: n.id });
    }
    return false;
  });
}
return results;
