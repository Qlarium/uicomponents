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
import { withStyles } from "@material-ui/core/styles/index";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";
import Utils from "./js/Utils";

const CustomTooltip = props => {
  const { classes } = props;
  if (props.payload[0] != null) {
    return (
      <div className={classes.customTooltip}>
        <div align="center" style={{ fontWeight: "bold", marginBottom: 5 }}>
          {props.payload[0].payload[props.name]}
        </div>
        {props.payloadText}
        {": "}
        {(props.tooltipUnit ? props.tooltipUnit : "") +
          new Intl.NumberFormat("en").format(
            props.payload[0].payload[props.value]
          )}
      </div>
    );
  }
  return <DefaultTooltipContent {...props} />;
};

const styles = {
  customTooltip: {
    background: "#182D5A",
    padding: 12,
    color: "#ffffff",
    fontFamily: "Roboto",
    fontSize: 12,
    textAlign: "left",
    maxWidth: 250,
    fontWeight: 400
  }
};

class MyLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
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
            content={
              <CustomTooltip
                name={this.props.keyX}
                value={this.props.dataKey}
                classes={this.props.classes}
                payloadText={
                  this.props.payloadText
                    ? this.props.payloadText
                    : this.props.dataKey
                }
                tooltipUnit={this.props.tooltipUnit}
              />
            }
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
          <Line
            isAnimationActive={!Utils.isPdf()}
            dataKey={this.props.dataKey}
            stroke="#4C84FF"
          />
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

export default withStyles(styles)(MyLineChart);
