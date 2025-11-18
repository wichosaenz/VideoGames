// Sistema de manejo de entrada de teclado
class Input {
    constructor() {
        this.keys = {};
        this.prevKeys = {};

        // Escuchar eventos de teclado
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;

            // Prevenir scroll con las flechas
            if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    // Verificar si una tecla está presionada
    isPressed(keyCode) {
        return this.keys[keyCode] || false;
    }

    // Verificar si la tecla fue presionada en este frame (para acciones únicas)
    isJustPressed(keyCode) {
        return this.keys[keyCode] && !this.prevKeys[keyCode];
    }

    // Actualizar estado de teclas previas
    update() {
        this.prevKeys = { ...this.keys };
    }

    // Métodos de conveniencia para controles del juego
    get left() {
        return this.isPressed('ArrowLeft');
    }

    get right() {
        return this.isPressed('ArrowRight');
    }

    get up() {
        return this.isPressed('ArrowUp');
    }

    get down() {
        return this.isPressed('ArrowDown');
    }

    get space() {
        return this.isPressed('Space');
    }

    get spaceJustPressed() {
        return this.isJustPressed('Space');
    }

    // Combinación de teclas para dinamita (Space + Down)
    get dynamiteCombo() {
        return this.isPressed('Space') && this.isPressed('ArrowDown');
    }

    // Para reiniciar el juego
    get enter() {
        return this.isJustPressed('Enter');
    }
}
