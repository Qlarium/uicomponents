import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Utils from "./js/Utils";
import {
  StyledExpansionPanel,
  StyledListItem,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails
} from "./LowLevelComponents/StyledComponents";

import DiplomaSVG from "./images/diploma.svg";

const styles = {
  expansionSummaryInner: {
    margin: "0px !important"
  }
};

function MoreDataQianzhan(props) {
  const item = props.item;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Number: {item.patentNo}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Request Date: {item.patentDate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Type: {item.patentType}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Classification Number: {item.patentClass}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Status: {item.patentLegalStatus}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Publish Date: {item.patentOpenDate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Address: {item.patentAddr}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent City: {item.patentCity}
      </Typography>
      {item.patentInventor ? (
        <div>
          <Typography className={"fontStyle11"}>
            {"\u2022"} Patent Inventors:{" "}
          </Typography>
          <div>
            {item.patentInventor.split(";").map((inventor, idx) => (
              <Typography
                key={idx}
                style={{ marginLeft: 7 }}
                className={"fontStyle11"}
              >
                {inventor}
              </Typography>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Applicant: {item.patentApplicant}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Agency: {item.patentAgency}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Agent: {item.patentAgent}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Summary: {item.patentAbstract}
      </Typography>
    </div>
  );
}

function MoreDataQichacha(props) {
  const item = props.item;
  return (
    <div>
      {item.appDate ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Request Date:{" "}
          {item.appDate
            ? new Date(item.appDate).toISOString().substr(0, 10)
            : "Unknown"}
        </Typography>
      ) : (
        ""
      )}
      {item.appNumber ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Patent Number: {item.appNumber}
        </Typography>
      ) : (
        ""
      )}
      <Typography className={"fontStyle11"}>
        {"\u2022"} Patent Type: {item.kindCode}
      </Typography>
      {item.legalStatus ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Status: {item.legalStatus}
        </Typography>
      ) : (
        ""
      )}
      <Typography className={"fontStyle11"}>
        {"\u2022"} Publish Date:{" "}
        {item.publicDate
          ? new Date(item.publicDate).toISOString().substr(0, 10)
          : "Unknown"}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Publish Number: {item.publicNum}
      </Typography>
      {item.agency ? (
        <div>
          <Typography className={"fontStyle11"}>{"\u2022"} Agency: </Typography>
          <div>
            {typeof item.agency === "string" ? (
              <Typography style={{ marginLeft: 7 }} className={"fontStyle11"}>
                {item.agency}
              </Typography>
            ) : (
              item.agency.map((agen, idx) => (
                <Typography
                  key={idx}
                  style={{ marginLeft: 7 }}
                  className={"fontStyle11"}
                >
                  {agen}
                </Typography>
              ))
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {item.inventorList ? (
        <div>
          <Typography className={"fontStyle11"}>
            {"\u2022"} Inventors:{" "}
          </Typography>
          <div>
            {typeof item.inventorList === "string" ? (
              <Typography style={{ marginLeft: 7 }} className={"fontStyle11"}>
                {item.inventorList}
              </Typography>
            ) : (
              item.inventorList.map((inventor, idx) => (
                <Typography
                  key={idx}
                  style={{ marginLeft: 7 }}
                  className={"fontStyle11"}
                >
                  {inventor}
                </Typography>
              ))
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {item.ipcList && item.ipcList.length > 0 && item.ipcDesc ? (
        <div>
          <Typography className={"fontStyle11"}>
            {"\u2022"} Patent Details:{" "}
          </Typography>
          <div>
            {item.ipcList.map((ipc, idx) => (
              <Typography
                key={idx}
                style={{ marginLeft: 7 }}
                className={"fontStyle11"}
              >
                {ipc +
                  " - " +
                  (typeof item.ipcDesc === "string"
                    ? item.ipcDesc
                    : item.ipcDesc[idx])}
              </Typography>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function MoreDataPatents(props) {
  const { classes } = props;
  console.log(props.moreData);
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
                    <DiplomaSVG
                      style={{ alignSelf: "center" }}
                      height={24}
                      width={24}
                      alt={"patent"}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle7"}>
                        {item.patentName}
                      </Typography>
                    }
                    secondary={
                      item.valid === true ? (
                        <Typography className={"fontStyle35"}>Valid</Typography>
                      ) : item.valid === false ? (
                        <Typography className={"fontStyle30"}>
                          Invalid
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  {item.legalStatus !== undefined ? (
                    <MoreDataQichacha item={item} />
                  ) : (
                    <MoreDataQianzhan item={item} />
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

MoreDataPatents.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array.isRequired
};

export default withStyles(styles)(MoreDataPatents);
