import Ember from 'ember';
import DS from 'ember-data';
import Validator from 'npm:validator';

export default Ember.Component.extend({
  errors: DS.Errors.create(),
  /*Computed property*/
  titleString: Ember.computed('detailObj', function() {
    var def = _.find(['hi', 'hello'], function(obj) {
      return obj == 'hello';
    });
    console.log(Validator.contains("This is beginning of validation exercise", "obj"));
    return this.get('detailObj.title') + def;
  }),

  /*Title validation*/
  watchTitle: Ember.observer('detailObj.title', function() {
    var detail = this.get('detailObj.title');
    if(this.get('errors').has('title'))
      this.get('errors').remove('title');

    if(Validator.contains(detail, ".")) {
      this.get('errors').add('title', 'Unexpected title');
      console.log(this.get('errors.title'));
    }
  }),

  /*Phone number validation*/
  watchPhone: function() {
    if(this.get('errors').has('phone'))
      this.get('errors').remove('phone');

    if(!Validator.isNumeric(this.get('detailObj.phone'), 'en-US')) {
      this.get('errors').add('phone', 'Phone number does not exist... Please try again');
    }
    console.log("Email id: " + this.get('detailObj.phone'));
  }.observes('detailObj.phone'),

  actions: {
    test() {
      var check = "Hello", detail = this.get('detailObj');
      console.log(this.get('titleString'));
      //alert("test method called" + detail);
      console.log('test method called' + detail);
      console.log(this.get('errors.title'));
    },
    validateEmail() {
      var emailRegex = /^[a-zA-Z0-9!#$%&\'*+\\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var simpleEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if(this.get('errors').has('email'))
        this.get('errors').remove('email');

      if(Validator.isNull('detailObj.email'))
        this.get('errors').add('email', 'value is null');
      if(Validator.isFullWidth('detailObj.email'))
        this.get('errors').add('email', 'value is empty');
      if(!Validator.matches(this.get('detailObj.email'), simpleEmail))
        this.get('errors').add('email', 'Invalid Email id... Please re-enter a correct value');

      console.log("ACTION validate Email");
      console.log(Validator.matches(this.get('detailObj.email'), regex));
    },
    validateUrl() {
      if(this.get('errors').has('url'))
        this.get('errors').remove('url');

      var regex = /^(https?:\/\/)?([\da-zA-Z\.-_]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      url = this.get('detailObj.url');
      if(!Validator.matches(url, regex)) {
        this.get('errors').add('url', 'Invalid url... Please correct and try again.');
        console.log("Regex validator called");
      }
    }
  }

});
