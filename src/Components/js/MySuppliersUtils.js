class MySuppliersUtils {
  static getIsTradeStr(isTradeVal) {
    switch (isTradeVal) {
      case "both":
        return "Trade/Manufacture Company";
      case "yes":
        return "Trade Company";
      case "no":
        return "Manufacture Company";
      default:
        return "";
    }
  }
  static getGraphData(shipments) {
    var data = [];
    if (shipments !== null) {
      shipments = Array.isArray(shipments) ? shipments : shipments["Total"];
      for (var i = 0; i < shipments.length; i++) {
        if (shipments[i] !== undefined && shipments[i] !== null) {
          var item = {
            name:
              "Y" +
              shipments[i].year.toString().substr(2) +
              "-Q" +
              (shipments[i].month !== undefined
                ? shipments[i].month
                : shipments[i].quarter),
            supplier: shipments[i].value_of_goods
          };
          data.push(item);
        }
      }
    }

    return data;
  }
}

export default MySuppliersUtils;
