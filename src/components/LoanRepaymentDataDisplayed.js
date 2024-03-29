// React Bootstrap Imports
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// Component Imports
import LoanRepaymentDataAccordion from "./LoanRepaymentDataAccordion";


export default function LoanRepaymentDataDisplayed({
  loanDate,
  loanAmount,
  monthlyRepaymentAmount,
  monthlyInterestRate,
}) {


  //=========== HOLDING ONTO IN CASE NEED TO SWITCH TO A TABLE AND HIDE YEARS ============
  // // onclick handler to toggle rows as hidden/displayed
  // const toggleHidden = (year) => {
  //   const tableRows = document.getElementsByClassName(`tr${year}`);
  //   console.log(tableRows);
  //   for (let i=0; i < tableRows.length; i++) {
  //     if(tableRows[i].hasAttribute("hidden")) {
  //       tableRows[i].removeAttribute("hidden");
  //     } else {
  //       tableRows.setAttribute("hidden", "");
  //     }
  //   }
  // }


  return (
    <>
      <Row className="justify-content-center">
        <Col lg={7}>
          <LoanRepaymentDataAccordion
            loanDate={loanDate}
            loanAmount={loanAmount}
            monthlyRepaymentAmount={monthlyRepaymentAmount}
            monthlyInterestRate={monthlyInterestRate}
          />
        </Col>
      </Row>
    </>
  );
};