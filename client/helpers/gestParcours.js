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
            var idParcours = Parcours.insert({
                nom: nomParcours.value,
                listEtapes: []
            });

            Chasse.update({_id: idChasse}, {
                $push: {listParcours: idParcours}
            });
        }
        nomParcours.value = "";
    }
});

Template.parcours.events({
        'click .js-deleteParcours': function (event) {
            event.preventDefault();

            const idChasse = Router.current().params['id'];

            Chasse.update({_id: idChasse}, {
                $pull: {listParcours: this._id}
            });
            Parcours.remove(this._id);
        }
    }
);

