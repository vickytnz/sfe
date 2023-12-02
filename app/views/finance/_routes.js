const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line


router.all('/subject-router', function(req, res, next){

var subject = req.session.data['subject'] // grabs variable

if (subject) {

  if (subject == "Teacher training") {
    return  res.redirect('qualification-teaching');

} else if (subject == "Dental, medical or healthcare") {
  return  res.redirect('qualification-medical');

} else if (subject == "Architecture") {
  return  res.redirect('qualification-architecture');

} else if (subject == "Social work") {
  return  res.redirect('qualification');

} else if (subject == "Music or dance") {
  return  res.redirect('qualification');


  } else  { //fallback
   return  res.redirect('qualification');
};

} else { //no subject
 return  res.redirect('subject');
}

  next();

});

router.all('/qualification-teaching-router', function(req, res, next){


  var qualification = req.session.data['qualification-teaching'] // grabs variable

  if (qualification) {

    if (qualification == "None of these - show more options") {
      return  res.redirect('qualification');
    } else {
      return res.redirect('results-undergraduate');
    }


} else {

return res.redirect('qualification-teaching');

}

  next();
});

router.all('/qualification-medical-router', function(req, res, next){


  var qualification = req.session.data['qualification-medical'] // grabs variable

  if (qualification) {

    if (qualification == "None of these - show more options") {
      return  res.redirect('qualification');
    } else {
      return res.redirect('results-undergraduate');
    }


} else {

return res.redirect('qualification-medical');

}

  next();
});


router.all('/qualification-architecture-router', function(req, res, next){


  var qualification = req.session.data['qualification-architecture'] // grabs variable

  if (qualification) {

    if (qualification == "None of these - show more options") {
      return  res.redirect('qualification');
    } else {
      return res.redirect('results-undergraduate');
    }


} else {

return res.redirect('qualification-medical');

}

  next();
});


router.all('/qualification-router', function(req, res, next){


var qualification = req.session.data['qualification'] // grabs variable




if (qualification) {


if (qualification == "None of these - view more options")  {
  return res.redirect('qualification-further');

} else if (qualification == "a doctorate" ) {
  return   res.redirect('results-doctorate');
} else if (qualification == "a Masters degree" ) {

  return res.redirect('results-master');

} else { //most options go to results for undergraduate
  return res.redirect('results-undergraduate');
}


}  else { //no qualification
  res.redirect('qualification');
}


/*
} */
  next();
  });


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
