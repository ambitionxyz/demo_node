exports.GetUsers = (req, res, next) => {
  const { client } = req;
  console.log({ client });
  console.log("GET USERS");

  client.query("SELECT * FROM persion", (err, respon) => {
    if (!err) {
      console.log(respon.rows);
      res.status(200).json(respon.rows);
    } else {
      console.log(err.message);
    }
    client.end();
  });
};
exports.GetUser = (req, res, next) => {
  const { client, query } = req;
  client.query(
    `select * from persion where name = ${query.name}`,
    (err, respon) => {
      if (!err) {
        console.log(respon.rows);
        res.status(200).json(respon.rows);
      } else {
        console.log(err.message);
      }
      client.end();
    }
  );
};
// exports.UpdateUser = (req, res, next) => {};
exports.AddUser = (req, res, next) => {
  console.log("ADD USER");
  const { client, query } = req;
  client.query(
    `
  SELECT EXISTS (
    SELECT 1
    FROM persion
    WHERE name = ${query.name}
  );
  `,
    (err, respon) => {
      if (respon.rows[0].exists === true) {
        client.end();
        return res.status(400).json({ err: "EXISTED ACCOUNT" });
      }
    }
  );

  client.query(
    `insert into persion (name, age, address, phone) values (${query.name}, ${query.age}, ${query.address}, ${query.phone});`,
    (err, respon) => {
      if (!err) {
        console.log({ respon });
        res.status(200).json({
          message: "ADD SUCCESS",
        });
      } else {
        res.status(400).json({
          message: "ERROR",
        });
      }
      client.end();
    }
  );
};

exports.DeleteUser = (req, res, next) => {
  console.log("DELETE USER");
  const { client, query } = req;

  client.query(
    `delete from persion where name = ${query.name}`,
    (err, respon) => {
      if (!err) {
        res.status(200).json({
          message: "DELETE SUCCESS",
        });
      } else {
        res.status(400).json({
          message: "ERROR",
        });
      }
      client.end();
    }
  );
};
