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
import MonitorDetails from "./MonitorDetails";

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

class MonitorInsightsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMonitorOpen: false
    };
  }

  render() {
    const { classes, monitorData, width } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <StyledTitle width={width} mobileWidth={"65%"} otherWidth={"75%"}>
          <Typography className={classNames("fontStyle1")}>
            Monitor Insights
          </Typography>
          <div data-tip data-for={"tipMonitor"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipMonitor"}
            place="right"
            effect="solid"
          >
            <span>The supplier’s monitoring insights during the years</span>
          </ReactTooltip>
        </StyledTitle>
        {monitorData.length > 0 ? (
          <div
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ allMonitorOpen: true })}
            data-cy="divViewAll"
          >
            View All
            <img
              alt="view all"
              src={require("./images/Back.png")}
              style={{ marginTop: -4, position: "absolute" }}
            />
          </div>
        ) : (
          ""
        )}
        {monitorData.length > 0 ? (
          <div className={classes.listDiv}>
            <div className={classes.listDiv}>
              <List disablePadding={true} dense={true}>
                {monitorData.slice(0, 5).map((change, idx) => {
                  return (
                    <ListItem key={"monitor" + idx}>
                      <ListItemIcon className={classes.icon}>
                        <img
                          height={
                            change.CHANGE_ICON === "revenue.svg" ? 16 : 24
                          }
                          width={change.CHANGE_ICON === "revenue.svg" ? 16 : 24}
                          style={{
                            padding:
                              change.CHANGE_ICON === "revenue.svg" ? 4 : ""
                          }}
                          alt={change.icon}
                          src={Utils.getImage(change.CHANGE_ICON)}
                        />
                      </ListItemIcon>
                      <ListItemText
                        style={{ marginLeft: -25, maxWidth: "68%" }}
                        primary={
                          <div>
                            <div data-tip data-for={"tipmonitor" + idx}>
                              <Typography
                                className={classNames(
                                  "fontStyle7",
                                  classes.listItem
                                )}
                              >
                                {change.CHANGE_MSG}
                              </Typography>
                            </div>
                            <ReactTooltip
                              className={classNames("tooltip", "fontStyle14")}
                              id={"tipmonitor" + idx}
                              place="bottom"
                              effect="solid"
                            >
                              <div>
                                <div>
                                  <span style={{ fontWeight: "bold" }}>
                                    Change:{" "}
                                  </span>
                                  <span>{change.CHANGE_MSG}</span>
                                </div>
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
                        {change.creation_date}
                      </ListItemSecondaryAction>
                    </ListItem>
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
          open={this.state.allMonitorOpen}
          onClose={() => this.setState({ allMonitorOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            onClick={() => this.setState({ allMonitorOpen: false })}
          >
            <img alt="Close" src={require("./images/Close.png")} />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            All Monitor Insights
          </DialogTitle>
          <StyledDialogContent>
            <List>
              {monitorData.map((change, idx) => {
                return (
                  <div key={"monitorDialog" + idx}>
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
                            <img
                              height={
                                change.CHANGE_ICON === "revenue.svg" ? 16 : 24
                              }
                              width={
                                change.CHANGE_ICON === "revenue.svg" ? 16 : 24
                              }
                              style={{
                                padding:
                                  change.CHANGE_ICON === "revenue.svg" ? 4 : ""
                              }}
                              alt={change.icon}
                              src={Utils.getImage(change.CHANGE_ICON)}
                            />
                          </ListItemIcon>
                          <StyledListItemText
                            primary={
                              <Typography className={"fontStyle5"}>
                                {change.CHANGE_MSG}
                              </Typography>
                            }
                            secondary={
                              <Typography className={"fontStyle11"}>
                                {"\u2022 Change Date: " + change.creation_date}
                              </Typography>
                            }
                          />
                        </StyledExpansionSummary>
                        <StyledExpansionPanelDetails>
                          <div>
                            <MonitorDetails boxlayout={"true"} data={change} width={width} />
                          </div>
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

MonitorInsightsBox.propTypes = {
  classes: PropTypes.object.isRequired,
  monitorData: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired
};

export default withStyles(styles)(MonitorInsightsBox);
