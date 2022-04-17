import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import classNames from "classnames";

const styles = {
  blueTooltip: {
    background: "#182D5A",
    padding: 24,
    marginTop: 25
  },
  arrowPopper: {
    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent #182D5A transparent`
      }
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `#182D5A transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent #182D5A transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent #182D5A`
      }
    }
  },
  arrowArrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  }
};

class FirstTimeExpTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowRef: null
    };
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <Tooltip
            placement={this.props.placement}
            open={this.props.open}
            interactive={true}
            title={
              <React.Fragment>
                {this.props.text}
                <span className={classes.arrowArrow} ref={this.handleArrowRef} />
              </React.Fragment>
            }
            classes={{
              popper: classes.arrowPopper,
              tooltip: classNames(classes.blueTooltip, "fontStyle28")
            }}
            PopperProps={{
              popperOptions: {
                modifiers: {
                  arrow: {
                    enabled: true,
                    element: this.state.arrowRef
                  }
                }
              }
            }}
        >
          {this.props.element}
        </Tooltip>
    );
  }
}

FirstTimeExpTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  placement: PropTypes.string.isRequired,
  text: PropTypes.element.isRequired,
  element: PropTypes.element.isRequired
};

export default withStyles(styles)(FirstTimeExpTooltip);
