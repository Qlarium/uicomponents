import React, { Component } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles/index";
import classNames from "classnames";
import PropTypes from "prop-types";
import Utils from "./js/Utils";
import {
  StyledExpansionPanel,
  StyledListItem,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails,
  StyledChip,
  StyledCloseIcon,
  StyledDialogContent
} from "./LowLevelComponents/StyledComponents";
import Loader from "./LowLevelComponents/Loader";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import regeneratorRuntime from "regenerator-runtime";
import MaceSVG from "./images/mace.svg";

const styles = {
  dialog: {
    margin: 16
  },
  expansionSummaryInner: {
    margin: "0px !important"
  },
  listItemTitle: {
    background: "#f0f1f5",
    paddingTop: "10px !important",
    paddingBottom: "10px !important",
    justifyContent: "center",
    display: "flex"
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
    minWidth: 50,
    width: "50%"
  },
  tabLabel: {
    fontSize: "14px"
  }
};

const casesTypes = {
  ms: "Civil",
  xs: "Criminal",
  xz: "Administrative",
  zscq: "IP",
  pc: "Compensation",
  zx: "Execution",
  other: "Other"
};

function QianzhanData(props) {
  const { item } = props;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Number: {item.num}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Judicial Institution: {item.ch}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Content: {item.content}
      </Typography>
    </div>
  );
}

function QichachaClosedData(props) {
  const { item } = props;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Number: {item.CASE_NO}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Judicial Institution: {item.COURT}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Is Prosecutor: {item.IS_PROSECUTOR ? "Yes" : "No"}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Is Defendant: {item.IS_DEFENDANT ? "Yes" : "No"}
      </Typography>
      {item.CASE_LEVEL ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Case Level: {item.CASE_LEVEL}
        </Typography>
      ) : (
        ""
      )}
      {item.CASE_REASON ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Case Reason: {item.CASE_REASON}
        </Typography>
      ) : (
        ""
      )}
      {item.UPDATE_DATE ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Update Date: {item.UPDATE_DATE.toString().substr(0, 10)}
        </Typography>
      ) : (
        ""
      )}
      {props.getCaseContentRef && item.id && item.chineseName ? (
        <StyledChip
          style={{ marginTop: 5 }}
          type={"info"}
          onClick={() => {
            props.getCaseContent(item.chineseName, item.id);
          }}
          icon={<EyeIcon style={{ color: "#4C84FF" }} />}
          variant={"outlined"}
          label={"Show Case Content"}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function QichachaOpenData(props) {
  const { item } = props;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Number: {item.CASE_NO}
      </Typography>
      {item.EXECUTE_GOV ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Judicial Institution: {item.EXECUTE_GOV}
        </Typography>
      ) : (
        ""
      )}
      <Typography className={"fontStyle11"}>
        {"\u2022"} Prosecutor: {item.PROSECUTOR}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Defendant: {item.DEFENDANT}
      </Typography>
    </div>
  );
}

function MoreDataClose(props) {
  const { classes, data } = props;
  return (
    <List>
      {data.map((item, idx) => {
        return (
          <div key={idx}>
            {item.CASE_TYPE &&
            (idx === 0 || data[idx - 1].CASE_TYPE !== item.CASE_TYPE) ? (
              <StyledListItem
                className={classNames(classes.listItemTitle, "fontStyle27")}
                style={{ marginTop: idx !== 0 ? 20 : 0 }}
              >
                {casesTypes[item.CASE_TYPE]}
              </StyledListItem>
            ) : (
              ""
            )}
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
                      style={{ alignSelf: "center" }}
                      height={24}
                      width={24}
                      alt={"court case"}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle5"}>
                        {item.CASE_NAME !== undefined
                          ? item.CASE_NAME
                          : item.title}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {item.CASE_NAME
                          ? item.SUBMIT_DATE
                            ? "\u2022 Case Date: " +
                              item.SUBMIT_DATE.toString().substr(0, 10)
                            : ""
                          : "\u2022 Case Date: " + item.date}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  {item.CASE_NAME !== undefined ? (
                    <QichachaClosedData
                      getCaseContent={props.getCaseContent}
                      getCaseContentRef={props.getCaseContentRef}
                      item={item}
                    />
                  ) : (
                    <QianzhanData item={item} />
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

function MoreDataOpen(props) {
  const { classes, data } = props;
  return (
    <List>
      {data.map((item, idx) => {
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
                      style={{ alignSelf: "center" }}
                      height={24}
                      width={24}
                      alt={"court case"}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle5"}>
                        {item.CASE_NAME}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {item.SUBMIT_DATE
                          ? "\u2022 Case Date: " +
                            item.SUBMIT_DATE.toString().substr(0, 10)
                          : ""}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <QichachaOpenData item={item} />
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

class MoreDataCourtCases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "close",
      loading: false,
      showCaseContent: false,
      caseContent: null,
      caseTitle: ""
    };
  }

  async getCaseContent(chineseName, id) {
    this.setState({ loading: true });
    const content = await this.props.getCaseContent(chineseName, id);
    if (content) {
      this.setState({
        showCaseContent: true,
        caseContent: content,
        caseTitle: this.props.moreData.find(item => item.id === id).CASE_NAME
      });
    }
    this.setState({ loading: false });
  }

  renderDialogContent() {
    const { classes } = this.props;
    return (
      <Dialog
        PaperProps={{
          classes: {
            root: classes.dialog
          }
        }}
        open={this.state.showCaseContent}
        onClose={() => this.setState({ showCaseContent: false })}
        aria-labelledby="scroll-dialog-title"
      >
        <StyledCloseIcon
          data-cy={"btnCloseDialog"}
          onClick={() => this.setState({ showCaseContent: false })}
        >
          <img alt="Close" src={require("./images/Close.png")} />
        </StyledCloseIcon>
        <DialogTitle
          className={"fontStyle3"}
          style={{ textAlign: "center", marginTop: 24 }}
        >
          {this.state.caseTitle}
        </DialogTitle>
        <StyledDialogContent>
          <Typography
            className={"fontStyle11"}
            dangerouslySetInnerHTML={{
              __html: this.state.caseContent
            }}
          />
        </StyledDialogContent>
      </Dialog>
    );
  }

  render() {
    const { classes, moreData } = this.props;
    const { selectedTab, loading } = this.state;
    const closeCases =
      moreData && moreData[0].CASE_NAME !== undefined
        ? moreData
            .filter(item => item.active !== true)
            .sort(function(a, b) {
              return ("" + a.CASE_TYPE).localeCompare(b.CASE_TYPE);
            })
        : moreData;
    const openCases =
      moreData && moreData[0].CASE_NAME !== undefined
        ? moreData.filter(item => item.active === true)
        : [];
    return openCases.length === 0 ? (
      <div>
        <MoreDataClose
          getCaseContent={this.getCaseContent.bind(this)}
          getCaseContentRef={this.props.getCaseContent}
          classes={classes}
          data={closeCases}
        />
        <Loader size={50} open={loading} />
        {this.renderDialogContent()}
      </div>
    ) : (
      <div>
        <Loader size={50} open={loading} />
        {this.renderDialogContent()}
        <Tabs
          value={selectedTab}
          id={"tabs"}
          classes={{
            indicator: classes.tabIndicator,
            root: classes.tabTextColor
          }}
          onChange={(event, value) => this.setState({ selectedTab: value })}
          variant={"fullWidth"}
        >
          <Tab
            data-cy={"tab2"}
            className={classes.tab}
            value={"close"}
            label={<span className={classes.tabLabel}>Close Cases</span>}
          />
          <Tab
            data-cy={"tab1"}
            className={classes.tab}
            value={"active"}
            label={<span className={classes.tabLabel}>Active Cases</span>}
          />
        </Tabs>
        {this.state.selectedTab === "active" ? (
          <MoreDataOpen classes={classes} data={openCases} />
        ) : (
          <MoreDataClose
            getCaseContent={this.getCaseContent.bind(this)}
            getCaseContentRef={this.props.getCaseContent}
            classes={classes}
            data={closeCases}
          />
        )}
      </div>
    );
  }
}

MoreDataCourtCases.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array.isRequired,
  getCaseContent: PropTypes.func
};

export default withStyles(styles)(MoreDataCourtCases);
