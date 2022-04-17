class IPUtils {
  static getIsoShortName(name) {
    try {
      let res = "";
      let idx = name.indexOf("ISO");
      while (
        idx < name.length &&
        (name.charAt(idx) < "0" || name.charAt(idx) > "9")
      )
        idx++;
      res = "ISO ";
      while (
        idx < name.length &&
        name.charAt(idx) >= "0" &&
        name.charAt(idx) <= "9"
      ) {
        res += name.charAt(idx++);
      }
      return res;
    } catch (e) {
      return "";
    }
  }
}

export default IPUtils;
