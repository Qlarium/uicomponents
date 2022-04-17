import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";
import {
  Unselectable,
  SmallBoxLayout,
  StyledTitle,
  StyledCloseIcon,
  StyledDialogContent
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

const StyledDivTitle = styled.div`
  display: flex;
  width: ${props =>
    props.width > 600
      ? props.date
        ? "60%"
        : "75%"
      : props.date
      ? "65%"
      : "80%"};
`;

const blurFilter = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='8' /></filter></svg>#svgMask")`;
const BlurredTypography = styled(Typography)`
  ${props => props.blur && Unselectable}
  filter: ${props => props.blur && blurFilter};
`;

const styles = {
  date: {
    marginTop: 4
  },
  content: {
    marginLeft: 24,
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  bottomContent: {
    textAlign: "left",
    marginLeft: 20,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  bottomIcon: {
    position: "absolute",
    marginTop: -4
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  moreBtn: {
    textAlign: "right",
    cursor: "pointer",
    marginTop: 2
  },
  dialog: {
    margin: 16
  },
  divContent: {
    display: "inline-flex",
    width: "100%",
    marginTop: 20
  },
  divAbove: {
    position: "absolute",
    marginLeft: 24,
    marginTop: -5
  }
};

class TwoInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content1: this.props.content1,
      content2: this.props.content2,
      moreOpen: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content1 !== this.props.content1) {
      this.setState({
        content1: Utils.fixNumber(this.props.content1)
      });
    }
    if (prevProps.content2 !== this.props.content2) {
      this.setState({
        content2: Utils.fixNumber(this.props.content2)
      });
    }
  }

  render() {
    const { classes } = this.props;
    return ((this.state.content1 || this.state.content1 === 0) &&
      this.state.content1 !== "null") ||
      ((this.state.content2 || this.state.content2 === 0) &&
        this.state.content2 !== "null") ? (
      <SmallBoxLayout container={true} direction={"column"}>
        <div style={{ width: "100%" }}>
          <StyledTitle
            width={this.props.width}
            otherWidth={""}
            mobileWidth={""}
          >
            <StyledDivTitle date={this.props.date} width={this.props.width}>
              <Typography className={classNames("fontStyle1")}>
                {this.props.name}
              </Typography>
              <div data-tip data-for={"tip" + this.props.name} style={{ visibility: Utils.isPdfVisibility() }}>
                <img
                  alt="info"
                  src={Utils.getIcon("info")}
                  className={classes.topIcon}
                />
              </div>
              <ReactTooltip
                className={classNames("tooltip", "fontStyle14")}
                id={"tip" + this.props.name}
                place="right"
                effect="solid"
              >
                <span>{this.props.infoText}</span>
              </ReactTooltip>
            </StyledDivTitle>
            {this.props.moreBtn && this.props.moreData != null ? (
              <div
                onClick={() => this.setState({ moreOpen: true })}
                className={classNames(classes.moreBtn, "fontStyle6")}
                data-cy="divMore"
                style={{ visibility: Utils.isPdfVisibility() }}
              >
                More
                <img
                  alt="view all"
                  src={require("./images/Back.png")}
                  className={classes.bottomIcon}
                />
              </div>
            ) : (
              ""
            )}
            {this.props.date ? (
              <Typography className={classNames(classes.date, "fontStyle12")}>
                {this.props.date}
              </Typography>
            ) : (
              ""
            )}
          </StyledTitle>
          <div data-cy="divContent" className={classes.divContent}>
            {this.state.content1 || this.state.content1 === 0 ? (
              <div
                style={{
                  width:
                    this.state.content2 || this.state.content2 === 0
                      ? "50%"
                      : "100%"
                }}
                data-cy="divContent1"
              >
                {this.state.content1 == "50" ? (
                  <div className={classNames(classes.divAbove, "fontStyle19")}>
                    Above
                  </div>
                ) : (
                  ""
                )}
                <BlurredTypography
                  className={classNames(classes.content, "fontStyle17")}
                  blur={this.props.blur & 1 }
                >
                  {this.state.content1}
                </BlurredTypography>
                <Typography
                  style={{ marginTop: -3 }}
                  className={classNames(classes.content, "fontStyle19")}
                >
                  {this.props.content1Lbl}
                </Typography>
              </div>
            ) : (
              ""
            )}
            {this.state.content2 || this.state.content2 === 0 ? (
              <div
                data-cy="divContent2"
                style={{ paddingRight: 10, width: "50%" }}
              >
                {this.state.content2 == "50" ? (
                  <div className={classNames(classes.divAbove, "fontStyle19")}>
                    Above
                  </div>
                ) : (
                  ""
                )}
                <BlurredTypography
                  className={classNames(classes.content, "fontStyle18")}
                  blur={this.props.blur & 2 }
                >
                  {this.state.content2}
                </BlurredTypography>
                <Typography
                  style={{ marginTop: -3 }}
                  className={classNames(classes.content, "fontStyle19")}
                >
                  {this.props.content2Lbl}
                </Typography>
              </div>
            ) : (
              ""
            )}
          </div>
          {this.props.bottomMsg ? (
            <div
              data-tip
              data-for={"tipBtmMsg" + this.props.name}
              data-cy="divBottomMsg"
              style={{ overflow: "hidden" }}
            >
              <BlurredTypography
                className={classNames(classes.bottomContent, "fontStyle11")}
                style={{ marginTop: this.props.content1Lbl === "" ? 25 : 10 }}
                blur={this.props.blur & 1 }
              >
                {this.props.bottomIcon ? (
                  <img
                    height={24}
                    width={24}
                    alt="bottomIcon"
                    className={classes.bottomIcon}
                    src={this.props.bottomIcon}
                  />
                ) : (
                  ""
                )}
                <label style={{ marginLeft: this.props.bottomIcon ? 25 : 0 }}>
                  {this.props.bottomMsg}
                </label>
              </BlurredTypography>
            </div>
          ) : (
            ""
          )}
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipBtmMsg" + this.props.name}
            place="bottom"
            effect="solid"
          >
            <span>{this.props.bottomMsg}</span>
          </ReactTooltip>
        </div>
        {this.props.moreBtn ? (
          <Dialog
            PaperProps={{
              classes: {
                root: classes.dialog
              }
            }}
            open={this.state.moreOpen}
            onClose={() => this.setState({ moreOpen: false })}
            aria-labelledby="scroll-dialog-title"
          >
            <StyledCloseIcon
              data-cy={"btnCloseDialog"}
              onClick={() => this.setState({ moreOpen: false })}
            >
              <img alt="Close" src={require("./images/Close.png")} />
            </StyledCloseIcon>
            <DialogTitle
              className={"fontStyle3"}
              style={{ textAlign: "center", marginTop: 24 }}
            >
              {this.props.moreTitle}
            </DialogTitle>
            <StyledDialogContent blur={this.props.blur}>{this.props.moreData}</StyledDialogContent>
          </Dialog>
        ) : (
          ""
        )}
      </SmallBoxLayout>
    ) : (
      <SmallBoxLayout>
        <StyledTitle
          style={{ position: "absolute" }}
          width={this.props.width}
          mobileWidth={""}
          otherWidth={""}
          className={"fontStyle1"}
        >
          {this.props.name}
        </StyledTitle>
        <NoDataImg width={this.props.width} smallBox={true} />
      </SmallBoxLayout>
    );
  }
}

TwoInfoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  infoText: PropTypes.string.isRequired,
  content1: PropTypes.any,
  content1Lbl: PropTypes.string.isRequired,
  content2: PropTypes.any,
  content2Lbl: PropTypes.string.isRequired,
  bottomIcon: PropTypes.string,
  bottomMsg: PropTypes.string,
  moreBtn: PropTypes.bool,
  moreTitle: PropTypes.string,
  moreData: PropTypes.any,
  blur: PropTypes.integer
};

export default withStyles(styles)(TwoInfoCard);
