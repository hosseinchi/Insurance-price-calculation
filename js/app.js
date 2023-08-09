// variables
const year = document.querySelector("#year"),
  insuranceFrom = new InsuranceFrom(),
  formOfInsurance = document.querySelector("#request-quote");

// eventListeners
eventListeners();
function eventListeners() {
  // get year and make options for 20 years age when DOM loaded
  document.addEventListener("DOMContentLoaded", () => {
    insuranceFrom.getNowYear();
  });
  // calculating the price or displaying error
  formOfInsurance.addEventListener("submit", (e) => {
    e.preventDefault();

    const company = document.querySelector("#make").value,
      constructionYear = document.querySelector("#year").value,
      insuranceType = document.querySelector(
        'input[name = "level"]:checked'
      ).value;
    // check the inputs are empty or not
    if (company === "" || constructionYear === "" || insuranceType === "") {
      insuranceFrom.displayError("لطفا همه مقادیر به درستی وارد شود");
    } else {
      const insurance = new Insurance(company, constructionYear, insuranceType);

      // check is there any privios result
      let resultDiv =  document.querySelector('#result div');
      if (resultDiv !== null){
        resultDiv.remove()
      }
      // price according to model
      let priceAccModel = insurance.calcPriceAccModel(insurance);

      // price according to year
      let priceAccYear = insurance.calcPriceAccYear(priceAccModel, insurance);

      // price according to insurance type
      let priceAccType = insurance.calcPriceAccType(priceAccYear, insurance);
      // display the resault of insurance price calculation 
      insurance.showResult(priceAccType, insurance)
    
    }
  });
}


