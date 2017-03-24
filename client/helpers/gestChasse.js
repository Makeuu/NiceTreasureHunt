Template.gestChasse.helpers({
    "listChasse": function () {
        return Chasse.find().fetch();
    }
});

Template.gestChasse.events({
    "click .js-addChasse": function (event) {
        event.preventDefault();

        var nomChasse = document.querySelector("#nomChasse");

        if (nomChasse.value !== "") {
            Chasse.insert({
                nom: nomChasse.value,
                listParcours: []
            });
        }
        nomChasse.value = "";
    }
});

Template.chasse.events({
        'click .js-deleteChasse': function (event) {
            event.preventDefault();

            Chasse.remove(this._id);
        }
    }
);
