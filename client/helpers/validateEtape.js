Template.validateEtape.helpers({
    "listEquipe": function () {
        return Equipe.find().fetch();
    },
    "listValidate": function (validate) {
        var res = [];
        var pal = {};
        for(key in validate) {
            if(validate[key].valide === 0) {
                pal = validate[key];
                pal["idEtape"] = key;

                res.push(pal);
            }
        }
        return res;
    },
    "oneEtape": function (id) {
        return Etapes.findOne({_id: id});
    }
});

Template.validateEtape.events({
    "click .js-refuseEtape": function (event) {
        const idEquipe = event.target.name;
        const idEtape = event.target.id;

        var validate = Equipe.findOne({_id: idEquipe}).validate;
        validate[idEtape].valide = -1;

        Equipe.update({_id: idEquipe}, {$set: {validate: validate}});
    },
    "click .js-acceptEtape": function (event) {
        const idEquipe = event.target.name;
        const idEtape = event.target.id;

        var equip = Equipe.findOne({_id: idEquipe});
        var validate = equip.validate;
        validate[idEtape].valide = 1;

        Equipe.update({_id: idEquipe}, {$set: {validate: validate}});
    }
});