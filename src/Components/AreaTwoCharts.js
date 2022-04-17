import React, { Component } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";
import PropTypes from "prop-types";

class AreaTwoCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      dataKey1: this.props.dataKey1,
      dataKey2: this.props.dataKey2
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: this.props.data
      });
    }
  }

  render() {
    return (
      <ResponsiveContainer height={"80%"}>
        <AreaChart
          data={this.state.data}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            tickLine={false}
            tick={{ fontSize: 10, fontFamily: "Roboto", fill: "#A1AEC6" }}
            dataKey={this.props.keyX}
          />
          <YAxis
            tickLine={false}
            tick={{ fontSize: 10, fontFamily: "Roboto", fill: "#A1AEC6" }}
            unit={this.props.unit ? "K" : ""}
            tickFormatter={value =>
              new Intl.NumberFormat("en").format(
                this.props.unit ? value / 1000 : value
              )
            }
          />
          <CartesianGrid vertical={false} />
          <Tooltip
            formatter={value => new Intl.NumberFormat("en").format(value)}
          />
          {this.props.legend ? (
            <Legend
              verticalAlign="top"
              iconType={"circle"}
              iconSize={12}
              wrapperStyle={{
                marginTop: this.props.width > 600 ? "-28px" : "-5px",
                marginLeft: "10%",
                fontFamily: "Roboto",
                fontSize: 12,
                color: "#0E1F42"
              }}
            />
          ) : (
            ""
          )}
          <Area
            type="monotone"
            dataKey={this.state.dataKey1}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            fillOpacity={1}
            fill="url(#color1)"
          />
          <Area
            type="monotone"
            dataKey={this.state.dataKey2}
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            fillOpacity={1}
            fill="url(#color2)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

AreaTwoCharts.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  keyX: PropTypes.string.isRequired,
  dataKey1: PropTypes.string.isRequired,
  dataKey2: PropTypes.string.isRequired,
  legend: PropTypes.bool.isRequired
};

export default AreaTwoCharts;
