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
import { BigBoxLayout } from "./LowLevelComponents/StyledComponents";
import CalenderSVG from "./images/Calender.svg";

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
    width: "45%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
};

class RegistrationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <Typography className={classNames("fontStyle1")}>
            Registration Details
          </Typography>
          <div
            data-tip
            data-for={"tipRegistration"}
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
            id={"tipRegistration"}
            place="right"
            effect="solid"
          >
            <span>
              Company basic information. The data is based on governmental
              resources (registrar of companies).
            </span>
          </ReactTooltip>
        </div>
        <div className={classes.listDiv}>
          <List>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <img alt="name" src={require("./images/Name.png")} />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: -25 }}
                primary={
                  <Typography className={"fontStyle7"}>Chinese Name</Typography>
                }
              />
              <ListItemSecondaryAction
                className={classNames(classes.listItemSecondary, "fontStyle10")}
              >
                {this.state.report.originalName}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <img alt="number" src={require("./images/Number.png")} />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: -25 }}
                primary={
                  <Typography className={"fontStyle7"}>
                    {this.props.width > 600 ? "Company ID Number" : "ID Number"}
                  </Typography>
                }
              />
              <ListItemSecondaryAction
                className={classNames(classes.listItemSecondary, "fontStyle10")}
              >
                {this.state.report.registrationNumber}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <img alt="number" src={require("./images/Number.png")} />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: -25 }}
                primary={
                  <Typography className={"fontStyle7"}>Credit Code</Typography>
                }
              />
              <ListItemSecondaryAction
                className={classNames(classes.listItemSecondary, "fontStyle10")}
              >
                {this.state.report.registrationCreditCode}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <CalenderSVG alt="registration date" />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: -25 }}
                primary={
                  <Typography className={"fontStyle7"}>
                    {this.props.width > 600
                      ? "Date of Registration"
                      : "Registration Date"}
                  </Typography>
                }
              />
              <ListItemSecondaryAction
                className={classNames(classes.listItemSecondary, "fontStyle10")}
              >
                {this.state.report.dateOfRegistration}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <img alt="status" src={require("./images/Status.png")} />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: -25 }}
                primary={
                  <Typography className={"fontStyle7"}>
                    {this.props.width > 600 ? "Registration Status" : "Status"}
                  </Typography>
                }
              />
              <ListItemSecondaryAction
                className={classNames(classes.listItemSecondary, "fontStyle10")}
              >
                {this.state.report.registrationStatus}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </BigBoxLayout>
    );
  }
}

RegistrationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default withStyles(styles)(RegistrationDetails);
