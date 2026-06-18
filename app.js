class AdministradorUsuarios {
  constructor() {
    this.url = "https://jsonplaceholder.typicode.com/users";
    this.usuarios = [];

    this.obtenerDatos();
  }

  obtenerDatos() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", this.url, true);

    xhr.onload = () => {
      if (xhr.status === 200) {
        this.usuarios = JSON.parse(xhr.responseText);

        this.mostrarMensaje("Datos cargados correctamente desde el web service.");
        console.log("Datos cargados:", this.usuarios);
      } else {
        this.mostrarMensaje("Error al obtener los datos del web service.");
        console.error("Error HTTP:", xhr.status);
      }
    };

    xhr.onerror = () => {
      this.mostrarMensaje("Error de conexión con el web service.");
      console.error("Error de conexión");
    };

    xhr.send();
  }

  mostrarMensaje(mensaje) {
    const salida = document.getElementById("salida");

    if (salida) {
      salida.textContent += mensaje + "\n";
    }

    console.log(mensaje);
  }

  verificarDatos() {
    if (this.usuarios.length === 0) {
      this.mostrarMensaje("Los datos aún no están cargados. Espere unos segundos e intente nuevamente.");
      return false;
    }

    return true;
  }

  buscarUsuarioPorNombre() {
    const nombreBuscado = prompt("Ingrese el nombre del usuario:");

    if (nombreBuscado === null || nombreBuscado.trim() === "") {
      this.mostrarMensaje("Debe ingresar un nombre válido.");
      return null;
    }

    const usuario = this.usuarios.find(u =>
      u.name.toLowerCase() === nombreBuscado.trim().toLowerCase()
    );

    if (!usuario) {
      this.mostrarMensaje(`No se encontró el usuario: ${nombreBuscado}`);
      return null;
    }

    return usuario;
  }

  // 1. Listar los nombres de todos los usuarios  
  listarNombres() {
    if (!this.verificarDatos()) return;

    this.mostrarMensaje("----- Nombres de todos los usuarios -----");

    this.usuarios.forEach(usuario => {
      this.mostrarMensaje(usuario.name);
    });
  }

  // 2. Pedir nombre y mostrar información básica username y correo  
  buscarInfoBasica() {
    if (!this.verificarDatos()) return;

    const usuario = this.buscarUsuarioPorNombre();

    if (!usuario) return;

    this.mostrarMensaje("----- Información básica del usuario -----");
    this.mostrarMensaje(`Nombre: ${usuario.name}`);
    this.mostrarMensaje(`Username: ${usuario.username}`);
    this.mostrarMensaje(`Correo: ${usuario.email}`);
  }

  // 3. Pedir nombre y listar dirección todos los campos  
  buscarDireccion() {
    if (!this.verificarDatos()) return;

    const usuario = this.buscarUsuarioPorNombre();

    if (!usuario) return;

    this.mostrarMensaje("----- Dirección del usuario -----");
    this.mostrarMensaje(`Nombre: ${usuario.name}`);
    this.mostrarMensaje(`Calle: ${usuario.address.street}`);
    this.mostrarMensaje(`Suite: ${usuario.address.suite}`);
    this.mostrarMensaje(`Ciudad: ${usuario.address.city}`);
    this.mostrarMensaje(`Código postal: ${usuario.address.zipcode}`);
    this.mostrarMensaje(`Geo latitud: ${usuario.address.geo.lat}`);
    this.mostrarMensaje(`Geo longitud: ${usuario.address.geo.lng}`);
  }

  // 4. Pedir nombre y listar información avanzada  
  buscarInfoAvanzada() {
    if (!this.verificarDatos()) return;

    const usuario = this.buscarUsuarioPorNombre();

    if (!usuario) return;

    this.mostrarMensaje("----- Información avanzada del usuario -----");
    this.mostrarMensaje(`Nombre: ${usuario.name}`);
    this.mostrarMensaje(`Teléfono: ${usuario.phone}`);
    this.mostrarMensaje(`Sitio web: ${usuario.website}`);
    this.mostrarMensaje("Compañía:");
    this.mostrarMensaje(`Nombre compañía: ${usuario.company.name}`);
    this.mostrarMensaje(`Frase clave: ${usuario.company.catchPhrase}`);
    this.mostrarMensaje(`BS: ${usuario.company.bs}`);
  }

  // 5. Listar todas las compañías junto a catchphrase  
  listarCompanias() {
    if (!this.verificarDatos()) return;

    this.mostrarMensaje("----- Compañías y frases clave -----");

    this.usuarios.forEach(usuario => {
      this.mostrarMensaje(`Compañía: ${usuario.company.name}`);
      this.mostrarMensaje(`Frase clave: ${usuario.company.catchPhrase}`);
      this.mostrarMensaje("------------------------------");
    });
  }

  // 6. Listar nombres ordenados alfabéticamente  
  listarNombresOrdenados() {
    if (!this.verificarDatos()) return;

    const nombresOrdenados = this.usuarios  
      .map(usuario => usuario.name)
      .sort((a, b) => a.localeCompare(b));

    this.mostrarMensaje("----- Nombres ordenados alfabéticamente -----");

    nombresOrdenados.forEach(nombre => {
      this.mostrarMensaje(nombre);
    });
  }
}

function limpiarSalida() {
  const salida = document.getElementById("salida");
  salida.textContent = "";
  console.clear();
}

// Se crea el objeto de la clase.
// El constructor llama automáticamente al web service usando XMLHttpRequest.
const usuariosAPI = new AdministradorUsuarios();
