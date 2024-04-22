import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Editar() {
    const params = useParams();

    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [nombreFoto, setNombreFoto] = useState("");
    const [password, setPassword] = useState("");
    const [passwordViejo, setPasswordViejo] = useState("");
    const [saltViejo, setSaltViejo] = useState("");
    const [fotoVieja, setFotoVieja] = useState("");
    const [foto, setFoto] = useState(null);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        async function buscarDatos() {
            try {
                const res = await axios.get(`http://localhost:3000/api/buscarUsuarioPorId/${params.id}`);
                setId(res.data.id);
                setNombre(res.data.nombre);
                setUsuario(res.data.usuario);
                setPasswordViejo(res.data.password);
                setSaltViejo(res.data.salt);
                setFotoVieja(res.data.foto);
                setNombreFoto(`http://localhost:3000/images/${res.data.foto}`);
                console.log(res.data);
            } catch (error) {
                console.error("Error al buscar datos:", error);
            }
        }
        buscarDatos();
    }, []);

    async function agregarUsuario(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("nombre", nombre);
            formData.append("usuario", usuario);
            formData.append("password", password);
            formData.append("passwordViejo", passwordViejo);
            formData.append("saltViejo", saltViejo);
            formData.append("fotoVieja", fotoVieja);
            formData.append("foto", foto);

            const respuesta = await axios.post("http://localhost:3000/api/editarUsuario", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(respuesta);
            setMensaje(respuesta.data);
            setTimeout(() => {
                setMensaje("");
            }, 3000);
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    }

    return (
        <form onSubmit={agregarUsuario} method="post" encType="multipart/form-data">
            <div className="container mt-5">
                <div className="text-danger"><h3>{mensaje}</h3></div>
                <div className="card">
                    <div className="card-header">
                        <h1>Modificar usuario</h1>
                    </div>
                    <div className="card-body">
                        <input type="hidden" name="passwordViejo" id="passwordViejo" value={passwordViejo} readOnly />
                        <input type="hidden" name="saltViejo" id="saltViejo" value={saltViejo} readOnly />
                        <input type="hidden" name="fotoVieja" id="fotoVieja" value={fotoVieja} readOnly />
                        <input className="form-control mb-3" type="text" placeholder="Id" name="id" id="id" value={id} readOnly />
                        <input className="form-control mb-3" type="text" placeholder="Nombre" name="nombre" id="nombre" value={nombre} autoFocus onChange={(e) => setNombre(e.target.value)} />
                        <input className="form-control mb-3" type="text" placeholder="Usuario" name="usuario" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                        <input className="form-control mb-3" type="text" placeholder="Password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        <div>
                            <img src={nombreFoto} width="100" alt="Foto de usuario" />
                        </div>
                        <input className="form-control mb-3" type="file" placeholder="Foto" name="foto" id="foto" onChange={(e) => setFoto(e.target.files[0])} />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary form-control mb-3 mt-3" type="Submit">Modificar usuario</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
