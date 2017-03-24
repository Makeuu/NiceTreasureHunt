Template.equipe.helpers({
        "list": function () {
            return Equipe.find().fetch();
        }
    }
);

Template.equipe.events({
    'click .js-addEquipe': function (event) {
        event.preventDefault();
        var nomEquipe = document.querySelector("#nomEquipe");

        if(nomEquipe!=="") {
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
    }
});