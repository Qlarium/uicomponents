import Utils from "./Utils";

class WebsiteUtils {
  static getLastYearChanges(websiteArchive) {
    try {
      return (
        websiteArchive.latestChanges &&
        websiteArchive.latestChanges.filter(
          change => change[1].substr(0, 4) == new Date().getFullYear() - 1
        ).length
      );
    } catch (e) {
      return null;
    }
  }
  static getBtmMsgChanges(lastYearChanges) {
    return lastYearChanges === 0
      ? "No site changes over the last year"
      : "Site actively maintained";
  }
  static getBtmIconChanges(lastYearChanges) {
    return lastYearChanges === 0
      ? Utils.getIconByNumber(3)
      : Utils.getIconByNumber(2);
  }
  static getWebsiteLifetime(websiteWhoIs) {
    try {
      return Math.round(websiteWhoIs.WhoisRecord.estimatedDomainAge / 365);
    } catch (e) {
      return "";
    }
  }

  static getWebsiteStatuses(websiteWhoIs) {
    try {
      const status = websiteWhoIs.WhoisRecord.registryData.status;
      if (status) {
        const statuses = status
          .split(" ")
          .filter(
            item =>
              item !== "serverDeleteProhibited" &&
              item !== "serverRenewProhibited" &&
              item !== "serverTransferProhibited" &&
              item !== "serverUpdateProhibited" &&
              item !== "clientDeleteProhibited" &&
              item !== "clientRenewProhibited" &&
              item !== "clientTransferProhibited" &&
              item !== "clientUpdateProhibited" &&
              item !== "addPeriod" &&
              item !== "autoRenewPeriod" &&
              item !== "renewPeriod" &&
              item !== "transferPeriod" &&
              item !== "pendingUpdate" &&
              item !== "pendingTransfer"
          );
        let res = "";
        if (statuses.length === 0) return "ok";
        for (let i = 0; i < statuses.length; i++) {
          switch (statuses[i]) {
            case "inactive":
              res += "inactive, ";
              break;
            case "ok":
              res += "ok, ";
              break;
            case "pendingCreate":
              res += "pendingCreate, ";
              break;
            case "pendingDelete":
              res += "pendingDelete, ";
              break;
            case "pendingRenew":
              res += "pendingRenew, ";
              break;
            case "pendingRestore":
              res += "pendingRestore, ";
              break;
            case "redemptionPeriod":
              res += "redemptionPeriod, ";
              break;
            case "serverHold":
              res += "serverHold, ";
              break;
            case "clientHold":
              res += "clientHold, ";
              break;
          }
        }
        if (res.length > 0) return res.substr(0, res.length - 2);
        else return "";
      } else return "";
    } catch (e) {
      return "";
    }
  }
  static getWebsiteStatus(websiteStatuses) {
    const statuses = websiteStatuses.split(", ");
    for (let i = 0; i < statuses.length; i++) {
      switch (statuses[i]) {
        case "inactive":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The domain name cannot be used because the name servers haven't been entered or there is a problem with the name servers"
          };
        case "ok":
          return {
            websiteStatus: "Good",
            websiteStatusMsg:
              "The domain name is active and can be used for websites, email, or to register name servers"
          };
        case "pendingCreate":
          return {
            websiteStatus: "Good",
            websiteStatusMsg:
              "Request to create domain has been received and is being processed"
          };
        case "pendingDelete":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The domain expired and is no longer available for redemption. The registry is about to erase it. A domain name remains in this status for five days before it is deleted"
          };
        case "pendingRenew":
          return {
            websiteStatus: "Good",
            websiteStatusMsg:
              "Request to renew your domain has been received and is being processed"
          };
        case "pendingRestore":
          return {
            websiteStatus: "Good",
            websiteStatusMsg:
              "A domain name that had expired is being restored to ACTIVE status"
          };
        case "redemptionPeriod":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The domain name expired, and the registry is waiting for 30 days as a precautionary measure before releasing it"
          };
        case "serverHold":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The registry placed the domain name on hold, and it cannot be used"
          };
        case "clientHold":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The registrar placed the domain name on hold, and it cannot be used"
          };
      }
    }
    return { websiteStatus: "", websiteStatusMsg: "" };
  }
  static getGlobalRank(websiteSimilarWeb) {
    if (websiteSimilarWeb.global_rank) {
      const rankYear = websiteSimilarWeb.global_rank[0].date.substr(0, 4);
      const beforeRank = websiteSimilarWeb.global_rank[0].global_rank;
      let rankMsg = "",
        rankIcon = null;
      let rank =
        websiteSimilarWeb.global_rank[websiteSimilarWeb.global_rank.length - 1]
          .global_rank;
      if (rank > beforeRank) {
        const changeRate = ((rank - beforeRank) * 100) / beforeRank;
        rankMsg = `The website rank increased by ${changeRate.toFixed(
          0
        )}% during the last quarter of ${rankYear}`;
        rankIcon = Utils.getIconByNumber(2);
      }
      if (beforeRank > rank) {
        const changeRate = ((beforeRank - rank) * 100) / rank;
        rankMsg = `The website rank decreased by ${changeRate.toFixed(
          0
        )}% during the last quarter of ${rankYear}`;
        rankIcon = Utils.getIconByNumber(3);
      }
      return {
        globalRank: new Intl.NumberFormat("en").format(rank),
        rankMsgType: rankIcon,
        rankMsg
      };
    } else return { globalRank: null, rankMsgType: null, rankMsg: "" };
  }
}

export default WebsiteUtils;
