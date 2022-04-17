import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function TradeData(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange boxlayout={boxlayout} width={width}>
      {data.CHANGE_DATA.before ? (
        <Typography className={"fontStyle23"}>
          {data.CHANGE_DATA.before}
        </Typography>
      ) : (
        ""
      )}
      {data.CHANGE_DATA.after ? (
        <Typography className={"fontStyle25"}>
          {data.CHANGE_DATA.after}
        </Typography>
      ) : (
        ""
      )}
    </DivChange>
  );
}

TradeData.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default TradeData;
