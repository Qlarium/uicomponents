import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import {
  StyledExpansionPanel,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails,
  StyledChip
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import GroupIcon from "@material-ui/icons/Business";
import UserIcon from "@material-ui/icons/Person";
import ListItem from "@material-ui/core/ListItem";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";

const StyledListItem = styled(ListItem)`
  padding: 2px 0 2px 0 !important;
`;

const styles = {
  title: {
    marginTop: 19,
    marginLeft: 24,
    textAlign: "left",
    display: "flex",
    height: "min-content"
  },
  icon: {
    height: 24,
    width: 24
  },
  listDiv: {
    width: "100%"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  expansionSummaryInner: {
    margin: "0px !important",
    alignItems: "flex-start",
    paddingBottom: 5
  },
  divWrapper: {
    height: "auto",
    width: "100%",
    background: "white",
    paddingTop: 8
  },
  shareholderImg: {
    marginTop: 6,
    height: 24,
    width: 24,
    alignSelf: "center"
  }
};

class ShareholdersExpansion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addSupplier(englishName, chineseName) {
    this.props.addSupplier(englishName, chineseName);
  }
  componentDidMount() {
    const { corporateMap } = this.props;
    const persons = corporateMap.nodes.filter(
      item => item.labels[0] === "Person"
    );
    const companies = corporateMap.nodes.filter(
      item => item.labels[0] === "Company"
    );
    const investRelations = corporateMap.relationships.filter(
      item => item.type === "INVEST"
    );
    const legalRelations = corporateMap.relationships.filter(
      item => item.type === "LEGAL"
    );
    const employRelations = corporateMap.relationships.filter(
      item => item.type === "EMPLOY"
    );

    const supplier = companies.find(
      item =>
        item.properties.name === this.props.chineseName &&
        item.properties.status !== "Evacuation"
    );

    const supplierId = supplier.id;

    const shareholdersRelations = investRelations.filter(
      item => item.endNode === supplierId
    );

    let shareholders = [];

    for (let i = 0; i < shareholdersRelations.length; i++) {
      const shareholder = corporateMap.nodes.find(
        item => item.id === shareholdersRelations[i].startNode
      );
      const associateRelations = investRelations.filter(
        item => item.startNode === shareholder.id && item.endNode !== supplierId
      );
      let associate = [];
      for (let j = 0; j < associateRelations.length; j++) {
        const associateComp = companies.find(
          item => item.id === associateRelations[j].endNode
        );
        associate.push(associateComp);
      }
      shareholders.push({
        id: shareholder.id,
        label: shareholder.labels[0],
        properties: shareholder.properties,
        sharesProperties: shareholdersRelations[i].properties,
        associate
      });
    }

    shareholders.sort(function(a, b) {
      return b.sharesProperties.stockPercent - a.sharesProperties.stockPercent;
    });

    this.setState({
      persons,
      supplier,
      companies,
      investRelations,
      legalRelations,
      employRelations,
      supplierId,
      shareholders
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.divWrapper}>
        <div className={classes.title}>
          <Typography className={classNames("fontStyle1")}>
            Shareholders Data
          </Typography>
          <div data-tip data-for={"tipWebDetails"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipWebDetails"}
            place="right"
            effect="solid"
          >
            <span>Shareholders associates information.</span>
          </ReactTooltip>
        </div>
        {this.state.shareholders && this.state.shareholders.length > 0 ? (
          <div className={classes.listDiv}>
            <List>
              {this.state.shareholders.map((item, idx) => {
                return (
                  <div key={idx}>
                    <StyledListItem>
                      <StyledExpansionPanel
                        style={{ width: "100%", marginRight: 4, marginLeft: 4 }}
                      >
                        <StyledExpansionSummary
                          style={{
                            cursor:
                              item.associate.length > 0 ? "pointer" : "default",
                            background: "#f0f1f5"
                          }}
                          IconButtonProps={{
                            style: {
                              padding: 0,
                              top: "85%"
                            }
                          }}
                          classes={{
                            content: classes.expansionSummaryInner,
                            expanded: classes.expansionSummaryInner
                          }}
                          expandIcon={""}
                        >
                          <ListItemIcon>
                            {item.label === "Company" ? (
                              <GroupIcon className={classes.shareholderImg} />
                            ) : (
                              <UserIcon className={classes.shareholderImg} />
                            )}
                          </ListItemIcon>
                          <StyledListItemText
                            style={{
                              padding: 0,
                              marginLeft: 0
                            }}
                            primary={
                              <div
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  alignItems: "center"
                                }}
                              >
                                <div style={{ width: "100%" }}>
                                  <Typography className={"fontStyle10"}>
                                    {item.properties.englishName}
                                  </Typography>
                                  <Typography className={"fontStyle7"}>
                                    {"\u2022"} Chinese Name:{" "}
                                    {item.properties.name}
                                  </Typography>
                                  <Typography className={"fontStyle7"}>
                                    {"\u2022"} Shares:{" "}
                                    {item.sharesProperties.stockPercent}%
                                  </Typography>
                                  {item.associate.length > 0 ? (
                                    <Typography className={"fontStyle7"}>
                                      {"\u2022"} Associate:{" "}
                                      {`Shareholder in ${
                                        item.associate.length
                                      } other companies`}
                                    </Typography>
                                  ) : (
                                    ""
                                  )}
                                  <div
                                    style={{
                                      display:
                                        this.props.width > 600 ? "flex" : ""
                                    }}
                                  >
                                    {item.associate.length > 0 ? (
                                      <StyledChip
                                        style={{ marginTop: 5, marginRight: 5 }}
                                        type={"info"}
                                        onClick={() => {}}
                                        icon={
                                          <ExpandMoreIcon
                                            style={{ color: "#4C84FF" }}
                                          />
                                        }
                                        variant={"outlined"}
                                        label={"Invested Companies"}
                                      />
                                    ) : (
                                      ""
                                    )}
                                    {item.label === "Company" &&
                                    (window &&
                                      !window.location.pathname.includes(
                                        "/direct/"
                                      )) &&
                                    this.props.addSupplier ? (
                                      <StyledChip
                                        style={{ marginTop: 5 }}
                                        type={"info"}
                                        onClick={() => {
                                          this.addSupplier(
                                            item.properties.englishName,
                                            item.properties.name
                                          );
                                        }}
                                        icon={
                                          <AddIcon
                                            style={{ color: "#4C84FF" }}
                                          />
                                        }
                                        variant={"outlined"}
                                        label={"Request Analysis"}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            }
                          />
                        </StyledExpansionSummary>
                        {item.associate.length > 0 ? (
                          <StyledExpansionPanelDetails
                            style={{
                              paddingLeft: 8,
                              marginTop: 16
                            }}
                          >
                            <div>
                              {item.associate.map((associate, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    display: "flex",
                                    marginBottom: 12,
                                    alignItems: "flex-start"
                                  }}
                                >
                                  <ListItemIcon>
                                    <GroupIcon
                                      className={classes.shareholderImg}
                                    />
                                  </ListItemIcon>
                                  <div style={{ width: "100%" }}>
                                    <Typography className={"fontStyle10"}>
                                      {associate.properties.englishName}
                                    </Typography>
                                    <Typography className={"fontStyle7"}>
                                      {"\u2022 "}Chinese Name:{" "}
                                      {associate.properties.name}
                                    </Typography>
                                    <Typography className={"fontStyle7"}>
                                      {"\u2022 "}Status:{" "}
                                      {associate.properties.status ===
                                        "surviving" ||
                                      associate.properties.status === "working"
                                        ? "active"
                                        : associate.properties.status}
                                    </Typography>
                                    <Typography className={"fontStyle7"}>
                                      {"\u2022 "}Capital:{" "}
                                      {associate.properties.registCapi}
                                    </Typography>
                                    <div style={{ display: "flex" }}>
                                      {window &&
                                      !window.location.pathname.includes(
                                        "/direct/" && this.props.addSupplier
                                      ) ? (
                                        <StyledChip
                                          style={{ marginTop: 5 }}
                                          type={"info"}
                                          onClick={() => {
                                            this.addSupplier(
                                              associate.properties.englishName,
                                              associate.properties.name
                                            );
                                          }}
                                          icon={
                                            <AddIcon
                                              style={{ color: "#4C84FF" }}
                                            />
                                          }
                                          variant={"outlined"}
                                          label={"Request Analysis"}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </StyledExpansionPanelDetails>
                        ) : (
                          ""
                        )}
                      </StyledExpansionPanel>
                    </StyledListItem>
                  </div>
                );
              })}
            </List>
          </div>
        ) : (
          <NoDataImg />
        )}
      </div>
    );
  }
}

ShareholdersExpansion.propTypes = {
  classes: PropTypes.object.isRequired,
  chineseName: PropTypes.string.isRequired,
  addSupplier: PropTypes.func,
  corporateMap: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default withStyles(styles)(ShareholdersExpansion);
