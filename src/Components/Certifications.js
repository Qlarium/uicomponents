import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Utils from "./js/Utils";
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
  StyledExpansionSummary,
  StyledExpansionPanelDetails
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import CertificationSVG from "./images/Certification.svg";

import BackSVG from "./images/Back.svg";
import CloseSVG from "./images/Close.svg";

const blurFilter = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='8' /></filter></svg>#svgMask")`;
const CertListItem = styled(ListItem)`
  ${props => props.blur && Unselectable}
  filter: ${props => props.blur && blurFilter};
`;

export const StyledListItemText = styled(ListItemText)`
  margin-left: -25px;
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
    left: "65%",
    transform: "none !important",
    top: "25%"
  },
  bottomMsg: {
    marginTop: -10,
    marginRight: 10,
    marginLeft: 22,
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
  }
};

class Certifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      allCertificatesOpen: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <StyledTitle
          width={this.props.width}
          mobileWidth={"65%"}
          otherWidth={"75%"}
        >
          <Typography className={classNames("fontStyle1")}>
            Certifications
          </Typography>
          <div
            data-tip
            data-for={"tipCertifications"}
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
            id={"tipCertifications"}
            place="right"
            effect="solid"
          >
            <span>The supplier’s certifications</span>
          </ReactTooltip>
        </StyledTitle>
        {this.state.report.certificates.length > 0 ? (
          <div
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ allCertificatesOpen: true })}
            data-cy="divViewAll"
            style={{ visibility: Utils.isPdfVisibility() }}
          >
            View All
            <BackSVG
              alt="view all"
              style={{ marginTop: -4, position: "absolute" }}
            />
          </div>
        ) : (
          ""
        )}
        {this.state.report.certificates.length > 0 ? (
          <div className={classes.listDiv}>
            <div className={classes.listDiv}>
              <List disablePadding={true} dense={true}>
                {this.state.report.certificates
                  .filter(certificate => certificate.name !== "")
                  .slice(0, 5)
                  .map((certificate, idx) => {
                    return (
                      <CertListItem key={idx} blur={idx >= this.props.blur}>
                        <ListItemIcon className={classes.icon}>
                          <CertificationSVG alt="certificate" />
                        </ListItemIcon>
                        <ListItemText
                          style={{ marginLeft: -25, maxWidth: "58%" }}
                          primary={
                            <div>
                              <div data-tip data-for={"tip" + certificate.name}>
                                <Typography
                                  className={classNames(
                                    "fontStyle7",
                                    classes.listItem
                                  )}
                                >
                                  {certificate.name}
                                </Typography>
                              </div>
                              <ReactTooltip
                                className={classNames("tooltip", "fontStyle14")}
                                id={"tip" + certificate.name}
                                place="bottom"
                                effect="solid"
                              >
                                <span>{certificate.name}</span>
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
                          {certificate.validity === 1
                            ? "Valid (" + certificate.expiration + ")"
                            : "Invalid"}
                        </ListItemSecondaryAction>
                      </CertListItem>
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
          open={this.state.allCertificatesOpen}
          onClose={() => this.setState({ allCertificatesOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            onClick={() => this.setState({ allCertificatesOpen: false })}
          >
            <CloseSVG alt="Close" />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            All Certificates
          </DialogTitle>
          <StyledDialogContent blur={this.props.blur >= 0}>
            <List>
              {this.state.report.certificates
                .filter(certificate => certificate.name !== "")
                .map((certificate, idx) => {
                  return certificate.certNo === undefined ? (
                    <div key={idx}>
                      <ListItem
                        style={{
                          paddingTop: this.props.width > 600 ? "" : "16px",
                          paddingBottom: this.props.width > 600 ? "" : "16px",
                          paddingLeft: this.props.width > 600 ? "" : "8px"
                        }}
                      >
                        <ListItemIcon className={classes.icon}>
                          <CertificationSVG alt="certificate" />
                        </ListItemIcon>
                        <ListItemText
                          style={{ marginLeft: -25, maxWidth: "58%" }}
                          primary={
                            <Typography className={"fontStyle7"}>
                              {certificate.name}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction
                          className={classNames(
                            classes.listItemSecondary,
                            "fontStyle10"
                          )}
                        >
                          {certificate.validity === 1
                            ? "Valid Until " + certificate.expiration
                            : "Invalid"}
                        </ListItemSecondaryAction>
                      </ListItem>
                      {this.state.report.certificates.indexOf(certificate) <
                      this.state.report.certificates.length - 1 ? (
                        <Divider />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div key={idx}>
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
                              <CertificationSVG
                                style={{ width: 20, height: 20 }}
                                alt={"Certification"}
                              />
                            </ListItemIcon>
                            <StyledListItemText
                              primary={
                                <Typography className={"fontStyle5"}>
                                  {certificate.name}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  className={
                                    certificate.validity === 1
                                      ? "fontStyle35"
                                      : "fontStyle30"
                                  }
                                >
                                  {"\u2022 " +
                                    (certificate.validity === 1
                                      ? "Valid until " + certificate.expiredDate
                                      : certificate.expiredDate
                                      ? "Expired at " + certificate.expiredDate
                                      : "Invalid")}
                                </Typography>
                              }
                            />
                          </StyledExpansionSummary>
                          <StyledExpansionPanelDetails>
                            <div>
                              <Typography className={"fontStyle11"}>
                                {"\u2022"} Validity:{" "}
                                {certificate.validity === 1
                                  ? "Valid Until " + certificate.expiration
                                  : "Invalid"}
                              </Typography>
                              {certificate.startDate ? (
                                <Typography className={"fontStyle11"}>
                                  {"\u2022"} Start Date: {certificate.startDate}
                                </Typography>
                              ) : (
                                ""
                              )}
                              <Typography className={"fontStyle11"}>
                                {"\u2022"} Expired Date:{" "}
                                {certificate.expiredDate}
                              </Typography>
                              <Typography className={"fontStyle11"}>
                                {"\u2022"} Certificate Number:{" "}
                                {certificate.certNo}
                              </Typography>
                              {certificate.office ? (
                                <Typography className={"fontStyle11"}>
                                  {"\u2022"} Office: {certificate.office}
                                </Typography>
                              ) : (
                                ""
                              )}
                              {certificate.content ? (
                                <Typography className={"fontStyle11"}>
                                  {"\u2022"} Content: {certificate.content}
                                </Typography>
                              ) : (
                                ""
                              )}
                              {certificate.regGov ? (
                                <Typography className={"fontStyle11"}>
                                  {"\u2022"} Government: {certificate.regGov}
                                </Typography>
                              ) : (
                                ""
                              )}
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

Certifications.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  blur: PropTypes.integer
};

export default withStyles(styles)(Certifications);
