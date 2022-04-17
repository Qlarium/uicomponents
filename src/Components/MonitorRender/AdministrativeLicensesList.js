import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function AdministrativeLicensesList(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange boxlayout={boxlayout} width={width}>
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <Typography
            key={idx}
            className={data.CHANGE_TYPE === 2 ? "fontStyle25" : "fontStyle23"}
          >{`${item.name} - ${
            data.CHANGE_TYPE === 2 ? "NEW" : "EXPIRED"
          }`}</Typography>
        );
      })}
    </DivChange>
  );
}

AdministrativeLicensesList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default AdministrativeLicensesList;
