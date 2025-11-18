// Utilidades generales del juego
const Utils = {
    // Verificar colisión entre dos rectángulos
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    },

    // Verificar colisión circular
    checkCircleCollision(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < circle1.radius + circle2.radius;
    },

    // Obtener distancia entre dos puntos
    getDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },

    // Obtener ángulo entre dos puntos
    getAngle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },

    // Restringir valor entre min y max
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    // Interpolación lineal
    lerp(start, end, amount) {
        return start + (end - start) * amount;
    },

    // Número aleatorio entre min y max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Número entero aleatorio entre min y max
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Obtener elemento aleatorio de un array
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
};
