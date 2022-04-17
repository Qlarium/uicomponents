import React from "react";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledScoreAvatar = styled(Avatar)`
  margin-left: ${props => (props.mobile ? "" : "5px")} !important;
  margin-right: ${props => (props.mobile ? "5px" : "")} !important;
  margin-top: -5px;
  height: 48px !important;
  width: 48px !important;
  color: ${props => props.color} !important;
  background: ${props => props.back} !important;
  border: ${props => props.border} !important;
`;

const ScoreAvatar = function(props) {
  if (props.score == null)
    return (
        <StyledScoreAvatar
            mobile={props.width < 600 ? "true" : "false"}
            back={"rgba(255, 26, 94, 0.03)"}
            color={"#cc003d"}
            border={"1px solid #cc003d"}
        >
          N/A
        </StyledScoreAvatar>
    );
  else if (props.score < 5)
    return (
        <StyledScoreAvatar
            mobile={props.width < 600 ? "true" : "false"}
            back={"rgba(255, 26, 94, 0.03)"}
            color={"#cc003d"}
            border={"1px solid #cc003d"}
        >
          {props.score.toFixed(1)}
        </StyledScoreAvatar>
    );
  else if (props.score < 6)
    return (
        <StyledScoreAvatar
            mobile={props.width < 600 ? "true" : "false"}
            back={"rgba(255, 59, 119, 0.03)"}
            color={"#FF3B77"}
            border={"1px solid #FF3B77"}
        >
          {props.score.toFixed(1)}
        </StyledScoreAvatar>
    );
  else if (props.score < 7)
    return (
        <StyledScoreAvatar
            mobile={props.width < 600 ? "true" : "false"}
            back={"rgba(224, 97, 6, 0.05)"}
            color={"#c75605"}
            border={"1px solid #c75605"}
        >
          {props.score.toFixed(1)}
        </StyledScoreAvatar>
    );
  else if (props.score < 8)
    return (
        <StyledScoreAvatar
            mobile={props.width < 600 ? "true" : "false"}
            back={"rgba(249, 116, 19, 0.05)"}
            color={"#F97413"}
            border={"1px solid #F97413"}
        >
          {props.score.toFixed(1)}
        </StyledScoreAvatar>
    );
  else
    return (
        <StyledScoreAvatar
            mobile={props.width < 600 ? "true" : "false"}
            back={"rgba(47, 213, 101, 0.03)"}
            color={"#2FD565"}
            border={"1px solid #2FD565"}
        >
          {props.score.toFixed(1)}
        </StyledScoreAvatar>
    );
};

ScoreAvatar.propTypes = {
  score: PropTypes.number,
  width: PropTypes.number.isRequired
};

export default ScoreAvatar;
