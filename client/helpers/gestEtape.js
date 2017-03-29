Template.gestEtape.helpers({
    "listEtape": function () {
        return Etapes.find().fetch();
    }
});

Template.gestEtape.events({
    "click .js-addParcours": function (event) {
        event.preventDefault();

        var nomParcours = document.querySelector("#nomParcours");
        const idChasse = Router.current().params['id'];

        if (nomParcours.value !== "") {
            Parcours.insert({
                nom: nomParcours.value,
                chasseId: [idChasse]
            });
        }
        nomParcours.value = "";
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
