Template.equipe.helpers({
        "list": function () {
            return Equipe.find().fetch();
        }
    }
)
;

Template.equipe.events({
    'click .js-addEquipe': function (event) {
        event.preventDefault();
        var nomEquipe = document.querySelector("#nomEquipe");

        if (nomEquipe !== "") {
            Equipe.insert({
                nom: nomEquipe.value,
                team: []
            });
        }
        nomEquipe.value = "";
    }
});

Template.oneEquipe.helpers({
        "listUser": function () {
            return Meteor.users.find({'profile.role': {$in: ["user", "gest"]}}).fetch();
        },
        "getUsername": function() {
            return Meteor.users.find({_id : this.valueOf()}).fetch()[0].username;
        }
    }
)
;

Template.oneEquipe.events({
        'click .js-deleteEquipe': function (event) {
            event.preventDefault();

            Equipe.remove(this._id);
        },
        'change select': function (event) {
            event.preventDefault();

            if(Equipe.find({_id: this._id}).fetch()[0].team.includes(event.target.selectedOptions[0].value)) {
                Equipe.update({_id: this._id}, {
                    $pull: {team: event.target.selectedOptions[0].value}
                });
            } else {
                Equipe.update({_id: this._id}, {
                    $push: {team: event.target.selectedOptions[0].value}
                });
            }
        }
    }
);