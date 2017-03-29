Template.gestEtape.helpers({
    "listEtape": function () {
        return Etapes.find().fetch();
    }
});
Template.modifEtape.helpers({
    "etape": function () {
        return Etapes.findOne();
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

Template.modifEtape.events({
        'click .js-saveEtape': function (event) {
            event.preventDefault();

            const nom = document.querySelector("[name='nom']").value;
            const ques = document.querySelector("[name='question']").value;
            const pos = document.querySelector("[name='position']").value;
            const lat = document.querySelector("[name='lat']").value;
            const lng = document.querySelector("[name='lng']").value;

            Etapes.update({_id: event.target.id}, {
                $set: {
                    nom: nom,
                    /*question: ,
                    reponse: ,
                    position:*/
                }
            });
        }
    }
);