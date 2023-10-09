const error = document.querySelectorAll('.invalid');
const label = document.querySelectorAll('label');
const border = document.querySelectorAll('input');
const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const displayYear = document.querySelector('#displayYear');
const displayMonths = document.querySelector('#displayMonths');
const displayDays = document.querySelector('#displayDays');

// get the current date
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Adding 1 because months are 0-indexed

// Add an event listener to each input field
day.addEventListener('input', calculateAge);
month.addEventListener('input', calculateAge);
year.addEventListener('input', calculateAge);

// Function to calculate age
function calculateAge() {
    const inputYear = parseInt(year.value);
    const inputMonth = parseInt(month.value);
    const inputDay = parseInt(day.value);

    if (isValidDate(inputYear, inputMonth, inputDay)) {
        const birthDate = new Date(inputYear, inputMonth - 1, inputDay); // Month is 0-indexed (0-11)
        const ageInMilliseconds = currentDate - birthDate;

        const years = Math.floor(ageInMilliseconds / (365 * 24 * 60 * 60 * 1000));
        const months = Math.floor((ageInMilliseconds % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
        const days = Math.floor((ageInMilliseconds % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));

        displayYear.textContent = years;
        displayMonths.textContent = months;
        displayDays.textContent = days;

        error.forEach(function (item) {
            item.classList.remove('active');
        });
        label.forEach(function (item) {
            item.classList.remove('active');
        });
        border.forEach(function (item) {
            item.classList.remove('active');
        });
    } 
    else {  
        displayYear.textContent = '--' ;
        displayMonths.textContent = '--';
        displayDays.textContent = '--';

     
         // Show error messages for incorrect input
   if (inputYear < 0 || inputYear > 2023) {
            error[2].textContent = 'Must be in the past';
            error[2].classList.add('active');
        } else {
            error[2].classList.remove('active');
        }

        if (inputMonth < 1 || inputMonth > 12) {
            error[1].textContent= 'Must be a valid month';
            error[1].classList.add('active');
        } else {
            error[1].classList.remove('active');
        }

        const maxDaysInMonth = new Date(inputYear, inputMonth, 0).getDate();
        if (inputDay < 1 || inputDay > maxDaysInMonth) {
            error[0].textContent = 'Must be in valid date';
            error[0].classList.add('active');
        } else {
            error[0].classList.remove('active');
        }

        // error.forEach(function (item) {
        //     item.classList.add('active');
        // });
        label.forEach(function (item) {
            item.classList.add('active');
        });
        border.forEach(function (item) {
            item.classList.add('active');
        });
    }  
      
}

function isValidDate(year, month, day) {
    const maxDaysInMonth = new Date(year, month, 0).getDate();
    return year >= 0 && year <= 2023 && month >= 1 && month <= 12 && day >= 1 && day <= maxDaysInMonth;
}

// Set the current year in the input field
year.value = currentYear;

// Set the current month in the input field (with leading zero)
month.value = currentMonth.toString().padStart(2, '0');

// Set the current day in the input field (with leading zero)
day.value = currentDate.getDate().toString().padStart(2, '0');

