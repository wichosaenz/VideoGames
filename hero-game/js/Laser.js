// Clase para los disparos láser del jugador
class Laser {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction; // 1 = derecha, -1 = izquierda
        this.width = 12;
        this.height = 4;
        this.speed = 8;
        this.active = true;
        this.color = '#00ffff';
    }

    update(collisionDetector) {
        this.x += this.speed * this.direction;

        // Verificar colisión con paredes
        if (collisionDetector.checkWallCollision(this.x, this.y, this.width, this.height)) {
            this.active = false;
        }

        // Desactivar si sale de los límites
        if (this.x < -20 || this.x > 820) {
            this.active = false;
        }
    }

    draw(ctx) {
        // Láser con efecto de brillo
        ctx.save();

        // Brillo exterior
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;

        // Cuerpo del láser
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Centro brillante
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 2, this.y + 1, this.width - 4, this.height - 2);

        ctx.restore();
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
