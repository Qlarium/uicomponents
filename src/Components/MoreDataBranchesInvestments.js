import React, { Component } from "react";
import Utils from "./js/Utils";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import BranchSVG from "./images/branch.svg";

import {
  StyledChip,
  StyledExpansionPanel,
  StyledListItem,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails
} from "./LowLevelComponents/StyledComponents";
import AddIcon from "@material-ui/icons/Add";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
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
  expansionSummaryInner: {
    margin: "0px !important"
  }
};

function MoreDataBranches(props) {
  return (
    <List>
      {props.moreData.map((item, idx) => {
        return (
          <div key={idx}>
            <ListItem
              style={{
                paddingLeft: props.width > 600 ? 8 : 0,
                paddingRight: props.width > 600 ? 8 : 0,
                paddingBottom: props.width > 600 ? 12 : 4
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <ListItemIcon>
                  <img
                    style={{ marginTop: 7 }}
                    height={24}
                    width={24}
                    alt={"branch"}
                    src={Utils.getIcon("branch")}
                  />
                </ListItemIcon>
                <div>
                  <Typography className={"fontStyle5"}>{item.name}</Typography>
                  <Typography className={"fontStyle11"}>
                    {item.chineseName
                      ? "\u2022 Chinese Name: " + item.chineseName
                      : ""}
                  </Typography>
                  {(window && window.location.pathname.includes("/direct/")) ||
                  !props.addSupplier ? (
                    ""
                  ) : (
                    <StyledChip
                      style={{ marginTop: 5 }}
                      type={"info"}
                      onClick={() => {
                        props.addSupplier(
                          item.chineseName
                            ? item.name
                            : item.name.substr(
                                0,
                                item.name.lastIndexOf("(") - 1
                              ),
                          item.chineseName
                            ? item.chineseName
                            : item.name.substr(item.name.lastIndexOf("("))
                        );
                      }}
                      icon={<AddIcon style={{ color: "#4C84FF" }} />}
                      variant={"outlined"}
                      label={"Request Analysis"}
                    />
                  )}
                </div>
              </div>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
}

function MoreDataInvestments(props) {
  const classes = props.classes;
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
                    <BranchSVG
                      style={{ marginTop: 7 }}
                      height={24}
                      width={24}
                      alt={"branch"}
                    />
                  </ListItemIcon>
                  <div>
                    <StyledListItemText
                      primary={
                        <Typography
                          style={{ marginLeft: 24 }}
                          className={"fontStyle5"}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          style={{ marginLeft: 24 }}
                          className={"fontStyle11"}
                        >
                          {item.companyNameChinese
                            ? "\u2022 Chinese Name: " + item.companyNameChinese
                            : ""}
                        </Typography>
                      }
                    />
                    {(window &&
                      window.location.pathname.includes("/direct/")) ||
                    !props.addSupplier ? (
                      ""
                    ) : (
                      <StyledChip
                        style={{ marginTop: 5 }}
                        type={"info"}
                        onClick={() => {
                          props.addSupplier(
                            item.companyNameChinese
                              ? item.name
                              : item.name.substr(
                                  0,
                                  item.name.lastIndexOf("(") - 1
                                ),
                            item.companyNameChinese
                              ? item.companyNameChinese
                              : item.name.substr(item.name.lastIndexOf("("))
                          );
                        }}
                        icon={<AddIcon style={{ color: "#4C84FF" }} />}
                        variant={"outlined"}
                        label={"Request Analysis"}
                      />
                    )}
                  </div>
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Capital:{" "}
                      {item.capital
                        ? "¥" + new Intl.NumberFormat("en").format(item.capital)
                        : "Not Set"}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Holdings Ratio: {item.ratio}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Start Investment Date:{" "}
                      {item.startDate
                        ? new Date(item.startDate).toISOString().substr(0, 10)
                        : "Not Set"}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Company Status: {item.status}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Credit Code: {item.creditCode}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Economic Kind: {item.econKind}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Oper Name: {item.openName}
                    </Typography>
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

class MoreDataBranchesInvestments extends Component {
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
          <MoreDataInvestments
            addSupplier={this.props.addSupplier}
            classes={classes}
            moreData={this.props.moreData}
          />
        ) : (
          <MoreDataBranches
            addSupplier={this.props.addSupplier}
            width={this.props.width}
            classes={classes}
            moreData={this.props.moreData2}
          />
        )}
      </div>
    ) : null;
  }
}

MoreDataBranchesInvestments.propTypes = {
  classes: PropTypes.object.isRequired,
  addSupplier: PropTypes.func,
  moreData: PropTypes.array,
  moreData2: PropTypes.array,
  moreSubTitle: PropTypes.string.isRequired,
  moreSubTitle2: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

export default withStyles(styles)(MoreDataBranchesInvestments);
