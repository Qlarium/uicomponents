import React, { Component } from "react";
import Utils from "./js/Utils";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import classNames from "classnames";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  StyledExpansionPanel,
  StyledListItem,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails
} from "./LowLevelComponents/StyledComponents";
import EmployeeSVG from "./images/employee.svg";

const styles = {
  expansionSummaryInner: {
    margin: "0px !important"
  },
  tabIndicator: {
    backgroundColor: "#4C84FF"
  },
  tabTextColor: {
    color: "#182D5A",
    backgroundColor: "Transparent"
  },
  tab: {
    textTransform: "none",
    height: 64,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    minWidth: 50
  },
  tabLabel: {
    fontSize: "14px"
  },
  typoMore: {
    textAlign: "left",
    marginLeft: 10
  }
};

function MoreData2(props) {
  const { classes } = props;
  return (
    <List>
      {props.moreData.map((item, idx) => {
        return (
          <div key={idx}>
            <StyledListItem>
              <StyledExpansionPanel style={{ width: "100%" }}>
                <StyledExpansionSummary
                  IconButtonProps={{
                    style: {
                      padding: 0
                    }
                  }}
                  classes={{
                    content: classes.expansionSummaryInner,
                    expanded: classes.expansionSummaryInner
                  }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <ListItemIcon>
                    <EmployeeSVG height={24} width={24} alt={"employee"} />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle5"}>
                        {item.jobTitle}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Publish Date:{" "}
                      {item.publicDate !== "" ? item.publicDate : "Unknown"}
                    </Typography>
                    {item.address ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Address: {item.address}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.area ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Area: {item.area}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.type ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Functional Category: {item.type}
                      </Typography>
                    ) : (
                      ""
                    )}
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Years Requirements:{" "}
                      {item.yearsReq !== "" ? item.yearsReq : "Not Set"}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Salary Range:{" "}
                      {item.salaryRange !== "" ? item.salaryRange : "Not Set"}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Education Requirements:{" "}
                      {item.eduReq !== "" ? item.eduReq : "Not Set"}
                    </Typography>
                    {item.count ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Number of Recruits: {item.count}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.workingProperty ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Nature of Work: {item.workingProperty}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.welfare ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Welfare: {item.welfare}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.source ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Require Source: {item.source}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.des ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Job Description: {item.des}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </div>
                </StyledExpansionPanelDetails>
              </StyledExpansionPanel>
            </StyledListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
}

function MoreData(props) {
  const classes = props.classes;
  return (
    <List>
      {props.moreData.map((item, idx) => {
        return (
          <div key={idx}>
            <ListItem>
              <EmployeeSVG height={24} width={24} alt={"employee"} />
              <div>
                <Typography
                  className={classNames(classes.typoMore, "fontStyle5")}
                >
                  {item.memberName}
                </Typography>
                <Typography
                  className={classNames(classes.typoMore, "fontStyle11")}
                >
                  {"\u2022"} Position: {item.position}
                </Typography>
              </div>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
}

class MoreDataEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.moreSubTitle
    };
  }
  render() {
    const { classes } = this.props;
    return this.props.moreData.length > 0 || this.props.moreData2.length > 0 ? (
      <div>
        <Tabs
          value={this.state.selectedTab}
          id={"tabs"}
          classes={{
            indicator: classes.tabIndicator,
            root: classes.tabTextColor
          }}
          onChange={(event, value) => this.setState({ selectedTab: value })}
          variant={"fullWidth"}
        >
          <Tab
            data-cy={"tab1"}
            className={classes.tab}
            value={this.props.moreSubTitle}
            label={
              <span className={classes.tabLabel}>
                {this.props.moreSubTitle}
              </span>
            }
          />
          <Tab
            data-cy={"tab2"}
            className={classes.tab}
            value={this.props.moreSubTitle2}
            label={
              <span className={classes.tabLabel}>
                {this.props.moreSubTitle2}
              </span>
            }
          />
        </Tabs>
        {this.state.selectedTab === this.props.moreSubTitle ? (
          <MoreData classes={classes} moreData={this.props.moreData} />
        ) : (
          <MoreData2 classes={classes} moreData={this.props.moreData2} />
        )}
      </div>
    ) : null;
  }
}

MoreDataEmployees.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array,
  moreData2: PropTypes.array,
  moreSubTitle: PropTypes.string.isRequired,
  moreSubTitle2: PropTypes.string.isRequired
};

export default withStyles(styles)(MoreDataEmployees);
