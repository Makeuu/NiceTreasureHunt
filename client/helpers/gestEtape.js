Template.gestEtape.helpers({
    "listEtape": function () {
        return Etapes.find({}, {sort: {position: 1}}).fetch();
    }
});
Template.modifEtape.helpers({
    "etape": function () {
        return Etapes.findOne();
    }
});
Template.addEtape.helpers({
    isQuestion: function () {
        return Router.current().params['type'] === "Question";
    }
});

Template.gestEtape.events({
    "click .js-addEtape": function (event) {
        event.preventDefault();

        const type = document.querySelector(".js-select").value;
        Router.go('addEtape', {type: type, id: Router.current().params['id']});
    }
});

Template.etapes.events({
        'click .js-deleteEtape': function (event) {
            event.preventDefault();

            Etapes.update({_id: event.target.id}, {
                $pull: {parcoursId: Router.current().params['id']}
            });
        }
    }
);

Template.modifEtape.events({
        'click .js-saveEtape': function (event) {
            event.preventDefault();

            const prams = {
                nom: document.querySelector("[name='nom']").value,
                question: document.querySelector("[name='question']").value,
                reponse: document.querySelector("[name='reponse']").value,
                position: document.querySelector("[name='position']").value,
                lat: document.querySelector("[name='lat']").value,
                lng: document.querySelector("[name='lng']").value
            }

            Etapes.update({_id: event.target.id}, {$set: prams});
            history.go(-1);
        }
    }
);

Template.addEtape.onRendered(function () {
    if (Meteor.isClient) {
        document.querySelector(".js-type").value = Router.current().params['type'];
    }
});

Template.addEtape.events({
    "click .js-save": function (event) {
        event.preventDefault();

        const type = document.querySelector("[name='type'").value;
        const id = Router.current().params['id'];

        var prams = {
            nom: document.querySelector("[name='nom']").value,
            type: type,
            position: document.querySelector("[name='position']").value,
            lat: document.querySelector("[name='lat']").value,
            lng: document.querySelector("[name='lng']").value,
            parcoursId: [id]
        };

        if (type === "Question") {
            prams.question = document.querySelector("[name='question']").value;
            prams.reponse = document.querySelector("[name='reponse']").value;
        }

        Etapes.insert(prams);

        Router.go('gestEtape', {id: id});
    }
});