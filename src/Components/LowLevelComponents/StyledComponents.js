import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { css } from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import ListItem from "@material-ui/core/ListItem";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";

export const StyledChip = styled(Chip)`
  font-family: Roboto !important;
  font-size: 14px !important;
  height: 28px !important;
  color: ${props =>
    props.type === "delete"
        ? "#ff0000"
        : props.type === "info"
        ? "#4C84FF"
        : props.type === "success"
            ? "#2fd565"
            : ""} !important;
  border: ${props =>
    props.type === "delete"
        ? "0.5px solid #ff0000"
        : props.type === "info"
        ? "0.5px solid #4C84FF"
        : props.type === "success"
            ? "0.5px solid #2fd565"
            : ""} !important;
`;

export const StyledExpansionPanel = styled(ExpansionPanel)`
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: left;
  box-shadow: none !important;
`;

export const StyledListItem = styled(ListItem)`
  padding: 4px 0 4px 0 !important;
`;

export const StyledListItemText = styled(ListItemText)`
  margin-left: -25px;
  padding-top: 2px !important;
`;

export const StyledExpansionSummary = styled(ExpansionPanelSummary)`
  min-height: 30px !important;
  padding: 8px !important;
  @media (max-width: 600px) {
    padding: 0 !important;
  }
`;

export const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  padding-top: 0px !important;
  padding-bottom: 8px !important;
  margin: 0px;
`;

export const StyledCloseIcon = styled(IconButton)`
  position: absolute !important;
  right: 20px;
  top: 5px;
`;

const blurFilter = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='5' /></filter></svg>#svgMask")`;

export const StyledDialogContent = styled(DialogContent)`
  width: 550px;
  ${props => props.blur && Unselectable}
  filter: ${props => props.blur && blurFilter};

  @media (max-width: 400px) {
    width: 270px;
    padding: 0 8px 8px !important;
  }
  @media (min-width: 400px) and (max-width: 650px) {
    width: 350px;
    padding: 0 8px 8px !important;
  }
`;

export const Unselectable = css`
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  position: absolute;
  @media (max-width: 1650px) and (min-width: 1250px) {
    width: 80%;
  }
  @media (max-width: 1250px) and (min-width: 800px) {
    width: 95%;
  }
  @media (max-width: 800px) {
    width: auto;
    position: unset;
  }
`;

export const StyledInfoIcon = styled.img`
  visibility: ${props => props.pdf && "hidden"};
  margin-top: -2;
  margin-left: 6;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px !important;
  text-transform: none !important;
  font-family: Roboto !important;
  font-style: normal;
  font-weight: normal !important;
  font-size: 14px !important;
  text-align: center;
  z-index: 500;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  padding-right: 10px !important;
  padding-left: 10px !important;
  min-height: 33px !important;
  color: ${props => (props.selected ? "#F5F7FB" : "#586782")} !important;
  background: ${props =>
    props.selected ? "#4C84FF" : "Transparent"} !important;
  box-shadow: ${props =>
    props.selected ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : ""} !important;
  :hover {
    background: ${props =>
    props.selected ? "#1a62ff" : "Transparent"} !important;
  }
`;

export const MyButton = styled(Button)`
  text-transform: none !important;
  font-family: Roboto !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px !important;
  text-align: center;
  background-color: ${props =>
    props.disabled ? "#E5E9ED" : "#4C84FF"} !important;
  border-radius: 100px !important;
  color: ${props => (props.disabled ? "#A4AFBF" : "#ffffff")} !important;
  justify-self: center;
  width: ${props => props.width}px !important;
  height: ${props => props.height}px !important;
  :hover {
    background-color: #1a62ff !important;
  }
`;

export const StyledTitle = styled.div`
  margin-top: 19px;
  margin-left: 24px;
  text-align: left;
  display: flex;
  height: min-content;
  width: ${props => (props.width > 600 ? props.otherWidth : props.mobileWidth)};
`;

export const ReportLayout = styled.div`
  margin-top: 118px;
  width: 60%;
  margin-left: 20%;
  @media (max-width: 1650px) and (min-width: 1250px) {
    width: 80%;
    margin-left: 10%;
  }
  @media (max-width: 1250px) and (min-width: 1050px) {
    width: 95%;
    margin-left: 2.5%;
  }
  @media (max-width: 1050px) and (min-width: 800px) {
    width: 60%;
    margin-left: 20%;
  }
  @media (max-width: 800px) and (min-width: 600px) {
    width: 80%;
    margin-left: 10%;
  }
  @media (max-width: 600px) {
    width: 95%;
    margin-left: 2.5%;
  }
`;

export const PackagesLayout = styled.div`
  width: 70%;
  margin-top: 118px;
  @media (max-width: 1650px) and (min-width: 1050px) {
    width: 90%;
  }
  @media (max-width: 1050px) {
    width: 96%;
  }
`;

export const HomeLayout = styled.div`
  width: 70%;
  margin-top: 118px;
  margin-left: 15%;
  @media (max-width: 1650px) and (min-width: 1250px) {
    width: 90%;
    margin-left: 5%;
  }
  @media (max-width: 1250px) {
    width: 96%;
    margin-left: 2%;
  }
`;

export const DefaultLayout = styled.div`
  width: 60%;
  @media (max-width: 1650px) and (min-width: 1250px) {
    width: 80%;
  }
  @media (max-width: 1250px) {
    width: 95%;
  }
`;

export const BigBoxLayout = styled(Grid)`
  width: 48% !important;
  margin: 1%;
  height: 290px;
  background: #ffffff;
  @media (max-width: 1050px) {
    width: 100% !important;
    margin: 0;
    margin-bottom: 2%;
  }
`;

export const SmallBoxLayout = styled(Grid)`
  height: 174px;
  background: #ffffff;
  width: 31.33% !important;
  margin: 1%;
  @media (max-width: 1050px) {
    width: 100% !important;
    margin: 0;
    margin-bottom: 2%;
  }
`;

export const StyledDivSearch = styled.div`
  margin-top: 102px;
  display: flex;
`;

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 15px;
  top: 5px;
`;
