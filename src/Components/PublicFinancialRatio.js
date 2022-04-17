import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { BigBoxLayout } from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import RatioSVG from "./images/ratio.svg";
import LiabilitiesSVG from "./images/liabilities.svg";
import TurnoverSVG from "./images/turnover.svg";

const StyledTitle = styled.div`
  display: flex;
  width: ${props => (props.width > 600 ? "70%" : "60%")};
`;

const styles = {
  title: {
    marginTop: 19,
    marginLeft: 24,
    textAlign: "left",
    display: "flex",
    height: "min-content",
    width: "100%"
  },
  icon: {
    height: 16,
    width: 16,
    marginTop: -2,
    display: "block"
  },
  listDiv: {
    width: "100%"
  },
  listItemSecondary: {
    textAlign: "left",
    width: "35%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  noDataImg: {
    width: "100%",
    height: "inherit"
  },
  date: {
    marginTop: 4
  }
};

class PublicFinancialRatio extends Component {
  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <StyledTitle width={this.props.width}>
            <Typography className={classNames("fontStyle1")}>
              Financial Ratio
            </Typography>
            <div
              data-tip
              data-for={"tipFinancialRatio"}
              style={{ visibility: Utils.isPdfVisibility() }}
            >
              <img
                alt="info"
                src={Utils.getIcon("info")}
                className={classes.topIcon}
              />
            </div>
            <ReactTooltip
              className={classNames("tooltip", "fontStyle14")}
              id={"tipFinancialRatio"}
              place="right"
              effect="solid"
            >
              <span>
                Main financial Ratios based on the company financial data
              </span>
            </ReactTooltip>
          </StyledTitle>
          {this.props.date ? (
            <Typography className={classNames(classes.date, "fontStyle12")}>
              {this.props.date}
            </Typography>
          ) : (
            ""
          )}
        </div>
        {this.props.data != null ? (
          <div className={classes.listDiv}>
            <List>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <RatioSVG height={16} width={16} alt="ratio" />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      Current Ratio
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {this.props.data.currentRatio !== undefined
                    ? this.props.data.currentRatio.toFixed(2)
                    : ""}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <LiabilitiesSVG height={16} width={16} alt="liabilities" />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      Assets / Total Liabilities
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {this.props.data.totalLiabilities !== undefined
                    ? (this.props.data.totalLiabilities * 100).toFixed(0) + "%"
                    : ""}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <TurnoverSVG height={16} width={16} alt="turnover ratio" />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      AR Turnover Ratio
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {this.props.data.turnoverRatio !== undefined
                    ? this.props.data.turnoverRatio.toFixed(2)
                    : ""}
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        ) : (
          <NoDataImg />
        )}
      </BigBoxLayout>
    );
  }
}

PublicFinancialRatio.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  data: PropTypes.object,
  date: PropTypes.string
};

export default withStyles(styles)(PublicFinancialRatio);
