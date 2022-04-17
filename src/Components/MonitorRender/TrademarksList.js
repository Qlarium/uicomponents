import React from "react";
import PropTypes from "prop-types";
import { DivChange } from "./StyledComponents";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const DivWrapper = styled.div`
  border: 1px solid #e5e9ed;
  width: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  height: 70px;
  border-radius: 15px;
`;

const StyledTypo = styled(Typography)`
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function TrademarksList(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange
      boxlayout={boxlayout}
      style={{ display: "flex", flexFlow: "wrap" }}
      width={width}
    >
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <DivWrapper key={idx}>
            <Avatar
              imgProps={{
                style: {
                  objectFit: "contain"
                }
              }}
              onError={e => {
                e.target.onerror = null;
                e.target.src =
                  "https://s3-us-west-2.amazonaws.com/tiidan-qichacha-imgs/logos/default.jpgdefault.jpg";
              }}
              style={{ width: 79, height: 45 }}
              src={item.IMAGE_URL}
            />
            <StyledTypo className={"fontStyle19"}>{item.NAME}</StyledTypo>
          </DivWrapper>
        );
      })}
    </DivChange>
  );
}

TrademarksList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default TrademarksList;
