// Punto de entrada del juego - VERSION SIMPLIFICADA Y ROBUSTA
console.log('%c🎮 H.E.R.O. Game - Inicializando...', 'color: #00ffff; font-size: 16px; font-weight: bold;');

// Variable global para el juego
let heroGame = null;

// Función para inicializar el juego
function initHeroGame() {
    console.log('Iniciando initHeroGame()...');

    try {
        // Paso 1: Verificar que el canvas existe
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) {
            throw new Error('Canvas no encontrado en el DOM');
        }
        console.log('✓ Canvas encontrado');

        // Paso 2: Verificar soporte de Canvas
        if (!canvas.getContext) {
            throw new Error('Tu navegador no soporta HTML5 Canvas');
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('No se pudo obtener contexto 2D');
        }
        console.log('✓ Contexto 2D disponible');

        // Paso 3: Verificar que TODAS las clases necesarias están cargadas
        const requiredClasses = {
            'Input': Input,
            'ParticleSystem': ParticleSystem,
            'Renderer': Renderer,
            'HighScoreManager': HighScoreManager,
            'Game': Game,
            'Player': Player,
            'Enemy': Enemy,
            'Level': Level,
            'Laser': Laser,
            'Dynamite': Dynamite,
            'CollisionDetector': CollisionDetector
        };

        for (const [name, constructor] of Object.entries(requiredClasses)) {
            if (typeof constructor === 'undefined') {
                throw new Error(`Clase ${name} no está definida. Verifica que ${name.toLowerCase()}.js se haya cargado correctamente.`);
            }
            console.log(`✓ ${name} disponible`);
        }

        // Paso 4: Verificar Utils
        if (typeof Utils === 'undefined') {
            throw new Error('Utils no está definido. Verifica que utils.js se haya cargado correctamente.');
        }
        console.log('✓ Utils disponible');

        // Paso 5: Crear instancia del juego
        console.log('Creando instancia de Game...');
        heroGame = new Game(canvas);

        if (!heroGame) {
            throw new Error('No se pudo crear la instancia del juego');
        }
        console.log('✓ Instancia de Game creada');

        // Paso 6: Iniciar el loop del juego
        console.log('Iniciando loop del juego...');
        heroGame.run();

        console.log('%c✓ ¡JUEGO INICIADO CORRECTAMENTE!', 'color: #00ff00; font-size: 16px; font-weight: bold;');
        console.log('%cControles:', 'color: #ffff00; font-size: 12px; font-weight: bold;');
        console.log('  ENTER : Iniciar juego');
        console.log('  ESC   : Volver al menú');
        console.log('  ← →   : Mover');
        console.log('  ↑     : Volar (Jetpack)');
        console.log('  ↓     : Descender');
        console.log('  SPACE : Disparar');
        console.log('  SPACE+↓ : Dinamita');

    } catch (error) {
        console.error('%c✗ ERROR AL INICIALIZAR:', 'color: #ff0000; font-size: 16px; font-weight: bold;');
        console.error('Mensaje:', error.message);
        console.error('Stack:', error.stack);

        // Mostrar error en la página
        showError(error.message);
    }
}

// Función para mostrar errores en la página
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = `
            <strong>❌ Error al inicializar el juego:</strong><br>
            ${message}<br><br>
            <small>Abre la consola del navegador (F12) para más detalles.</small>
        `;
    }
}

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
    console.log('DOM aún cargando, esperando DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initHeroGame);
} else {
    console.log('DOM ya cargado, iniciando inmediatamente...');
    // Pequeño delay para asegurar que todos los scripts se han parseado
    setTimeout(initHeroGame, 100);
}

// Prevenir comportamientos por defecto del navegador
window.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
    }
});

// Log cuando la ventana está completamente cargada
window.addEventListener('load', function() {
    console.log('✓ Ventana completamente cargada (incluyendo todos los recursos)');
});
