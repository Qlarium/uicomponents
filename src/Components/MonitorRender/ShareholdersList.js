import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function ShareholdersList(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange boxlayout={boxlayout} width={width}>
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <Typography
            key={idx}
            className={item.status === "in" ? "fontStyle25" : "fontStyle23"}
          >{`${item.name}, ${
            item.percent
          }% - ${item.status.toUpperCase()}`}</Typography>
        );
      })}
    </DivChange>
  );
}

ShareholdersList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default ShareholdersList;
