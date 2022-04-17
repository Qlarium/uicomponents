import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import  LineChart  from "./LineChart";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import {
  BigBoxLayout,
  StyledTitle
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

const styles = {
  select: {
    width: 90,
    border: "1px solid #E4E8ED",
    boxSizing: "border-box",
    borderRadius: 2,
    marginLeft: 5,
    height: 32,
    background: "#ffffff"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  divSelects: {
    marginTop: 2,
    marginLeft: 18
  },
  divSelectOld: {
    marginTop: 12,
    marginLeft: 0
  }
};

class TotalExports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      selectValue: "shipment_count",
      byHscode: !Array.isArray(this.props.report.shipmentsOverTime.supplier),
      hsCodesList: Array.isArray(this.props.report.shipmentsOverTime.supplier)
          ? []
          : Object.keys(this.props.report.shipmentsOverTime.supplier),
      selectedHscode: "Total"
    };
  }

  getExportData() {
    let data = [];
    const { byHscode, selectedHscode, report } = this.state;
    let industry, supplier;

    industry = this.state.report.shipmentsOverTime.industry;
    supplier = this.state.report.shipmentsOverTime.supplier;

    industry = industry[selectedHscode];
    supplier = supplier[selectedHscode];

    for (let i = 0; i < supplier.length; i++) {
      try {
        let currIndustry = industry.find(
            item =>
                item.year == supplier[i].year &&
                item[byHscode ? "quarter" : "month"] ==
                supplier[i][byHscode ? "quarter" : "month"]
        );
        if (currIndustry !== null)
        {
          const year= supplier[i].year.toString().substr(2);
          if(Number.parseInt(year)>=16)
              // TODO: Remove the year logic to generate report
          {
            data.push({
              name:
                  "Q" +
                  supplier[i][byHscode ? "quarter" : "month"] +
                  "-Y" +
                  supplier[i].year.toString().substr(2),
              supplier: supplier[i][this.state.selectValue],
              industry: currIndustry[this.state.selectValue]
            });
          }
        }

      } catch (e) {}
    }
    if (data.length < 2) {
      for (let i = 0; i < supplier.length; i++) {
        try {
          data.push({
            name:
                "Q" +
                supplier[i][byHscode ? "quarter" : "month"] +
                "-Y" +
                supplier[i].year.toString().substr(2),
            supplier: supplier[i][this.state.selectValue]
          });
        } catch (e) {}
      }
    }


    return data;
  }

  render() {
    const { classes, width, type } = this.props;

    const { byHscode, selectedHscode, hsCodesList, selectValue } = this.state;
    const exportData = this.getExportData();
    return (
        <BigBoxLayout
            container={true}
            justify={"space-between"}
            alignItems={"flex-start"}
        >
          <StyledTitle width={width} mobileWidth={"60%"} otherWidth={"70%"} >
            <Typography className={classNames("fontStyle1")}>
              {type === "import" ? "Total Imports Trend" : "Total Exports Trend"}
            </Typography>
            <div data-tip data-for={"tipExports"} style={{ visibility: Utils.isPdfVisibility() }}>
              <img
                  alt="info"
                  src={Utils.getIcon("info")}
                  className={classes.topIcon}
              />
            </div>
            <ReactTooltip
                className={classNames("tooltip", "fontStyle14")}
                id={"tipExports"}
                place="right"
                effect="solid"
            >
            <span>
                   The supplier’s export count over time.
            </span>
            </ReactTooltip>
          </StyledTitle>
          <div className={byHscode ? classes.divSelects : classes.divSelectOld} style={{ visibility: Utils.isPdfVisibility() }}
               style={{marginTop: 16,
                 marginLeft: 24,
                 marginRight: 17}}
          >
            {byHscode ? (
                <select
                    onChange={e => this.setState({ selectedHscode: e.target.value })}
                    className={classNames(classes.select, "fontStyle16")}
                    defaultValue={selectedHscode}
                >
                  <option value={"Total"}>All Hs Codes</option>
                  {hsCodesList.map(item => {
                    if (item !== "Total")
                      return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                      );
                  })}
                </select>
            ) : (
                ""
            )}
          </div>

          {exportData.length > 1 ? (
              (
                  <LineChart
                      height={"75%"}
                      data={exportData}
                      keyX={"name"}
                      dataKey={"supplier"}
                      legend={false}
                      payloadText={
                        selectValue === "value_of_goods"
                            ? "Total Exports"
                            : "Shipments Count"
                      }
                      unit={selectValue === "value_of_goods"}
                      tooltipUnit={selectValue === "value_of_goods" ? "$" : ""}
                      width={width}
                  />
              )
          ) : (
              <NoDataImg />
          )}
        </BigBoxLayout>
    );
  }
}

TotalExports.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  type: PropTypes.string,
  blur: PropTypes.string
};

export default withStyles(styles)(TotalExports);
