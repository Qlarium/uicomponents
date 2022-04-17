import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  StyledTitle,
  BigBoxLayout,
  StyledCloseIcon,
  StyledDialogContent
} from "./LowLevelComponents/StyledComponents";

const styles = {
  itemText: {
    lineHeight: "32px"
  },
  item: {
    backgroundColor: "rgba(76, 132, 255, 0.1)",
    borderRadius: 100,
    height: 32,
    marginTop: 12,
    paddingRight: 7,
    paddingLeft: 7,
    marginRight: 12,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  divIndustries: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 24
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  divViewAll: {
    marginTop: 19,
    cursor: "pointer"
  },
  typoAllIndustries: {
    textAlign: "left",
    marginLeft: 10
  },
  dialog: {
    margin: 16
  }
};

class Industry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      viewAllOpen: false
    };
  }

  componentDidMount() {
    let arr = document && document.getElementsByClassName("industry");
    let mainDivRect = document
      .getElementById("mainGrid")
      .getBoundingClientRect();
    for (let i = 0; i < arr.length; i++) {
      let rect = arr[i].getBoundingClientRect();
      if (rect.bottom > mainDivRect.bottom) arr[i].style.display = "none";
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout id={"mainGrid"}>
        <div style={{ display: "flex" }}>
          <StyledTitle
            width={this.props.width}
            mobileWidth={"65%"}
            otherWidth={"75%"}
          >
            <Typography className={"fontStyle1"}>Industry</Typography>
            <div data-tip data-for={"tipIndustry"} style={{ visibility: Utils.isPdfVisibility() }}>
              <img
                alt="info"
                src={Utils.getIcon("info")}
                className={classes.topIcon}
              />
            </div>
            <ReactTooltip
              className={classNames("tooltip", "fontStyle14")}
              id={"tipIndustry"}
              place="right"
              effect="solid"
            >
              <span>
                The supplier industry reported by him on his last annual report.
              </span>
            </ReactTooltip>
          </StyledTitle>
          <div
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ viewAllOpen: true })}
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
        </div>
        <div
          data-cy="divIndustries"
          style={{
            maxWidth:
              this.props.maxIndustriesWidth !== undefined
                ? this.props.maxIndustriesWidth
                : ""
          }}
          className={classes.divIndustries}
        >
          {this.state.report.industry &&
            this.state.report.industry
              .split(/,|;|\./)
              .filter(function(item) {
                return item.replace(/\s/g, "") !== "";
              })
              .map((industry, idx) => {
                return (
                  <div
                    className={classNames(classes.item, "industry")}
                    key={idx}
                  >
                    <div data-tip data-for={industry}>
                      <label
                        className={classNames(classes.itemText, "fontStyle7")}
                      >
                        {industry.replace("includes", "")}
                      </label>
                    </div>
                    <ReactTooltip
                      className={classNames("tooltip", "fontStyle14")}
                      id={industry}
                      place="bottom"
                      type="info"
                      effect="solid"
                    >
                      <span>{industry.replace("includes", "")}</span>
                    </ReactTooltip>
                  </div>
                );
              })}
        </div>
        <Dialog
          PaperProps={{
            classes: {
              root: classes.dialog
            }
          }}
          open={this.state.viewAllOpen}
          onClose={() => this.setState({ viewAllOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            onClick={() => this.setState({ viewAllOpen: false })}
          >
            <img alt="Close" src={require("./images/Close.png")} />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            All Industries
          </DialogTitle>
          <StyledDialogContent>
            <List>
              {this.state.report.industry &&
                this.state.report.industry
                  .split(/,|;|\./)
                  .filter(function(item) {
                    return item.replace(/\s/g, "") !== "";
                  })
                  .map((industry, idx) => {
                    return (
                      <div key={idx}>
                        <ListItem>
                          <Typography
                            className={classNames(
                              classes.typoAllIndustries,
                              "fontStyle5"
                            )}
                          >
                            {industry.replace("includes", "")}
                            {"\n"}
                          </Typography>
                        </ListItem>
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

Industry.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default withStyles(styles)(Industry);
