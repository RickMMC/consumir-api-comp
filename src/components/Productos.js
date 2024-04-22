import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Productos(){
    const [dataProductos,setDataProductos] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/pro/pro/api/mostrarproductos")
        .then((response)=>{
            setDataProductos(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, []);
    const listaProductos = dataProductos.map((producto)=>{
        var foto = "http://localhost:3000/images/" + producto.foto;
        var editarProducto= "/editarProducto/" + producto.id;
        var borrar = "/borrarProducto/" + producto.id;
        return (
            <tr key={producto.id} className="align-middle">
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td><img src={foto} width="100px" height="100px" alt="Foto de perfil"></img></td>
                <td>
                    <Link to = {editarProducto}>Editar</Link> / 
                    <Link to = {borrar}>Borrar</Link>
                </td>
            </tr>
        );
    });
    return (
        <table className="table table-hover">
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Foto</th>
                <th>Editar / Borrar</th>
            </tr>
        </thead>
        <tbody>
            {listaProductos}
        </tbody>
    </table>
    );
}
