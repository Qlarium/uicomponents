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
import NetProfitSvg from "./images/netProfit.svg";

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

class IncomeStatement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreOpen: false
    };
  }

  renderSVG(img) {
    switch (img) {
      case "assets.svg":
        return <AssetsSvg style={{ width: 16, height: 16 }} />;
      case "tax.svg":
        return <TaxSvg style={{ width: 16, height: 16 }} />;
      case "revenue.svg":
        return <RevenueSvg style={{ width: 16, height: 16 }} />;
      case "netProfit.svg":
        return <NetProfitSvg style={{ width: 16, height: 16 }} />;
    }
  }

  moreData() {
    const { classes } = this.props;
    const data = this.props.listedData && this.props.listedData.incomeStatement;
    return (
      <div className={classes.divWrapper}>
        {data ? (
          <List>
            {this.renderListItem(
              "Total Operating Income",
              data.operatingIncome,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Total Expenses",
              data.operatingCost,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Sales Expenses",
              data.salesCost,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Financial Expenses",
              data.financialExpenses,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Management Expenses",
              data.managementFee,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Asset Impairment Loss",
              data.impairmentLossesAssets,
              "assets.svg"
            )}
            {this.renderListItem(
              "Investment Income",
              data.investmentIncome,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Net Profit",
              data.operatingProfit,
              "netProfit.svg"
            )}
            {this.renderListItem(
              "Total Profit",
              data.totalProfit,
              "netProfit.svg"
            )}
            {this.renderListItem(
              "Income Tax Expenses",
              data.incomeTax,
              "tax.svg"
            )}
            {this.renderListItem(
              "Net Profit/Loss Attributable to Parent",
              data.parentCompanyNetProfit,
              "netProfit.svg"
            )}
          </List>
        ) : (
          ""
        )}
      </div>
    );
  }

  renderListItem(label, value, img) {
    const { classes, width } = this.props;
    return (
      <ListItem>
        <ListItemIcon className={classes.icon}>
          <img
            height={16}
            width={16}
            alt="img"
            src={require("./images/" + img)}
          />
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
          {value ? "¥" + new Intl.NumberFormat("en").format(value) : "Not Set"}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  render() {
    const { classes } = this.props;
    const data = this.props.listedData && this.props.listedData.incomeStatement;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <StyledTitle width={this.props.width}>
            <Typography className={classNames("fontStyle1")}>
              Income Statement
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
                "Total Operating Income",
                data.operatingIncome,
                "revenue.svg"
              )}
              {this.renderListItem(
                "Total Expenses",
                data.operatingCost,
                "revenue.svg"
              )}
              {this.renderListItem(
                "Total Profit",
                data.totalProfit,
                "netProfit.svg"
              )}
              {this.renderListItem(
                "Net Profit",
                data.operatingProfit,
                "netProfit.svg"
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
            Income Statement
          </DialogTitle>
          <StyledDialogContent>{this.moreData()}</StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

IncomeStatement.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  listedData: PropTypes.object
};

export default withStyles(styles)(IncomeStatement);
