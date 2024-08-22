import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, width = 500, height = 300 }) => {
  const ref = useRef();

  useEffect(() => {
    // Remove any existing SVG elements
    d3.select(ref.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3
      .scalePoint()
      .domain(data.map(d => d.label))
      .range([0, chartWidth])
      .padding(0.5);

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([chartHeight, 0]);

    // X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    // Y axis
    svg
      .append('g')
      .call(d3.axisLeft(y));

    // Line generator
    const line = d3
      .line()
      .x(d => x(d.label))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX); // Smooth curve

    // Add the line path
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add points
    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.label))
      .attr('cy', d => y(d.value))
      .attr('r', 4)
      .attr('fill', 'steelblue');

    // Adding labels
    svg
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value) - 10)
      .attr('text-anchor', 'middle')
      .text(d => d.value)
      .style('fill', '#000')
      .style('font-size', '12px');
  }, [data, width, height]);

  return <svg ref={ref}></svg>;
};

export default LineChart;
