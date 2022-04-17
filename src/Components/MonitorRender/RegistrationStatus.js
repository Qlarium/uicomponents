import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function RegistrationStatus(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange boxlayout={boxlayout} width={width}>
      <Typography className={"fontStyle23"}>
        Old Status: {data.CHANGE_DATA.before}
      </Typography>
      <Typography className={"fontStyle25"}>
        New Status: {data.CHANGE_DATA.after}
      </Typography>
    </DivChange>
  );
}

RegistrationStatus.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default RegistrationStatus;
