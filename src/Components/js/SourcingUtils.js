class SourcingUtils {
  static getStatusStr(code) {
    switch (code) {
      case 1:
        return "Pending";
      default:
        return "Unknown";
    }
  }
  static getExpectedTrans(code) {
    switch (code) {
      case 0:
        return "Any";
      case 1:
        return "Less than $10,000";
      case 2:
        return "$10,000 to $100,000";
      case 3:
        return "$100,000 to $1,000,000";
      case 4:
        return "Over $1,000,000";
      default:
        return "Any";
    }
  }
  static getSupplierType(code) {
    switch (code) {
      case 0:
        return "Manufacturers or Traders";
      case 1:
        return "Only Manufacturing Companies";
      case 2:
        return "Only Trading Companies";
      default:
        return "Any";
    }
  }
}

export default SourcingUtils;
