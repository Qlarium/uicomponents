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
import LiabilitiesSVG from "./images/liabilities.svg";
import AssetsSVG from "./images/assets.svg";
import RevenueSVG from "./images/revenue.svg";
import NetProfitSVG from "./images/netProfit.svg";

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
    width: "45%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  date: {
    marginTop: 4
  }
};

class PublicFinancial extends Component {
  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <StyledTitle width={this.props.width}>
            <Typography className={classNames("fontStyle1")}>
              Financial
            </Typography>
            <div
              data-tip
              data-for={"tipFinancial"}
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
              id={"tipFinancial"}
              place="right"
              effect="solid"
            >
              <span>
                Financial data of public company as reported to the Stock
                Exchange
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
        {this.props.data && this.props.data.revenue ? (
          <div className={classes.listDiv}>
            <List>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <RevenueSVG alt="revenue" height={16} width={16} />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>Revenue</Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {"$" +
                    new Intl.NumberFormat("en").format(this.props.data.revenue)}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <NetProfitSVG height={16} width={16} alt="net profit" />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>Net Profit</Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {"$" +
                    new Intl.NumberFormat("en").format(
                      this.props.data.netProfit
                    )}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <AssetsSVG height={16} width={16} alt="total assets" />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      Total Assets
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {"$" +
                    new Intl.NumberFormat("en").format(
                      this.props.data.totalAssets
                    )}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <LiabilitiesSVG
                    height={16}
                    width={16}
                    alt="total liabilities"
                  />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      Total Liabilities
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {"$" +
                    new Intl.NumberFormat("en").format(
                      this.props.data.totalLiabilities
                    )}
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        ) : (
          <NoDataImg text="Non-public companies are not required to provide financial statements since 2013" />
        )}
      </BigBoxLayout>
    );
  }
}

PublicFinancial.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  data: PropTypes.object,
  date: PropTypes.string
};

export default withStyles(styles)(PublicFinancial);
