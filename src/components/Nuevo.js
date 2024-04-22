import axios from "axios";
import { useState } from "react";
import { URL_API } from "../config/rutas";

// Funcion para agregar nuevos usuarios
export function Nuevo() {
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [foto, setFoto] = useState(null);
    const [mensaje, setMensaje] = useState("");
    async function guardarDatos(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("usuario", usuario);
        formData.append("password", password);
        formData.append("foto", foto);
        const res = await axios.post(URL_API + "nuevousuario", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        setNombre("");
        setUsuario("");
        setPassword("");
        setFoto(null);
        setMensaje(res.data);
        setTimeout(() => {
            setMensaje("");
        }, 3000);
    }
    return (
        <div className="container mt-5">
            <div className="text-danger"><h2>{mensaje}</h2></div>
            <form onSubmit={guardarDatos}>
                <div className="card">
                    <div className="card-header">
                        <h1>Registro de usuario</h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mb-3" type="text" name="nombre" id="nombre" placeholder="Nombre" autoFocus onChange={(e)=>setNombre(e.target.value)}></input>
                        <input className="form-control mb-3" type="text" name="usuario" id="usuario" placeholder="Usuario" onChange={(e)=>setUsuario(e.target.value)} ></input>
                        <input className="form-control mb-3" type="password" name="password" id="password" placeholder="Contraseña" onChange={(e)=>setPassword(e.target.value)} ></input>
                        <input className="form-control mb-3" type="file" name="foto" id="foto" placeholder="Foto" onChange={(e)=>setFoto(e.target.files[0])}></input>
                    </div>
                    <div className="card-footer">
                        <button className=" form-control btn btn-primary" type="submit">Registrar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}