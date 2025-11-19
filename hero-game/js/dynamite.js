// Clase para la dinamita
class Dynamite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.vy = 2; // Velocidad de caída
        this.gravity = 0.3;
        this.fuseTime = 90; // Frames hasta la explosión (1.5 segundos a 60fps)
        this.maxFuseTime = 90;
        this.active = true;
        this.exploded = false;
        this.explosionRadius = 64;
        this.grounded = false;
    }

    update(collisionDetector) {
        if (this.exploded) return;

        // Reducir tiempo de mecha
        this.fuseTime--;

        // Si la mecha se acabó, explotar
        if (this.fuseTime <= 0) {
            this.explode(collisionDetector);
            return;
        }

        // Física de caída si no está en el suelo
        if (!this.grounded) {
            this.vy += this.gravity;
            this.y += this.vy;

            // Verificar colisión con el suelo
            if (collisionDetector.checkWallCollision(this.x, this.y, this.width, this.height)) {
                this.y -= this.vy;
                this.vy = 0;
                this.grounded = true;
            }

            // Límite inferior
            if (this.y > 600) {
                this.active = false;
            }
        }
    }

    explode(collisionDetector) {
        this.exploded = true;
        this.active = false;

        // Destruir paredes en el radio de explosión
        const tiles = collisionDetector.getDestructibleTilesInRadius(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.explosionRadius
        );

        tiles.forEach(tile => {
            collisionDetector.level.tiles[tile.y][tile.x] = 0;
        });

        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            radius: this.explosionRadius
        };
    }

    draw(ctx) {
        if (this.exploded) return;

        // Dibujar dinamita (estilo de cartucho rojo con mecha)
        ctx.save();

        // Cuerpo rojo
        const blinkRate = Math.max(5, Math.floor(this.fuseTime / 3));
        const shouldBlink = Math.floor(this.fuseTime / blinkRate) % 2 === 0;

        ctx.fillStyle = shouldBlink ? '#ff0000' : '#cc0000';
        ctx.fillRect(this.x + 4, this.y + 6, 8, 10);

        // Detalles
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(this.x + 4, this.y + 14, 8, 2);

        // Mecha (parpadeante)
        if (shouldBlink) {
            ctx.strokeStyle = '#ff8800';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x + 8, this.y + 6);
            ctx.lineTo(this.x + 8, this.y + 2);
            ctx.stroke();

            // Chispa en la punta
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(this.x + 7, this.y + 1, 2, 2);
        }

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

    getExplosionBounds() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            radius: this.explosionRadius
        };
    }
}
