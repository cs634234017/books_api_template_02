const db = require("../config/db");

//Get all Users
const getUsers = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  db.query("SELECT * FROM Users", function (error, results, fields) {
    if (error) {
      return res
        .status(error.statusCode || 500)
        .send({ error: true, message: error.code + ": " + error.message });
    }

    return res
      .status(200)
      .send({ error: false, message: "Users list", data: results });
  });

};

//Get a User by id
const getUserbyId = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  var userid = Number(req.params.userid);

  db.query(
    "SELECT * FROM Users where userid=?",
    userid.toString(),
    function (error, results, fields) {
      if (error) {
        return res
          .status(error.statusCode || 500)
          .send({ error: true, message: error.code + ": " + error.message });
      }

      return res.status(200).send({
        error: false,
        message: "User id = " + userid.toString(),
        data: results,
      });
    }
  );

};

//Delete a User by id
const deleteUserbyId = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  var userid = Number(req.params.userid);

  db.query(
    "DELETE FROM Users where userid=?",
    userid,
    function (error, results, fields) {
      if (error) {
        return res
          .status(error.statusCode || 500)
          .send({ error: true, message: error.code + ": " + error.message });
      }

      return res.status(200).send({
        error: false,
        message: "Delete User id = " + userid.toString(),
        data: results,
      });
    }
  );

};

//Add new User
const addUser = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  var useridValue = req.body.userid;
  var firstnameValue = req.body.firstname;
  var lastnameValue = req.body.lastname;

  db.query(
    `INSERT INTO Users 
      (userid, firstname, lastname) 
      VALUES ( ${useridValue},'${firstnameValue}','${lastnameValue}');`,
    function (error, results, fields) {
      if (error) {
        return res
          .status(error.statusCode || 500)
          .send({ error: true, message: error.code + ": " + error.message });
      }

      return res.status(201).send({ error: false, message: "New User added" });
    }
  );

};

//Edit a User by id
const updateUserbyId = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  var useridValue = Number(req.params.userid);
  var firstnameValue= req.body.firstname;
  var lastnameValue = req.body.lastname;


  db.query(
    `UPDATE users 
          SET 
                userid=${useridValue}, 
                firstname='${ firstnameValue}',
                lastname= '${lastnameValue}' 
          WHERE userid=?`,
    useridValue,
    function (error, results, fields) {
      if (error) {
        return res
          .status(error.statusCode || 500)
          .send({ error: true, message: error.code + ": " + error.message });
      }

      return res
        .status(200)
        .send({
          error: false,
          message: "Edit user id = " + useridValue.toString(),
          data: results,
        });
    }
  );

};

module.exports = {
  getUsers,
  getUserbyId,
  addUser,
  //updateUserbyId,
  deleteUserbyId,
};
