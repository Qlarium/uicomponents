import React, { Component } from "react";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";
import PropTypes from "prop-types";

class MyBarChart extends Component {
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
      <BarChart data={this.state.data} margin={{ right: 30, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={this.props.dataKey} />
        <YAxis />
        <Tooltip />
        <Legend
            verticalAlign="top"
            iconType={"circle"}
            iconSize={10}
            wrapperStyle={{
              marginTop: -35,
              marginLeft: this.props.width > 600 ? "50%" : "60%",
              width: "fit-content",
              fontFamily: "Roboto",
              fontSize: 12,
              fontWeight: 400,
              color: "#0E1F42"
            }}
        />
        <Bar dataKey={this.props.dataKeyBar} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    );
  }
}

MyBarChart.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  dataKeyBar: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default MyBarChart;