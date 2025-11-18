// Punto de entrada del juego
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');

    if (!canvas) {
        console.error('No se pudo encontrar el canvas del juego');
        return;
    }

    // Verificar soporte de canvas
    if (!canvas.getContext) {
        alert('Tu navegador no soporta HTML5 Canvas. Por favor, actualiza tu navegador.');
        return;
    }

    // Crear y ejecutar el juego
    const game = new Game(canvas);
    game.run();

    // Mensaje de bienvenida en consola
    console.log('%c🎮 H.E.R.O. Game Loaded Successfully! 🎮', 'color: #00ffff; font-size: 20px; font-weight: bold;');
    console.log('%cHelicopter Emergency Rescue Operation', 'color: #ffff00; font-size: 14px;');
    console.log('%cControles:', 'color: #00ff00; font-size: 12px; font-weight: bold;');
    console.log('  ← → : Mover');
    console.log('  ↑   : Volar (Jetpack)');
    console.log('  ↓   : Descender');
    console.log('  ESPACIO : Disparar Láser');
    console.log('  ESPACIO + ↓ : Colocar Dinamita');
    console.log('%c¡Buena suerte rescatando a los mineros! 🦸', 'color: #ff8800; font-size: 12px;');
});

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
        console.log('Juego pausado (pestaña no visible)');
    } else {
        console.log('Juego reanudado');
    }
});
