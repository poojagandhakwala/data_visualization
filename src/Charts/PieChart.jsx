import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, width = 450, height = 450 }) => {
  const ref = useRef();
  useEffect(() => {
    // Remove any existing SVG elements
    d3.select(ref.current).selectAll('*').remove();

    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Set up color scale   
    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);

    // Generate the pie
    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(data);

    // Generate the arcs
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Draw the slices
    svg
      .selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate(
          { startAngle: 0, endAngle: 0 },
          d
        );
        return t => arc(interpolate(t));
      });

    // Add labels
    svg
      .selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => d.data.label)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#fff');

    // Add tooltips
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', '#fff')
      .style('padding', '5px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '4px');

    svg
      .selectAll('path')
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.data.label}:</strong> ${d.data.value}`)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 25 + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
  }, [data, width, height]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
