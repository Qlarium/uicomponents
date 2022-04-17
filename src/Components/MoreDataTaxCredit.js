import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Utils from "./js/Utils";
import classNames from "classnames";
import taxSVG from "./images/tax.svg";

const styles = {
  expansionSummaryInner: {
    margin: "0px !important"
  },
  typoMore: {
    textAlign: "left",
    marginLeft: 10
  }
};

function MoreDataTaxCredit(props) {
  const { classes } = props;
  return (
    <List>
      {props.moreData.map((item, idx) => {
        return (
          <div key={idx}>
            <ListItem>
              <taxSVG height={24} width={24} alt={"employee"} />
              <div>
                <Typography
                  className={classNames(classes.typoMore, "fontStyle5")}
                >
                  {"Tax Rating " + item.rating}
                </Typography>
                <Typography
                  className={classNames(classes.typoMore, "fontStyle11")}
                >
                  {"\u2022"} Year: {item.year}
                </Typography>
              </div>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
}

MoreDataTaxCredit.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array.isRequired
};

export default withStyles(styles)(MoreDataTaxCredit);
