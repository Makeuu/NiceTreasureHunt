Template.seeEtapes.helpers({
    "etapes": function () {
        try {
            return Etapes.find({parcoursId: Equipe.findOne().parcours}, {sort: {position: 1}}).fetch();
        } catch (e) {}
    },
    "isActivated": function (e) {
        try {
            if (e.position !== 1) {
                const precEtapeId = Etapes.findOne({position: e.position - 1})._id;

                if (typeof Equipe.findOne().validate[precEtapeId] === "undefined"
                    || Equipe.findOne().validate[precEtapeId].valide !== 1) {
                    return false;
                }
            }
            return true;
        } catch (e) {}
    }
});

Template.patron.helpers({
    "isQuestion": function (type) {
        try {
            return type === "Question";
        } catch (e) {}
    }
});
Template.question.helpers({
    "isCorrect": function (e) {
        try {
            if (typeof Equipe.findOne().validate[e._id] !== "undefined"
                && Equipe.findOne().validate[e._id].valide === 1) {
                return true;
            }
            return false;
        } catch (e) {}
    },
    "getAnswer": function (e) {
        try {
            var classes = "w3-input w3-border-teal w3-margin-bottom";
            var val = "";
            const validate = Equipe.findOne().validate[e._id];

            if (typeof validate !== "undefined") {
                val = validate.reponse;

                if (validate.valide === -1) {
                    console.log("red");
                    classes += " w3-pale-red";
                }
            }

            return {
                value: val,
                class: classes
            }
        } catch (e) {}
    }
});

Template.question.events({
    "click .js-ansQuestion": function (event) {
        const curEquipe = Equipe.findOne();
        const idQuestion = event.target.id;
        const reponse = document.querySelector("[name='response']").value;
        const prams = {
            valide: 0,
            reponse: reponse
        };

        var validate = curEquipe.validate;
        validate[idQuestion] = prams;

        Equipe.update({_id: curEquipe._id}, {$set: {validate: validate}});
    }
});