import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import {
  Unselectable,
  SmallBoxLayout,
  StyledTitle
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

const StyledDivTitle = styled.div`
  display: flex;
  width: ${props => (props.width > 600 ? "60%" : "65%")};
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
  bottomContent: {
    marginTop: 25,
    textAlign: "left",
    marginLeft: 22,
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
  divContent: {
    marginLeft: 24,
    marginRight: 10,
    textAlign: "left",
    marginTop: 20
  },
  typoContent: {
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: Utils.fixNumber(this.props.content)
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content !== this.props.content) {
      this.setState({
        content: Utils.fixNumber(this.props.content)
      });
    }
  }

  render() {
    const { classes } = this.props;
    return this.state.content !== "" &&
      this.state.content !== null &&
      this.state.content !== "null" ? (
      <SmallBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
        <div style={{ width: "100%" }}>
          <StyledTitle
            width={this.props.width}
            mobileWidth={""}
            otherWidth={""}
          >
            <StyledDivTitle
              style={{ width: this.props.date ? "" : "100%" }}
              width={this.props.width}
            >
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
            {this.props.date ? (
              <Typography className={classNames(classes.date, "fontStyle12")}>
                {this.props.date}
              </Typography>
            ) : (
              ""
            )}
          </StyledTitle>
          <div data-cy="divContent" className={classes.divContent}>
            <BlurredTypography blur={this.props.blur}
              className={classNames("fontStyle17", classes.typoContent)}
            >
              {this.state.content}
            </BlurredTypography>
          </div>
          {this.props.bottomMsg !== "" &&
          this.props.bottomMsg !== null &&
          this.props.bottomMsg !== undefined ? (
            <div
              data-tip
              data-for={"tipBtmMsg" + this.props.name}
              data-cy="divBottomMsg"
              style={{ overflow: "hidden" }}
            >
              <BlurredTypography blur={this.props.blur}
                className={classNames(classes.bottomContent, "fontStyle11")}
              >
                {this.props.bottomIcon != null ? (
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
                <label
                  style={{ marginLeft: this.props.bottomIcon != null ? 25 : 0 }}
                >
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

InfoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  infoText: PropTypes.string.isRequired,
  date: PropTypes.string,
  content: PropTypes.any,
  bottomIcon: PropTypes.string,
  bottomMsg: PropTypes.string,
  blur: PropTypes.integer
};

export default withStyles(styles)(InfoCard);
