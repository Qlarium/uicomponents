import React from "react";
import PropTypes from "prop-types";
import { DivChange, StyledArrowRight } from "./StyledComponents";
import ScoreAvatar  from "../LowLevelComponents/ScoreAvatar";

function Score(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange
      boxlayout={boxlayout}
      style={{ display: "flex", marginTop: 5 }}
      width={width}
    >
      <ScoreAvatar score={data.CHANGE_DATA.before / 10} width={width} />
      <StyledArrowRight />
      <ScoreAvatar score={data.CHANGE_DATA.after / 10} width={width} />
    </DivChange>
  );
}

Score.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default Score;
