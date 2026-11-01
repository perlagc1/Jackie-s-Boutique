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

    // Traducción de la descripción de Arely
const descripcionArely = document.querySelector(".descripcion-arely");

if (descripcionArely) {
    if (idioma === "en") {
        descripcionArely.textContent =
            "An elegant design crafted from 100% genuine leather, " +
            "featuring handcrafted details that highlight its unique " +
            "and sophisticated style.";
    } else {
        descripcionArely.textContent =
            "Un diseño elegante elaborado en 100% piel, " +
            "con detalles artesanales que resaltan su estilo " +
            "único y sofisticado.";
    }
    }

 // Traducción de Keli azul
const descripcionKeliAzul = document.querySelector(".descripcion-keli-azul");

if (descripcionKeliAzul) {
    if (idioma === "en") {
        descripcionKeliAzul.textContent =
            "Compact, elegant, and made from 100% genuine leather. " +
            "Perfect for carrying your essentials in style.";
    } else {
        descripcionKeliAzul.textContent =
            "Compacta, elegante y elaborada en 100% piel. " +
            "Perfecta para llevar lo esencial con estilo.";
    }
}

// Traducción de Keli rosa
const descripcionKeliRosa = document.querySelector(".descripcion-keli-rosa");

if (descripcionKeliRosa) {
    if (idioma === "en") {
        descripcionKeliRosa.textContent =
            "Small, feminine, and full of personality. " +
            "Made from 100% genuine leather with a standout design.";
    } else {
        descripcionKeliRosa.textContent =
            "Pequeña, femenina y llena de personalidad. " +
            "Elaborada en 100% piel con un diseño que destaca.";
    }
    }

    // Traducción de Perla
const descripcionPerla = document.querySelector(".descripcion-perla");

if (descripcionPerla) {
    if (idioma === "en") {
        descripcionPerla.textContent =
            "A striking and elegant design made from 100% genuine leather. " +
            "Its jade green color adds personality and distinction.";
    } else {
        descripcionPerla.textContent =
            "Un diseño llamativo y elegante en 100% piel. " +
            "Su tono verde jade aporta personalidad y distinción.";
    }
}

// Traducción de Juli
const descripcionJuli = document.querySelector(".descripcion-juli");

if (descripcionJuli) {
    if (idioma === "en") {
        descripcionJuli.textContent =
            "A charming piece made from 100% genuine leather, " +
            "featuring golden details that highlight its feminine style.";
    } else {
        descripcionJuli.textContent =
            "Una pieza encantadora elaborada en 100% piel, " +
            "con detalles dorados que resaltan su estilo femenino.";
    }
}

// Traducción de Dafne
const descripcionDafne = document.querySelector(".descripcion-dafne");

if (descripcionDafne) {
    if (idioma === "en") {
        descripcionDafne.textContent =
            "An elegant design crafted from 100% genuine leather, " +
            "featuring a beautiful cowhide detail that gives it " +
            "a unique and sophisticated style.";
    } else {
        descripcionDafne.textContent =
            "Un diseño elegante elaborado en 100% piel, " +
            "con un hermoso detalle de pelo de res que le da " +
            "un estilo único y sofisticado.";
    }
}

// Traducción de Michel
const descripcionMichel = document.querySelector(".descripcion-michel");

if (descripcionMichel) {
    if (idioma === "en") {
        descripcionMichel.textContent =
            "A 100% genuine leather handbag with a beautiful pink color " +
            "and golden details that give it a special and elegant touch.";
    } else {
        descripcionMichel.textContent =
            "Una cartera de 100% piel con un hermoso color " +
            "rosa y detalles dorados que le dan un toque " +
            "especial y elegante.";
    }
}

// Traducción de Sofi
const descripcionSofi = document.querySelector(".descripcion-sofi");

if (descripcionSofi) {
    if (idioma === "en") {
        descripcionSofi.textContent =
            "A classic and elegant design made from 100% genuine leather, " +
            "with a versatile style perfect for any occasion.";
    } else {
        descripcionSofi.textContent =
            "Un diseño clásico y elegante elaborado en 100% piel, " +
            "con un estilo versátil ideal para cualquier ocasión.";
    }
}

// Traducción de Grecia
const descripcionGrecia = document.querySelector(".descripcion-grecia");

if (descripcionGrecia) {
    if (idioma === "en") {
        descripcionGrecia.textContent =
            "A handcrafted design made from 100% genuine leather, " +
            "featuring elegant floral details that highlight " +
            "its unique and sophisticated style.";
    } else {
        descripcionGrecia.textContent =
            "Un diseño artesanal elaborado en 100% piel, " +
            "con elegantes detalles florales que resaltan " +
            "su estilo único y sofisticado.";
    }
}

// Traducción de Cloe Turquesa
const descripcionCloe = document.querySelector(".descripcion-cloe");

if (descripcionCloe) {
    if (idioma === "en") {
        descripcionCloe.textContent =
            "A handcrafted handbag made from 100% genuine leather, " +
            "featuring a beautiful floral design and a turquoise " +
            "color that highlights its unique style.";
    } else {
        descripcionCloe.textContent =
            "Una cartera artesanal elaborada en 100% piel, " +
            "con un hermoso diseño floral y un tono turquesa " +
            "que resalta su estilo único.";
    }
}

// Traducción de Cloe Chocolate
const descripcionCloeChocolate = document.querySelector(".descripcion-cloe-chocolate");

if (descripcionCloeChocolate) {
    if (idioma === "en") {
        descripcionCloeChocolate.textContent =
            "A handcrafted handbag made from 100% genuine leather, " +
            "featuring an elegant chocolate color and floral details " +
            "that highlight its classic and sophisticated style.";
    } else {
        descripcionCloeChocolate.textContent =
            "Una cartera artesanal elaborada en 100% piel, " +
            "con un elegante tono chocolate y detalles florales " +
            "que resaltan su estilo clásico y sofisticado.";
    }
}

// Traducción de Cloe Gris
const descripcionCloeGris = document.querySelector(".descripcion-cloe-gris");

if (descripcionCloeGris) {
    if (idioma === "en") {
        descripcionCloeGris.textContent =
            "A handcrafted handbag made from 100% genuine leather, " +
            "featuring an elegant gray color and floral details " +
            "that give it a modern and sophisticated style.";
    } else {
        descripcionCloeGris.textContent =
            "Una cartera artesanal elaborada en 100% piel, " +
            "con un elegante tono gris y detalles florales " +
            "que le dan un estilo moderno y sofisticado.";
    }
}

// Traducción de Keli Grande
const descripcionKeliGrande = document.querySelector(".descripcion-keli-grande");

if (descripcionKeliGrande) {
    if (idioma === "en") {
        descripcionKeliGrande.textContent =
            "A spacious and elegant handbag made from 100% genuine leather, " +
            "featuring a beautiful chocolate brown color and a " +
            "classic, sophisticated design.";
    } else {
        descripcionKeliGrande.textContent =
            "Una bolsa amplia y elegante elaborada en 100% piel, " +
            "con un hermoso tono café chocolate y un diseño " +
            "clásico y sofisticado.";
    }
}

// Traducción de Jackie
const descripcionJackie = document.querySelector(".descripcion-jackie");

if (descripcionJackie) {
    if (idioma === "en") {
        descripcionJackie.textContent =
            "A feminine and elegant handbag made from 100% genuine leather, " +
            "featuring a beautiful pink color and details that give it " +
            "a modern and sophisticated style.";
    } else {
        descripcionJackie.textContent =
            "Una bolsa femenina y elegante elaborada en 100% piel, " +
            "con un hermoso tono rosa y detalles que le dan " +
            "un estilo moderno y sofisticado.";
    }
}

// Traducción de Dania
const descripcionDania = document.querySelector(".descripcion-dania");

if (descripcionDania) {
    if (idioma === "en") {
        descripcionDania.textContent =
            "An elegant handbag made from 100% genuine leather, " +
            "featuring a beautiful floral design and brown-toned details " +
            "that highlight its unique and sophisticated style.";
    } else {
        descripcionDania.textContent =
            "Una bolsa elegante elaborada en 100% piel, " +
            "con un hermoso diseño floral y detalles en tono café " +
            "que resaltan su estilo único y sofisticado.";
    }
}

// Traducción de Sobre
const descripcionSobre = document.querySelector(".descripcion-sobre");

if (descripcionSobre) {
    if (idioma === "en") {
        descripcionSobre.textContent =
            "A handcrafted handbag made from 100% genuine leather, " +
            "featuring embossed cowhide hair details and fringe " +
            "that give it a unique and authentic style.";
    } else {
        descripcionSobre.textContent =
            "Una bolsa artesanal elaborada en 100% piel, " +
            "con detalle de pelo de res, grabado floral " +
            "y flecos que le dan un estilo único y auténtico.";
    }
}

// Traducción de Luna
const descripcionLuna = document.querySelector(".descripcion-luna");

if (descripcionLuna) {
    if (idioma === "en") {
        descripcionLuna.textContent =
            "An elegant handbag made from 100% genuine leather, " +
            "featuring beautiful embossed floral details and a warm " +
            "brown color that give it an artisanal and sophisticated style.";
    } else {
        descripcionLuna.textContent =
            "Una bolsa elegante elaborada en 100% piel, " +
            "con un hermoso grabado floral y un cálido tono café " +
            "que le dan un estilo artesanal y sofisticado.";
    }
}

// Traducción de Diana Grande
const descripcionDianaGrande = document.querySelector(".descripcion-diana-grande");

if (descripcionDianaGrande) {
    if (idioma === "en") {
        descripcionDianaGrande.textContent =
            "A spacious and elegant handbag made from 100% genuine leather, " +
            "featuring beautiful embossed floral patterns and handcrafted " +
            "details that highlight its classic and sophisticated style.";
    } else {
        descripcionDianaGrande.textContent =
            "Una bolsa amplia y elegante elaborada en 100% piel, " +
            "con un hermoso grabado floral y detalles artesanales " +
            "que resaltan su estilo clásico y sofisticado.";
    }
}

// Traducción de Isabel
const descripcionIsabel = document.querySelector(".descripcion-isabel");

if (descripcionIsabel) {
    if (idioma === "en") {
        descripcionIsabel.textContent =
            "An elegant and versatile handbag made from 100% genuine leather, " +
            "featuring a beautiful neutral color and handcrafted details " +
            "that give it a classic and sophisticated style.";
    } else {
        descripcionIsabel.textContent =
            "Una bolsa elegante y versátil elaborada en 100% piel, " +
            "con un hermoso tono neutro y detalles artesanales " +
            "que le dan un estilo clásico y sofisticado.";
    }
}


// Traducción de Nuestra Historia
const textosHistoria = {
    en: {
        titulo: "Our Story",
        p1: "Welcome to Jackie's Boutique, a space created to celebrate the style, beauty, and essence of every woman.",
        p2: "Our boutique was born from a love for 100% genuine leather handbags and designs that combine elegance, personality, and a touch of Mexican inspiration.",
        p3: "Each piece is carefully selected for women who want to carry something special that reflects their personal style.",
        lema: "Jackie's Boutique — Your style, your essence."
    },
    es: {
        titulo: "Nuestra Historia",
        p1: "Bienvenidas a Jackie's Boutique, un espacio creado para celebrar el estilo, la belleza y la esencia de cada mujer.",
        p2: "Nuestra boutique nace del gusto por las bolsas de 100% piel y por los diseños que combinan elegancia, personalidad y un toque de inspiración mexicana.",
        p3: "Cada pieza es elegida pensando en mujeres que quieren llevar consigo algo especial que refleje su propio estilo.",
        lema: "Jackie's Boutique — Tu estilo, tu esencia."
    }
};

const historia = textosHistoria[idioma];

document.querySelector(".titulo-historia").textContent = historia.titulo;
document.querySelector(".historia-1").textContent = historia.p1;
document.querySelector(".historia-2").textContent = historia.p2;
document.querySelector(".historia-3").textContent = historia.p3;
document.querySelector(".historia-lema").textContent = historia.lema;

// Traducción de Contáctanos
const textosContacto = {
    en: {
        titulo: "Contact Us",
        p1: "Interested in one of our handbags? We're here to help!",
        p2: "Contact us to learn more about our collection, availability, and upcoming designs.",
        telefono: "📱 Phone:",
        correo: "📧 Email:",
        final: "It will be our pleasure to assist you."
    },
    es: {
        titulo: "Contáctanos",
        p1: "¿Te interesa alguna de nuestras bolsas? Estamos aquí para ayudarte.",
        p2: "Escríbenos para conocer nuestra colección, disponibilidad y próximos diseños.",
        telefono: "📱 Teléfono:",
        correo: "📧 Correo:",
        final: "Será un placer atenderte."
    }
};

const contacto = textosContacto[idioma];

document.querySelector(".titulo-contacto").textContent = contacto.titulo;
document.querySelector(".contacto-1").textContent = contacto.p1;
document.querySelector(".contacto-2").textContent = contacto.p2;
document.querySelector(".contacto-telefono").textContent = contacto.telefono;
document.querySelector(".contacto-correo").textContent = contacto.correo;
document.querySelector(".contacto-final").textContent = contacto.final;

// Traducción del pie de página
const textosFooter = {
    en: {
        derechos: "© 2026 Jackie's Boutique. All rights reserved.",
        lema: "Your style, your essence."
    },
    es: {
        derechos: "© 2026 Jackie's Boutique. Todos los derechos reservados.",
        lema: "Tu estilo, tu esencia."
    }
};

const footer = textosFooter[idioma];

document.querySelector(".footer-derechos").textContent = footer.derechos;
document.querySelector(".footer-lema").textContent = footer.lema;

    // Traducir botones de los productos
document.querySelectorAll(".productos article button").forEach(boton => {

    if (boton.disabled || boton.classList.contains("agotado")) {
        boton.textContent = idioma === "en" ? "SOLD OUT" : "AGOTADO";
    } else {
        boton.textContent = idioma === "en"
            ? "Add to Cart 🛒"
            : "Agregar al carrito 🛒";
    }

});
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
})