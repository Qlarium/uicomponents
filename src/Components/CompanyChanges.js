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
import ReactTooltip from "react-tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import {
  Unselectable,
  StyledTitle,
  BigBoxLayout,
  StyledCloseIcon,
  StyledDialogContent,
  StyledExpansionPanel,
  StyledListItem,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails
} from "./LowLevelComponents/StyledComponents";
import Utils from "./js/Utils";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChangeIcon from "@material-ui/icons/Cached";
import MonitorDetails from "./MonitorDetails";
import styled from "styled-components";

import BackSVG from "./images/Back.svg";
import CloseSVG from "./images/Close.svg";

import InsightLegalSVG from "./images/InsightLegal.svg";
import StatusSVG from "./images/Status.svg";
import RevenueSVG from "./images/revenue.svg";
import InsightTradeSVG from "./images/InsightTrade.svg";
import InsightIndustrySVG from "./images/InsightIndustry.svg";

const blurFilter = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='8' /></filter></svg>#svgMask")`;
const ChangeItem = styled(ListItem)`
  ${props => props.blur && Unselectable}
  filter: ${props => props.blur && blurFilter};
`;

const styles = {
  expansionSummaryInner: {
    margin: "0px !important"
  },
  icon: {
    height: 24,
    width: 24
  },
  listDiv: {
    width: "100%",
    height: 210
  },
  listItemSecondary: {
    textAlign: "left",
    left: "75%",
    transform: "none !important",
    top: "25%"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  listItem: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  divViewAll: {
    marginTop: 19,
    cursor: "pointer"
  },
  dialog: {
    margin: 16
  },
  imgChange: {
    height: 20,
    width: 20,
    top: "25%",
    position: "absolute"
  },
  typoTitle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#586782",
    fontSize: 12
  }
};

class CompanyChanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChangesOpen: false
    };
  }

  isSpecialChange(change) {
    const lowerCaseChange = change ? change.toLowerCase() : "";
    return (
      lowerCaseChange.includes("[new]") ||
      lowerCaseChange.includes("[quit]") ||
      lowerCaseChange.includes("[quits]") ||
      lowerCaseChange.includes("[exit]") ||
      lowerCaseChange.includes("[added]") ||
      lowerCaseChange.includes("[withdrew]")
    );
  }

  isSeperatedChange(changeItem) {
    const lowerCaseChangeItem = changeItem ? changeItem.toLowerCase() : "";
    return (
      lowerCaseChangeItem.includes("scope of business") ||
      lowerCaseChangeItem.includes("shareholder") ||
      lowerCaseChangeItem.includes("legal representative") ||
      lowerCaseChangeItem.includes("director")
    );
  }

  getData() {
    const data = [];
    const changes = this.props.report.changesList || [];
    const monitoring = this.props.report.monitoringData || [];
    let posChanges = 0,
      posMonitoring = 0;
    while (posChanges < changes.length || posMonitoring < monitoring.length) {
      if (posChanges < changes.length && posMonitoring < monitoring.length) {
        if (
          new Date(changes[posChanges].date) >
          new Date(monitoring[posMonitoring].creation_date)
        ) {
          data.push(changes[posChanges]);
          posChanges++;
        } else {
          data.push(monitoring[posMonitoring]);
          posMonitoring++;
        }
      } else if (posChanges < changes.length) {
        data.push(changes[posChanges]);
        posChanges++;
      } else {
        data.push(monitoring[posMonitoring]);
        posMonitoring++;
      }
    }

    return data;
  }

  renderChangeIcon(changeIcon) {
    switch (changeIcon) {
      case "assets.svg":
        return <InsightLegalSVG style={{ width: 24, height: 24 }} />;
      case "Status.svg":
        return <StatusSVG style={{ width: 16, height: 16, padding: 4 }} />;
      case "revenue.svg":
        return <RevenueSVG style={{ width: 16, height: 16, padding: 4 }} />;
      case "InsightTrade.svg":
        return <InsightTradeSVG style={{ width: 24, height: 24 }} />;
      case "InsightIndustry.svg":
        return <InsightIndustrySVG style={{ width: 24, height: 24 }} />;
    }
  }

  render() {
    const { classes, report, width } = this.props;
    const data = this.getData();
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <StyledTitle width={width} mobileWidth={"65%"} otherWidth={"75%"}>
          <Typography className={classNames("fontStyle1")}>
            Changes in the Company
          </Typography>
          <div
            data-tip
            data-for={"tipChanges"}
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
            id={"tipChanges"}
            place="right"
            effect="solid"
          >
            <span>The supplier’s changes during the years</span>
          </ReactTooltip>
        </StyledTitle>
        {data.length > 0 ? (
          <div
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ allChangesOpen: true })}
            style={{ visibility: Utils.isPdfVisibility() }}
            data-cy="divViewAll"
          >
            View All
            <BackSVG style={{ marginTop: -4, position: "absolute" }} />
          </div>
        ) : (
          ""
        )}
        {data.length > 0 ? (
          <div className={classes.listDiv}>
            <div className={classes.listDiv}>
              <List disablePadding={true} dense={true}>
                {data
                  .filter(change => change.changeItem !== "")
                  .slice(0, 5)
                  .map((change, idx) => {
                    return (
                      <ChangeItem
                        key={"change" + idx}
                        blur={idx >= this.props.blur}
                      >
                        <ListItemIcon className={classes.icon}>
                          {change.changeItem ? (
                            <ChangeIcon
                              style={{
                                color: "#A4AFBF",
                                width: 18,
                                paddingLeft: 4
                              }}
                              className={classes.imgChange}
                            />
                          ) : (
                            this.renderChangeIcon(change.CHANGE_ICON)
                          )}
                        </ListItemIcon>
                        <ListItemText
                          style={{ marginLeft: -25, maxWidth: "68%" }}
                          primary={
                            <div>
                              <div data-tip data-for={"tipchange" + idx}>
                                <Typography
                                  className={classNames(
                                    "fontStyle7",
                                    classes.listItem
                                  )}
                                >
                                  {change.changeItem || change.CHANGE_MSG}
                                </Typography>
                              </div>
                              <ReactTooltip
                                className={classNames("tooltip", "fontStyle14")}
                                id={"tipchange" + idx}
                                place="bottom"
                                effect="solid"
                              >
                                <div>
                                  <div>
                                    <span style={{ fontWeight: "bold" }}>
                                      Change:{" "}
                                    </span>
                                    <span>
                                      {change.changeItem || change.CHANGE_MSG}
                                    </span>
                                  </div>
                                  {change.before ? (
                                    <div>
                                      <span style={{ fontWeight: "bold" }}>
                                        Before Change:{" "}
                                      </span>
                                      <span>{change.before}</span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {change.after ? (
                                    <div>
                                      <span style={{ fontWeight: "bold" }}>
                                        After Change:{" "}
                                      </span>
                                      <span>{change.after}</span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </ReactTooltip>
                            </div>
                          }
                        />
                        <ListItemSecondaryAction
                          className={classNames(
                            classes.listItemSecondary,
                            "fontStyle10"
                          )}
                        >
                          {change.creation_date || change.date}
                        </ListItemSecondaryAction>
                      </ChangeItem>
                    );
                  })}
              </List>
            </div>
          </div>
        ) : (
          <NoDataImg />
        )}
        <Dialog
          PaperProps={{
            classes: {
              root: classes.dialog
            }
          }}
          open={this.state.allChangesOpen}
          onClose={() => this.setState({ allChangesOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            onClick={() => this.setState({ allChangesOpen: false })}
          >
            <CloseSVG alt="Close" />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            All Changes
          </DialogTitle>
          <StyledDialogContent blur={this.props.blur}>
            <List>
              {data
                .filter(change => change.changeItem !== "")
                .map((change, idx) => {
                  return (
                    <div key={"changeDialog" + idx}>
                      <StyledListItem>
                        <StyledExpansionPanel style={{ width: "100%" }}>
                          <StyledExpansionSummary
                            IconButtonProps={{
                              style: {
                                padding: 0
                              }
                            }}
                            classes={{
                              content: classes.expansionSummaryInner,
                              expanded: classes.expansionSummaryInner
                            }}
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <ListItemIcon>
                              {change.changeItem ? (
                                <ChangeIcon
                                  style={{
                                    color: "#A4AFBF",
                                    width: 18,
                                    paddingLeft: 4
                                  }}
                                />
                              ) : (
                                this.renderChangeIcon(change.CHANGE_ICON)
                              )}
                            </ListItemIcon>
                            <StyledListItemText
                              primary={
                                <Typography className={"fontStyle5"}>
                                  {change.changeItem || change.CHANGE_MSG}
                                </Typography>
                              }
                              secondary={
                                <Typography className={"fontStyle11"}>
                                  {"\u2022 Change Date: " +
                                    (change.creation_date || change.date)}
                                </Typography>
                              }
                            />
                          </StyledExpansionSummary>
                          <StyledExpansionPanelDetails>
                            {change.changeItem ? (
                              <div>
                                <Typography className={classes.typoTitle}>
                                  {"\u2022"} Before Change:
                                </Typography>
                                {this.isSeperatedChange(change.changeItem) ? (
                                  <div>
                                    {change.before
                                      ? change.before
                                          .split(/;/)
                                          .map((change, index) => (
                                            <Typography
                                              key={"before" + idx + " " + index}
                                              style={{ marginLeft: 7 }}
                                              className={
                                                this.isSpecialChange(change)
                                                  ? "fontStyle30"
                                                  : "fontStyle11"
                                              }
                                            >
                                              {change}
                                            </Typography>
                                          ))
                                      : ""}
                                  </div>
                                ) : (
                                  <Typography
                                    key={"before" + idx}
                                    style={{ marginLeft: 7 }}
                                    className={"fontStyle11"}
                                  >
                                    {change.before || ""}
                                  </Typography>
                                )}
                                <Typography className={classes.typoTitle}>
                                  {"\u2022"} After Change:
                                </Typography>
                                {this.isSeperatedChange(change.changeItem) ? (
                                  <div>
                                    {change.after
                                      ? change.after
                                          .split(/;/)
                                          .map((change, index) => (
                                            <Typography
                                              key={"after" + idx + " " + index}
                                              style={{ marginLeft: 7 }}
                                              className={
                                                this.isSpecialChange(change)
                                                  ? "fontStyle30"
                                                  : "fontStyle11"
                                              }
                                            >
                                              {change}
                                            </Typography>
                                          ))
                                      : ""}
                                  </div>
                                ) : (
                                  <Typography
                                    key={"after" + idx}
                                    style={{ marginLeft: 7 }}
                                    className={"fontStyle11"}
                                  >
                                    {change.after || ""}
                                  </Typography>
                                )}
                              </div>
                            ) : (
                              <div style={{ width: "100%" }}>
                                <MonitorDetails
                                  boxlayout={"true"}
                                  data={change}
                                  width={width}
                                />
                              </div>
                            )}
                          </StyledExpansionPanelDetails>
                        </StyledExpansionPanel>
                      </StyledListItem>
                      <Divider />
                    </div>
                  );
                })}
            </List>
          </StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

CompanyChanges.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  blur: PropTypes.integer
};

export default withStyles(styles)(CompanyChanges);
