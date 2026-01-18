document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM (en español)
    const listaLenguajes = document.getElementById('lista-lenguajes');
    const listaParadigmas = document.getElementById('lista-paradigmas');
    const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
    const vistaDetalle = document.getElementById('vista-detalle');
    const cabecerasAcordeon = document.querySelectorAll('.cabecera-acordeon');
    const contenedorPrincipal = document.querySelector('.contenido-principal');

    // 1. Renderizar Menú Lateral
    function renderizarMenu() {
        // Lenguajes
        datosContenido.lenguajes.forEach(item => {
            const enlace = document.createElement('div');
            enlace.className = 'item-nav';
            enlace.textContent = item.nombre;
            enlace.dataset.id = item.id;
            enlace.dataset.tipo = 'lenguaje';
            enlace.addEventListener('click', () => mostrarContenido(item));
            listaLenguajes.appendChild(enlace);
        });

        // Paradigmas
        datosContenido.paradigmas.forEach(item => {
            const enlace = document.createElement('div');
            enlace.className = 'item-nav';
            enlace.textContent = item.nombre;
            enlace.dataset.id = item.id;
            enlace.dataset.tipo = 'paradigma';
            enlace.addEventListener('click', () => mostrarContenido(item));
            listaParadigmas.appendChild(enlace);
        });
    }

    // 2. Lógica del Acordeón (ELIMINADA - Diseño Plano)
    
    // 3. Mostrar Contenido Detallado
    function mostrarContenido(datos) {
        // Gestionar estado activo del menú
        document.querySelectorAll('.item-nav').forEach(el => el.classList.remove('activo'));
        const itemActivo = document.querySelector(`.item-nav[data-id="${datos.id}"]`);
        if (itemActivo) itemActivo.classList.add('activo');

        // Transición de pantallas
        pantallaBienvenida.style.display = 'none';
        vistaDetalle.classList.remove('oculto');
        vistaDetalle.classList.add('seccion-activa');
        
        // Scroll al inicio
        contenedorPrincipal.scrollTop = 0;

        // Construir listas HTML
        const listaUsos = datos.usos.map(uso => `<li>${uso}</li>`).join('');
        const listaPros = datos.pros.map(pro => `<li>${pro}</li>`).join('');
        const listaContras = datos.contras.map(contra => `<li>${contra}</li>`).join('');

        // Generar HTML del detalle
        vistaDetalle.innerHTML = `
            <header class="cabecera-detalle">
                <span class="etiqueta-tipo">${datos.etiqueta}</span>
                <h1 class="titulo-detalle">${datos.nombre}</h1>
                <p class="descripcion-detalle">${datos.descripcion}</p>
            </header>

            <div class="bloque-seccion">
                <h2>Historia y Origen</h2>
                <p>${datos.historia}</p>
            </div>

            <div class="bloque-seccion">
                <h2>Usos Principales</h2>
                <ul style="padding-left: 1.5rem;">
                    ${listaUsos}
                </ul>
            </div>

            <div class="bloque-seccion">
                <h2>Análisis</h2>
                <div class="lista-pros-contras">
                    <div class="lista-columna">
                        <h4>Ventajas</h4>
                        <ul class="lista-check">
                            ${listaPros}
                        </ul>
                    </div>
                    <div class="lista-columna">
                        <h4>Desventajas</h4>
                        <ul class="lista-cross">
                            ${listaContras}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="bloque-seccion">
                <h2>Código de Ejemplo</h2>
                <pre class="bloque-codigo"><code>${datos.ejemplo}</code></pre>
            </div>
        `;

        // Reiniciar animación
        vistaDetalle.style.animation = 'none';
        vistaDetalle.offsetHeight; /* trigger reflow */
        vistaDetalle.style.animation = 'fadeIn 0.5s ease forwards';
    }

    // Inicializar
    renderizarMenu();
});
