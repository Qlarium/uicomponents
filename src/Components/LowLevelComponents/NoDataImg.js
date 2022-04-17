import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import NoDataSVG from "../images/NoData.svg";

const NoDataImgBig = styled.img`
  width: 100%;
  height: inherit;
`;

const NoDataImgSmall = styled.img`
  height: inherit;
  margin-top: 20px;
  width: ${props => (props.width > 1050 ? "100%" : "65%")};
`;

const DivNoDataImgBig = styled.div`
  width: 100%;
`;

class NoDataImg extends Component {
    render() {
        return this.props.smallBox ? (
            <div>
                <NoDataSVG width={this.props.width} alt="NoData" />
                <Typography align="center" className={"fontStyle36"}>
                    {this.props.text || "No Data Avialable"}
                </Typography>
            </div>
        ) : (
            <DivNoDataImgBig>
                <NoDataSVG alt="NoData" />

                <Typography align="center" className={"fontStyle36"}>
                    {this.props.text || "No Data Avialable"}
                </Typography>
            </DivNoDataImgBig>
        );
    }
}

NoDataImg.propTypes = {
    smallBox: PropTypes.bool,
    width: PropTypes.number,
    text: PropTypes.string
};

export default NoDataImg;
