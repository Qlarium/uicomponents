import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import {
  Unselectable,
  BigBoxLayout,
  StyledTitle,
  StyledCloseIcon,
  StyledDialogContent
} from "./LowLevelComponents/StyledComponents";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import RadarChart from "./RadarChart";

var isIE = typeof document !== "undefined" && !!document.documentMode;

const blurFilter = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='10' /></filter></svg>#svgMask")`;

const DivScore = styled.div`
  padding-left: 50%;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  text-align: center;
  ${props => props.blur && Unselectable}
  filter: ${props => props.blur && blurFilter}
`;

const DivLine = styled.div`
  width: 100%;
  margin: 20px;
  margin-top: 25px;
  font-weight: normal;
  font-family: Roboto;
  font-style: normal;
  text-align: right;
  filter: ${props => props.blur && blurFilter};
`;
const RiskLbl = styled.label`
  font-size: 14px;
  color: ${props => props.color} !important;
  font-weight: 500;
`;

const StyledVertLine = styled.div`
  width: 2px;
  height: 30px;
  margin: auto;
  position: absolute;
  overflow: hidden;
  z-index: 1000;
  margin-left: calc(
    ${props => props.marginLeft} -
      ${props =>
        props.marginLeft !== "0%"
          ? props.width > 1050
            ? "40px"
            : "20px"
          : "0"}
  );
`;

const StyledScoreLine = styled.div`
  color: #ffffff;
  padding-top: 12px !important;
  padding-bottom: 6px !important;
  border-bottom: 6px solid #ff3b77;
  position: relative;
  margin-bottom: ${props =>
    props.width < 500 ? "5px" : props.isIE == "true" ? "6px" : "10px"};
  &:before {
    content: "";
    position: absolute;
    height: 6px;
    width: 20%;
    bottom: -6px;
    left: 60%;
    background-color: #f97413;
  }
  &:after {
    content: "";
    position: absolute;
    height: 6px;
    width: 20%;
    bottom: -6px;
    left: 60%;
    background-color: #f97413;
    left: 79.6%;
    width: 20.5%;
    background-color: #2fd565;
  }
`;

const styles = {
  scoreLabel: {
    fontSize: 64,
    color: "#182D5A",
    fontWeight: "normal"
  },
  lbl0: {
    fontSize: 14,
    position: "absolute",
    color: "#182D5A",
    textAlign: "left",
    marginTop: 2
  },
  lbl10: {
    fontSize: 14,
    color: "#182D5A",
    marginRight: -2
  },
  lblHighRisk: {
    fontSize: 10,
    position: "absolute",
    color: "#A4AFBF",
    textAlign: "left",
    marginTop: 5
  },
  lblLowRisk: {
    fontSize: 10,
    color: "#A4AFBF"
  },

  vertLineInner: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#182D5A",
    top: "30%"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  divViewAll: {
    marginTop: 20,
    cursor: "pointer"
  },
  dialog: {
    margin: 16
  }
};

class CompanyScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      scoreOpen: false
    };
  }

  designRiskLbl(score) {
    if (score == null) return <RiskLbl color={"#4c84ff"}>Calculating</RiskLbl>;
    else if (score < 6) return <RiskLbl color={"#FF3B77"}>High Risk</RiskLbl>;
    else if (score < 8) return <RiskLbl color={"#F97413"}>Medium Risk</RiskLbl>;
    else return <RiskLbl color={"#2FD565"}>Low Risk</RiskLbl>;
  }

  getScoreMargin() {
    let buksaSize;
    if (this.props.width > 1650) {
      buksaSize = 48 * 0.6;
    } else if (this.props.width > 1250) {
      buksaSize = 48 * 0.8;
    } else if (this.props.width > 1050) {
      buksaSize = 48 * 0.95;
    } else if (this.props.width > 800) {
      buksaSize = 95 * 0.6;
    } else if (this.props.width > 600) {
      buksaSize = 95 * 0.8;
    } else {
      buksaSize = 95 * 0.95;
    }
    return this.state.report.score != null
      ? (this.state.report.score / 100) * buksaSize + "%"
      : 0;
  }

  getScoringData() {
    const scoring = this.state.report.scoring;
    const avgScoring = this.state.report.avgScoring;
    if (scoring && avgScoring)
      return [
        {
          subject: "Trade",
          A: scoring.autoTrade,
          B: avgScoring.avgTrade,
          fullMark: 10
        },
        {
          subject: "Legal",
          A: scoring.autoLegal,
          B: avgScoring.avgLegal,
          fullMark: 10
        },
        {
          subject: "IP",
          A: scoring.autoIp,
          B: avgScoring.avgIp,
          fullMark: 10
        },
        {
          subject: "Financial",
          A: scoring.autoFinancial,
          B: avgScoring.avgFinancial,
          fullMark: 10
        }
      ];
    else return [];
  }

  render() {
    const { classes, width } = this.props;
    const { report, scoreOpen } = this.state;
    return (
      <BigBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <StyledTitle width={width} mobileWidth={"55%"} otherWidth={"65%"}>
            <Typography className={classNames("fontStyle1")}>
              Company Score
            </Typography>
            <div
              data-tip
              data-for={"tipScore"}
              style={{ visibility: Utils.isPdfVisibility() }}
            >
              <img alt="info" src={Utils.getIcon("info")} />
            </div>
            <ReactTooltip
              className={classNames("tooltip", "fontStyle14")}
              id={"tipScore"}
              place="right"
              effect="solid"
            >
              <span>
                The company score is based by analyzing the data of the
                supplier's financial and legal risks as well as his trade data
                history and his IP (intellectual property), compared to other
                suppliers in the same industry.
              </span>
            </ReactTooltip>
          </StyledTitle>
          {report.scoring && report.scoring.autoTrade && report.avgScoring ? (
            <div
              className={classNames(classes.divViewAll, "fontStyle6")}
              onClick={() => this.setState({ scoreOpen: true })}
              data-cy="divViewAll"
              style={{ visibility: Utils.isPdfVisibility() }}
            >
              Show Calculation
              <img
                alt="view all"
                src={require("./images/Back.png")}
                style={{ marginTop: -4, position: "absolute" }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <DivScore data-cy={"divScore"} blur={this.props.blur}>
          <label className={classes.scoreLabel}>
            {report.score != null
              ? (this.props.blur ? 8.8 : report.score / 10).toFixed(1)
              : "N/A"}
          </label>
          <br />
          {this.designRiskLbl(
            report.score != null && !this.props.blur ? report.score / 10 : null
          )}
        </DivScore>

        <DivLine blur={this.props.blur}>
          <div className={classes.lbl0}>0</div>
          <label className={classes.lbl10}>10</label>
          <StyledVertLine width={width} marginLeft={this.getScoreMargin()}>
            <div className={classes.vertLineInner} />
          </StyledVertLine>
          <StyledScoreLine width={width} isIE={isIE} />
          <div className={classes.lblHighRisk}>High Risk</div>
          <label className={classes.lblLowRisk}>Low Risk</label>
        </DivLine>
        <Dialog
          PaperProps={{
            classes: {
              root: classes.dialog
            }
          }}
          open={scoreOpen}
          onClose={() => this.setState({ scoreOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon onClick={() => this.setState({ scoreOpen: false })}>
            <img alt="Close" src={require("./images/Close.png")} />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            Score Calculation
          </DialogTitle>
          <StyledDialogContent blur={this.props.blur}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadarChart data={this.getScoringData()} width={width} />
            </div>
          </StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

CompanyScore.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  blur: PropTypes.bool
};

export default withStyles(styles)(CompanyScore);
