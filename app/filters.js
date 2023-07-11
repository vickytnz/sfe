const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter


addFilter('thousands', function (content) {
      var thousands = content.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return thousands;
  })

addFilter('pound', function (content) {
  return "£" +  content
})
