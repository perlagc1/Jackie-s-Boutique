// Carrito de compras de Jackie's Boutique

let carrito = [];
let metodoPagoSeleccionado = "";

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

function finalizarCompra() {

    if (carrito.length === 0) {
        mostrarNotificacion("⚠ Tu carrito está vacío.");
        return;
    }

    const checkout = document.getElementById("checkout");
    const checkoutTotal = document.getElementById("checkout-total");

    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio;
    });

    checkoutTotal.textContent = total;
    checkout.style.display = "block";

    mostrarNotificacion("✓ Tu pedido está listo para continuar.");
}

function mostrarPago(metodo) {
metodoPagoSeleccionado = metodo;

    const instrucciones = document.getElementById("instrucciones-pago");

    if (metodo === "Zelle") {
        instrucciones.innerHTML = `
            <h4>Pago con Zelle</h4>
            <p>Envía tu pago por Zelle al siguiente número:</p>
            <p><strong>308-746-0339</strong></p>
            <p>Después de realizar el pago, contáctanos para confirmar tu pedido.</p>
        `;

        instrucciones.style.display = "block";
    }

    if (metodo === "Venmo") {
    instrucciones.innerHTML = `
        <h4>Pago con Venmo</h4>
        <p>Envía tu pago por Venmo al siguiente usuario:</p>
        <p><strong>@Perla-GarciaCavazos</strong></p>
        <p>Después de realizar el pago, contáctanos para confirmar tu pedido.</p>
    `;

    instrucciones.style.display = "block";
}

if (metodo === "Cash App") {
    instrucciones.innerHTML = `
        <h4>Pago con Cash App</h4>
        <p>Envía tu pago por Cash App al siguiente $Cashtag:</p>
        <p><strong>$perlagc1</strong></p>
        <p>Después de realizar el pago, contáctanos para confirmar tu pedido.</p>
    `;

    instrucciones.style.display = "block";
}

const botonConfirmar = document.getElementById("confirmar-pedido");
botonConfirmar.style.display = "inline-block";

    mostrarNotificacion("✓ Seleccionaste " + metodo + " como método de pago.");
}

function confirmarPedido(tipo) {

    if (carrito.length === 0) {
        mostrarNotificacion("⚠ Tu carrito está vacío.");
        return;
    }

    let total = 0;

carrito.forEach(producto => {
    total += producto.precio;
});

let resumenProductos = "";

carrito.forEach(producto => {
    resumenProductos += producto.nombre + " — $" + producto.precio + "\n";
});

const resumenPedido =
    "Pedido de Jackie's Boutique\n\n" +
    resumenProductos +
    "\nTotal: $" + total +
    "\nMétodo de pago: " + metodoPagoSeleccionado;

    const mensaje = encodeURIComponent(resumenPedido);

if (tipo === "sms") {
    window.location.href = "sms:13087460339?body=" + mensaje;
}

if (tipo === "email") {
    const asunto = encodeURIComponent("Pedido de Jackie's Boutique");

    window.location.href =
        "mailto:angel_perla@hotmail.com?subject=" +
        asunto +
        "&body=" +
        mensaje;
}
}