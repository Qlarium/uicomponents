import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styled from "styled-components";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Utils from "./js/Utils";
import getCountriesByName from "./js/Countries";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Unselectable,
  BigBoxLayout,
  StyledTitle,
  StyledCloseIcon,
  StyledDialogContent
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

import BackSVG from "./images/Back.svg";
import CloseSVG from "./images/Close.svg";

const PercentBar = styled.div`
  color: #ffffff;
  padding: 8px 5px 5px 5px !important;
  border-bottom: 5px solid #2fd565;
  position: relative;
  margin-bottom: 10px;
  margin-right: 20px;
  :before {
    content: "";
    position: absolute;
    height: 6px;
    width: ${props => props.percent}% !important;
    bottom: -5px;
    left: ${props => 100 - props.percent + 0.3}% !important;
    background-color: #e4e8ed;
  }
`;

const blurFilter = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='8' /></filter></svg>#svgMask")`;

const StyledListItem = styled(ListItem)`
  ${props => props.blur && Unselectable}
  filter: ${props => props.blur && blurFilter};
`;

const StyledListItemAll = styled(ListItemText)`
  padding: ${props => (props.width > 600 ? "" : "0 8px")};
  width: ${props => (props.width > 600 ? "300px" : "90px")};
  max-width: ${props => (props.width > 600 ? "300px" : "90px")};
`;

const styles = {
  countryImg: {
    height: 24,
    width: 24,
    border: "1px solid #E4E8ED"
  },
  dialog: {
    margin: 16
  },
  listDiv: {
    width: "100%",
    height: 230
  },
  divPercent: {
    position: "absolute",
    marginLeft: -38,
    marginTop: 6
  },
  select: {
    width: 90,
    marginTop: 12,
    border: "1px solid #E4E8ED",
    boxSizing: "border-box",
    borderRadius: 2,
    height: 32,
    background: "#ffffff"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
};

class TopCountries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMonths: 36,
      otherCountries: 0,
      viewAllOpen: false
    };
  }

  componentDidMount() {
    this.calcOtherCountries();
  }

  calcOtherCountries() {
    let sum = 0,
      other = 0;
    let data = [];
    if (this.props.type === "import") {
      if (this.props.report.import !== undefined)
        data = this.props.report.import.shipmentByCountry.last3Years;
    } else data = this.props.report.shipmentByCountry.last3Years;

    data = data
      .filter(item => !isNaN(Number.parseInt(item.shipment_count)))
      .sort((a, b) => {
        return (
          Number.parseInt(b.shipment_count) - Number.parseInt(a.shipment_count)
        );
      });

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const count = Number.parseInt(item.shipment_count);
      if (i > 3) other += count;

      sum += count;
    }
    this.setState({
      otherCountries: Math.round(100 * (other / sum))
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectMonths !== prevState.selectMonths ||
      this.props.report !== prevProps.report
    ) {
      this.calcOtherCountries();
    }
  }

  getCountries(getAll) {
    let countries = [];
    let sum = 0;
    let data = [];
    if (this.props.type === "import") {
      if (this.props.report.import !== undefined)
        data = this.props.report.import.shipmentByCountry.last3Years;
    } else data = this.props.report.shipmentByCountry.last3Years;

    data = data
      .filter(item => !isNaN(Number.parseInt(item.shipment_count)))
      .sort((a, b) => {
        return (
          Number.parseInt(b.shipment_count) - Number.parseInt(a.shipment_count)
        );
      });

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const count = Number.parseInt(item.shipment_count);
      if (i <= 3 || getAll)
        countries.push({
          name: item.country,
          percent: count
        });
      sum += count;
    }
    countries.forEach(
      country =>
        (country.percent =
          100 * (country.percent / sum) > 1
            ? Math.round(100 * (country.percent / sum))
            : Math.ceil(100 * (country.percent / sum)))
    );
    return countries.filter(country => country.percent > 0);
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <StyledTitle
          width={this.props.width}
          mobileWidth={"60%"}
          otherWidth={"70%"}
        >
          <Typography className={classNames("fontStyle1")}>
            {this.props.type === "import"
              ? "Top Import Countries"
              : "Top Export Countries"}
          </Typography>
          <div
            data-tip
            data-for={"tipCountries"}
            style={{ visibility: Utils.isPdfVisibility() }}
          >
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipCountries"}
            place="right"
            effect="solid"
          >
            <span>
              {this.props.type === "import"
                ? "Top countries that the supply is imported from, with data based on governmental custom sources as declared by the supplier (defined in the Bill of lading)."
                : "Top countries that the supply is exported to, with data based on governmental custom sources as declared by the supplier (defined in the Bill of lading)."}
            </span>
          </ReactTooltip>
        </StyledTitle>
        {/*<select*/}
        {/*onChange={e => this.setState({ selectMonths: e.target.value })}*/}
        {/*className={classNames(classes.select, "fontStyle16")}*/}
        {/*defaultValue={this.state.selectMonths}*/}
        {/*>*/}
        {/*<option value={4}>Last quarter</option>*/}
        {/*<option value={12}>Last year</option>*/}
        {/*</select>*/}
        {this.getCountries(false).length > 0 ? (
          <div className={classes.listDiv}>
            <List>
              {this.getCountries().map((country, idx) => {
                return (
                  <StyledListItem
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                    key={country.name}
                    blur={idx >= this.props.blur}
                  >
                    <Avatar className={classes.countryImg}>
                      {getCountriesByName(country.name)}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography className={"fontStyle7"}>
                          {country.name}
                        </Typography>
                      }
                    />

                    <ListItemSecondaryAction
                      style={{
                        width: this.props.width > 600 ? "40%" : "30%"
                      }}
                    >
                      <div
                        className={classNames(classes.divPercent, "fontStyle5")}
                      >
                        {country.percent}%
                      </div>
                      <PercentBar percent={100 - country.percent} />
                    </ListItemSecondaryAction>
                  </StyledListItem>
                );
              })}
              {this.state.otherCountries !== 0 ? (
                <ListItem
                  style={{ paddingTop: 10, paddingBottom: 10 }}
                  key={"other"}
                >
                  <Avatar className={classes.countryImg}>
                    {getCountriesByName("Other")}
                  </Avatar>
                  <ListItemText
                    primary={
                      <div
                        className={"fontStyle6"}
                        style={{ cursor: "pointer" }}
                        onClick={() => this.setState({ viewAllOpen: true })}
                      >
                        Other
                        <BackSVG
                          alt="view all"
                          style={{
                            visibility: Utils.isPdfVisibility(),
                            position: "absolute"
                          }}
                        />
                      </div>
                    }
                  />
                  <ListItemSecondaryAction
                    style={{ width: this.props.width > 600 ? "40%" : "30%" }}
                  >
                    <div
                      className={classNames(classes.divPercent, "fontStyle5")}
                    >
                      {this.state.otherCountries}%
                    </div>
                    <PercentBar percent={100 - this.state.otherCountries} />
                  </ListItemSecondaryAction>
                </ListItem>
              ) : (
                ""
              )}
            </List>
          </div>
        ) : (
          <NoDataImg />
        )}
        <Dialog
          PaperProps={{
            classes: {
              root: classes.dialog
            }
          }}
          open={this.state.viewAllOpen}
          onClose={() => this.setState({ viewAllOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            onClick={() => this.setState({ viewAllOpen: false })}
          >
            <CloseSVG alt="Close" />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            All Countries
          </DialogTitle>
          <StyledDialogContent blur={this.props.blur >= 0}>
            <List>
              {this.getCountries(true).map(country => {
                return (
                  <ListItem key={country.name}>
                    <Avatar className={classes.countryImg}>
                      {getCountriesByName(country.name)}
                    </Avatar>

                    <StyledListItemAll
                      width={this.props.width}
                      primary={
                        <Typography className={"fontStyle7"}>
                          {country.name}
                        </Typography>
                      }
                    />

                    <ListItemSecondaryAction
                      style={{
                        width: this.props.width > 600 ? "40%" : "30%"
                      }}
                    >
                      <div
                        style={{ marginLeft: -30 }}
                        className={classNames(classes.divPercent, "fontStyle5")}
                      >
                        {country.percent}%
                      </div>
                      <PercentBar percent={100 - country.percent} />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

TopCountries.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  type: PropTypes.string,
  blur: PropTypes.integer
};

export default withStyles(styles)(TopCountries);
