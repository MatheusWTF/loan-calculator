//Listen for Submit
document.querySelector('#loan-form').addEventListener('submit', calculateResults);

//Calculate Results
function calculateResults(e){
  e.preventDefault();

  //UI Vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
  }else{
    showError('Please check if everything has been Filled.');
  }
}

//Show Error
function showError(error){
  //Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Create Alert
  const errorDiv = document.createElement('div');
  //add class
  errorDiv.className = 'alert alert-danger';
  //Create text node and Append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert new Element
  card.insertBefore(errorDiv, heading);

  //Clear Error
  setTimeout(clearError, 3000);
}

//ClearError function
function clearError(){
  document.querySelector('.alert').remove();
}