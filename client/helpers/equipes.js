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
        try {
            return Meteor.users.findOne({_id: this.valueOf()}).username;
        } catch(e) {}
    },
    "listChasse": function () {
        return Chasse.find().fetch();
    },
    "listParcours": function (id) {
        return Parcours.find({chasseId: id.hash.id}).fetch();
    },
    "isParcoursSelect": function (idEquipe, idParcours) {
        try {
            const parcSelect = Equipe.findOne({_id: idEquipe}).parcours;

            if (parcSelect === idParcours)
                return {selected: true}
        } catch (e) {}
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

            if (event.target.value !== "") {
                if (Equipe.findOne({_id: event.target.id}).team.includes(event.target.value)) {
                    Equipe.update({_id: event.target.id}, {
                        $pull: {team: event.target.value}
                    });
                } else {
                    Equipe.update({_id: event.target.id}, {
                        $push: {team: event.target.value}
                    });
                }
            }
        },
        'change .js-selectParcours': function (event) {
            event.preventDefault();
            Equipe.update({_id: event.target.id}, {$set: {parcours: event.target.value}});
        }
    }
);