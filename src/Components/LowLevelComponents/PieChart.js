import React, { Component } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";
import SvgIcon from "@material-ui/core/SvgIcon";
import ReactTooltip from "react-tooltip";
import classNames from "classnames";
import PropTypes from "prop-types";
import styled from "styled-components";
import Utils from "../js/Utils";

const blurFilter = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='8' /></filter></svg>#svgMask")`;
const BlurredResponsiveContainer = styled(ResponsiveContainer)`
  filter: ${props => props.blur && blurFilter};
`;

const StyledUlLegend = styled.ul`
  margin-top: 0px;
  width: ${props =>
    props.width > 600 ? (props.width > 1500 ? "235px" : "220px") : "130px"};
  line-height: 30px;
  max-width: ${props =>
    props.width > 600 ? (props.width > 1500 ? "235px" : "220px") : "130px"};
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #0e1f42;
`;

const StyledTextLegend = styled.a`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: ${props => (props.width > 600 ? 0 : "-10px")};
  text-align: left;
  line-height: ${props => (props.topTitle === "Shareholders" ? "20px" : "")};
  color: ${props => (props.drillDown === "true" ? "#4c84ff" : "#0e1f42")};
  cursor: ${props => (props.drillDown === "true" ? "pointer" : "default")};
`;

const StyledCustomTooltip = styled.div`
  background: #182d5a;
  padding: 12px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 12px;
  text-align: left;
  max-width: 250px;
  font-weight: 400px;
`;

const CustomTooltip = props => {
  if (props.payload[0] != null) {
    return (
        <StyledCustomTooltip>
          {props.payload[0].payload[props.name].replace("###", "")}{" "}
          {props.value
              ? ": " +
              new Intl.NumberFormat("en").format(
                  props.payload[0].payload[props.value]
              ) +
              props.unit
              : ""}
        </StyledCustomTooltip>
    );
  }
  return <DefaultTooltipContent {...props} />;
};

const ProductTooltip = props => {
  const { classes } = props;
  if (props.payload[0] != null) {
    return (
        <StyledCustomTooltip>
          <div>HsCode: {props.payload[0].payload["hs_code"]}</div>
          <div>
            Shipment count:{" "}
            {Utils.shipmentsCountString(
                props.payload[0].payload["shipment_count"]
            )}
          </div>
          <div>
            Weight:{" "}
            {props.payload[0].payload["total_kg"]
                ? new Intl.NumberFormat("en").format(
                props.payload[0].payload["total_kg"]
            ) + " KG"
                : "Unknown"}
          </div>
          <div>
            Products sales {props.period}: $
            {new Intl.NumberFormat("en").format(
                props.payload[0].payload["value_of_goods"]
            )}
          </div>
          <div>HsCode description: {props.payload[0].payload["hscode_desc"]}</div>
        </StyledCustomTooltip>
    );
  }
  return <DefaultTooltipContent {...props} />;
};

const CustomLegend = props => {
  const { payload, width, title, blur } = props;
  const COLORS = ["#FF3B77", "#2FD565", "#F97413", "#4C84FF", "#A1AEC6"];
  return (
      <StyledUlLegend width={width}>
        {payload.map((entry, index) => (
            <li style={{ display: "flex", marginLeft: -20 }} key={`item-${index}`}>
              <SvgIcon style={{ marginTop: title === "Shareholders" ? 7 : 11 }}>
                <svg
                    width="7"
                    height="8"
                    viewBox="0 0 7 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                      cx="3.5"
                      cy="3.83389"
                      rx="3.5"
                      ry="3.51211"
                      fill={COLORS[index % COLORS.length]}
                  />
                </svg>
              </SvgIcon>
              {title === "Shareholders" && entry.value.indexOf("###") !== -1 ? (
                  <StyledTextLegend
                      topTitle={title}
                      width={width}
                      data-tip
                      data-for={`${title}-${index}`}
                  >
                    <span>{entry.value.substr(0, entry.value.indexOf("###"))}</span>
                    <br />
                    <span>{entry.value.substr(entry.value.indexOf("###") + 3)}</span>
                  </StyledTextLegend>
              ) : (
                  <StyledTextLegend
                      topTitle={title}
                      width={width}
                      data-tip
                      data-for={`${title}-${index}`}
                      drillDown={entry.value === "Others" ? "true" : "false"}
                  >
              <span onClick={() => props.otherClick(true)}>
                {entry.value}
                {entry.value === "Others" ? (
                    <img
                        alt="other"
                        src={require("../images/Back.png")}
                        style={{
                          position: "absolute",
                          height: 20,
                          marginTop: 4,
                        }}
                    />
                ) : (
                    ""
                )}
              </span>
                  </StyledTextLegend>
              )}

            </li>
        ))}
      </StyledUlLegend>
  );
};

const RADIAN = Math.PI / 180;
const CustomLabel = ({
                       cx,
                       cy,
                       midAngle,
                       innerRadius,
                       outerRadius,
                       percent,
                       index,
                       width,
                       title
                     }) => {
  const radius = outerRadius * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const COLORS = ["#FF3B77", "#2FD565", "#F97413", "#4C84FF", "#A1AEC6"];
  return (percent >= 1 || title === "Shareholders"
      ? percent
      : (percent * 100).toFixed(0)) >= 10 ? (
      <text
          x={(width < 600 ? x + (x > cx ? -10 : 10) : x) + (x > cx ? -5 : 5)}
          y={y}
          style={{
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: 12
          }}
          fill={COLORS[index % COLORS.length]}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
      >
        {`${
            percent >= 1 || title === "Shareholders"
                ? percent
                : (percent * 100).toFixed(0)
        }%`}
      </text>
  ) : (
      ""
  );
};

class MyPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      dataKey: this.props.dataKey,
      cx: this.props.cx,
      cy: this.props.cy,
      innerRadius: this.props.innerRadius,
      outerRadius: this.props.outerRadius,
      key: 1
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: this.props.data
      });
    }
    if (prevProps.period !== this.props.period) {
      this.setState({ key: this.state.key + 1 });
    }

    if (prevProps.innerRadius !== this.props.innerRadius) {
      this.setState({
        innerRadius: this.props.innerRadius,
        outerRadius: this.props.outerRadius
      });
    }
  }

  render() {
    const COLORS = ["#FF3B77", "#2FD565", "#F97413", "#4C84FF", "#A1AEC6"];
    const { classes } = this.props;
    return (
        <BlurredResponsiveContainer
            key={this.state.key}
            height={this.props.height}
            blur={this.props.blur}
        >
          <PieChart>
            <Legend
                verticalAlign="middle"
                layout="vertical"
                align="right"
                content={
                  <CustomLegend
                      title={this.props.title}
                      width={this.props.width}
                      otherClick={this.props.otherClick}
                      classes={classes}
                      blur={this.props.blur}
                  />
                }
            />
            <Pie
                isAnimationActive={false}
                data={this.state.data}
                dataKey={this.state.dataKey}
                nameKey={this.props.name}
                cx={this.state.cx}
                cy={this.state.cy}
                innerRadius={this.state.innerRadius}
                outerRadius={this.state.outerRadius}
                fill="#8884d8"
                labelLine={false}
                label={
                  <CustomLabel width={this.props.width} title={this.props.title} />
                }
            >
              {this.state.data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
                content={
                  this.props.productsTooltip ? (
                      <ProductTooltip classes={classes} period={this.props.period} />
                  ) : (
                      <CustomTooltip
                          classes={classes}
                          value={
                            this.props.title === "Shareholders"
                                ? ""
                                : this.state.dataKey
                          }
                          name={
                            this.props.name !== undefined ? this.props.name : "name"
                          }
                          unit={
                            this.props.title === "Shareholders" ? "" : this.props.unit
                          }
                      />
                  )
                }
            />
          </PieChart>
        </BlurredResponsiveContainer>
    );
  }
}

MyPieChart.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.string.isRequired,
  name: PropTypes.string,
  unit: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  productsTooltip: PropTypes.bool,
  period: PropTypes.string,
  title: PropTypes.string.isRequired,
  otherClick: PropTypes.func,
  blur: PropTypes.boolean
};

export default MyPieChart;
