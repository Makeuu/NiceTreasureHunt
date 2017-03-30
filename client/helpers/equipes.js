Template.equipe.helpers({
    "listEquipe": function () {
        return Equipe.find().fetch();
    }
});
Template.oneEquipe.helpers({
    "listUser": function () {
        return Meteor.users.find({'profile.role': {$in: ["user", "gest"]}}).fetch();
    },
    "getUsername": function () {
        return Meteor.users.find({_id: this.valueOf()}).fetch()[0].username;
    },
    "listChasse": function () {
        return Chasse.find().fetch();
    },
    "listParcours": function (id) {
        return Parcours.find({chasseId: id.hash.id}).fetch();
    },
    "isParcoursSelect": function (idEquipe, idParcours) {
        const parcSelect = Equipe.findOne({_id: idEquipe}).parcours;

        if (parcSelect === idParcours)
            return {selected: true}
    }
});

Template.equipe.events({
    'click .js-addEquipe': function (event) {
        event.preventDefault();
        var nomEquipe = document.querySelector("#nomEquipe");

        if (nomEquipe.value !== "") {
            Equipe.insert({
                nom: nomEquipe.value,
                team: []
            });
        }
        nomEquipe.value = "";
    }
});

Template.oneEquipe.events({
        'click .js-deleteEquipe': function (event) {
            event.preventDefault();

            Equipe.remove(this._id);
        },
        'change .js-selectUser': function (event) {
            event.preventDefault();

            if (Equipe.find({_id: this._id}).fetch()[0].team.includes(event.target.selectedOptions[0].value)) {
                Equipe.update({_id: this._id}, {
                    $pull: {team: event.target.selectedOptions[0].value}
                });
            } else {
                Equipe.update({_id: this._id}, {
                    $push: {team: event.target.selectedOptions[0].value}
                });
            }
        },
        'change .js-selectParcours': function (event) {
            event.preventDefault();
            Equipe.update({_id: event.target.id}, {$set: {parcours: event.target.value}});
        }
    }
);