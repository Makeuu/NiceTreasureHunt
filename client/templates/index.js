import "../../node_modules/w3-css/w3.css";

if (Meteor.isClient) {
    Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            console.log("Form submitted.");
        }
    });
}