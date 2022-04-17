import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";
import PropTypes from "prop-types";

class MyLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      dataKey: this.props.dataKey
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
        <ResponsiveContainer height={this.props.height}>
          <LineChart
              data={this.state.data}
              margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
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
                        : "") + new Intl.NumberFormat("en").format(value)
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
                      marginTop: this.props.width > 600 ? "-35px" : "-5px",
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
            <Line dataKey={this.state.dataKey} stroke="#4C84FF" />
          </LineChart>
        </ResponsiveContainer>
    );
  }
}

MyLineChart.propTypes = {
  height: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  keyX: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  legend: PropTypes.bool.isRequired,
  unit: PropTypes.bool.isRequired,
  tooltipUnit: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

export default MyLineChart;
