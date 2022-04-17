import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function Capital(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange boxlayout={boxlayout} width={width}>
      <Typography className={"fontStyle23"}>
        Old Capital: ¥
        {new Intl.NumberFormat("en").format(data.CHANGE_DATA.before.toString())}
      </Typography>
      <Typography className={"fontStyle25"}>
        New Capital: ¥
        {new Intl.NumberFormat("en").format(data.CHANGE_DATA.after.toString())}
      </Typography>
    </DivChange>
  );
}

Capital.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default Capital;
