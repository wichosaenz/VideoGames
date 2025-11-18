// Punto de entrada del juego con manejo de errores mejorado
(function() {
    'use strict';

    console.log('%c🎮 Iniciando H.E.R.O. Game...', 'color: #00ffff; font-size: 16px; font-weight: bold;');

    // Función para inicializar el juego
    function initGame() {
        try {
            console.log('Buscando canvas...');
            const canvas = document.getElementById('gameCanvas');

            if (!canvas) {
                throw new Error('No se pudo encontrar el canvas del juego (#gameCanvas)');
            }

            console.log('Canvas encontrado:', canvas);

            // Verificar soporte de canvas
            if (!canvas.getContext) {
                throw new Error('Tu navegador no soporta HTML5 Canvas. Por favor, actualiza tu navegador.');
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                throw new Error('No se pudo obtener el contexto 2D del canvas');
            }

            console.log('Contexto 2D obtenido correctamente');

            // Verificar que todas las clases necesarias están disponibles
            const requiredClasses = [
                'Input', 'ParticleSystem', 'Renderer',
                'HighScoreManager', 'Game'
            ];

            for (const className of requiredClasses) {
                if (typeof window[className] === 'undefined') {
                    throw new Error(`Clase requerida no encontrada: ${className}`);
                }
                console.log(`✓ ${className} disponible`);
            }

            // Crear y ejecutar el juego
            console.log('Creando instancia del juego...');
            const game = new Game(canvas);

            console.log('Juego creado, estado inicial:', game.state);
            console.log('Iniciando loop del juego...');

            game.run();

            console.log('%c✓ Juego iniciado correctamente!', 'color: #00ff00; font-size: 14px; font-weight: bold;');
            console.log('%cControles:', 'color: #ffff00; font-size: 12px; font-weight: bold;');
            console.log('  ← → : Mover');
            console.log('  ↑   : Volar (Jetpack)');
            console.log('  ↓   : Descender');
            console.log('  ESPACIO : Disparar Láser');
            console.log('  ESPACIO + ↓ : Colocar Dinamita');
            console.log('  ESC : Volver al menú');
            console.log('  ENTER : Iniciar/Confirmar');

        } catch (error) {
            console.error('%c✗ Error al inicializar el juego:', 'color: #ff0000; font-size: 14px; font-weight: bold;');
            console.error(error);

            // Mostrar error en la página
            const errorDiv = document.getElementById('error-message');
            if (errorDiv) {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = '<strong>Error al inicializar el juego:</strong><br>' +
                                    error.message + '<br>' +
                                    '<small>Revisa la consola del navegador (F12) para más detalles.</small>';
            } else {
                alert('Error al inicializar el juego:\n' + error.message + '\n\nRevisa la consola del navegador (F12) para más detalles.');
            }
        }
    }

    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGame);
        console.log('Esperando a que el DOM esté listo...');
    } else {
        // El DOM ya está listo
        console.log('DOM ya está listo, iniciando inmediatamente...');
        initGame();
    }

    // Prevenir comportamientos por defecto del navegador
    window.addEventListener('keydown', (e) => {
        // Prevenir scroll con flechas y espacio
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
            e.preventDefault();
        }
    });

    // Manejar cambio de visibilidad de la pestaña
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('⏸️ Juego pausado (pestaña no visible)');
        } else {
            console.log('▶️ Juego reanudado');
        }
    });

})();
