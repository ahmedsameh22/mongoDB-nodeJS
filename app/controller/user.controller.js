const dealWithApi = require("../helper/dealWithApi");
const dealWithJson = require("../helper/deelWithData");
const apiUrl = "https://jsonplaceholder.typicode.com/users";
const ObjectId = require("mongodb").ObjectId;
const userType = ["user", "admin"];
const dbCon = require("../../dataBase/connect");
class User {
  static home = (req, res) => {
    dbCon((err, db) => {
      if (err) res.send(err);
      db.collection("data")
        .find()
        .toArray((error, result) => {
          if (error) res.srnd(error);
          let hasData = result.length ? true : false;
          res.render("home", { titlePage: "home-page", result, hasData });
        });
    });
  };
  static add = (req, res) => {
    res.render("add", { titlePage: "add-page", userType });
  };
  static showSingle = (req, res) => {
    dbCon((err, db) => {
      db.collection("data").findOne(
        { _id: new ObjectId(req.params.id) },
        (error, data) => {
          if (error) res.send(error);

          let hasData = data != null ? true : false;
          res.render("single", { titlePage: "single-page", data, hasData });
        }
      );
    });
  };
  static addLogic = (req, res) => {
    console.log({ ...req.body });
    const user = req.body;
    dbCon((e, db) => {
      if (e) return res.send(e);
      db.collection("data")
        .insertOne(user)
        .then(() => {
          res.redirect("/");
        })
        .catch((e) => {
          res.send(e);
        });
    });
  };
  static deleteUser = (req, res) => {
    dbCon((err, db) => {
      if (err) res.send(err);
      db.collection("data")
        .deleteOne(
          { _id: new ObjectId(req.params.id) },
          {
            $set: req.body,
          }
        )
        .then(() => {
          res.redirect("/");
        })
        .catch((e) => {
          res.send(e);
        });
    });
  };
  static edit = (req, res) => {
    dbCon((err, db) => {
      if (err) res.send(err);
      db.collection("data").findOne(
        { _id: new ObjectId(req.params.id) },
        (error, user) => {
          if (error) res.send(error);
          res.render("edit", { titlePage: "single-page", user, userType });
        }
      );
    });
  };
  static editlogic = (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    const editUser = { ...req.body, id: userId };
    dbCon((err, db) => {
      if (err) res.send(err);
      db.collection("data")
        .updateOne(
          { _id: new ObjectId(req.params.id) },
          {
            $set: req.body,
          }
        )
        .then(() => {
          res.redirect("/");
        })
        .catch((e) => {
          res.send(e);
        });
    });
  };
}
module.exports = User;
