var Ordinateur = require("./ordinateurModel");
async function list(req, res, next) {
  await Ordinateur.find().then((data, err) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json(data);
  });
  //res.end('Ordinateur List')
}
async function recherche(req, res, next) {
  const { prix } = req.params;
  let query = {};

  if (prix) query.prix = { $gte: 1500, $lte: 6000 };

  await Ordinateur.find(query).then((data, err) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!data) {
      return res.status(404).json({ message: "ordinateur n existe pas" });
    }
    res.status(200).json(data);
  });
}
const create = async (req, res, next) => {
  const { modele, categorie, dateFabrication, prix } = req.body;
  await new Ordinateur({
    modele: modele,
    categorie: categorie,
    dateFabrication: new Date(),
    prix: prix,
  })
    .save()
    .then((data, err) => {
      if (err) {
        res.status(500).json(err);
      }
      console.log(data);
    });

  res.json(
    "Ordinateur added ! modele : " +
      modele +
      " categorie : " +
      categorie +
      " dateFabrication : " +
      dateFabrication +
      " prix : " +
      prix
  );
};

const update = async (req, res, next) => {
  await Ordinateur.findByIdAndUpdate(req.params.id, req.body).then(
    (data, err) => {
      res.json(data);
    }
  );
};

async function deleteU(req, res, next) {
  await Ordinateur.findByIdAndDelete(req.params.id).then((data, err) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json(data);
  });
}

module.exports = { recherche, create, list, update, deleteU };
