import React from "react";
import { storiesOf } from "@storybook/react";
import CompanyScore from "../src/Components/CompanyScore";
import RecommendCredit from "../src/Components/RecommendCredit";
import TopInsights from "../src/Components/TopInsights";
import PieChartWrapper from "../src/Components/PieChartWrapper";
import Industry from "../src/Components/Industry";
import TopProducts from "../src/Components/TopProducts";
import TotalExports from "../src/Components/TotalExports";
import TopCountries from "../src/Components/TopCountries";
import RegistrationDetails from "../src/Components/RegistrationDetails";
import SocialMedia from "../src/Components/SocialMedia";
import Certifications from "../src/Components/Certifications";
import Media from "../src/Components/Media";
import InfoCard from "../src/Components/InfoCard";
import TwoInfoCard from "../src/Components/TwoInfoCard";
import PublicFinancial from "../src/Components/PublicFinancial";
import PublicFinancialRatio from "../src/Components/PublicFinancialRatio";
import MoreDataCourtCases from "../src/Components/MoreDataCourtCases";
import MoreDataEmployees from "../src/Components/MoreDataEmployees";
import MoreDataAdministrativePunishment from "../src/Components/MoreDataAdministrativePunishment";
import MoreDataBranchesInvestments from "../src/Components/MoreDataBranchesInvestments";
import MoreDataMortgagePledge from "../src/Components/MoreDataMortgagePledge";
import MoreDataPatents from "../src/Components/MoreDataPatents";
import reportData from "./MockData/reportData";
import "../src/Components/css/fonts.css";
import "../src/Components/css/tooltip.css";
import Utils from "../src/Components/js/Utils";
import CompanyChanges from "../src/Components/CompanyChanges";
import WebsiteChanges from "../src/Components/WebsiteChanges";
import WebsiteDetails from "../src/Components/WebsiteDetails";
import BalanceSheet from "../src/Components/BalanceSheet";
import CashFlow from "../src/Components/CashFlow";
import IncomeStatement from "../src/Components/IncomeStatement";
import CorporationMap from "../src/Components/CorporationMap";
import MoreDataPenaltyBusinessExceptions from "../src/Components/MoreDataPenaltyBusinessExceptions";
import MoreDataTrademarks from "../src/Components/MoreDataTrademarks";
import MoreDataDishonestLawEnforcement from "../src/Components/MoreDataDishonestLawEnforcement";
import MoreDataJudicialSalesSeriousViolation from "../src/Components/MoreDataJudicialSalesSeriousViolation";
import Loader from "../src/Components/LowLevelComponents/Loader";

const investmentsList =
  reportData.foreignInvestmentList != null &&
  reportData.foreignInvestmentList !== undefined
    ? reportData.foreignInvestmentList.map(investment => ({
        name: investment.name,
        icon: "branch"
      }))
    : [];

const branchesList =
  reportData.branchesData != null && reportData.branchesData !== undefined
    ? reportData.branchesData.branches.map(branch => ({
        name: branch.name,
        icon: "branch"
      }))
    : [];

storiesOf("Components", module)
  .add("Company Score", () => (
    <div>
      <CompanyScore width={window.innerWidth} report={reportData} />
      <CompanyScore width={window.innerWidth} report={reportData} blur={true} />
    </div>
  ))

  .add("Recommend Credit", () => (
    <RecommendCredit width={window.innerWidth} report={reportData} />
  ))
  .add("Top Insights", () => (
    <div>
      <TopInsights
        width={window.innerWidth}
        category={"Overview"}
        data={reportData.insights}
      />
      <TopInsights
        width={window.innerWidth}
        category={"Overview"}
        data={reportData.insights}
        blur={1}
      />
      <TopInsights
        width={window.innerWidth}
        category={"Overview"}
        data={reportData.insights}
        blur={0}
      />
    </div>
  ))
  .add("Balance Sheet", () => (
    <BalanceSheet
      width={window.innerWidth}
      date={"Jan 2017 - Dec 2017"}
      listedData={reportData.listedData}
    />
  ))
  .add("Cash Flow", () => (
    <CashFlow
      width={window.innerWidth}
      date={"Jan 2017 - Dec 2017"}
      listedData={reportData.listedData}
    />
  ))
  .add("Income Statement", () => (
    <IncomeStatement
      width={window.innerWidth}
      date={"Jan 2017 - Dec 2017"}
      listedData={reportData.listedData}
    />
  ))
  .add("Corporation Graph", () => (
    <CorporationMap
      width={window.innerWidth}
      corporateMap={reportData.corporateMap}
      supplier={reportData.corporateMap.nodes.find(
        item => item.properties.name === reportData.originalName
      )}
      subsidiaries={reportData.foreignInvestmentList}
      branches={reportData.branchesData}
    />
  ))
  .add("Shareholders", () => (
    <PieChartWrapper
      width={window.innerWidth}
      infoText={"The company current shareholder."}
      title={"Shareholders"}
      data={reportData.shareholders}
      bottomIcon={2}
      bottomMsg={
        "this supplier his good shareholder and not good dasvsdfd asddffdvsda fgasdfasdfdv savsdvsad dfsavsdvdswf"
      }
      dataKey={"percent"}
      corporateMap={reportData.corporateMap}
      chineseName={reportData.originalName}
    />
  ))
  .add("Industry", () => (
    <Industry width={window.innerWidth} report={reportData} />
  ))
  .add("Website Changes", () => (
    <WebsiteChanges
      width={window.innerWidth}
      websiteChanges={reportData.websiteArchive.latestChanges}
    />
  ))
  .add("Top Products", () => (
    <div>
      <TopProducts width={window.innerWidth} report={reportData} />
      <TopProducts width={window.innerWidth} report={reportData} blur={true} />
    </div>
  ))
  .add("Total Exports", () => (
    <div>
      <TotalExports width={window.innerWidth} report={reportData} />
      <TotalExports width={window.innerWidth} report={reportData} blur={true} />
    </div>
  ))
  .add("Top Countries", () => (
    <div>
      <TopCountries width={window.innerWidth} report={reportData} />
      <TopCountries width={window.innerWidth} report={reportData} blur={1} />
    </div>
  ))
  .add("Registration Details", () => (
    <RegistrationDetails width={window.innerWidth} report={reportData} />
  ))
  .add("Company Changes", () => (
    <div>
      <CompanyChanges width={window.innerWidth} report={reportData} />
      <CompanyChanges width={window.innerWidth} report={reportData} blur={3} />
    </div>
  ))
  .add("Social Media", () => (
    <SocialMedia width={window.innerWidth} report={reportData} />
  ))
  .add("Certifications", () => (
    <div>
      <Certifications width={window.innerWidth} report={reportData} />
      <Certifications width={window.innerWidth} report={reportData} blur={1} />
    </div>
  ))
  .add("Top Media", () => (
    <div>
      <Media width={window.innerWidth} report={reportData} />
      <Media width={window.innerWidth} report={reportData} blur={2} />
    </div>
  ))
  .add("Public Financial", () => (
    <div>
      <PublicFinancial
        width={window.innerWidth}
        data={reportData.publicFinancial}
        date={"Jan 2017 - Dec 2017"}
        listedData={reportData.listedData}
      />
      <PublicFinancial
        width={window.innerWidth}
        data={{}}
        date={"Jan 2017 - Dec 2017"}
        listedData={reportData.listedData}
      />
    </div>
  ))
  .add("Public Financial Ratio", () => (
    <PublicFinancialRatio
      width={window.innerWidth}
      date={"Jan 2017 - Dec 2017"}
      data={reportData.publicFinancialRatio}
    />
  ))
  .add("Info Card", () => (
    <div>
      <InfoCard
        width={window.innerWidth}
        name={"Total Exports"}
        infoText={
          "The supplier’s total export last year in USD (not including local sales), based on governmental custom data."
        }
        date={""}
        content={Utils.fixNumber("$" + reportData.totalExport.content)}
        bottomIcon={Utils.getIconByNumber(
          reportData.totalExport.totalExportMsgType
        )}
        bottomMsg={reportData.totalExport.totalExportMsg}
      />
      <InfoCard
        width={window.innerWidth}
        name={"Total Exports"}
        infoText={
          "The supplier’s total export last year in USD (not including local sales), based on governmental custom data."
        }
        date={""}
        content={Utils.fixNumber("$" + reportData.totalExport.content)}
        bottomIcon={Utils.getIconByNumber(
          reportData.totalExport.totalExportMsgType
        )}
        bottomMsg={reportData.totalExport.totalExportMsg}
        blur={true}
      />
    </div>
  ))
  .add("Info Card with Date", () => (
    <div>
      <InfoCard
        width={window.innerWidth}
        name={"Total Exports"}
        infoText={
          "The supplier’s total export last year in USD (not including local sales), based on governmental custom data."
        }
        date={reportData.totalExport.date}
        content={Utils.fixNumber("$" + reportData.totalExport.content)}
        bottomIcon={Utils.getIconByNumber(
          reportData.totalExport.totalExportMsgType
        )}
        bottomMsg={reportData.totalExport.totalExportMsg}
      />{" "}
      <InfoCard
        width={window.innerWidth}
        name={"Total Exports"}
        infoText={
          "The supplier’s total export last year in USD (not including local sales), based on governmental custom data."
        }
        date={reportData.totalExport.date}
        content={Utils.fixNumber("$" + reportData.totalExport.content)}
        bottomIcon={Utils.getIconByNumber(
          reportData.totalExport.totalExportMsgType
        )}
        bottomMsg={reportData.totalExport.totalExportMsg}
        blur={true}
      />
    </div>
  ))
  .add("Court Cases", () => (
    <div>
      <TwoInfoCard
        width={window.innerWidth}
        name={"Law court cases in the last 2 years"}
        infoText={
          "A lawsuit which the company involved as plaintiff or defendant."
        }
        content1={reportData.lawCases.content1}
        content1Lbl={reportData.lawCases.content1Lbl}
        content2={reportData.lawCases.content2}
        content2Lbl={reportData.lawCases.content2Lbl}
        bottomIcon={Utils.getIconByNumber(reportData.lawCases.bottomIcon)}
        bottomMsg={reportData.lawCases.bottomMsg}
        moreBtn={true}
        moreTitle={"Court Cases"}
        moreData={<MoreDataCourtCases moreData={reportData.courtCases} />}
      />{" "}
      <TwoInfoCard
        width={window.innerWidth}
        name={"Law court cases in the last 2 years"}
        infoText={
          "A lawsuit which the company involved as plaintiff or defendant."
        }
        content1={reportData.lawCases.content1}
        content1Lbl={reportData.lawCases.content1Lbl}
        content2={reportData.lawCases.content2}
        content2Lbl={reportData.lawCases.content2Lbl}
        bottomIcon={Utils.getIconByNumber(reportData.lawCases.bottomIcon)}
        bottomMsg={reportData.lawCases.bottomMsg}
        moreBtn={true}
        moreTitle={"Court Cases"}
        moreData={<MoreDataCourtCases moreData={reportData.courtCases} />}
        blur={3}
      />
    </div>
  ))
  .add("Administrative Punishment", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Administrative Punishment"}
      infoText={
        "A lawsuit which the company involved as plaintiff or defendant."
      }
      content1={reportData.administrativePunishment.length}
      content1Lbl={"Administrative Punishment"}
      content2={""}
      content2Lbl={""}
      bottomIcon={null}
      bottomMsg={""}
      moreBtn={true}
      moreTitle={"Administrative Punishment"}
      moreData={
        <MoreDataAdministrativePunishment
          moreData={reportData.administrativePunishment}
        />
      }
    />
  ))
  .add("Branches Investments", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Branches Investments"}
      infoText={
        "A lawsuit which the company involved as plaintiff or defendant."
      }
      content1={reportData.foreignInvestmentList.length}
      content1Lbl={"Subsidiaries"}
      content2={reportData.branchesData.branches.length}
      content2Lbl={"Branches"}
      bottomIcon={null}
      bottomMsg={""}
      moreBtn={true}
      moreTitle={"Branches Investments"}
      moreData={
        <MoreDataBranchesInvestments
          width={window.innerWidth}
          addSupplier={() => {}}
          moreData={reportData.foreignInvestmentList}
          moreData2={reportData.branchesData.branches}
          moreSubTitle={"Subsidiaries"}
          moreSubTitle2={"Branches"}
        />
      }
    />
  ))
  .add("Penalty and Business Exceptions", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Penalty & Business Exceptions"}
      infoText={
        "A lawsuit which the company involved as plaintiff or defendant."
      }
      content1={reportData.penalty.length}
      content1Lbl={"Penalty"}
      content2={reportData.businessExceptions.length}
      content2Lbl={"Business Exceptions"}
      bottomIcon={null}
      bottomMsg={""}
      moreBtn={true}
      moreTitle={"Penalty & Exceptions"}
      moreData={
        <MoreDataPenaltyBusinessExceptions
          moreData={reportData.penalty}
          moreData2={reportData.businessExceptions}
        />
      }
    />
  ))
  .add("Mortgage and Pledge", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Mortgage & Pledge"}
      infoText={
        "A lawsuit which the company involved as plaintiff or defendant."
      }
      content1={50}
      content1Lbl={"Mortgage"}
      content2={50}
      content2Lbl={"Pledge"}
      bottomIcon={null}
      bottomMsg={""}
      moreBtn={true}
      moreTitle={"Mortgage & Pledge"}
      moreData={
        <MoreDataMortgagePledge
          moreData={reportData.mortgage}
          moreData2={reportData.pledge}
        />
      }
    />
  ))
  .add("Two Info Card with single value", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Number of Employees"}
      infoText={
        "Estimated number of employees, usually range. The information gathered from the company reporting or web data."
      }
      date={""}
      content1={reportData.employees.content1}
      content1Lbl={reportData.employees.content1Lbl}
      content2={""}
      content2Lbl={""}
      bottomIcon={Utils.getIconByNumber(reportData.employees.bottomIcon)}
      bottomMsg={reportData.employees.bottomMsg}
    />
  ))
  .add("employees data", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Employees"}
      date={""}
      infoText={"The company employees"}
      content1={"100-200"}
      content1Lbl={"(Web Data)"}
      content2={""}
      content2Lbl={""}
      bottomIcon={null}
      bottomMsg={""}
      moreBtn={true}
      moreTitle={"Employees"}
      moreData={
        reportData.employeesList.length > 0 ||
        reportData.jobsList.length > 0 ? (
          <MoreDataEmployees
            moreData={reportData.employeesList}
            moreData2={reportData.jobsList}
            moreSubTitle={"Employees"}
            moreSubTitle2={"Job "}
          />
        ) : null
      }
    />
  ))
  .add("Patents", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Patents"}
      infoText={"The company subsidiaries and branches"}
      content1={reportData.patents.length}
      content1Lbl={"Patents"}
      content2={""}
      content2Lbl={""}
      bottomIcon={null}
      bottomMsg={""}
      moreBtn={true}
      moreTitle={"Patents List"}
      moreData={<MoreDataPatents moreData={reportData.patents} />}
    />
  ))
  .add("Trademarks", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Trademarks"}
      infoText={"The company subsidiaries and branches"}
      content1={50}
      content1Lbl={"Trademarks"}
      content2={""}
      content2Lbl={""}
      bottomIcon={null}
      bottomMsg={""}
      moreBtn={true}
      moreTitle={"Trademarks List"}
      moreData={<MoreDataTrademarks moreData={reportData.trademarks} />}
    />
  ))
  .add("judicial sales seroius violation", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Judicial serious"}
      infoText={"The company subsidiaries and branches"}
      content1={reportData.judicialSalesList.length}
      content1Lbl={"judicial"}
      content2={reportData.seriousViolationsList.length}
      content2Lbl={"serious"}
      bottomIcon={null}
      bottomMsg={""}
      moreBtn={true}
      moreTitle={"judicial / serious List"}
      moreData={
        <MoreDataJudicialSalesSeriousViolation
          moreData={reportData.judicialSalesList}
          moreData2={reportData.seriousViolationsList}
        />
      }
    />
  ))
  .add("Dishonest law enforcement", () => (
    <div>
      <TwoInfoCard
        width={window.innerWidth}
        name={"Dishonest"}
        infoText={"The company subsidiaries and branches"}
        content1={reportData.dishonest.length}
        content1Lbl={"Dishonest"}
        content2={reportData.lawEnforcement.length}
        content2Lbl={"law enforcement"}
        bottomIcon={null}
        bottomMsg={""}
        moreBtn={true}
        moreTitle={"Dishonest / Enforcement List"}
        moreData={
          <MoreDataDishonestLawEnforcement
            moreData={reportData.dishonest}
            moreData2={reportData.lawEnforcement}
          />
        }
      />
      <TwoInfoCard
        width={window.innerWidth}
        name={"Dishonest"}
        infoText={"The company subsidiaries and branches"}
        content1={reportData.dishonest.length}
        content1Lbl={"Dishonest"}
        content2={reportData.lawEnforcement.length}
        content2Lbl={"law enforcement"}
        bottomIcon={null}
        bottomMsg={""}
        moreBtn={true}
        moreTitle={"Dishonest / Enforcement List"}
        moreData={
          <MoreDataDishonestLawEnforcement
            moreData={reportData.dishonest}
            moreData2={reportData.lawEnforcement}
          />
        }
        blur={1}
      />
      <TwoInfoCard
        width={window.innerWidth}
        name={"Dishonest"}
        infoText={"The company subsidiaries and branches"}
        content1={reportData.dishonest.length}
        content1Lbl={"Dishonest"}
        content2={reportData.lawEnforcement.length}
        content2Lbl={"law enforcement"}
        bottomIcon={null}
        bottomMsg={""}
        moreBtn={true}
        moreTitle={"Dishonest / Enforcement List"}
        moreData={
          <MoreDataDishonestLawEnforcement
            moreData={reportData.dishonest}
            moreData2={reportData.lawEnforcement}
          />
        }
        blur={2}
      />
      <TwoInfoCard
        width={window.innerWidth}
        name={"Dishonest"}
        infoText={"The company subsidiaries and branches"}
        content1={reportData.dishonest.length}
        content1Lbl={"Dishonest"}
        content2={reportData.lawEnforcement.length}
        content2Lbl={"law enforcement"}
        bottomIcon={null}
        bottomMsg={""}
        moreBtn={true}
        moreTitle={"Dishonest / Enforcement List"}
        moreData={
          <MoreDataDishonestLawEnforcement
            moreData={reportData.dishonest}
            moreData2={reportData.lawEnforcement}
          />
        }
        blur={3}
      />
    </div>
  ))
  .add("Law Enforcement example", () => (
    <div>
      <TwoInfoCard
        width={window.innerWidth}
        name={"law enforcement"}
        date={""}
        infoText={"The company subsidiaries and branches"}
        content1={reportData.lawEnforcement.length}
        content1Lbl={"law enforcement"}
        content2Lbl={""}
        bottomIcon={Utils.getIconByNumber(4)}
        bottomMsg={"some text message"}
        moreBtn={true}
        moreTitle={"Enforcement List"}
        moreData={null}
      />
      <TwoInfoCard
        width={window.innerWidth}
        name={"law enforcement"}
        date={""}
        infoText={"The company subsidiaries and branches"}
        content1={reportData.lawEnforcement.length}
        content1Lbl={"law enforcement"}
        content2Lbl={""}
        bottomIcon={Utils.getIconByNumber(4)}
        bottomMsg={"some text message"}
        moreBtn={true}
        moreTitle={"Enforcement List"}
        moreData={null}
        blur={1}
      />
    </div>
  ))
  .add("Loader",
  () => (
    <div>
      <Loader size={50} open={true} timeout={2000}/>
    </div>
  ));
