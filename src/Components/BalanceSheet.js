import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import AssetsSvg from "./images/assets.svg";
import LiabilitiesSvg from "./images/liabilities.svg";
import RevenueSvg from "./images/revenue.svg";

import BackSVG from "./images/Back.svg";
import CloseSVG from "./images/Close.svg";

import {
  BigBoxLayout,
  StyledDialogContent,
  StyledCloseIcon
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

const StyledTitle = styled.div`
  display: flex;
  width: ${props => (props.width > 600 ? "60%" : "45%")};
`;

const StyledDivMore = styled.div`
  text-align: right;
  cursor: pointer;
  margin-left: ${props => (props.width > 600 ? "30px" : "5px")};
`;

const styles = {
  title: {
    marginTop: 19,
    marginLeft: 24,
    textAlign: "left",
    display: "flex",
    height: "min-content",
    width: "100%"
  },
  icon: {
    height: 16,
    width: 16,
    marginTop: -2,
    display: "block"
  },
  listDiv: {
    width: "100%"
  },
  listItemSecondary: {
    textAlign: "left",
    width: "48%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  date: {
    marginTop: 4
  },
  bottomIcon: {
    position: "absolute",
    marginTop: -4
  },
  dialog: {
    margin: 16
  },
  divWrapper: {
    height: "auto",
    width: "100%",
    background: "white",
    paddingTop: 8
  }
};

class BalanceSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreOpen: false
    };
  }

  moreData() {
    const { classes } = this.props;
    const data = this.props.listedData && this.props.listedData.balanceSheet;
    return (
      <div className={classes.divWrapper}>
        {data ? (
          <List>
            {this.renderListItem(
              "Cash and Cash Equivalents",
              data.monetaryFond,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Accounts Receivable",
              data.accountsReceivable,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Other Receivables",
              data.otherReceivables,
              "revenue.svg"
            )}
            {this.renderListItem("Inventory", data.stock, "revenue.svg")}
            {this.renderListItem(
              "Total Current Assets",
              data.totalCurrentAssets,
              "assets.svg"
            )}
            {this.renderListItem(
              "Long Term Equity Investment",
              data.longEquityInvestment,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Accumulated Depreciation",
              data.accumulatedDepreciation,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Fixed Assets",
              data.fixedAssets,
              "assets.svg"
            )}
            {this.renderListItem(
              "Intangible Assets",
              data.intangibleAssets,
              "assets.svg"
            )}
            {this.renderListItem(
              "Total Assets",
              data.totalAssets,
              "assets.svg"
            )}
            {this.renderListItem(
              "Accounts Payable",
              data.accountsPayable,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Advances from Customers",
              data.quAccountsReceivable,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Inventory Falling Price Reserves",
              data.inventoryFallingPriceReserves,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Total Current Liabilities",
              data.totalCurrentLiabilities,
              "liabilities.svg"
            )}
            {this.renderListItem(
              "Long Term Loans / Borrows",
              data.totalLongTermLiabilities,
              "liabilities.svg"
            )}
            {this.renderListItem(
              "Total Liabilities",
              data.totalLiabilities,
              "liabilities.svg"
            )}
            {this.renderListItem(
              "Paid-In Capital",
              data.capitalPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Additional Paid-In Capital",
              data.capitalAccumulationFund,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Surplus Reserves",
              data.surplusProvidentFund,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Total Shareholders Equity",
              data.totalStockHoldersEquity,
              "revenue.svg"
            )}
          </List>
        ) : (
          ""
        )}
      </div>
    );
  }

  renderSVG(img) {
    switch (img) {
      case "assets.svg":
        return <AssetsSvg style={{ width: 16, height: 16 }} />;
      case "liabilities.svg":
        return <LiabilitiesSvg style={{ width: 16, height: 16 }} />;
      case "revenue.svg":
        return <RevenueSvg style={{ width: 16, height: 16 }} />;
    }
  }

  renderListItem(label, value, img) {
    const { classes, width } = this.props;
    return (
      <ListItem>
        <ListItemIcon className={classes.icon}>
          {this.renderSVG(img)}
        </ListItemIcon>
        <ListItemText
          style={{ marginLeft: -25 }}
          primary={
            <Typography
              style={{ maxWidth: width < 650 ? "50%" : "" }}
              className={"fontStyle7"}
            >
              {label}
            </Typography>
          }
        />
        <ListItemSecondaryAction
          className={classNames(classes.listItemSecondary, "fontStyle10")}
        >
          {value ? "¥" + new Intl.NumberFormat("en").format(value) : "Not Set"}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  render() {
    const { classes } = this.props;
    const data = this.props.listedData && this.props.listedData.balanceSheet;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <StyledTitle width={this.props.width}>
            <Typography className={classNames("fontStyle1")}>
              Balance Sheet
            </Typography>
            <div
              data-tip
              data-for={"tipFinancial"}
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
              id={"tipFinancial"}
              place="right"
              effect="solid"
            >
              <span>
                Financial data of public company as reported to the Stock
                Exchange
              </span>
            </ReactTooltip>
          </StyledTitle>
          {data ? (
            <Typography className={classNames(classes.date, "fontStyle12")}>
              {data.date}
            </Typography>
          ) : (
            ""
          )}
          {data ? (
            <StyledDivMore
              onClick={() => this.setState({ moreOpen: true })}
              className={"fontStyle6"}
              data-cy="divMore"
              width={this.props.width}
              style={{ visibility: Utils.isPdfVisibility() }}
            >
              More
              <BackSVG alt="view all" className={classes.bottomIcon} />
            </StyledDivMore>
          ) : (
            ""
          )}
        </div>
        {data ? (
          <div className={classes.listDiv}>
            <List>
              {this.renderListItem(
                "Total Current Assets",
                data.totalCurrentAssets,
                "assets.svg"
              )}
              {this.renderListItem(
                "Total Assets",
                data.totalAssets,
                "assets.svg"
              )}
              {this.renderListItem(
                "Total Liabilities",
                data.totalLiabilities,
                "liabilities.svg"
              )}
              {this.renderListItem(
                "Total Shareholders Equity",
                data.totalStockHoldersEquity,
                "revenue.svg"
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
          open={this.state.moreOpen}
          onClose={() => this.setState({ moreOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            data-cy={"btnCloseDialog"}
            onClick={() => this.setState({ moreOpen: false })}
          >
            <CloseSVG alt="Close" />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            Balance Sheet
          </DialogTitle>
          <StyledDialogContent>{this.moreData()}</StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

BalanceSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  listedData: PropTypes.object
};

export default withStyles(styles)(BalanceSheet);
