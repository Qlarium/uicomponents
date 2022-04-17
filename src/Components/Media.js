import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import classNames from "classnames";
import Utils from "./js/Utils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReactTooltip from "react-tooltip";
import MediaSVG from "./images/Media.svg";

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
import NoDataImg from "./LowLevelComponents/NoDataImg";

var isIE = typeof document !== "undefined" && !!document.documentMode;

import styled from "styled-components";
import { mapPropsStream } from "recompose";

const blurFilter = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='8' /></filter></svg>#svgMask")`;
const NewsItem = styled.div`
  ${props => props.blur && Unselectable}
  filter: ${props => props.blur && blurFilter};
`;

const styles = {
  divViewAll: {
    marginTop: 19,
    cursor: "pointer"
  },
  divMedia: {
    marginLeft: 28,
    marginRight: 28,
    width: "100%",
    height: 230,
    marginTop: 15
  },
  innerDivMedia: {
    textAlign: "left",
    marginTop: 7,
    marginBottom: 7
  },
  typo: {
    marginTop: 2,
    textAlign: "left",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkitLineClamp": 2,
    "-webkitBoxOrient": "vertical",
    whiteSpace: isIE ? "nowrap" : "",
    textOverflow: isIE ? "ellipsis" : "",
    marginLeft: 25
  },
  icons: {
    marginTop: -2,
    position: "absolute"
  },
  typoAllMedia: {
    textAlign: "left",
    marginLeft: 10
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  dialog: {
    margin: 16
  },
  expansionSummaryInner: {
    margin: "0px !important"
  },
  aStyle: {
    textDecoration: "none",
    color: "#4c84ff",
    wordBreak: "break-word"
  }
};

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMediaOpen: false
    };
  }

  render() {
    const { classes, report } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <StyledTitle
          width={this.props.width}
          mobileWidth={"65%"}
          otherWidth={"75%"}
        >
          <Typography className={classNames("fontStyle1")}>
            Top Media
          </Typography>
          <div
            data-tip
            data-for={"tipMedia"}
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
            id={"tipMedia"}
            place="right"
            effect="solid"
          >
            <span>The supplier on the online media</span>
          </ReactTooltip>
        </StyledTitle>
        {report.medias !== undefined && report.medias.length > 0 ? (
          <div
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ allMediaOpen: true })}
            data-cy="divViewAll"
            style={{ visibility: Utils.isPdfVisibility() }}
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
        {report.medias && report.medias.length > 0 ? (
          <div data-cy="divMedia" className={classes.divMedia}>
            {report.medias.slice(0, 4).map((media, idx) => {
              return (
                <NewsItem key={idx} blur={idx >= this.props.blur}>
                  <div className={classes.innerDivMedia}>
                    <MediaSVG
                      height={24}
                      width={24}
                      alt={"media"}
                      className={classes.icons}
                    />
                    <Typography className={classes.typo}>
                      <a
                        className={"fontStyle5"}
                        style={{ textDecoration: "none" }}
                        target={"blank"}
                        href={media.url}
                      >
                        {media.headline}
                      </a>
                    </Typography>
                  </div>
                  <Divider />
                </NewsItem>
              );
            })}
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
          open={this.state.allMediaOpen}
          onClose={() => this.setState({ allMediaOpen: false })}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            onClick={() => this.setState({ allMediaOpen: false })}
          >
            <img alt="Close" src={require("./images/Close.png")} />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            All Media
          </DialogTitle>
          <StyledDialogContent blur={this.props.blur >= 0}>
            <List>
              {report.medias && report.medias.length > 0
                ? report.medias.map((media, idx) => {
                    return (
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
                                <MediaSVG
                                  style={{ alignSelf: "center" }}
                                  height={24}
                                  width={24}
                                  alt={"media"}
                                />
                              </ListItemIcon>
                              <StyledListItemText
                                primary={
                                  <Typography className={"fontStyle5"}>
                                    {media.headline}
                                  </Typography>
                                }
                                secondary={
                                  <Typography className={"fontStyle11"}>
                                    {media.publishTime
                                      ? "\u2022 Publish Date: " +
                                        media.publishTime.substr(0, 10)
                                      : ""}
                                  </Typography>
                                }
                              />
                            </StyledExpansionSummary>
                            <StyledExpansionPanelDetails>
                              <div>
                                {media.source ? (
                                  <Typography className={"fontStyle11"}>
                                    {"\u2022"} Source: {media.source}
                                  </Typography>
                                ) : (
                                  ""
                                )}
                                <Typography className={"fontStyle11"}>
                                  {"\u2022"} Source Url:{" "}
                                  <a
                                    className={classes.aStyle}
                                    href={media.url}
                                    target={"blank"}
                                  >
                                    {media.url}
                                  </a>
                                </Typography>
                                {media.description ? (
                                  <Typography className={"fontStyle11"}>
                                    {"\u2022"} Description: {media.description}
                                  </Typography>
                                ) : (
                                  ""
                                )}
                              </div>
                            </StyledExpansionPanelDetails>
                          </StyledExpansionPanel>
                        </StyledListItem>
                        {idx < report.medias.length - 1 ? <Divider /> : ""}
                      </div>
                    );
                  })
                : ""}
            </List>
          </StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  blur: PropTypes.integer
};

export default withStyles(styles)(Media);
