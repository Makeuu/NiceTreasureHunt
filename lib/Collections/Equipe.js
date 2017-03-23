Equipe= new Mongo.Collection('equipe');

Meteor.methods({
    createEquipe: function (postAttributes) {
        Equipe.update(Meteor.userId(), {
                $push: {
                    "equi": {
                        "date": new Date(),
                        "nom": postAttributes.nom,
                        "team" : []
                    }
                }
            },
            {upsert: true}
        );

        return true;
    }
});