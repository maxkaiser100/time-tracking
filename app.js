fetch('data.json')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    globalData = data;
})
.catch(function (err) {
    console.log('error: ' + err);
}); 


const timeChoose = document.querySelectorAll('li');
const previousPer = document.querySelectorAll('.previousPer')
let sections = document.getElementsByTagName('section');
let globalTime = '';
let globalData = '';

//Responds to the click of the timeframe buttons
timeChoose.forEach(time => {
  
  time.addEventListener('click', e => {
    globalTime = time.innerHTML;

    //Colors the active text button and decolors the non-actives
    e.target.style.color = "white";
    time.nextElementSibling.style.color = "#6F76C8";
    time.previousElementSibling.style.color = "#6F76C8";
   
    //Updates the work numbers 
    for (let i = 0; i < 6; i++) {
          var currentWorkHrs = sections[i].querySelector('.workHrs');
          currentWorkHrs.innerHTML = globalData[i].timeframes[globalTime.toLowerCase()].current + 'hrs';
          var previousHrs = sections[i].querySelector('.workPrev');
          previousHrs.innerHTML = '&nbsp;' + globalData[i].timeframes[globalTime.toLowerCase()].previous;
    }

    //Changes the prefix text for the previous hours
    if(time.innerHTML === 'Daily') {
      previousPer.forEach(text => {
        text.innerText = 'Yesterday - ';       
      });
    };
    if(time.innerHTML === 'Weekly') {
      previousPer.forEach(text => {
        text.innerText = 'Last Week - ';
    });
    }
    if(time.innerHTML === 'Monthly') {
      previousPer.forEach(text => {
        text.innerText = 'Last Month - ';
      });
    }  
  });
});


