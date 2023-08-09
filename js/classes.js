class InsuranceFrom{}

// get year and make options for 20 years age when DOM loaded
InsuranceFrom.prototype.getNowYear = function () {
  // get persian full year as string and change its type of to number
  const nowYear = new Number(
    new Date().toLocaleDateString("fa-IR-u-nu-latn").split("/")[0]
  );

  const minYear = nowYear - 20;

  // making options for <select> and append last 20 year ago
  for (let i = nowYear; i >= minYear; i--) {
    // make an <option>
    let option = document.createElement("option");
    option.innerHTML = i;
    year.appendChild(option);
  }
};

// displaying error if the fields are empty
InsuranceFrom.prototype.displayError = function (err) {
  // make a tag to show error on it
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error");
  errorDiv.textContent = err;
  // appending error tag to insurance form
  formOfInsurance.insertBefore(errorDiv, document.querySelector(".form-group"));
  // remove the error after 2 secounds
  setTimeout(() => {
    errorDiv.remove();
  }, 2000);
};

// get data of company, construnction year and insurance type for calculating the price of insurance
class Insurance {
  constructor(company, constructionYear, insuranceType){
    this.company = company;
    this.constructionYear = constructionYear;
    this.insuranceType = insuranceType
  }
}

// calculating the price according to model

Insurance.prototype.calcPriceAccModel = function (info) {
  // basic price for insurance
  const basePrice = 2000000;
  const company = info.company;
  let price;

  /* 
    company 1 = pride ==> 1.20
    company 2 = optima ==> 1.45
    company 3 = porsche ==> 1.60
    */

  switch (company) {
    case "1":
      price = basePrice * 1.2;
      break;
    case "2":
      price = basePrice * 1.45;
      break;
    case "3":
      price = basePrice * 1.6;
      break;
  }

  return price;
};

// calculatin price according to year
Insurance.prototype.calcPriceAccYear = function (price, info) {
  // get persian full year as string and change its type of to number
  const nowYear = new Number(
    new Date().toLocaleDateString("fa-IR-u-nu-latn").split("/")[0]
  );

  // selected year by client
  let yearDiffrence = nowYear - info.constructionYear;

  let caculatedPrice = price - yearDiffrence * 0.03 * price;

  return caculatedPrice;
};

// calculating price according to insurance type
Insurance.prototype.calcPriceAccType = function (price, info) {
  const insuranceType = info.insuranceType;

  let caculatedPrice;

  /* 
    basic ==> 1.15
    complete ==> 1.45
    */

  switch (insuranceType) {
    case "basic":
      caculatedPrice = price * 1.15;
      break;
    case "complete":
      caculatedPrice = price * 1.45;
      break;
  }
 
  return caculatedPrice;
};

// display the resault of insurance price calculation 
Insurance.prototype.showResult = function(price, info){
  const result = document.querySelector("#result")
  // make a container to show the resault
  let div = document.createElement('div')

  // check the company name 
  let company = info.company

  /* 1 ==> پراید 
     2 ==> اپتیما
     3 ==> پورشه
*/  
  switch (company) {
    case '1':
      company = 'پراید'
      break;
    case '2':
      company = 'اپتیما'
      break;
    case '3':
      company = 'پورشه'
      break;
  }
  // check the insurance type 
  let insuranceType = info.insuranceType
  switch (insuranceType) {
    case 'basic':
      insuranceType = 'شخص ثالث'
      break;
    case 'complete':
      insuranceType = 'شخص ثالث با بیمه بدنه'
      break;
  }
  // display spinner for 2 secounds
   const spinnerGif = document.querySelector("#loading img")
         spinnerGif.style.display = "block"
    setTimeout(()=>{
      spinnerGif.style.display = "none"
      div.innerHTML = `
      <p class = "header"> خلاصه فاکتور</p>
      <p>مدل : ${company} </p>
      سال ساخت : ${info.constructionYear}</p>
      نوع بیمه : ${insuranceType}</p>
      قیمت نهایی : ${price} تومان</p>`

      result.appendChild(div)
    },2000)
  
}