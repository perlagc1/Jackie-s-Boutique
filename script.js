// Carrito de compras de Jackie's Boutique

let carrito = [];
let metodoPagoSeleccionado = "";
const productosAgotados = ["Arely", "Sofi"];

function agregarAlCarrito(nombre, precio) {

    if (productosAgotados.includes(nombre)) {
        mostrarNotificacion("⚠ " + nombre + " está agotado.");
        return;
    }

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
    botonQuitar.textContent = idiomaActual === "en" ? "Remove" : "Quitar";

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
    if (idiomaActual === "en") {
        instrucciones.innerHTML = `
            <h4>Pay with Zelle</h4>
            <p>Send your payment through Zelle to the following phone number:</p>
            <p><strong>308-746-0339</strong></p>
            <p>After making your payment, contact us to confirm your order.</p>
        `;
    } else {
        instrucciones.innerHTML = `
            <h4>Pago con Zelle</h4>
            <p>Envía tu pago por Zelle al siguiente número:</p>
            <p><strong>308-746-0339</strong></p>
            <p>Después de realizar el pago, contáctanos para confirmar tu pedido.</p>
        `;
    }

    instrucciones.style.display = "block";
}

if (metodo === "Venmo") {
    if (idiomaActual === "en") {
        instrucciones.innerHTML = `
            <h4>Pay with Venmo</h4>
            <p>Send your payment through Venmo to the following username:</p>
            <p><strong>@Perla-GarciaCavazos</strong></p>
            <p>After making your payment, contact us to confirm your order.</p>
        `;
    } else {
        instrucciones.innerHTML = `
            <h4>Pago con Venmo</h4>
            <p>Envía tu pago por Venmo al siguiente usuario:</p>
            <p><strong>@Perla-GarciaCavazos</strong></p>
            <p>Después de realizar el pago, contáctanos para confirmar tu pedido.</p>
        `;
    }

    instrucciones.style.display = "block";
}

if (metodo === "Cash App") {
    if (idiomaActual === "en") {
        instrucciones.innerHTML = `
            <h4>Pay with Cash App</h4>
            <p>Send your payment through Cash App to the following $Cashtag:</p>
            <p><strong>$perlagc1</strong></p>
            <p>After making your payment, contact us to confirm your order.</p>
        `;
    } else {
        instrucciones.innerHTML = `
            <h4>Pago con Cash App</h4>
            <p>Envía tu pago por Cash App al siguiente $Cashtag:</p>
            <p><strong>$perlagc1</strong></p>
            <p>Después de realizar el pago, contáctanos para confirmar tu pedido.</p>
        `;
    }

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
    const productoAgotado = carrito.find(producto =>
    productosAgotados.includes(producto.nombre)
);

if (productoAgotado) {
    mostrarNotificacion("⚠ " + productoAgotado.nombre + " está agotado. Elimínalo del carrito para continuar.");
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


/* ===== IDIOMAS DE JACKIE'S BOUTIQUE ===== */

let idiomaActual = "es";

function cambiarIdioma(idioma) {
    idiomaActual = idioma;
actualizarCarrito();

    // Cambiar idioma del documento
    document.documentElement.lang = idioma;

    // Botones activos
    document.getElementById("btn-es").classList.toggle(
        "activo", idioma === "es"
    );

    document.getElementById("btn-en").classList.toggle(
        "activo", idioma === "en"
    );

    // Navegación
    const enlaces = document.querySelectorAll("nav a");

    if (idioma === "en") {

        document.querySelector("#inicio p").textContent =
    "Discover our collection of genuine leather handbags, created for women who seek elegance, personality, and a unique style.";

document.querySelector("#inicio a").textContent =
    "View Collection";
        enlaces[0].textContent = "Home";
        enlaces[1].textContent = "Collection";
        enlaces[2].textContent = "Our Story";
        enlaces[3].textContent = "Contact Us";

        // Carrito en inglés
enlaces[4].childNodes[0].textContent = "🛒 Cart (";

// Título del carrito en inglés
document.querySelector("#carrito h2").textContent =
    "🛒 Your Cart";

    // Botón de compra en inglés
document.getElementById("finalizar-compra").textContent =
    "Proceed to Checkout";

    document.querySelector("#checkout h3").textContent =
    "Complete Your Purchase";

    document.querySelector("#checkout p").firstChild.textContent =
    "Order Total: ";

    document.querySelector("#checkout p:nth-of-type(2)").textContent =
    "Select your payment method:";

    document.querySelector(".aviso-pedido").textContent =
    "Important: Sending your order does not reserve the handbag. Your order will remain pending until we receive and confirm your payment.";
// Botones para enviar el pedido en inglés
document.querySelector('#confirmar-pedido button[onclick*="sms"]').textContent =
    "📱 Send by Text";

document.querySelector('#confirmar-pedido button[onclick*="email"]').textContent =
    "✉️ Send by Email";

        // Encabezado principal
        document.querySelector("#inicio h1").textContent =
            "100% Genuine Leather Handbags";

            // Colección en inglés
document.querySelector("#coleccion h2").textContent =
    "Our Collection";

document.querySelector(".coleccion-intro").textContent =
    "Discover unique designs made from 100% genuine leather, carefully selected to highlight your style and personality.";

    } else {
        enlaces[0].textContent = "Inicio";
        enlaces[1].textContent = "Colección";
        enlaces[2].textContent = "Nuestra Historia";
        enlaces[3].textContent = "Contáctanos";

        // Carrito en español
enlaces[4].childNodes[0].textContent = "🛒 Carrito (";

// Título del carrito en español
document.querySelector("#carrito h2").textContent =
    "🛒 Tu Carrito";

    // Botón de compra en español
document.getElementById("finalizar-compra").textContent =
    "Finalizar compra";

    document.querySelector("#checkout h3").textContent =
    "Finaliza tu compra";

    document.querySelector("#checkout p").firstChild.textContent =
    "Total de tu pedido: ";

    document.querySelector("#checkout p:nth-of-type(2)").textContent =
    "Selecciona tu método de pago:";

    // Aviso importante en español
document.querySelector(".aviso-pedido").textContent =
    "Importante: enviar tu pedido no reserva la bolsa. Tu pedido quedará pendiente hasta que recibamos y confirmemos tu pago.";

// Botones para enviar el pedido en español
document.querySelector('#confirmar-pedido button[onclick*="sms"]').textContent =
    "📱 Enviar por mensaje";

document.querySelector('#confirmar-pedido button[onclick*="email"]').textContent =
    "✉️ Enviar por correo";

        document.querySelector("#inicio h1").textContent =
            "Bolsas de Piel 100% Genuina";
            // Colección en español
document.querySelector("#coleccion h2").textContent =
    "Nuestra Colección";

document.querySelector(".coleccion-intro").textContent =
    "Descubre diseños únicos elaborados en 100% piel, seleccionados especialmente para resaltar tu estilo y personalidad.";
    }
    // Actualizar las instrucciones de pago al cambiar idioma
if (metodoPagoSeleccionado !== "") {
    mostrarPago(metodoPagoSeleccionado);
}
}

// Español seleccionado al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    cambiarIdioma("es");
});
