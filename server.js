const express = require("express");
const pool = require("./db");
const app = express();
const port = 60180;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ユーザーの一覧を取得するAPI
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

//　ユーザーの一覧を取得するAPI
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  //idに何も入力されていないとき
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

//ユーザーを作成するAPI
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  //ユーザーが存在するか確認する
  pool.query(
    "SELECT s FROM users s WHERE s.email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        res.status(400).send("ユーザーが既に存在します");
        return;
      }

      //ユーザーを作成する
      pool.query(
        "INSERT INTO users (name, email,age) VALUES ($1, $2,$3)",
        [name, email, age],
        (error, results) => {
          if (error) {
            throw error;
          }
          //ステータスコード201は作成されたことを表す
          res.status(201).send(`ユーザーが作成されました`);
        }
      );
    }
  );
});

//ユーザーを削除するAPI
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  //ユーザーが存在するか確認する
  pool.query(
    "SELECT s FROM users s WHERE s.id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        //ステータスコード400はクライアントのリクエストが不正であることを表す
        res.status(400).send("ユーザーが存在しません");
        return;
      }

      //ユーザーを削除する
      pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
          throw error;
        }
        //ステータスコード200は成功したことを表す
        res.status(200).send(`ユーザーが削除されました`);
      });
    }
  );
});

//ユーザーを更新するAPI
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, age } = req.body;

  //ユーザーが存在するか確認する
  pool.query(
    "SELECT s FROM users s WHERE s.id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        //ステータスコード400はクライアントのリクエストが不正であることを表す
        res.status(400).send("ユーザーが存在しません");
        return;
      }

      //ユーザーを更新する
      pool.query(
        "UPDATE users SET name = $1, email = $2,age = $3 WHERE id = $4",
        [name, email, age, id],
        (error, results) => {
          if (error) {
            throw error;
          }
          //ステータスコード200は成功したことを表す

          res.status(200).send(`ユーザーが更新されました`);
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
