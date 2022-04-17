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

function MoreDataJudicialSale(props) {
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
                      alt={"judicial sale"}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle5"}>
                        {item.NAME}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Action Remark: {item.ACTION_REMARK}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Executive Court: {item.EXECUTEGOV}
                    </Typography>
                    {item.YI_WU ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Details: {item.YI_WU}
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

function MoreDataSeriousViolation(props) {
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
                      alt={"serious violation"}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle5"}>
                        {item.ADD_REASON}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {"\u2022 Case Date: " +
                          new Date(item.ADD_DATE).toISOString().substr(0, 10)}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Office: {item.ADD_OFFICE}
                    </Typography>
                    {item.TYPE ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Type: {item.TYPE}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.REMOVE_DATE ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Remove Date:{" "}
                        {new Date(item.REMOVE_DATE).toISOString().substr(0, 10)}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.REMOVE_OFFICE ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Remove Office: {item.REMOVE_OFFICE}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.REMOVE_REASON ? (
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Remove Reason: {item.REMOVE_REASON}
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

class MoreDataJudicialSalesSeriousViolation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "judicial"
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
            value={"judicial"}
            label={<span className={classes.tabLabel}>Judicial Sale</span>}
          />
          <Tab
            data-cy={"tab2"}
            className={classes.tab}
            value={"serious"}
            label={<span className={classes.tabLabel}>Serious Violation</span>}
          />
        </Tabs>
        {this.state.selectedTab === "judicial" ? (
          <MoreDataJudicialSale
            classes={classes}
            moreData={this.props.moreData}
          />
        ) : (
          <MoreDataSeriousViolation
            classes={classes}
            moreData={this.props.moreData2}
          />
        )}
      </div>
    ) : null;
  }
}

MoreDataJudicialSalesSeriousViolation.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array,
  moreData2: PropTypes.array
};

export default withStyles(styles)(MoreDataJudicialSalesSeriousViolation);
