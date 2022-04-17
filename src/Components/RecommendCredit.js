import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import {
  BigBoxLayout,
  StyledTitle
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

var isIE =  typeof document !== 'undefined' && !! document.documentMode;

const RiskLbl = styled.label`
  fontSize:14px
  color: ${props => props.color} !important;
  fontWeight:500;
`;

const StyledCreditLine = styled.div`
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
    width: 7.5%;
    bottom: -6px;
    left: 2.5%;
    background-color: #f97413;
  }
  &:after {
    content: "";
    position: absolute;
    height: 6px;
    width: 7.5%;
    bottom: -6px;
    left: 2.5%;
    background-color: #f97413;
    left: 10%;
    width: 90.2%;
    background-color: #2fd565;
  }
`;

const styles = {
  divLine: {
    width: "100%",
    margin: 20,
    marginTop: 30,
    fontWeight: "normal",
    fontFamily: "Roboto",
    fontStyle: "normal",
    textAlign: "right"
  },
  divScore: {
    marginTop: 24,
    fontFamily: "Roboto",
    fontStyle: "normal",
    textAlign: "center"
  },
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

  vertLineOuter: {
    width: 2,
    height: "30px",
    margin: "auto",
    position: "absolute",
    overflow: "hidden",
    zIndex: 1000
  },

  vertLineInner: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#182D5A",
    top: "30%"
  },
  divBottomMsg: {
    background: "#ffffff",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 24
  },
  bottomMsg: {
    marginTop: 4,
    textAlign: "left"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
};

class RecommendCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report
    };
  }

  designRiskLbl(credit) {
    if (credit < 5001) return <RiskLbl color={"#FF3B77"}>High Risk</RiskLbl>;
    else if (credit < 20001)
      return <RiskLbl color={"#F97413"}>Medium Risk</RiskLbl>;
    else return <RiskLbl color={"#2FD565"}>Low Risk</RiskLbl>;
  }

  bottomMsg(credit, classes) {
    if (credit !== undefined && credit !== "" && credit != null) {
      if (credit < 5001)
        return (
          <div className={classes.divBottomMsg}>
            <img
              style={{ height: 24, width: 24 }}
              alt="flag"
              src={Utils.getIcon("bad")}
            />
            <Typography
              className={classNames(classes.bottomMsg, "fontStyle11")}
            >
              Below average supplier
            </Typography>
          </div>
        );
      else if (credit < 20001)
        return (
          <div className={classes.divBottomMsg}>
            <img
              style={{ height: 24, width: 24 }}
              alt="flag"
              src={Utils.getIcon("natural")}
            />
            <Typography
              className={classNames(classes.bottomMsg, "fontStyle11")}
            >
              Average supplier
            </Typography>
          </div>
        );
      else
        return (
          <div className={classes.divBottomMsg}>
            <img
              style={{ height: 24, width: 24 }}
              alt="flag"
              src={Utils.getIcon("good")}
            />
            <Typography
              className={classNames(classes.bottomMsg, "fontStyle11")}
            >
              Excellent supplier
            </Typography>
          </div>
        );
    } else return "";
  }

  getScoreMargin() {
    let buksaSize;
    let recommendCredit;
    if (this.state.report.recommendCredit < 200000) {
      recommendCredit = this.state.report.recommendCredit;
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
    } else {
      recommendCredit = 200000;
    }
    return (recommendCredit / 2000 / 100) * buksaSize + "%";
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <StyledTitle
            width={this.props.width}
            mobileWidth={"50%"}
            otherWidth={"55%"}
          >
            <Typography className={classNames("fontStyle1")}>
              Recommended Credit in USD
            </Typography>
            <div data-tip data-for={"tipCredit"}>
              <img
                alt="info"
                src={Utils.getIcon("info")}
                className={classes.topIcon}
              />
            </div>
            <ReactTooltip
              className={classNames("tooltip", "fontStyle14")}
              id={"tipCredit"}
              place="right"
              effect="solid"
            >
              <span>
                The recommended credit is based on the company financial status,
                the legal status, and company registration and history status.
              </span>
            </ReactTooltip>
          </StyledTitle>
          {this.state.report.recommendCredit !== undefined &&
          this.state.report.recommendCredit != null &&
          this.state.report.recommendCredit !== "" ? (
            <div data-cy="divCredit" className={classes.divScore}>
              <label className={classes.scoreLabel}>
                {this.state.report.recommendCredit >= 1000
                  ? "$" + this.state.report.recommendCredit / 1000 + "K"
                  : "$" + this.state.report.recommendCredit}
              </label>
              <br />
              {/*{this.designRiskLbl(this.state.report.recommendCredit)}*/}
            </div>
          ) : (
            ""
          )}
        </div>

        {this.state.report.recommendCredit !== undefined &&
        this.state.report.recommendCredit != null &&
        this.state.report.recommendCredit !== "" ? (
          <div className={classes.divLine}>
            <div className={classes.lbl0}>$0</div>
            <label className={classes.lbl10}>$200K</label>
            <div
              className={classes.vertLineOuter}
              style={{
                marginLeft: this.getScoreMargin()
              }}
            >
              <div className={classes.vertLineInner} />
            </div>
            <StyledCreditLine width={this.props.width} isIE={isIE} />
            <div className={classes.lblHighRisk}>High Risk</div>
            <label className={classes.lblLowRisk}>Low Risk</label>
          </div>
        ) : (
          <NoDataImg />
        )}
        {/*{this.bottomMsg(this.state.report.recommendCredit, classes)}*/}
      </BigBoxLayout>
    );
  }
}

RecommendCredit.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default withStyles(styles)(RecommendCredit);
