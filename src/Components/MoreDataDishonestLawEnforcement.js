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

function QianzhanRender(props) {
  const { item } = props;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Release Time: {item.publishDate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Filling Time: {item.regDate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Number: {item.caseCode}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Dishonest Id: {item.dishonestId}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Id Number / Organization Code: {item.cardNum}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Name of Person in Charge: {item.businessEntity}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Enforcement of Court: {item.courtName}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Province: {item.areaName}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Basis for the Symbol: {item.gistId}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Execution units: {item.gistUnit}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Legal Responsibility: {item.legalDuty}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Debtor's Fulfillment: {item.performance}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Debtor Behavior Specific Circumstances:{" "}
        {item.disruptTypeName}
      </Typography>
    </div>
  );
}

function QichachaRender(props) {
  const { item } = props;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Release Time: {item.Publicdate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Filling Time: {item.Liandate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Number: {item.Anno}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Organization Code: {item.Orgno}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Dishonest Number: {item.Executeno}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Execute Status: {item.Executestatus}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Behavior Note: {item.Actionremark}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Executive Court: {item.Executegov}
      </Typography>
    </div>
  );
}

function QichachaRenderWithDetails(props) {
  const { item } = props;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Release Time:{" "}
        {item.PUBLIC_DATE
          ? new Date(item.PUBLIC_DATE).toISOString().substr(0, 10)
          : "Unknown"}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Number: {item.ANNO}
      </Typography>
      {item.NAME ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Name: {item.NAME}
        </Typography>
      ) : (
        ""
      )}
      {item.OWNER_NAME ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Owner Name: {item.OWNER_NAME}
        </Typography>
      ) : (
        ""
      )}
      {item.ORG_NO ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Organization Number: {item.ORG_NO}
        </Typography>
      ) : (
        ""
      )}
      {item.ORG_TYPE_NAME ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Organization Type: {item.ORG_TYPE_NAME}
        </Typography>
      ) : (
        ""
      )}
      {item.EXECUTE_STATUS ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Execute Status: {item.EXECUTE_STATUS}
        </Typography>
      ) : (
        ""
      )}
      {item.EXECUTE_UNITE ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Execute Unite: {item.EXECUTE_UNITE}
        </Typography>
      ) : (
        ""
      )}
      {item.EXECUTE_NO ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Execute Number: {item.EXECUTE_NO}
        </Typography>
      ) : (
        ""
      )}
      <Typography className={"fontStyle11"}>
        {"\u2022"} Executive Court: {item.EXECUTE_GOV}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Province: {item.PROVINCE}
      </Typography>
      {item.YIWU ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Case Content: {item.YIWU}
        </Typography>
      ) : (
        ""
      )}
    </div>
  );
}

function MoreDataDishonest(props) {
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
                      alt={"dishonest"}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle5"}>
                        {item.ACTION_REMARK !== undefined ||
                        item.QICHACHA_ID !== undefined
                          ? item.ACTION_REMARK || item.ANNO
                          : item.Name
                          ? item.Name
                          : item.dishonestName}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {"\u2022 Case Date: " +
                          (item.ACTION_REMARK !== undefined ||
                          item.QICHACHA_ID !== undefined
                            ? item.LIAN_DATE
                              ? new Date(item.LIAN_DATE)
                                  .toISOString()
                                  .substr(0, 10)
                              : "Unknown"
                            : item.Name
                            ? item.Publicdate
                            : item.publishDate)}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  {item.ACTION_REMARK !== undefined ||
                  item.QICHACHA_ID !== undefined ? (
                    <QichachaRenderWithDetails item={item} />
                  ) : item.Name ? (
                    <QichachaRender item={item} />
                  ) : (
                    <QianzhanRender item={item} />
                  )}
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

function MoreDataLawEnforcement(props) {
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
                      alt={"court case"}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle5"}>
                        {item.Id ? item.Name : item.name || item.Anno}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {"\u2022 Case Date: " +
                          (item.Id
                            ? new Date(item.Liandate)
                                .toISOString()
                                .substr(0, 10)
                            : item.date ||
                              new Date(item.Liandate)
                                .toISOString()
                                .substr(0, 10))}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  {item.Id ? (
                    <div>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Case Number: {item.Anno}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Executive Court: {item.ExecuteGov}
                      </Typography>
                      {item.Status ? (
                        <Typography className={"fontStyle11"}>
                          {"\u2022"} Status: {item.Status}
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Id Number / Organization Code:{" "}
                        {item.PartyCardNum}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Landmark: {item.Biaodi}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Update Time: {item.Updatedate}
                      </Typography>
                    </div>
                  ) : item.QICHACHA_ID ? (
                    <div>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Executive Court: {item.ExecuteGov}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Landmark:{" "}
                        {item.theImplementationOfTheSubject}
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Date: {item.date}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Case Number: {item.num}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Enforcement of Court: {item.court}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Execution Target:{" "}
                        {item.execMoney
                          ? item.execMoney[0] +
                            new Intl.NumberFormat("en").format(
                              item.execMoney.substr(1)
                            )
                          : ""}
                      </Typography>
                    </div>
                  )}
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

class MoreDataDishonestLawEnforcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "dishonest"
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
            value={"dishonest"}
            label={<span className={classes.tabLabel}>Dishonest</span>}
          />
          <Tab
            data-cy={"tab2"}
            className={classes.tab}
            value={"lawEnforcement"}
            label={<span className={classes.tabLabel}>Law Enforcement</span>}
          />
        </Tabs>
        {this.state.selectedTab === "dishonest" ? (
          <MoreDataDishonest classes={classes} moreData={this.props.moreData} />
        ) : (
          <MoreDataLawEnforcement
            classes={classes}
            moreData={this.props.moreData2}
          />
        )}
      </div>
    ) : null;
  }
}

MoreDataDishonestLawEnforcement.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array,
  moreData2: PropTypes.array
};

export default withStyles(styles)(MoreDataDishonestLawEnforcement);
