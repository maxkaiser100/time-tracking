const timeChoose = document.querySelectorAll('.timeSelect li');
const previousPer = document.querySelectorAll('.previousPer')
let sections = document.getElementsByTagName('section');

fetch('data.json')
.then(function (response) {
  return response.json();
})
.catch(function (err) {
  console.log('error: ' + err);
})
.then(function (data) {
  // Responds to the click of the timeframe buttons
  timeChoose.forEach(element => {
    element.classList.remove('active');

    element.addEventListener('click', function() {
      timeChoose.forEach(item => {
        item.classList.remove('active');
      });

      element.classList.add('active');
      let globalTime = element.innerHTML;

      // Updates the work numbers
      for (let i = 0; i < data.length; i++) {
        let currentWorkHrs = sections[i].querySelector('.workHrs');
        let previousHrs = sections[i].querySelector('.workPrev');
        currentWorkHrs.innerHTML = data[i].timeframes[globalTime.toLowerCase()].current + 'hrs';
        previousHrs.innerHTML = '&nbsp;' + data[i].timeframes[globalTime.toLowerCase()].previous + 'hrs';
      }

      // Changes the prefix text for the previous hours
      previousPer.forEach(text => {
        if(element.innerHTML === 'Daily') {
            text.innerText = 'Yesterday - ';
        } else if(element.innerHTML === 'Weekly') {
            text.innerText = 'Last Week - ';
        } else if(element.innerHTML === 'Monthly') {
            text.innerText = 'Last Month - ';
        }
      });
    });
  });
});

window.onload = function() {
  timeChoose[0].click();
};
