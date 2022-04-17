import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function PatentsList(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange boxlayout={boxlayout} width={width}>
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <Typography key={idx} className={"fontStyle25"}>{`${
            item.TITLE
          } - NEW`}</Typography>
        );
      })}
    </DivChange>
  );
}

PatentsList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default PatentsList;
