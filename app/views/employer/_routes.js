const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line



router.all('/country-router', function(req, res, next){


var country = req.session.data['country'] // grabs variable
/*
if(!country){
  res.redirect('country'); // bounce back to page as stuff won't work otherwise
}
else { */

/*
  if (country.indexOf('saas') >= 0 ){
    req.session.data['plan'] = ["plan-4"]; // all scottish loans are plan 4
    console.log("scotland" + req.session.data['plan'] )
  }
  if (country.indexOf('sfni') >= 0 ){
    req.session.data['plan'] = ["plan-1"]; // all NI loans are plan 4
  } */

  if (country.indexOf('sfe') >= 0){
  res.redirect('plans-sfe');
} else if (country.indexOf('sfw') >= 0){
  res.redirect('plans-sfw');

} else {
  res.redirect('wages-or-salary-choose');
}


/*
} */
  next();
  });

router.all('/wages-or-salary-router', function(req, res, next){
// clear all the things

req.session.data['undergraduate-loan-separate'] = '';
delete req.session.data['undergraduate-loan-separate'];

req.session.data['postgraduate-loan-separate'] = '';
delete req.session.data['postgraduate-loan-separate'];

var jobTimePeriod = req.session.data['job-time-period'];

var planArray = req.session.data['plan'];

if (planArray.indexOf('postgraduate-loan') >= 0){

req.session.data['postgraduate-loan-separate'] = true;
  var index = planArray.indexOf('postgraduate-loan');
    planArray.splice(index, 1); // 2nd parameter means remove one item only
} else {
  req.session.data['postgraduate-loan-separate'] = '';
  delete req.session.data['postgraduate-loan-separate'];

}

console.log("array is " + planArray);

if (planArray.length > 0) {
req.session.data['undergraduate-loan-separate'] = true;
req.session.data['lowestThreshold'] = 1000000000; // ridic high threshold
req.session.data['ugPlans'] = planArray.length;
for (i=0; i<planArray.length; i++){
var temp = planArray[i];
  if (req.session.data[temp]['threshold'][jobTimePeriod] < req.session.data['lowestThreshold']){
    req.session.data['lowestThreshold'] = req.session.data[temp]['threshold'][jobTimePeriod];
    req.session.data['lowestThresholdPlan'] = temp;
  }
}

} else {
  //no undergrad options
req.session.data['undergraduate-loan-separate'] = '';
delete req.session.data['undergraduate-loan-separate'];

}

res.redirect('results');

})


module.exports = router
