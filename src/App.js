import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Productos from "./components/Productos";
import AgregarProducto from "./components/AgregarProducto";
import EditarProducto from "./components/EditarProducto";
import Producto from "./components/Producto";
import Header from "./components/Header";

function App() {
  const [productos, guardarProductos] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      //consultar la api de json-server

      const resultado = await axios.get("http://localhost:4000/restaurant");
      guardarProductos(resultado.data);
    };

    consultarApi();
  }, []);


  /* Si ocupamos pasar datos con props usamos en route la vandera render de lo contrario usar component */
  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route
            exact
            path="/productos"
            render={() => (<Productos productos={productos} />)}
          />
          <Route exact path="/producto/:id" component={Producto} />
          <Route exact path="/nuevo-producto" component={AgregarProducto} />
          <Route exact path="/producto/editar:id" component={EditarProducto} />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos Reservados</p>
    </Router>
  );
}

export default App;
