import React from "react";
import "../styles/metrics.css";

type MetricsProps = {
  cpuUsage: number;
  resTime: number;
};

function Metrics(props: MetricsProps) {
  return (
    <div className="metrics">
      <div className="metric">
        <span className="metric-span">Response Time: {props.resTime}ms</span>
      </div>
      <div className="metric">
        <span className="metric-span">CPU Usage: {props.cpuUsage}%</span>
      </div>
    </div>
  );
}

export default Metrics;
