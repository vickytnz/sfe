const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line



router.all('/country-router', function(req, res, next){


var country = req.session.data['country'] // grabs variable


console.log("country is " + country);

if (country) {

  if ((country.indexOf('sfe') == -1) && (country.indexOf('sfw') == -1) ){ // simple redirects

if ((country.indexOf('saas') != -1) &&  (country.indexOf('sfni') != -1) ) {
  req.session.data['plans'] = ["plan-1" , "plan-4"];
  return res.redirect('plan-router');
}
else if  (country.indexOf('sfni') != -1)  {
    req.session.data['plans'] = ["plan-1"] ;
    return res.redirect('plan-router');
}
else if  (country.indexOf('saas') != -1)  {
    req.session.data['plans'] = ["plan-4" ];
    return res.redirect('plan-router');
}
else {
  return res.redirect('country');
}} // end ni or saas only

if (country.indexOf('saas') != -1){
req.session.data['saas'] = "plan-4";

}

if (country.indexOf('sfni') != -1)  {
  req.session.data['sfni'] = 'plan-1';

}
  if (country.indexOf('sfe') != -1){
  return res.redirect('plans-sfe');
} else if (country.indexOf('sfw') != -1){
  return res.redirect('plans-sfw');

} else {
  res.redirect('country');
}

} else {
  res.redirect('country');
}


/*
} */
  next();
  });

router.all('/plan-router', function(req, res, next){
// clear all the things

console.log("plan router");

req.session.data['undergraduate-loan-separate'] = '';
delete req.session.data['undergraduate-loan-separate'];

req.session.data['postgraduate-loan-separate'] = '';
delete req.session.data['postgraduate-loan-separate'];

var jobTimePeriod = req.session.data['job-time-period'];

var planArray = [];

if (req.session.data['plans']) {
  console.log('existing plans');
   planArray = req.session.data['plans'];
} else {
  req.session.data['plans'] = [];
  planArray = req.session.data['plans'];
}

if (req.session.data['saas']) {
  planArray.push('plan-4');
  console.log("plans are " + planArray);
}

if (req.session.data['sfni'] && planArray.indexOf('plan-1') == -1 ) { // fudge as pgni is all plan 1
  planArray.push('plan-1');
}

if (req.session.data['plan-sfw']){
  if (req.session.data['plan-sfw'].indexOf('plan-1') >= 0 && planArray.indexOf('plan-1') == -1 ) {
    planArray.push('plan-1');
  }
  if (req.session.data['plan-sfw'].indexOf('plan-2') >= 0 && planArray.indexOf('plan-2') == -1 ) {
    planArray.push('plan-2');
  }
}


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
req.session.data['ugPlanNames'] = [];
for (i=0; i<planArray.length; i++){
var temp = planArray[i];
req.session.data['ugPlanNames'].push(temp);
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

req.session.data['plans']  = planArray;



res.redirect('results');

})


router.all('/results-router', function(req, res, next){
  var tempTheme  = "";
  if (req.session.data['theme']){
    tempTheme = req.session.data['theme'];
  }

 delete req.session.data; // clear all data
 console.log('deleted');

 return res.redirect('index?theme=' + tempTheme);
})

module.exports = router
