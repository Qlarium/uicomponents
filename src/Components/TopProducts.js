import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import PieChart from "./LowLevelComponents/PieChart";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  BigBoxLayout,
  StyledTitle,
  StyledCloseIcon,
  StyledDialogContent,
  StyledListItem
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ProductIcon from "@material-ui/icons/ShoppingCartOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const styles = {
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
  },
  dialog: {
    margin: 16
  }
};

class TopProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMonths: "12",
      other: null,
      viewAllOpen: false
    };
  }

  componentDidMount() {
    this.calcOtherProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectMonths !== prevState.selectMonths ||
      this.props.report !== prevProps.report
    ) {
      this.calcOtherProducts();
    }
  }

  calcOtherProducts() {
    let otherSum = 0,
      otherShipments = 0,
      weightSum = 0;
    let data = this.getData();

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (i > 3) {
        otherSum += Number.parseFloat(item.value_of_goods);
        otherShipments += Number.parseInt(item.shipment_count);
        weightSum += item.total_kg ? item.total_kg : 0;
      }
    }
    this.setState({
      other:
        otherSum > 0
          ? {
              hscode: "",
              hscode_desc: "Others",
              shipment_count: otherShipments,
              value_of_goods: otherSum,
              total_kg: weightSum
            }
          : null
    });
  }

  getData() {
    let data = [];
    switch (this.state.selectMonths) {
      case "4":
        if (this.props.type === "import") {
          if (this.props.report.import !== undefined)
            data = this.props.report.import.shipmentByProduct.supplier
              .lastQuarter;
        } else data = this.props.report.shipmentByProduct.supplier.lastQuarter;
        break;
      case "12":
        if (this.props.type === "import") {
          if (this.props.report.import !== undefined)
            data = this.props.report.import.shipmentByProduct.supplier.lastYear;
        } else data = this.props.report.shipmentByProduct.supplier.lastYear;
        break;
      case "36":
        if (this.props.type === "import") {
          if (this.props.report.import !== undefined)
            data = this.props.report.import.shipmentByProduct.supplier
              .last3Years;
        } else data = this.props.report.shipmentByProduct.supplier.last3Years;
        break;
      default:
        data = [];
    }

    return data
      .filter(item => item.value_of_goods > 0)
      .sort(function(a, b) {
        return b.value_of_goods - a.value_of_goods;
      });
  }

  getProducts(getAll) {
    let data = this.getData();
    if (getAll) return data;
    else if (data.length > 5) {
      data = data.slice(0, 4);
      if (this.state.other) {
        data.push(this.state.other);
      }
      return data;
    } else return data;
  }

  getPeriodStr() {
    switch (this.state.selectMonths) {
      case "4":
        return "last quarter";
      case "12":
        return "last year";
      case "36":
        return "last 3 years";
      default:
        return "";
    }
  }

  otherProductClick(val) {
    this.setState({ viewAllOpen: val });
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
        <StyledTitle
          width={this.props.width}
          mobileWidth={"60%"}
          otherWidth={"70%"}
        >
          <Typography className={classNames("fontStyle1")}>
            Top Products in USD
          </Typography>
          <div
            data-tip
            data-for={"tipProducts"}
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
            id={"tipProducts"}
            place="right"
            effect="solid"
          >
            <span>
              {this.props.type === "import"
                ? "Top Products, imported by the supplier with data based on governmental custom sources as declared by the supplier (defined in the Bill of lading)."
                : "Top Products, exported by the supplier with data based on governmental custom sources as declared by the supplier (defined in the Bill of lading)."}
            </span>
          </ReactTooltip>
        </StyledTitle>
        <select
          style={{ visibility: Utils.isPdfVisibility() }}
          onChange={e => this.setState({ selectMonths: e.target.value })}
          className={classNames(classes.select, "fontStyle16")}
          defaultValue={this.state.selectMonths}
        >
          <option value={"4"}>Last quarter</option>
          <option value={"12"}>Last year</option>
          <option value={"36"}>Last 3 years</option>
        </select>
        {this.getProducts(false).length > 0 ? (
          <PieChart
            width={this.props.width}
            data={this.getProducts(false).slice(0, 5)}
            height={"80%"}
            name={"hscode_desc"}
            unit={"$"}
            dataKey={"value_of_goods"}
            cx={this.props.width > 600 ? 110 : 90}
            cy={100}
            innerRadius={this.props.width > 600 ? 70 : 55}
            outerRadius={this.props.width > 600 ? 85 : 70}
            productsTooltip={true}
            period={this.getPeriodStr()}
            title={"Top Products in USD"}
            otherClick={this.otherProductClick.bind(this)}
            blur={this.props.blur}
          />
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
          onClose={() => this.otherProductClick(false)}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon onClick={() => this.otherProductClick(false)}>
            <img alt="Close" src={require("./images/Close.png")} />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            All Products ({this.getPeriodStr()})
          </DialogTitle>
          <StyledDialogContent blur={this.props.blur>=0}>
            <List>
              {this.getProducts(true).map((prod, idx) => {
                return (
                  <div key={idx}>
                    <StyledListItem style={{ alignItems: "flex-start" }}>
                      <ListItemIcon>
                        <ProductIcon
                          style={{
                            marginTop: 3,
                            marginLeft: 4,
                            color: "#4c84ff"
                          }}
                        />
                      </ListItemIcon>
                      <div style={{ marginLeft: -10 }}>
                        <Typography className={"fontStyle5"}>
                          {prod.hscode_desc}
                        </Typography>
                        <div>
                          <Typography className={"fontStyle11"}>
                            {"\u2022 "}Shipment count:{" "}
                            {Utils.shipmentsCountString(prod.shipment_count)}
                          </Typography>
                          <Typography className={"fontStyle11"}>
                            {"\u2022 "}Weight:{" "}
                            {prod.total_kg
                              ? new Intl.NumberFormat("en").format(
                                  prod.total_kg
                                ) + " KG"
                              : "Unknown"}
                          </Typography>
                          <Typography className={"fontStyle11"}>
                            {"\u2022 "}Product sales: $
                            {new Intl.NumberFormat("en").format(
                              prod.value_of_goods
                            )}
                          </Typography>
                        </div>
                      </div>
                    </StyledListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          </StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

TopProducts.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  type: PropTypes.string,
  blur: PropTypes.string
};

export default withStyles(styles)(TopProducts);
