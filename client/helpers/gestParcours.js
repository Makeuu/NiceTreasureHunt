Template.gestParcours.helpers({
    "listParcours": function () {
        return Parcours.find().fetch();
    }
});

Template.gestParcours.events({
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

Template.parcours.events({
        'click .js-deleteParcours': function (event) {
            event.preventDefault();

            Parcours.update({_id: event.target.id}, {
                $pull: {chasseId: Router.current().params['id']}
            });
        }
    }
);

