import React, { Component } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150
  }
];

class RadarChartWrapper extends Component {
  render() {
    const { width, data } = this.props;
    return (
      <ResponsiveContainer height={width > 650 ? 450 : 250}>
        <RadarChart
          cx={width > 650 ? 280 : 145}
          cy={width > 650 ? 240 : 140}
          outerRadius={width > 650 ? 180 : 70}
          data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name="Supplier"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Industry"
            dataKey="B"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend
            iconType={"circle"}
            iconSize={10}
            verticalAlign="top"
            wrapperStyle={{
              left: width > 650 ? "40%" : "30%",
              width: "fit-content",
              fontFamily: "Roboto",
              fontSize: 12,
              fontWeight: 400,
              color: "#0E1F42"
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}

export default RadarChartWrapper;
