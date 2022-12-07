import { useEffect, useState } from "react";

import CheckoutProgress from "../Shared/CheckoutProgress/CheckoutProgress";
import Logon from "./Logon/Logon";
import PlaceOrder from "./PlaceOrder/PlaceOrder";
import Payment from "./Payment/Payment";
import Success from "./Success/Success";

const initialSteps = {
  logon: false,
  placeOrder: false,
  payment: false,
  success: false,
};

function Checkout() {
  const [activeStep, setActiveStep] = useState("logon");
  const [steps, setSteps] = useState(initialSteps);

  return (
    <>
      <CheckoutProgress steps={steps} activeStep={activeStep} />

      {activeStep === "logon" && (
        <Logon setSteps={setSteps} setActiveStep={setActiveStep} />
      )}
      {activeStep === "placeOrder" && (
        <PlaceOrder setSteps={setSteps} setActiveStep={setActiveStep} />
      )}
      {activeStep === "payment" && (
        <Payment setSteps={setSteps} setActiveStep={setActiveStep} />
      )}
      {activeStep === "success" && (
        <Success setSteps={setSteps} setActiveStep={setActiveStep} />
      )}
    </>
  );
}

export default Checkout;
