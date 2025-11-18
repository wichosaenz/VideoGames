// Clase del jugador (héroe con jetpack)
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 32;
        this.vx = 0;
        this.vy = 0;
        this.speed = 3;
        this.jetpackPower = 0.4;
        this.gravity = 0.3;
        this.maxFallSpeed = 8;
        this.maxRiseSpeed = -6;
        this.direction = 1; // 1 = derecha, -1 = izquierda
        this.animFrame = 0;
        this.animTimer = 0;
        this.animSpeed = 8;
        this.invulnerable = false;
        this.invulnerableTimer = 0;
        this.invulnerableDuration = 90; // 1.5 segundos
        this.shootCooldown = 0;
        this.shootCooldownMax = 15; // Cadencia de disparo
        this.dynamiteCooldown = 0;
        this.dynamiteCooldownMax = 30;
    }

    update(input, collisionDetector) {
        // Actualizar timers
        this.animTimer++;
        if (this.animTimer >= this.animSpeed) {
            this.animFrame = (this.animFrame + 1) % 4;
            this.animTimer = 0;
        }

        if (this.invulnerable) {
            this.invulnerableTimer++;
            if (this.invulnerableTimer >= this.invulnerableDuration) {
                this.invulnerable = false;
                this.invulnerableTimer = 0;
            }
        }

        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }

        if (this.dynamiteCooldown > 0) {
            this.dynamiteCooldown--;
        }

        // Movimiento horizontal
        this.vx = 0;
        if (input.left) {
            this.vx = -this.speed;
            this.direction = -1;
        }
        if (input.right) {
            this.vx = this.speed;
            this.direction = 1;
        }

        // Jetpack (volar hacia arriba)
        if (input.up) {
            this.vy -= this.jetpackPower;
            if (this.vy < this.maxRiseSpeed) {
                this.vy = this.maxRiseSpeed;
            }
        } else {
            // Gravedad cuando no se usa el jetpack
            this.vy += this.gravity;
            if (this.vy > this.maxFallSpeed) {
                this.vy = this.maxFallSpeed;
            }
        }

        // Descenso más rápido al presionar abajo
        if (input.down && !input.space) {
            this.vy += this.gravity * 2;
        }

        // Aplicar velocidades
        const newX = this.x + this.vx;
        const newY = this.y + this.vy;

        // Verificar colisiones horizontales
        if (!collisionDetector.checkWallCollision(newX, this.y, this.width, this.height)) {
            this.x = newX;
        } else {
            this.vx = 0;
        }

        // Verificar colisiones verticales
        if (!collisionDetector.checkWallCollision(this.x, newY, this.width, this.height)) {
            this.y = newY;
        } else {
            if (this.vy > 0) {
                // Aterrizaje
                this.vy = 0;
            } else if (this.vy < 0) {
                // Golpe con techo
                this.vy = 0;
            }
        }

        // Limitar al área de juego
        this.x = Utils.clamp(this.x, 0, 800 - this.width);
        this.y = Utils.clamp(this.y, 0, 600 - this.height);
    }

    takeDamage() {
        if (!this.invulnerable) {
            this.invulnerable = true;
            this.invulnerableTimer = 0;
            return true; // Indica que se recibió daño
        }
        return false;
    }

    canShoot() {
        return this.shootCooldown === 0;
    }

    shoot() {
        if (this.canShoot()) {
            this.shootCooldown = this.shootCooldownMax;
            return true;
        }
        return false;
    }

    canPlaceDynamite() {
        return this.dynamiteCooldown === 0;
    }

    placeDynamite() {
        if (this.canPlaceDynamite()) {
            this.dynamiteCooldown = this.dynamiteCooldownMax;
            return true;
        }
        return false;
    }

    draw(ctx, particleSystem) {
        // Efecto de parpadeo cuando es invulnerable
        if (this.invulnerable && Math.floor(this.invulnerableTimer / 5) % 2 === 0) {
            return; // No dibujar para crear efecto de parpadeo
        }

        ctx.save();

        // Si está volando, crear efecto de llamas del jetpack
        if (this.vy < 0) {
            particleSystem.createJetpackFlame(
                this.x + this.width / 2 - 2,
                this.y + this.height
            );
        }

        // Dibujar el héroe
        // Cuerpo (traje naranja/rojo)
        ctx.fillStyle = '#ff6600';
        ctx.fillRect(this.x + 6, this.y + 12, 12, 16);

        // Casco (blanco)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 6, this.y + 4, 12, 10);

        // Visor (azul transparente)
        ctx.fillStyle = '#00aaff';
        ctx.fillRect(this.x + 7, this.y + 7, 10, 5);

        // Jetpack (gris metálico)
        ctx.fillStyle = '#888888';
        ctx.fillRect(this.x + 4, this.y + 14, 4, 10);
        ctx.fillRect(this.x + 16, this.y + 14, 4, 10);

        // Detalles del jetpack
        ctx.fillStyle = '#666666';
        ctx.fillRect(this.x + 5, this.y + 16, 2, 6);
        ctx.fillRect(this.x + 17, this.y + 16, 2, 6);

        // Piernas
        ctx.fillStyle = '#ff6600';
        const legOffset = Math.sin(this.animFrame) * 2;
        ctx.fillRect(this.x + 8, this.y + 28, 4, 4);
        ctx.fillRect(this.x + 12, this.y + 28, 4, 4);

        // Brazos
        ctx.fillStyle = '#ff6600';
        if (this.direction === 1) {
            // Brazo derecho extendido (para disparar)
            ctx.fillRect(this.x + 18, this.y + 14, 4, 8);
        } else {
            // Brazo izquierdo extendido
            ctx.fillRect(this.x + 2, this.y + 14, 4, 8);
        }

        // Brazo otro lado
        ctx.fillRect(this.x + 6, this.y + 16, 4, 6);

        // Arma láser (pequeña)
        ctx.fillStyle = '#00ffff';
        if (this.direction === 1) {
            ctx.fillRect(this.x + 22, this.y + 16, 4, 2);
        } else {
            ctx.fillRect(this.x - 2, this.y + 16, 4, 2);
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

    getShootPosition() {
        if (this.direction === 1) {
            return {
                x: this.x + this.width,
                y: this.y + 16
            };
        } else {
            return {
                x: this.x - 12,
                y: this.y + 16
            };
        }
    }

    getDynamitePosition() {
        return {
            x: this.x + this.width / 2 - 8,
            y: this.y + this.height
        };
    }
}
