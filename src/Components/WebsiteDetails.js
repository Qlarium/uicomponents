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
import NoDataImg from "./LowLevelComponents/NoDataImg";
import CountryIcon from "@material-ui/icons/LocationCity";
import EmailIcon from "@material-ui/icons/Email";
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
    width: "50%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
};

class WebsiteDetails extends Component {
  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
        <div className={classes.title}>
          <Typography className={classNames("fontStyle1")}>
            DNS Details
          </Typography>
          <div data-tip data-for={"tipWebDetails"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipWebDetails"}
            place="right"
            effect="solid"
          >
            <span>
              DNS basic information. The data is based on "Who Is Website".
            </span>
          </ReactTooltip>
        </div>
        {this.props.websiteWhoIs &&
        this.props.websiteWhoIs.dataError !== "MISSING_WHOIS_DATA" &&
        this.props.websiteWhoIs.dataError !== "INCOMPLETE_DATA" ? (
          <div className={classes.listDiv}>
            <List>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <img alt="name" src={require("./images/Name.png")} />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      Registrar Name
                    </Typography>
                  }
                />
                <div data-tip data-for={"registrarName"}>
                  <ListItemSecondaryAction
                    className={classNames(
                      classes.listItemSecondary,
                      "fontStyle10"
                    )}
                  >
                    {this.props.websiteWhoIs.registrarName}
                  </ListItemSecondaryAction>
                </div>
                <ReactTooltip
                  className={classNames("tooltip", "fontStyle14")}
                  id={"registrarName"}
                  place="top"
                  type="info"
                  effect="solid"
                >
                  <span>{this.props.websiteWhoIs.registrarName}</span>
                </ReactTooltip>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <CalenderSVG alt="number" />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      Creation Date
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {this.props.websiteWhoIs.registryData &&
                  this.props.websiteWhoIs.registryData.createdDate
                    ? this.props.websiteWhoIs.registryData.createdDate.substr(
                        0,
                        10
                      )
                    : ""}
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
                      Expiration Date
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {this.props.websiteWhoIs.registryData &&
                  this.props.websiteWhoIs.registryData.expiresDate
                    ? this.props.websiteWhoIs.registryData.expiresDate.substr(
                        0,
                        10
                      )
                    : ""}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <CountryIcon />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      Domain Country
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {this.props.websiteWhoIs.registryData.registrant
                    ? this.props.websiteWhoIs.registryData.registrant.country
                    : ""}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>Email</Typography>
                  }
                />
                <div data-tip data-for={"domainEmail"}>
                  <ListItemSecondaryAction
                    className={classNames(
                      classes.listItemSecondary,
                      "fontStyle10"
                    )}
                  >
                    {this.props.websiteWhoIs.registryData.registrant
                      ? this.props.websiteWhoIs.registryData.registrant.email
                      : ""}
                  </ListItemSecondaryAction>
                </div>
                <ReactTooltip
                  className={classNames("tooltip", "fontStyle14")}
                  id={"domainEmail"}
                  place="top"
                  type="info"
                  effect="solid"
                >
                  <span>
                    {this.props.websiteWhoIs.registryData.registrant
                      ? this.props.websiteWhoIs.registryData.registrant.email
                      : ""}
                  </span>
                </ReactTooltip>
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

WebsiteDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  websiteWhoIs: PropTypes.object
};

export default withStyles(styles)(WebsiteDetails);
