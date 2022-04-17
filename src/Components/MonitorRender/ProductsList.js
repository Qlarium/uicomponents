import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function ProductsList(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange boxlayout={boxlayout} width={width}>
      {data.CHANGE_DATA.change.slice(0, 5).map((item, idx) => {
        return (
          <Typography
            key={idx}
            style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}
            className={"fontStyle25"}
          >{`${item} - NEW`}</Typography>
        );
      })}
    </DivChange>
  );
}

ProductsList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default ProductsList;
