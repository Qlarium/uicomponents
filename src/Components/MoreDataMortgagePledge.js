import React, { Component } from "react";
import Utils from "./js/Utils";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {
  StyledExpansionPanel,
  StyledListItem,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails
} from "./LowLevelComponents/StyledComponents";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MaceSVG from "./images/mace.svg";


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

function MoreDataMortgage(props) {
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
                    <MaceSVG
                      style={{ marginTop: 7 }}
                      height={24}
                      width={24}
                      alt={"branch"}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle5"}>
                        {item.regNo}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {item.regDate ? "\u2022 Date: " + item.regDate : ""}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Amount: {item.amount}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Status: {item.status ? item.status : "Unknown"}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Office: {item.office}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Publish Date: {item.publishDate}
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

function MoreDataPledge(props) {
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
                    <MaceSVG
                      style={{ marginTop: 7 }}
                      height={24}
                      width={24}
                      alt={"branch"}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle5"}>
                        {item.registNo}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {item.regDate ? "\u2022 Date: " + item.regDate : ""}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Pledgor: {item.pledgor}
                    </Typography>
                    {item.pledgorNo ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Pledgor Number: {item.pledgorNo}
                      </Typography>
                    ) : (
                      ""
                    )}
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Pledgee: {item.pledgee}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Pledgee Number: {item.pledgeeNo}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Amount: {item.amount}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Status: {item.status}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Publish Date: {item.publishDate}
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

class MoreDataMortgagePledge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "mortgage"
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
            value={"mortgage"}
            label={<span className={classes.tabLabel}>Mortgage</span>}
          />
          <Tab
            data-cy={"tab2"}
            className={classes.tab}
            value={"pledge"}
            label={<span className={classes.tabLabel}>Pledge</span>}
          />
        </Tabs>
        {this.state.selectedTab === "mortgage" ? (
          <MoreDataMortgage classes={classes} moreData={this.props.moreData} />
        ) : (
          <MoreDataPledge classes={classes} moreData={this.props.moreData2} />
        )}
      </div>
    ) : null;
  }
}

MoreDataMortgagePledge.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array,
  moreData2: PropTypes.array
};

export default withStyles(styles)(MoreDataMortgagePledge);
