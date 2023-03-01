const express = require("express");
let publications = [];
const server = express();
server.use(express.json());

let id = 1;

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (author && title && contents) {
    const publication = {
      author,
      title,
      contents,
      id: id++,
    };
    publications.push(publication);

    res.status(200).json(publication);
  } else {
    return res.status(400).json({
      error:
        "No se recibieron los parámetros necesarios para crear la publicación",
    });
  }
});

server.get("/posts", (req, res) => {
  const { author, title } = req.query;

  if (author && title) {
    const publicationFiltered = publications.filter(
      (publi) => publi.author === author && publi.title === title
    );
    publicationFiltered.length
      ? res.status(200).json(publicationFiltered)
      : res.status(400).json({
          error:
            "No existe ninguna publicación con dicho título y autor indicado",
        });
  }
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  const publicationFiltered = publications.filter(
    (publi) => publi.author === author
  );
  if (publicationFiltered.length) {
    return res.status(200).json(publicationFiltered);
  } else {
    res
      .status(400)
      .json({ error: "No existe ninguna publicación del autor indicado" });
  }
});

server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (title && contents && id) {
    let publicationId = publications.find((publi) => publi.id === Number(id));
    !publicationId
      ? res.status(400).json(publicationId)
      : (publicationId =
          { ...publicationId, title, contents } &&
          res.status(200).json(publicationId));
  } else {
    res.status(400).json({
      error:
        "No se recibieron los parámetros necesarios para modificar la publicación",
    });
  }
});

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ error: "No se recibió el id de la publicación a eliminar" });
  } else {
    // res.status(200).json( { success: true })
    let publicationFiltered = publications.filter(
      (publi) => publi.id !== Number(id)
    );
    if (publications.length === publicationFiltered.length) { // comparamos la longitud de los arrays, y si son iguales significa que no sacó a nadie :-)
      return res
        .status(400)
        .json({
          error:
            "No se recibió el id correcto necesario para eliminar la publicación",
        });
    }
    publications = publicationFiltered;
    res.status(200).json({ success: true });
  }
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
