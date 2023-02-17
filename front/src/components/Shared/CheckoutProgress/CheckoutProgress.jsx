import "./CheckoutProgress.scss";

function CheckoutProgress({ steps, activeStep }) {
  const { logon, placeOrder, payment, success } = steps;

  return (
    <div className="checkoutprogress">
      <div className="checkoutprogress__item">
        <div
          className={`checkoutprogress__item__circle-container 
          ${logon && "checkoutprogress__item__circle-container--activated"}
          ${
            activeStep === "logon" &&
            "checkoutprogress__item__circle-container--current"
          }
          `}
        >
          <span
            className={`checkoutprogress__item__circle-container__circle 
          ${
            logon &&
            "checkoutprogress__item__circle-container__circle--activated"
          }
          ${
            activeStep === "logon" &&
            "checkoutprogress__item__circle-container__circle--current"
          }
          `}
          >
            1
          </span>
        </div>
        <p
          className={`checkoutprogress__item__circle-container__step-name 
          ${
            logon &&
            "checkoutprogress__item__circle-container__step-name--activated"
          }
          ${
            activeStep === "logon" &&
            "checkoutprogress__item__circle-container__step-name--current"
          }
          `}
        >
          Se connecter
        </p>
      </div>

      <div className="checkoutprogress__item">
        <div
          className={`checkoutprogress__item__circle-container 
          ${placeOrder && "checkoutprogress__item__circle-container--activated"}
          ${
            activeStep === "placeOrder" &&
            "checkoutprogress__item__circle-container--current"
          }
          `}
        >
          <span
            className={`checkoutprogress__item__circle-container__circle 
          ${
            placeOrder &&
            "checkoutprogress__item__circle-container__circle--activated"
          }
          ${
            activeStep === "placeOrder" &&
            "checkoutprogress__item__circle-container__circle--current"
          }
          `}
          >
            2
          </span>
        </div>
        <p
          className={`checkoutprogress__item__circle-container__step-name 
          ${
            placeOrder &&
            "checkoutprogress__item__circle-container__step-name--activated"
          }
          ${
            activeStep === "placeOrder" &&
            "checkoutprogress__item__circle-container__step-name--current"
          }
          `}
        >
          Livraison
        </p>
      </div>

      <div className="checkoutprogress__item">
        <div
          className={`checkoutprogress__item__circle-container 
          ${payment && "checkoutprogress__item__circle-container--activated"}
          ${
            activeStep === "payment" &&
            "checkoutprogress__item__circle-container--current"
          }
          `}
        >
          <span
            className={`checkoutprogress__item__circle-container__circle 
          ${
            payment &&
            "checkoutprogress__item__circle-container__circle--activated"
          }
          ${
            activeStep === "payment" &&
            "checkoutprogress__item__circle-container__circle--current"
          }
          `}
          >
            3
          </span>
        </div>
        <p
          className={`checkoutprogress__item__circle-container__step-name 
          ${
            payment &&
            "checkoutprogress__item__circle-container__step-name--activated"
          }
          ${
            activeStep === "payment" &&
            "checkoutprogress__item__circle-container__step-name--current"
          }
          `}
        >
          Paiement
        </p>
      </div>

      <div className="checkoutprogress__item">
        <div
          className={`checkoutprogress__item__circle-container 
          ${success && "checkoutprogress__item__circle-container--activated"}
          ${
            activeStep === "success" &&
            "checkoutprogress__item__circle-container--current"
          }
          `}
        >
          <span
            className={`checkoutprogress__item__circle-container__circle 
          ${
            success &&
            "checkoutprogress__item__circle-container__circle--activated"
          }
          ${
            activeStep === "success" &&
            "checkoutprogress__item__circle-container__circle--current"
          }
          `}
          >
            4
          </span>
        </div>
        <p
          className={`checkoutprogress__item__circle-container__step-name 
          ${
            success &&
            "checkoutprogress__item__circle-container__step-name--activated"
          }
          ${
            activeStep === "success" &&
            "checkoutprogress__item__circle-container__step-name--current"
          }
          `}
        >
          Confirmation
        </p>
      </div>
    </div>
  );
}

export default CheckoutProgress;
