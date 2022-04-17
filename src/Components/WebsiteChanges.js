import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import { BigBoxLayout } from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import BarChart from "./LowLevelComponents/BarChart";

const styles = {
  title: {
    marginTop: 19,
    marginLeft: 24,
    textAlign: "left",
    display: "flex",
    height: "min-content"
  },
  icon: {
    height: 24,
    width: 24
  },
  listDiv: {
    width: "100%"
  },
  listItemSecondary: {
    textAlign: "left",
    width: "50%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  bottomMsg: {
    marginLeft: 22,
    marginRight: 10,
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  bottomIcon: {
    position: "absolute",
    marginTop: -4,
    height: 24,
    width: 24
  }
};

class WebsiteChanges extends Component {
  getWebsiteData() {
    let data = [];

    for (let i = 1; i < this.props.websiteChanges.length; i++) {
      const change = this.props.websiteChanges[i];
      const year = change[1].substr(0, 4);
      let found = false;
      for (let j = 0; j < data.length; j++) {
        if (data[j].name === year) {
          found = true;
          data[j].Changes = data[j].Changes + 1;
          break;
        }
      }
      if (!found) data.push({ name: year, Changes: 1 });
    }

    if (data.length < 5 && data.length > 0) {
      let tempArr = [];
      const difference = 5 - data.length;
      let min = Number.parseInt(data[0].name);
      for (let i = 1; i < data.length; i++) {
        if (Number.parseInt(data[i].name) < min)
          min = Number.parseInt(data[i].name);
      }
      for (let i = 0; i < difference; i++) {
        tempArr.push({ name: min - difference + i, Changes: 0 });
      }
      for (let i = 0; i < data.length; i++) {
        tempArr.push(data[i]);
      }
      data = tempArr;
    }

    return data;
  }
  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <Typography className={classNames("fontStyle1")}>
            Website Changes
          </Typography>
          <div data-tip data-for={"tipWebChanges"} style={{ visibility: Utils.isPdfVisibility() }}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipWebChanges"}
            place="right"
            effect="solid"
          >
            <span>
              Website changes information. The data is based on "Web Archive".
            </span>
          </ReactTooltip>
        </div>
        {this.props.websiteChanges &&
        Array.isArray(this.props.websiteChanges) &&
        this.props.websiteChanges.length > 0 ? (
          <div style={{ width: "100%" }}>
            <BarChart
              height={"88%"}
              width={this.props.width}
              dataKeyBar={"Changes"}
              dataKey={"name"}
              data={this.getWebsiteData()}
            />
            <Typography
              className={classNames(classes.bottomMsg, "fontStyle11")}
            >
              {this.props.bottomMsg ? (
                <img
                  alt="bottomIcon"
                  className={classes.bottomIcon}
                  src={this.props.bottomIcon}
                />
              ) : (
                ""
              )}
              <label style={{ marginLeft: 25 }}>{this.props.bottomMsg}</label>
            </Typography>
          </div>
        ) : (
          <NoDataImg />
        )}
      </BigBoxLayout>
    );
  }
}

WebsiteChanges.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  websiteChanges: PropTypes.array,
  bottomMsg: PropTypes.string,
  bottomIcon: PropTypes.string
};

export default withStyles(styles)(WebsiteChanges);
