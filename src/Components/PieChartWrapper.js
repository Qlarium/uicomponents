import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import PieChart from "./LowLevelComponents/PieChart";
import Typography from "@material-ui/core/Typography";
import Utils from "./js/Utils";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import {
  BigBoxLayout,
  StyledTitle,
  StyledCloseIcon,
  StyledDialogContent
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ShareholdersExpansion from "./ShareholdersExpansion";

const styles = {
  bottomMsg: {
    marginLeft: 22,
    marginRight: 10,
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  bottomIcon: {
    position: "absolute",
    marginTop: -4,
    height: 24,
    width: 24
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  divViewAll: {
    marginTop: 19,
    cursor: "pointer",
    height: "fit-content"
  },
  dialog: {
    background: "#F5F7FB",
    margin: 16
  }
};

class PieChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allShareholdersOpen: false
    };
  }

  dialogMoreData() {
    const { classes } = this.props;
    return (
      <Dialog
        PaperProps={{
          classes: {
            root: classes.dialog
          }
        }}
        open={this.state.allShareholdersOpen}
        onClose={() => this.setState({ allShareholdersOpen: false })}
        aria-labelledby="scroll-dialog-title"
      >
        <StyledCloseIcon
          data-cy={"btnCloseDialog"}
          onClick={() => this.setState({ allShareholdersOpen: false })}
        >
          <img alt="Close" src={Utils.getImage("Close.png")} />
        </StyledCloseIcon>
        <DialogTitle
          className={"fontStyle3"}
          style={{ textAlign: "center", marginTop: 24 }}
        >
          Corporate Map
        </DialogTitle>
        <StyledDialogContent>
          {this.props.corporateMap ? (
            <ShareholdersExpansion
              chineseName={this.props.chineseName}
              addSupplier={this.props.addSupplier}
              corporateMap={this.props.corporateMap}
              width={this.props.width}
            />
          ) : (
            ""
          )}
        </StyledDialogContent>
      </Dialog>
    );
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
          mobileWidth={"50%"}
          otherWidth={"60%"}
        >
          <Typography className={classNames("fontStyle1")}>
            {this.props.title}
          </Typography>
          <div data-tip data-for={"tip" + this.props.title} style={{ visibility: Utils.isPdfVisibility() }}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tip" + this.props.title}
            place="right"
            effect="solid"
          >
            <span>{this.props.infoText}</span>
          </ReactTooltip>
        </StyledTitle>
        {this.props.title === "Shareholders" &&
        this.props.corporateMap &&
        this.props.corporateMap.nodes.find(
          item => item.properties.name === this.props.chineseName
        ) ? (
          <div
            data-cy="viewAllShareholders"
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ allShareholdersOpen: true })}
            style={{ visibility: Utils.isPdfVisibility() }}
          >
            Expand Shareholders
            <img
              alt="view all"
              src={require("./images/Back.png")}
              style={{ marginTop: -4, position: "absolute" }}
            />
          </div>
        ) : (
          ""
        )}
        {this.props.data !== undefined && this.props.data.length > 0 ? (
          <PieChart
            width={this.props.width}
            height={"70%"}
            data={this.props.data}
            unit={"%"}
            dataKey={this.props.dataKey}
            cx={this.props.width > 600 ? 110 : 90}
            cy={100}
            innerRadius={this.props.width > 600 ? 70 : 55}
            outerRadius={this.props.width > 600 ? 85 : 70}
            title={this.props.title}
          />
        ) : (
          <NoDataImg />
        )}
        {this.props.data !== undefined && this.props.data.length > 0 ? (
          <div
            data-tip
            data-for={"tipBtmMsg" + this.props.title}
            data-cy="divBottomMsg"
            style={{ overflow: "hidden" }}
          >
            <Typography
              className={classNames(classes.bottomMsg, "fontStyle11")}
            >
              {this.props.bottomMsg !== "" && this.props.bottomMsg !== null ? (
                <img
                  alt="bottomIcon"
                  className={classes.bottomIcon}
                  src={Utils.getIconByNumber(this.props.bottomIcon)}
                />
              ) : (
                ""
              )}
              <label style={{ marginLeft: 25 }}>{this.props.bottomMsg}</label>
            </Typography>
          </div>
        ) : (
          ""
        )}
        <ReactTooltip
          className={classNames("tooltip", "fontStyle14")}
          id={"tipBtmMsg" + this.props.title}
          place="bottom"
          effect="solid"
        >
          <span>{this.props.bottomMsg}</span>
        </ReactTooltip>
        {this.dialogMoreData()}
      </BigBoxLayout>
    );
  }
}

PieChartWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  infoText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  bottomIcon: PropTypes.any,
  bottomMsg: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  addSupplier: PropTypes.func,
  corporateMap: PropTypes.object,
  chineseName: PropTypes.string
};

export default withStyles(styles)(PieChartWrapper);
