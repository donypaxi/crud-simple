let $nombre = document.getElementById('nombre')
let $apellido = document.getElementById('apellido')
let $lista = document.getElementById('lista')

document.addEventListener('DOMContentLoaded',()=>{
    mostrarDatos()
})
// metodo post
const URL = 'https://server-crud-simple-production.up.railway.app/'
const btnEnviarDatos = async ()=> {
    let persona = {
        nombre: $nombre.value,
        apellido: $apellido.value
    }
    
    const res = await fetch(URL,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(persona)
    })
    const data = await res.json()
    console.log(data)
    mostrarDatos();
}

// metodo get
const mostrarDatos = async () => {
    limpieza()

    const res = await fetch(URL)
    const datas = await res.json()
    console.log(datas)

    datas.forEach((dato) => {
        const {nombre,apellido,_id} = dato
        let fila = $lista.insertRow()
        let celdaNombre = fila.insertCell()
        let celdaApellido = fila.insertCell()
        let celdaEditar = fila.insertCell()
        let celdaEliminar = fila.insertCell()
        let btnEditar = document.createElement('button')
        let btnEliminar= document.createElement('button')
        
        celdaNombre.textContent = nombre
        celdaApellido.textContent = apellido        
        btnEditar.textContent="Editar"
        btnEliminar.textContent="Eliminar"
        
        btnEditar.addEventListener('click',()=> {
            editar(_id)
        })

        btnEliminar.addEventListener('click',()=>{
            eliminar(_id)
        })


        celdaEditar.appendChild(btnEditar)
        celdaEliminar.appendChild(btnEliminar)
    });

}


// metodo PUT
const editar = async(i)=> {
    let newNombre = prompt('ingrese un nuevo nombre')
    let newApellido = prompt('ingrese un nuevo apellido')
    let newDatos={nombre:newNombre , apellido:newApellido}

    const res = await fetch(`${URL}/${i}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newDatos)
    })
    const data = await res.json()
    const {nombre,apellido}= data
    console.log(`persona actualizada ${nombre} ${apellido}`)
    mostrarDatos()
}


// metodo DELETE
const eliminar = async(i)=> {
    const res = await fetch(`${URL}/${i}`,{
        method:"DELETE",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify()
    })
    const data = await res.json()
    mostrarDatos()
}


const limpieza = ()=>{
    $lista.innerHTML=""
    $nombre.value="";
    $apellido.value=""

}