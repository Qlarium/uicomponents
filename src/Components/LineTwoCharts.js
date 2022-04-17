import React, { Component } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area
} from "recharts";
import Utils from "./js/Utils";
import PropTypes from "prop-types";
import styled from "styled-components";

const blurFilter = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='15' /></filter></svg>#svgMask")`;
const BlurredResponsiveContainer = styled(ResponsiveContainer)`
  filter: ${props => props.blur && blurFilter};
`;

class LineTwoCharts extends Component {
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
      <BlurredResponsiveContainer
        height={this.props.height}
        blur={this.props.blur}
      >
        <ComposedChart
          data={this.state.data}
          margin={{ top: 15, right: 20, left: 5, bottom: 5 }}
        >
          <XAxis
            tickLine={false}
            tick={{
              fontSize: 10,
              fontFamily: "Roboto",
              fill: "#A1AEC6",
              fontWeight: 400
            }}
            dataKey={this.props.keyX}
            tickMargin={5}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            tick={{
              fontSize: 10,
              fontFamily: "Roboto",
              fill: "#A1AEC6",
              fontWeight: 400
            }}
            unit={this.props.unit ? "K" : ""}
            tickMargin={5}
            axisLine={false}
            tickFormatter={value =>
              new Intl.NumberFormat("en").format(
                this.props.unit ? value / 1000 : value
              )
            }
          />
          <CartesianGrid vertical={false} />
          <Tooltip
            formatter={value =>
              (this.props.tooltipUnit !== undefined
                ? this.props.tooltipUnit
                : "") +
              (Array.isArray(value)
                ? new Intl.NumberFormat("en").format(value[0]) +
                  " - " +
                  (this.props.tooltipUnit !== undefined
                    ? this.props.tooltipUnit
                    : "") +
                  new Intl.NumberFormat("en").format(value[1])
                : new Intl.NumberFormat("en").format(value))
            }
            itemStyle={{
              fontFamily: "Roboto",
              fontWeight: 400,
              fontSize: 12
            }}
            labelStyle={{
              fontFamily: "Roboto",
              fontWeight: 400,
              fontSize: 12
            }}
          />
          {this.props.legend ? (
            <Legend
              verticalAlign="top"
              iconType={"circle"}
              iconSize={10}
              wrapperStyle={{
                marginTop: this.props.width > 600 ? "-10px" : "-5px",
                marginLeft: this.props.width > 600 ? "40%" : "30%",
                width: "fit-content",
                fontFamily: "Roboto",
                fontSize: 12,
                fontWeight: 400,
                color: "#0E1F42"
              }}
            />
          ) : (
            ""
          )}
          <Line
            isAnimationActive={!Utils.isPdf()}
            dataKey={this.state.dataKey1}
            stroke="#4C84FF"
          />
          <Area
            type={"monotone"}
            isAnimationActive={!Utils.isPdf()}
            dataKey={this.state.dataKey2}
            stroke="#FF3B77"
            fill="#FF3B77"
          />
        </ComposedChart>
      </BlurredResponsiveContainer>
    );
  }
}

LineTwoCharts.propTypes = {
  height: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  keyX: PropTypes.string.isRequired,
  dataKey1: PropTypes.string.isRequired,
  dataKey2: PropTypes.string.isRequired,
  legend: PropTypes.bool.isRequired,
  unit: PropTypes.bool.isRequired,
  tooltipUnit: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  blur: PropTypes.string
};

export default LineTwoCharts;
