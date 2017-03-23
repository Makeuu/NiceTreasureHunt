Template.equipe.helpers({
    "list": function () {
        return Equipe.find().fetch();
    }
});
Template.equipe.events({
    'click .js-addEquipe': function (event) {
        event.preventDefault();
        const equipe = event.target.parentNode.parentNode.childNodes[1].childNodes[1].value;

        console.log("add equipe", equipe);
    }
}, {
    'click .js-deleteEquipe': function (event) {
        event.preventDefault();

        console.log("delete equipe");
    }
});