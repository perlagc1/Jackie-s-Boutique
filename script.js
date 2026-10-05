// Carrito de compras de Jackie's Boutique

let carrito = [];

function agregarAlCarrito(nombre, precio) {

    const productoExiste = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExiste) {
        mostrarNotificacion("⚠ " + nombre + " ya está en tu carrito.");
        return;
    }

    carrito.push({
        nombre: nombre,
        precio: precio
    });
    actualizarCarrito();

    mostrarNotificacion("✓ " + nombre + " fue agregada a tu carrito.");

    console.log("Producto agregado:", nombre);
    console.log("Carrito:", carrito);

}
function actualizarCarrito() {
    const contadorCarrito = document.getElementById("contador-carrito");
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    contadorCarrito.textContent = carrito.length;

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalCarrito.textContent = "0";
        return;
    }

    let total = 0;

   carrito.forEach(producto => {
    const item = document.createElement("p");

    item.textContent = producto.nombre + " — $" + producto.precio + " ";

    const botonQuitar = document.createElement("button");
    botonQuitar.textContent = "Quitar";

    botonQuitar.onclick = function() {
        quitarDelCarrito(producto.nombre);
    };

    item.appendChild(botonQuitar);
    listaCarrito.appendChild(item);

    total += producto.precio;
});

    totalCarrito.textContent = total;
}

function quitarDelCarrito(nombre) {
    carrito = carrito.filter(
        producto => producto.nombre !== nombre
    );

    actualizarCarrito();
}
function mostrarCarrito() {
    const carritoSeccion = document.getElementById("carrito");

    if (carritoSeccion.style.display === "none") {
        carritoSeccion.style.display = "block";
    } else {
        carritoSeccion.style.display = "none";
    }
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.getElementById("notificacion-carrito");

    notificacion.textContent = mensaje;
    notificacion.classList.add("mostrar");

    setTimeout(function() {
        notificacion.classList.remove("mostrar");
    }, 2500);
}