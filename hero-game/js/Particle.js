// Sistema de partículas para efectos visuales
class Particle {
    constructor(x, y, vx, vy, color, size, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.life = life;
        this.maxLife = life;
        this.gravity = 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life--;
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1;
    }

    isDead() {
        return this.life <= 0;
    }
}

// Gestor de partículas
class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    // Crear explosión de partículas
    createExplosion(x, y, color, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Utils.random(2, 5);
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const size = Utils.randomInt(2, 4);
            const life = Utils.randomInt(20, 40);
            this.particles.push(new Particle(x, y, vx, vy, color, size, life));
        }
    }

    // Crear chispas
    createSparks(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const vx = Utils.random(-3, 3);
            const vy = Utils.random(-3, 3);
            const colors = ['#ffff00', '#ff8800', '#ff0000'];
            const color = Utils.randomChoice(colors);
            const size = Utils.randomInt(1, 3);
            const life = Utils.randomInt(15, 30);
            this.particles.push(new Particle(x, y, vx, vy, color, size, life));
        }
    }

    // Crear humo
    createSmoke(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            const vx = Utils.random(-1, 1);
            const vy = Utils.random(-2, -0.5);
            const colors = ['#555555', '#666666', '#777777'];
            const color = Utils.randomChoice(colors);
            const size = Utils.randomInt(3, 6);
            const life = Utils.randomInt(30, 50);
            this.particles.push(new Particle(x, y, vx, vy, color, size, life));
        }
    }

    // Efecto de jetpack
    createJetpackFlame(x, y) {
        const vx = Utils.random(-0.5, 0.5);
        const vy = Utils.random(1, 3);
        const colors = ['#ff4400', '#ff8800', '#ffaa00', '#ffff00'];
        const color = Utils.randomChoice(colors);
        const size = Utils.randomInt(2, 4);
        const life = Utils.randomInt(10, 20);
        this.particles.push(new Particle(x, y, vx, vy, color, size, life));
    }

    update() {
        // Actualizar y eliminar partículas muertas
        this.particles = this.particles.filter(particle => {
            particle.update();
            return !particle.isDead();
        });
    }

    draw(ctx) {
        this.particles.forEach(particle => particle.draw(ctx));
    }

    clear() {
        this.particles = [];
    }
}
