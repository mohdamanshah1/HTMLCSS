const width = 3000;
const height = 1200;

d3.json('Data.json').then(function (treeData) {
  const svg = d3.select('#tree-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const treeLayout = d3.tree().size([width - 400, height - 100]);

  const root = d3.hierarchy(treeData);
  treeLayout(root);

  svg.selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d3.linkVertical()
      .x(d => d.x)
      .y(d => d.y));

  const nodes = svg.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`);

  nodes.append('circle')
    .attr('r', 12);

  nodes.append('text')
    .attr('class', 'label')
    .attr('dy', -20)
    .attr('dx', 15)
    .text(d => d.data.name)
    .style('font-size', '14px')
    .style('fill', '#333')
    .style('font-weight', 'light')
    .style('text-anchor', 'start');

  svg.selectAll('.root-text')
    .data([root])
    .enter()
    .append('text')
    .attr('class', 'root-text')
    .attr('dy', -30)
    .attr('dx', 15)
    .text(d => d.data.name)
    .style('font-size', '18px')
    .style('fill', '#333')
    .style('font-weight', 'bold')
    .style('text-anchor', 'end');
}).catch(function (error) {
  console.log(error);
});
