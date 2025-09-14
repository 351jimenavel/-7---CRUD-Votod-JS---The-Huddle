// Exponer funciones puras:


// Estado: array inicial de 3 temas (con id, titulo, votos).
const temas = [
        {id: 1, titulo: "Minimax", votos: 3},
        {id: 2, titulo: "DFS", votos: 6},
        {id: 3, titulo: "BFS", votos: 8}
    ]

// listarTemasOrdenados() → orden por votos (regla de desempate definida).
// listarTemasOrdenados() → devuelve copia ordenada por votos desc
function listarTemasOrdenados(){
    const copiaTemas = [].concat(temas);
    return copiaTemas.sort((a,b) => b.votos - a.votos || b.createdAt - a.createdAt);
}
// function incrementarId(){
//     let nuevoId;
//     let ultimoObjeto = temas.at(-1);
//     const claves = Object.keys(ultimoObjeto);
//     const primeraClave = claves[0];
//     let valorId = ultimoObjeto[primeraClave];
//     valorId++;
//     nuevoId = valorId;
//     return nuevoId;
//}

// crearTema(titulo) → valida trim y duplicados case-insensitive, valida y agrega con votos = 0.
// crea con votos=0, asigna id único (contador o maxId+1) y timestamp (para desempates).
function crearTema(tituloNuevo){
    // let nuevoId = incrementarId();
    let ids = temas.map(item => item.id);
    let maxId = ids.length ? Math.max(...ids) : 0;

    // Si titulo está vacío o ya existe (case-insensitive), rechaza.
    const tituloLimpio = tituloNuevo.trim();
    const existeTitulo = temas.some(tema => tema.titulo.trim().toLowerCase() === tituloLimpio.toLowerCase());
    if (!tituloLimpio || existeTitulo){
        return { ok: false, error: 'titulo vacio o ya existe' };
        // Si es válido, agrega al array con votos = 0 e id único.
    }else{
        const nuevo = { id: maxId + 1, titulo: tituloLimpio, votos: 0, createdAt: Date.now()};
        temas.push(nuevo);
        return { ok: true, tema: nuevo};
    }
}


// votarTema(id) → incrementa y devuelve nuevo conteo.
function votarTema(id){
    const ID = Number(id);
    const tema = temas.find(t => t.id === ID);
    if (!tema){
        return { ok: false, error: 'Tema no encontrado' };
    }
    tema.votos += 1;
    return { ok: true, votos: tema.votos, id: tema.id };
}

let temasOrdenados = listarTemasOrdenados()
console.log(temasOrdenados);

// (Luego) actualizarTema, eliminarTema, obtenerTema, y funciones para enlaces.

// Nunca renderizar ni manejar HTTP.
module.exports = {listarTemasOrdenados, crearTema, votarTema};
