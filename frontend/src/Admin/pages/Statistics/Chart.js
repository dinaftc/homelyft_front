import React from 'react';

const Chart = ({ percentage }) => {
  const chartStyles = {
    display: 'block',
    margin: '20px auto',
  };

  const circleBackgroundStyles = {
    fill: 'none',
    stroke: '#e0e0e0',
    strokeWidth: 10,
  };

  const circleProgressStyles = {
    fill: 'none',
    stroke: '#00bcd4',
    strokeWidth: 10,
    strokeLinecap: 'round',
    transition: 'stroke-dashoffset 0.3s ease',
  };

  const chartPercentageStyles = {
    fill: '#333',
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px',
    textAnchor: 'middle',
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg style={chartStyles} width="120" height="120">
      <circle
        style={circleBackgroundStyles}
        cx="60"
        cy="60"
        r={radius}
      />
      <circle
        style={circleProgressStyles}
        cx="60"
        cy="60"
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text style={chartPercentageStyles} x="60" y="68">{percentage}%</text>
    </svg>
  );
};

export default Chart;
