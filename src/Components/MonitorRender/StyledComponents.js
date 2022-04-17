import styled from "styled-components";
import ArrowRight from "@material-ui/icons/ArrowForward";

export const DivChange = styled.div`
  padding-left: ${props => (props.boxlayout === "true" ? (props.width > 600 ? "15" : "7") : (props.width > 600 ? "63" : "24"))}px;
  padding-right: ${props => (props.boxlayout === "true" ? "16" : "0")}px;
`;

export const StyledArrowRight = styled(ArrowRight)`
  font-size: 36px !important;
  padding-right: 10px;
  padding-left: 5px;
  fill: #a4afbf !important;
`;
