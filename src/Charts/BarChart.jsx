import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, width = 400, height = 300 }) => {
  const ref = useRef();

  useEffect(() => {
   let small_width = window.innerWidth;
   console.log("Small w = ",small_width);
    // Remove any existing SVG elements
    d3.select(ref.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .attr('width', small_width <500 ? small_width-70 : width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([0, chartWidth])
      .padding(0.1);

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

    // Bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => chartHeight - y(d.value))
      .attr('fill', 'steelblue')
      .attr('stroke', 'white')
      .style('opacity', 0.7);

    // Adding labels
    svg
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.label) + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.value)
      .style('fill', '#000')
      .style('font-size', '12px');
  }, [data, width, height]);

  return <svg ref={ref}></svg>;
};

export default BarChart;
