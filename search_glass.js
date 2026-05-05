const results = figma.currentPage.findAll(n => n.name.toLowerCase().includes('glass') || n.name.toLowerCase().includes('liquid'));
return results.map(n => ({ name: n.name, type: n.type, id: n.id }));
