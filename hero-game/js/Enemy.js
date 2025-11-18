// Clase base para enemigos
class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'bat', 'spider', 'snake'
        this.active = true;
        this.width = 24;
        this.height = 24;
        this.animFrame = 0;
        this.animTimer = 0;
        this.points = 100; // Puntos al destruir

        // Configuración por tipo
        this.setupByType();
    }

    setupByType() {
        switch (this.type) {
            case 'bat':
                this.speed = 1.5;
                this.movePattern = 'flying';
                this.color = '#8B4513';
                this.animSpeed = 5;
                this.amplitude = 40; // Amplitud del movimiento ondulante
                this.frequency = 0.05;
                this.initialY = this.y;
                this.direction = 1;
                break;

            case 'spider':
                this.speed = 0.5;
                this.movePattern = 'crawling';
                this.color = '#4B0082';
                this.animSpeed = 8;
                this.crawlDistance = 100;
                this.initialX = this.x;
                this.direction = 1;
                break;

            case 'snake':
                this.speed = 1;
                this.movePattern = 'slithering';
                this.color = '#228B22';
                this.animSpeed = 6;
                this.slitherDistance = 120;
                this.initialX = this.x;
                this.direction = 1;
                break;
        }
    }

    update(collisionDetector, playerX, playerY) {
        this.animTimer++;
        if (this.animTimer >= this.animSpeed) {
            this.animFrame = (this.animFrame + 1) % 4;
            this.animTimer = 0;
        }

        switch (this.movePattern) {
            case 'flying':
                this.updateFlying();
                break;
            case 'crawling':
                this.updateCrawling(collisionDetector);
                break;
            case 'slithering':
                this.updateSlithering(collisionDetector);
                break;
        }
    }

    updateFlying() {
        // Movimiento ondulante para murciélagos
        this.x += this.speed * this.direction;
        this.y = this.initialY + Math.sin(this.x * this.frequency) * this.amplitude;

        // Cambiar dirección al alcanzar límites
        if (this.x > 750 || this.x < 50) {
            this.direction *= -1;
        }
    }

    updateCrawling(collisionDetector) {
        // Movimiento horizontal para arañas
        this.x += this.speed * this.direction;

        // Cambiar dirección después de cierta distancia
        if (Math.abs(this.x - this.initialX) > this.crawlDistance) {
            this.direction *= -1;
        }
    }

    updateSlithering(collisionDetector) {
        // Movimiento serpenteante para serpientes
        this.x += this.speed * this.direction;
        this.y += Math.sin(this.x * 0.1) * 0.5;

        // Cambiar dirección después de cierta distancia
        if (Math.abs(this.x - this.initialX) > this.slitherDistance) {
            this.direction *= -1;
        }
    }

    draw(ctx) {
        ctx.save();

        switch (this.type) {
            case 'bat':
                this.drawBat(ctx);
                break;
            case 'spider':
                this.drawSpider(ctx);
                break;
            case 'snake':
                this.drawSnake(ctx);
                break;
        }

        ctx.restore();
    }

    drawBat(ctx) {
        const wingFlap = this.animFrame < 2 ? 1 : -1;

        // Cuerpo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x + 8, this.y + 8, 8, 10);

        // Cabeza
        ctx.fillStyle = '#654321';
        ctx.fillRect(this.x + 8, this.y + 4, 8, 6);

        // Orejas
        ctx.fillRect(this.x + 6, this.y + 2, 4, 4);
        ctx.fillRect(this.x + 14, this.y + 2, 4, 4);

        // Alas
        ctx.fillStyle = '#A0522D';
        // Ala izquierda
        ctx.beginPath();
        ctx.moveTo(this.x + 8, this.y + 10);
        ctx.lineTo(this.x + 2, this.y + 10 + wingFlap * 4);
        ctx.lineTo(this.x + 4, this.y + 16);
        ctx.fill();

        // Ala derecha
        ctx.beginPath();
        ctx.moveTo(this.x + 16, this.y + 10);
        ctx.lineTo(this.x + 22, this.y + 10 + wingFlap * 4);
        ctx.lineTo(this.x + 20, this.y + 16);
        ctx.fill();

        // Ojos rojos
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + 9, this.y + 6, 2, 2);
        ctx.fillRect(this.x + 13, this.y + 6, 2, 2);
    }

    drawSpider(ctx) {
        // Cuerpo
        ctx.fillStyle = '#4B0082';
        ctx.beginPath();
        ctx.ellipse(this.x + 12, this.y + 12, 8, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cabeza
        ctx.beginPath();
        ctx.ellipse(this.x + 12, this.y + 6, 6, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Patas (animadas)
        ctx.strokeStyle = '#4B0082';
        ctx.lineWidth = 2;
        const legOffset = Math.sin(this.animFrame * 0.5) * 2;

        for (let i = 0; i < 4; i++) {
            // Patas izquierdas
            ctx.beginPath();
            ctx.moveTo(this.x + 6, this.y + 8 + i * 3);
            ctx.lineTo(this.x - 4, this.y + 6 + i * 3 + legOffset);
            ctx.stroke();

            // Patas derechas
            ctx.beginPath();
            ctx.moveTo(this.x + 18, this.y + 8 + i * 3);
            ctx.lineTo(this.x + 28, this.y + 6 + i * 3 + legOffset);
            ctx.stroke();
        }

        // Ojos
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + 9, this.y + 5, 2, 2);
        ctx.fillRect(this.x + 13, this.y + 5, 2, 2);
    }

    drawSnake(ctx) {
        // Cuerpo serpentino con segmentos
        ctx.fillStyle = '#228B22';

        for (let i = 0; i < 5; i++) {
            const segmentX = this.x + i * 4;
            const segmentY = this.y + 8 + Math.sin((this.x + i * 10) * 0.1) * 4;
            const size = 6 - i * 0.5;

            ctx.fillRect(segmentX, segmentY, size, size);

            // Escamas (detalles)
            if (i % 2 === 0) {
                ctx.fillStyle = '#32CD32';
                ctx.fillRect(segmentX + 1, segmentY + 1, size - 2, size - 2);
                ctx.fillStyle = '#228B22';
            }
        }

        // Cabeza
        ctx.fillStyle = '#1a6b1a';
        ctx.fillRect(this.x, this.y + 8, 8, 8);

        // Ojos
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(this.x + 1, this.y + 9, 2, 2);
        ctx.fillRect(this.x + 5, this.y + 9, 2, 2);

        // Lengua (animada)
        if (this.animFrame < 2) {
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + 12);
            ctx.lineTo(this.x - 4, this.y + 12);
            ctx.stroke();
        }
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
