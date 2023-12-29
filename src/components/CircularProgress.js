import React, { useEffect, useRef } from 'react';

const CircularProgress = ({ percentage }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const circle = svg.querySelector('.progress-ring-circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    const progress = percentage / 100;
    const offset = circumference - progress * circumference;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
  }, [percentage]);

  return (
    <svg
      className="progress-ring"
      width="70"
      height="70"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}

    >
      <circle
        className="progress-ring-circle"
        stroke={percentage < 40 ? "red" : percentage >= 40 && percentage < 60 ? "yellow" : "green"}
        /* Change the color as needed */
        strokeWidth="10"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
      />
      <text    fill="#fff" x="50%" y="50%" textAnchor="middle"  fontSize="20px">
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgress;
