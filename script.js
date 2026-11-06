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

    
const envio = calcularEnvio();

if (envio === null) {
  
totalCarrito.textContent = total +
  (idiomaActual === "en"
    ? " + shipping pending"
    : " + envío pendiente");
} else {
  totalCarrito.textContent = (total + envio).toFixed(2);
}

}

function calcularEnvio() {
  const zip = document.getElementById("zip-code").value.trim();
  const costoEnvio = document.getElementById("costo-envio");
const ingles = idiomaActual === "en";

  if (!/^\d{5}$/.test(zip)) {
    costoEnvio.textContent = ingles
  ? "Please enter a valid 5-digit ZIP Code."
  : "Ingresa un ZIP Code válido de 5 dígitos.";
    return null;
  }

  if (zip === "68850") {
   
costoEnvio.textContent = ingles
  ? "FREE local delivery"
  : "Entrega local GRATIS";
    return 0;
  }

  
costoEnvio.textContent = ingles
  ? "USPS Shipping: $10.00"
  : "Envío USPS: $10.00";
  return 10;
}


document.getElementById("zip-code").addEventListener("input", function () {
  actualizarCarrito();

  const checkout = document.getElementById("checkout");

  if (checkout.style.display === "block") {
    const envio = calcularEnvio();
    const checkoutTotal = document.getElementById("checkout-total");

    if (envio === null) {
      checkoutTotal.textContent =
        idiomaActual === "en"
          ? "Shipping pending"
          : "Envío pendiente";
    } else {
      let total = 0;

      carrito.forEach(producto => {
        total += producto.precio;
      });

      checkoutTotal.textContent = "$" + (total + envio).toFixed(2);
    }
  }
});


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

const envio = calcularEnvio();

if (envio === null) {
  
mostrarNotificacion(
  idiomaActual === "en"
    ? "⚠ Please enter a valid ZIP Code before continuing."
    : "⚠ Ingresa un ZIP Code válido antes de continuar."
);
  document.getElementById("zip-code").focus();
  return;
}

    const checkout = document.getElementById("checkout");
    const checkoutTotal = document.getElementById("checkout-total");
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio;
    });

    checkoutTotal.textContent = "$" + (total + envio).toFixed(2);
    checkout.style.display = "block";

mostrarNotificacion(
  idiomaActual === "en"
    ? "✓ Your order is ready to continue."
    : "✓ Tu pedido está listo para continuar."
);
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
            <p><a href="https://venmo.com/u/Perla-GarciaCavazos" target="_blank" rel="noopener noreferrer">Open Perla's Venmo profile</a></p>
            <p>After making your payment, contact us to confirm your order.</p>
        `;
    } else {
        instrucciones.innerHTML = `
            <h4>Pago con Venmo</h4>
            <p>Envía tu pago por Venmo al siguiente usuario:</p>
            <p><strong>@Perla-GarciaCavazos</strong></p>
            <p><a href="https://venmo.com/u/Perla-GarciaCavazos" target="_blank" rel="noopener noreferrer">Abrir el perfil de Venmo de Perla</a></p>
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
            <p><a href="https://cash.app/$perlagc1" target="_blank" rel="noopener noreferrer">Open Perla's Cash App profile</a></p>
            <p>After making your payment, contact us to confirm your order.</p>
        `;
    } else {
        instrucciones.innerHTML = `
            <h4>Pago con Cash App</h4>
            <p>Envía tu pago por Cash App al siguiente $Cashtag:</p>
            <p><strong>$perlagc1</strong></p>
            <p><a href="https://cash.app/$perlagc1" target="_blank" rel="noopener noreferrer">Abrir el perfil de Cash App de Perla</a></p>
            <p>Después de realizar el pago, contáctanos para confirmar tu pedido.</p>
        `;
    }

    instrucciones.style.display = "block";
}

const botonConfirmar = document.getElementById("confirmar-pedido");
botonConfirmar.style.display = "inline-block";

    
mostrarNotificacion(
  idiomaActual === "en"
    ? "✓ You selected " + metodo + " as your payment method."
    : "✓ Seleccionaste " + metodo + " como método de pago."
);
}

function confirmarPedido(tipo) {

    if (carrito.length === 0) {
        mostrarNotificacion(
            idiomaActual === "en"
                ? "⚠ Your cart is empty."
                : "⚠ Tu carrito está vacío."
        );
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

const envio = calcularEnvio();

if (envio === null) {
  mostrarNotificacion("⚠ Ingresa un ZIP Code válido.");
  return;
}

const zip = document.getElementById("zip-code").value.trim();
const totalFinal = total + envio;

let resumenProductos = "";

carrito.forEach(producto => {
    resumenProductos += producto.nombre + " — $" + producto.precio + "\n";
});



const resumenPedido =
  (idiomaActual === "en"
    ? "Jackie's Boutique Order\n\n"
    : "Pedido de Jackie's Boutique\n\n") +
  resumenProductos +
  "\nZIP Code: " + zip +
  (idiomaActual === "en"
    ? "\nUSPS Shipping: $"
    : "\nEnvío USPS: $") + envio.toFixed(2) +
  "\nTotal: $" + totalFinal.toFixed(2) +
  (idiomaActual === "en"
    ? "\nPayment method: "
    : "\nMétodo de pago: ") + metodoPagoSeleccionado;

    const mensaje = encodeURIComponent(resumenPedido);

if (tipo === "sms") {
    window.location.href = "sms:13087460339?body=" + mensaje;
}

if (tipo === "email") {
    
const asunto = encodeURIComponent(
  idiomaActual === "en"
    ? "Jackie's Boutique Order"
    : "Pedido de Jackie's Boutique"
);

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

    
  // Traducciones de las tres Arely nuevas
  const traduccionesArely = {
    "Arely Dorada": {
      es: "Bolsa de piel 100% genuina con elegantes detalles artesanales en tono dorado.",
      en: "A 100% genuine leather handbag with elegant handcrafted details in a golden tone."
    },
    "Arely Azul Marino": {
      es: "Bolsa de piel 100% genuina en elegante tono azul marino, con detalles artesanales que resaltan su estilo.",
      en: "A 100% genuine leather handbag in an elegant navy blue shade, featuring handcrafted details."
    },
    "Arely Oscura": {
      es: "Bolsa de piel 100% genuina en tono oscuro, con detalles artesanales que le dan un estilo elegante y sofisticado.",
      en: "A 100% genuine leather handbag in a dark shade, featuring handcrafted details for an elegant, sophisticated look."
    }
  };

  document.querySelectorAll(".productos article").forEach(articulo => {
    const nombre = articulo.querySelector("h3")?.textContent.trim();
    const traduccion = traduccionesArely[nombre];

    if (traduccion) {
      const descripcion = articulo.querySelector("p");
      if (descripcion) {
        descripcion.textContent = traduccion[idioma];
      }
    }
  });

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

// Traducción de Bolsa Vaqueta
const descripcionBolsaVaqueta = document.querySelector(
  ".descripcion-bolsa-vaqueta"
);

if (descripcionBolsaVaqueta) {
  if (idioma === "en") {
    descripcionBolsaVaqueta.textContent =
      "Genuine leather handbag in a beautiful pink shade, " +
      "featuring gold-tone details and an elegant design.";
  } else {
    descripcionBolsaVaqueta.textContent =
      "Bolsa de piel genuina en tono rosa, " +
      "con detalles dorados y diseño elegante.";
  }
}

// Traducción de Briana Oscura
const descripcionBrianaOscura = document.querySelector(
  ".descripcion-briana-oscura"
);

if (descripcionBrianaOscura) {
  if (idioma === "en") {
    descripcionBrianaOscura.textContent =
      "Genuine leather handbag in a dark shade, " +
      "featuring an elegant design and handcrafted details.";
  } else {
    descripcionBrianaOscura.textContent =
      "Bolsa de piel genuina en tono oscuro, " +
      "con un diseño elegante y detalles artesanales.";
  }
}

// Traducción de Fernanda Oscura
const descripcionFernandaOscura = document.querySelector(
  ".descripcion-fernanda-oscura"
);

if (descripcionFernandaOscura) {
  if (idioma === "en") {
    descripcionFernandaOscura.textContent =
      "Genuine leather handbag in black, " +
      "featuring floral embossed patterns and elegant details.";
  } else {
    descripcionFernandaOscura.textContent =
      "Bolsa de piel genuina en tono negro, " +
      "con grabados florales y detalles elegantes.";
  }
}

// Traducción de Lucia
const descripcionLucia = document.querySelector(
  ".descripcion-lucia"
);

if (descripcionLucia) {
  if (idioma === "en") {
    descripcionLucia.textContent =
      "Genuine leather handbag with an elegant " +
      "and versatile design, perfect for any occasion.";
  } else {
    descripcionLucia.textContent =
      "Bolsa de piel genuina con un diseño elegante " +
      "y versátil para cualquier ocasión.";
  }
}

// Traducción de Paloma Azul Mezclilla
const descripcionPalomaAzulMezclilla = document.querySelector(
  ".descripcion-paloma-azul-mezclilla"
);

if (descripcionPalomaAzulMezclilla) {
  if (idioma === "en") {
    descripcionPalomaAzulMezclilla.textContent =
      "Genuine leather handbag in a denim-blue shade, " +
      "featuring an elegant and versatile design.";
  } else {
    descripcionPalomaAzulMezclilla.textContent =
      "Bolsa de piel genuina en tono azul mezclilla, " +
      "con un diseño elegante y versátil.";
  }
}

// Traducción de Rocio Azul con Dorado
const descripcionRocioAzulDorado = document.querySelector(
  ".descripcion-rocio-azul-dorado"
);

if (descripcionRocioAzulDorado) {
  if (idioma === "en") {
    descripcionRocioAzulDorado.textContent =
      "Genuine leather handbag in blue with gold-tone " +
      "details and an elegant design.";
  } else {
    descripcionRocioAzulDorado.textContent =
      "Bolsa de piel genuina en tono azul con " +
      "detalles dorados y un diseño elegante.";
  }
}

// Traducción de Rocio Oscuro
const descripcionRocioOscuro = document.querySelector(
  ".descripcion-rocio-oscuro"
);

if (descripcionRocioOscuro) {
  if (idioma === "en") {
    descripcionRocioOscuro.textContent =
      "Genuine leather handbag in a dark shade, " +
      "featuring an elegant and versatile design.";
  } else {
    descripcionRocioOscuro.textContent =
      "Bolsa de piel genuina en tono oscuro, " +
      "con un diseño elegante y versátil.";
  }
}

// Traducción de Sobre 2
const descripcionSobre2 = document.querySelector(
  ".descripcion-sobre-2"
);

if (descripcionSobre2) {
  if (idioma === "en") {
    descripcionSobre2.textContent =
      "Genuine leather handbag with an elegant, " +
      "practical, and versatile design for any occasion.";
  } else {
    descripcionSobre2.textContent =
      "Bolsa de piel genuina con un diseño elegante, " +
      "práctico y versátil para cualquier ocasión.";
  }
}

// Traducción de Valeria
const descripcionValeria = document.querySelector(
  ".descripcion-valeria"
);

if (descripcionValeria) {
  if (idioma === "en") {
    descripcionValeria.textContent =
      "Genuine leather handbag with an elegant " +
      "and versatile design, ideal for any occasion.";
  } else {
    descripcionValeria.textContent =
      "Bolsa de piel genuina con un diseño elegante " +
      "y versátil, ideal para cualquier ocasión.";
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
document.querySelectorAll(".productos article button:not(.ver-mas-fotos)").forEach(boton => {

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
   
document.querySelector('label[for="zip-code"]').textContent =
  "ZIP Code:";

const zipActual = document.getElementById("zip-code").value.trim();
const costoEnvioTexto = document.getElementById("costo-envio");

if (!/^\d{5}$/.test(zipActual)) {
  costoEnvioTexto.textContent =
    "Please enter a valid 5-digit ZIP Code.";
} else if (zipActual === "68850") {
  costoEnvioTexto.textContent = "FREE local delivery";
} else {
  costoEnvioTexto.textContent = "USPS Shipping: $10.00";
}
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
    document.querySelectorAll(".ver-mas-fotos").forEach(boton => {
        boton.textContent = idioma === "en" ? "View More Photos" : "Ver más fotos";
    });

    // Actualizar las instrucciones de pago al cambiar idioma
if (metodoPagoSeleccionado !== "") {
    mostrarPago(metodoPagoSeleccionado);
}
}

// Español seleccionado al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    cambiarIdioma("es");
})

/* GALERÍAS — independientes del carrito y de los pagos */
const fotosAdicionales = {

  

    
"Diana": [
  "Diana Collage.png",
  "Diana Portrait.png",
  "Diana side to side.png",
],

"Isabel": [
  "Isabel Collage.png",
  "Isabel Portrait.png",
  "Isabel side to side.png",
],

"Luna": [
  "Luna Collage.png",
  "Luna Portrait.png",
  "Luna side to side.png",
],

"Keli Grande": [
  "Keli Grande Collage.png",
  "Keli Grande Portrate.png",
  "Keli Grande 2.png"
],

"Sobre": [
  "Sobre Collage.png",
  "Sobre Portrait.png",
  "Sobre 1.png",
],

"Arely Dorada": [
  "Arely Beige Embossed Leather Handbag Collage.png",
  "Side-by-Side Arely Dorada Portrait.png",
  "Arely_tono_dorado.png"
],
  
"Arely Azul Marino": [
  "Arely Azul Marino Leather Handbag Showcase.png",
  "Arely Azul Marino (2).png",
  "Arely Azul Marino.png"
  ],
  
"Arely Oscura": [
  "Arely en oscuro.png",
  "Studio Diptych with Arely Oscuro Handbag.png",
  "Arely Black Leather Bag Collage.png"
],
        
"Cloe": [
  "Cloe Teal Embossed Leather Bag Collage.png",
  "Cloe Teal Embossed Handbag Style Showcase.png",
  "Cloe Teal Embossed Floral Handbag.png"
],
    "Cloe Chocolate": [
        "Cloe Chocolate Embossed Brown Purse.png",
        "Cloe Brown Leather Artisan Bag.png",
        "Side-by-Side Cloe Chocolate Portrait.png"
    ],
    "Cloe Gris": [
        "Cloe Gray Embossed Leather Bag Collage.png",
        "Cloe Gris  Floral Clutch.png",
        "Side-by-Side Cloe Gris Portraits.png"
    ],
    "Michel": [
        "Michel Pink Embossed Leather Handbag.png",
        "Michel rosa con toques dorados.png",
        "Studio Portrait With Michel Handbag.png"
    ],
    "Keli Rosa": [
  "Keli rosa.png",
  "Keli rosa2.png",
  "Keli Rosa Leather Handbag Collage.png"
],
    "Keli Azul": [
  "Keli azul.png",
  "Keli azul2.png",
  "Keli Azul Leather Handbag Showcase.png"
],
    "Jackie": [
        "Jacqui Fuchsia Handbag Showcase.png",
        "Jacqui Fuchsia Handbag Style Diptych.png",
        "Jacqui en Fushia (1).png"
    ],
    "Dafne": [
  "Dafne.png",
  "Dafne2.png",
  "Dafne Collage.png"
],
"Grecia": [
  "Grecia2.png",
  "Grecia4.png",
  "Grecia Collage.png"
],
"Juli": [
  "Juli.png",
  "Juli2.png",
  "Juli3.png"
],

"Perla": [
  "Perla.png",
  "Perla2.png",
  "Perla Collage.png"
],

"Dania": [
  "Dania portrait.png",
  "Dania_ Collage.png",
  "Dania1.png"
],

"Bolsa Vaqueta": [
  "Bolsa Vaqueta Portrait.png",
    "Bolsa Vaqueta Collage.png",
    "Bolsa Vaqueta side to side.png"
],

"Briana Oscura": [
  "Briana Oscura Collage.png",
  "Briana Oscura Portrait.png",
  "Briana Oscura side to side.png"
],

"Fernanda Oscura": [
  "Fernanda Oscura Collage.png",
  "Fernanda Oscura Portrait.png",
  "Fernanda Oscura side to side.png"
],

"Lucia": [
  "Lucia Collage.png",
  "Lucia portrait.png",
  "Lucia side to side.png"
],

"Paloma Azul Mezclilla": [
  "Paloma Azul Mezclilla Collage.png",
  "Paloma azul mezclilla portrait.png",
  "Paloma azul mezclilla side to side.png"
],

"Rocio Azul con Dorado": [
  "Rocío azul con dorado Collage.png",
  "Rocio azul con dorado portrait.png",
  "Rocio azul con dorado side to side.png"
],

"Rocio Oscuro": [
  "Rocio Oscuro Collage.png",
  "Rocio Oscuro Portrait.png",
  "Rocio oscuro side to side.png"
],

"Sobre 2": [
  "Sobre 2 Collage.png",
  "Sobre 2 Portrait.png",
  "Sobre 2 side to side.png"
],

"Valeria": [
  "Valeria Collage.png",
  "Valeria Portrait.png",
  "Valeria side to side.png"
],

"Carteron Dafne Chocolate": [
  "Carteron Dafne Chocolate Collage.png",
  "Carteron Dafne Chocolate Portrait.png",
  "Carteron Dafne Chocolate side to side.png"
],

"Carteron Dafne Gris Oscuro": [
  "Carteron Dafne Gris Oscuro Collage.png",
  "Carteron Dafne Gris Oscuro Portrait.png",
  "Carteron Dafne Gris Oscuro side to side.png"
]

};

let galeriaAnteriormenteEnfocado = null;

function abrirGaleria(boton) {
    const articulo = boton.closest("article");
    const nombre = boton.dataset.galeria;
    const principal = articulo.querySelector("img").getAttribute("src");
    const fotos = [principal, ...(fotosAdicionales[nombre] || []).map(archivo => "images/" + archivo)];
    if (!fotos.length) return;
    galeriaAnteriormenteEnfocado = boton;
    let indice = 0;

    const fondo = document.createElement("div");
    fondo.className = "galeria-fondo";
    fondo.setAttribute("role", "presentation");
    const panel = document.createElement("div");
    panel.className = "galeria-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", nombre);
    const titulo = document.createElement("h2");
    titulo.textContent = nombre;
    const cerrar = document.createElement("button");
    cerrar.className = "galeria-cerrar";
    cerrar.type = "button";
    cerrar.setAttribute("aria-label", idiomaActual === "en" ? "Close gallery" : "Cerrar galería");
    cerrar.textContent = "✕";
    const imagen = document.createElement("img");
    imagen.className = "galeria-imagen";
    const controles = document.createElement("div");
    controles.className = "galeria-controles";
    const anterior = document.createElement("button");
    anterior.type = "button";
    anterior.textContent = "❮";
    anterior.setAttribute("aria-label", idiomaActual === "en" ? "Previous photo" : "Foto anterior");
    const contador = document.createElement("span");
    contador.setAttribute("aria-live", "polite");
    const siguiente = document.createElement("button");
    siguiente.type = "button";
    siguiente.textContent = "❯";
    siguiente.setAttribute("aria-label", idiomaActual === "en" ? "Next photo" : "Siguiente foto");

    function actualizarFoto() {
        imagen.src = fotos[indice];
        imagen.alt = nombre + " — " + (indice + 1) + "/" + fotos.length;
        contador.textContent = (indice + 1) + " / " + fotos.length;
    }
    function cerrarGaleria() {
        document.removeEventListener("keydown", manejarTeclas);
        fondo.remove();
        document.body.style.overflow = "";
        galeriaAnteriormenteEnfocado?.focus();
    }
    function manejarTeclas(evento) {
        if (evento.key === "Escape") cerrarGaleria();
        if (evento.key === "ArrowLeft") { indice = (indice - 1 + fotos.length) % fotos.length; actualizarFoto(); }
        if (evento.key === "ArrowRight") { indice = (indice + 1) % fotos.length; actualizarFoto(); }
        if (evento.key === "Tab") {
            const botones = [cerrar, anterior, siguiente];
            const actual = botones.indexOf(document.activeElement);
            if (evento.shiftKey && actual <= 0) { evento.preventDefault(); siguiente.focus(); }
            else if (!evento.shiftKey && actual === 2) { evento.preventDefault(); cerrar.focus(); }
        }
    }
    anterior.onclick = () => { indice = (indice - 1 + fotos.length) % fotos.length; actualizarFoto(); };
    siguiente.onclick = () => { indice = (indice + 1) % fotos.length; actualizarFoto(); };
    cerrar.onclick = cerrarGaleria;
    fondo.onclick = evento => { if (evento.target === fondo) cerrarGaleria(); };
    controles.append(anterior, contador, siguiente);
    panel.append(cerrar, titulo, imagen, controles);
    fondo.append(panel);
    document.body.append(fondo);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", manejarTeclas);
    actualizarFoto();
    cerrar.focus();
}

document.querySelectorAll(".ver-mas-fotos").forEach(boton => {
  boton.addEventListener("click", function () {
    abrirGaleria(this);
  });
});
