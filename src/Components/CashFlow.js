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
import {
  BigBoxLayout,
  StyledDialogContent,
  StyledCloseIcon
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import AssetsSvg from "./images/assets.svg";
import TaxSvg from "./images/tax.svg";
import RevenueSvg from "./images/revenue.svg";

import BackSVG from "./images/Back.svg";
import CloseSVG from "./images/Close.svg";

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

class CashFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreOpen: false
    };
  }

  moreData() {
    const { classes } = this.props;
    const data = this.props.listedData && this.props.listedData.cashFlow;
    return (
      <div className={classes.divWrapper}>
        {data ? (
          <List>
            {this.renderListItem(
              "Cash Received from Goods and Services",
              data.cashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Tax Refund",
              data.taxRefundReceived,
              "tax.svg"
            )}
            {this.renderListItem(
              "Cash Received from Other Business Activities",
              data.otherCashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Inflow from Operating Activities",
              data.cashInFlows,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Paid for Goods and Services",
              data.cashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Paid to Employees",
              data.employeesCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Various Taxes Paid",
              data.taxesPaid,
              "tax.svg"
            )}
            {this.renderListItem(
              "Cash Paid for Other Operating Activities",
              data.otherCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Outflow from Operating Activities",
              data.operatingCashOutFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Net Cash Flow from Operating Activities",
              data.netCashFlows,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Received from Return on Investment",
              data.investmentCashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Net Cash Recovered from Disposal of Assets",
              data.assetsNetCashReceived,
              "assets.svg"
            )}
            {this.renderListItem(
              "Cash Inflows from Investment Activities",
              data.investmentCashInFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Paid for Acquisition of Assets",
              data.assetsCashPaid,
              "assets.svg"
            )}
            {this.renderListItem(
              "Net Cash Paid from Disposal of Assets",
              data.assetsNetCashPaid,
              "assets.svg"
            )}
            {this.renderListItem(
              "Cash Paid for Acquisition of Investments",
              data.investmentCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Outflows from Investment Activities",
              data.investmentCashOutFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Net Cash Flows from Investing Activities",
              data.investingNetCashFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Received from Investors",
              data.absorptionInvestmentCashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Received from Borrowings",
              data.borrowingsCashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Inflows from Financing Activities",
              data.financingCashInFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Repayments of Borrowings",
              data.debtCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Paid for Dividends or Profits Distribution",
              data.distributionCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash Outflows from Financing Activities",
              data.financingCashOutFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Net Cash Flow from Financing Activities",
              data.financingNetCashFlows,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Current Ratio",
              data.currentRatio,
              "revenue.svg",
              false
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
      case "tax.svg":
        return <TaxSvg style={{ width: 16, height: 16 }} />;
      case "revenue.svg":
        return <RevenueSvg style={{ width: 16, height: 16 }} />;
    }
  }

  renderListItem(label, value, img, formatVal = true) {
    const { classes } = this.props;
    return (
      <ListItem>
        <ListItemIcon className={classes.icon}>
          {this.renderSVG(img)}
        </ListItemIcon>
        <ListItemText
          style={{ marginLeft: -25 }}
          primary={
            <Typography style={{ maxWidth: "50%" }} className={"fontStyle7"}>
              {label}
            </Typography>
          }
        />
        <ListItemSecondaryAction
          className={classNames(classes.listItemSecondary, "fontStyle10")}
        >
          {value
            ? formatVal
              ? "¥" + new Intl.NumberFormat("en").format(value)
              : value
            : "Not Set"}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  render() {
    const { classes } = this.props;
    const data = this.props.listedData && this.props.listedData.cashFlow;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <StyledTitle width={this.props.width}>
            <Typography className={classNames("fontStyle1")}>
              Cash Flow
            </Typography>
            <div data-tip data-for={"tipFinancial"}>
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
                "Cash Inflow from Operating Activities",
                data.cashInFlows,
                "revenue.svg"
              )}
              {this.renderListItem(
                "Cash Outflow from Operating Activities",
                data.operatingCashOutFlow,
                "revenue.svg"
              )}
              {this.renderListItem(
                "Cash Inflows from Financing Activities",
                data.financingCashInFlow,
                "revenue.svg"
              )}
              {this.renderListItem(
                "Current Ratio",
                data.currentRatio,
                "revenue.svg",
                false
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
            Cash Flow
          </DialogTitle>
          <StyledDialogContent>{this.moreData()}</StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

CashFlow.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  listedData: PropTypes.object
};

export default withStyles(styles)(CashFlow);
