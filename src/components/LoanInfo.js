// React Router Imports
import { useSearchParams } from "react-router-dom";
// React Bootstrap Imports
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
// Component Imports
import ResultsSection from "./ResultsSection";
import Footer from "./Footer";



export default function LoanInfo() {

  // Setting the state "searchParams" and initial value for it:
  const [searchParams, setSearchParams] = useSearchParams();


  // Resetting form/user input values (Reset button onClick event):
  const resetHandler = () => setSearchParams();


  // Getting the searchParams to use as value of inputs if exist:
  const loanAmountParam = searchParams.get("loanAmount");
  const annualInterestRateParam = searchParams.get("annualInterestRate");
  const termLengthParam = searchParams.get("termLength");
  const loanDateParam = searchParams.get("loanDate");


  // Getting the user input values (Calculate button onClick event):
  const onFormSubmit = (event) => {
    event.preventDefault();
    const updatedSearchParams = {
      loanDate: event.target.loan_date.value, // loan_date.value is a string of YYYY-MM
      loanAmount: event.target.loan_amount.value,
      annualInterestRate: event.target.annual_interest_rate.value,
      termLength: event.target.term_length.value,
    };
    // Updating the "searchParams" to the user input values:
    setSearchParams(updatedSearchParams);
  };


  // Setting showResults to true or false (to conditionally render the ResultsSection component)
  const showResults =
    loanDateParam &&
    loanAmountParam &&
    annualInterestRateParam &&
    termLengthParam;


    
  return (
    <>
      <Container className="short-screen">

        {/* CARD CONTAINING FORM OF USER INPUTS TO ENTER */}
        <Row className="justify-content-center">
          <Col xs={10} md={8} lg={6} xl={5} xxl={4}>
            <Card bg="light" border="secondary" className="shadow-lg">
              <Card.Header className="text-center short-screen-header">
                <h2>Basic Calculation</h2>
              </Card.Header>
              <Card.Body>
                <Form method="GET" onSubmit={onFormSubmit}>

                  {/* LOAN DATE INPUT */}
                  <Row className="mb-3 justify-content-center">
                    <Col xs={8}>
                      <FormGroup>
                        <FormLabel htmlFor="loan_date">Loan Date:</FormLabel>
                        <InputGroup>
                          <FormControl
                            aria-label="Date"
                            type="month"
                            id="loan_date"
                            required
                            defaultValue={loanDateParam ? loanDateParam : ""}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* LOAN AMOUNT INPUT */}
                  <Row className="mb-3 justify-content-center">
                    <Col xs={8}>
                      <FormGroup>
                        <FormLabel htmlFor="loan_amount">
                          Loan Amount:
                        </FormLabel>
                        <InputGroup>
                          <InputGroup.Text>$</InputGroup.Text>
                          <FormControl
                            aria-label="Amount (whole numbers only)"
                            type="number"
                            id="loan_amount"
                            onKeyDown={(e) =>
                              ["e", "E", "+", "-", "."].includes(e.key) &&
                              e.preventDefault()
                            }
                            min="1"
                            required
                            defaultValue={loanAmountParam ? loanAmountParam : 0}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* ANNUAL INTEREST RATE INPUT */}
                  <Row className="mb-3 justify-content-center">
                    <Col xs={8}>
                      <FormGroup>
                        <FormLabel htmlFor="annual_interest_rate">
                          Annual Interest Rate:
                        </FormLabel>
                        <InputGroup>
                          <FormControl
                            aria-label="Annual Interest Rate (to two decimal places)"
                            type="number"
                            id="annual_interest_rate"
                            onKeyDown={(e) =>
                              ["e", "E", "+", "-"].includes(e.key) &&
                              e.preventDefault()
                            }
                            min="0.01"
                            max="100"
                            step="0.01"
                            required
                            defaultValue={
                              annualInterestRateParam
                                ? annualInterestRateParam
                                : 0
                            }
                          />
                          <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* TERM LENGTH INPUT */}
                  <Row className="mb-4 justify-content-center">
                    <Col xs={8}>
                      <Form.Group>
                        <Form.Label htmlFor="term_length">
                          Term Length:
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            id="term_length"
                            name="term_length"
                            onKeyDown={(e) =>
                              ["e", "E", "+", "-", "."].includes(e.key) &&
                              e.preventDefault()
                            }
                            placeholder="# of"
                            min="1"
                            required
                            defaultValue={termLengthParam ? termLengthParam : 0}
                          />
                          <InputGroup.Text>Years</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* RESET BUTTON */}
                  <Row>
                    <Col className="text-center">
                      <Button
                        type="reset"
                        variant="outline-secondary"
                        className="m-2"
                        onClick={resetHandler}
                      >
                        Reset
                      </Button>

                      {/* SUBMIT BUTTON */}
                      <Button type="submit" variant="secondary" className="m-2">
                        Calculate
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* SHOW RESULTS SECTION IF USER SUBMITTED INPUT VALUES */}
        <Row>
          <Col>
            {showResults && (
              <ResultsSection
                loanDate={loanDateParam}
                loanAmount={loanAmountParam}
                annualInterestRate={annualInterestRateParam}
                termLength={termLengthParam}
              />
            )}
          </Col>
        </Row>
      </Container>

      {/* FOOTER COMPONENT SHOWN AS FIXED/NOT IF USER SUBMITTED INPUT VALUES */}
      {showResults ? <Footer /> : <Footer addClass="fixed-bottom" />}
    </>
  );
}