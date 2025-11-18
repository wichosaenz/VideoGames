// Motor principal del juego
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Sistemas
        this.input = new Input();
        this.particleSystem = new ParticleSystem();
        this.renderer = new Renderer(canvas, this.ctx);
        this.highScoreManager = new HighScoreManager();

        // Estado del juego
        this.state = 'start'; // 'start', 'playing', 'levelTransition', 'gameOver', 'victory', 'enterInitials'
        this.currentLevel = 1;
        this.maxLevels = 20;

        // Puntuación y vidas
        this.score = 0;
        this.lives = 5;
        this.energy = 100;
        this.maxEnergy = 100;
        this.dynamiteCount = 6;
        this.lastExtraLifeScore = 0;
        this.extraLifeThreshold = 20000;

        // Sistema de high scores
        this.playerInitials = '';
        this.scoreRank = 0;
        this.finalScore = 0;
        this.finalLevel = 0;

        // Entidades del juego
        this.player = null;
        this.level = null;
        this.collisionDetector = null;
        this.enemies = [];
        this.lasers = [];
        this.dynamites = [];

        // Transiciones
        this.transitionTimer = 0;
        this.transitionDuration = 120; // 2 segundos

        this.initLevel(this.currentLevel);
    }

    initLevel(levelNumber) {
        // Crear nivel
        this.level = new Level(levelNumber);
        this.collisionDetector = new CollisionDetector(this.level);

        // Crear jugador
        this.player = new Player(
            this.level.startPosition.x,
            this.level.startPosition.y
        );

        // Crear enemigos
        this.enemies = [];
        this.level.enemies.forEach(enemyData => {
            this.enemies.push(new Enemy(enemyData.x, enemyData.y, enemyData.type));
        });

        // Resetear arrays
        this.lasers = [];
        this.dynamites = [];

        // Dinamita disponible
        this.dynamiteCount = this.level.dynamiteCount;

        // Resetear energía
        this.energy = this.maxEnergy;

        // Limpiar partículas
        this.particleSystem.clear();
    }

    update() {
        switch (this.state) {
            case 'start':
                this.updateStartScreen();
                break;
            case 'playing':
                this.updateGame();
                break;
            case 'levelTransition':
                this.updateLevelTransition();
                break;
            case 'enterInitials':
                this.updateEnterInitials();
                break;
            case 'gameOver':
            case 'victory':
                this.updateEndScreen();
                break;
        }

        // Siempre actualizar input al final del frame
        this.input.update();
    }

    updateStartScreen() {
        if (this.input.enter) {
            this.state = 'playing';
            this.resetGame();
        }
    }

    updateGame() {
        // Tecla ESC para volver al menú principal
        if (this.input.escape) {
            this.state = 'start';
            return;
        }

        // Actualizar jugador
        this.player.update(this.input, this.collisionDetector);

        // Disparar láser
        if (this.input.spaceJustPressed && !this.input.down && this.player.shoot()) {
            const shootPos = this.player.getShootPosition();
            this.lasers.push(new Laser(shootPos.x, shootPos.y, this.player.direction));
        }

        // Colocar dinamita (Space + Down)
        if (this.input.dynamiteCombo && this.dynamiteCount > 0 && this.player.placeDynamite()) {
            const dynamitePos = this.player.getDynamitePosition();
            this.dynamites.push(new Dynamite(dynamitePos.x, dynamitePos.y));
            this.dynamiteCount--;
            this.updateUI();
        }

        // Actualizar láseres
        this.lasers = this.lasers.filter(laser => {
            laser.update(this.collisionDetector);
            return laser.active;
        });

        // Actualizar dinamitas
        this.dynamites = this.dynamites.filter(dynamite => {
            dynamite.update(this.collisionDetector);

            // Si explotó, crear efectos
            if (dynamite.exploded) {
                const explosion = dynamite.getExplosionBounds();
                this.particleSystem.createExplosion(explosion.x, explosion.y, '#ff6600', 40);

                // Dañar enemigos en el radio
                this.enemies.forEach(enemy => {
                    const dist = Utils.getDistance(
                        enemy.x + enemy.width / 2,
                        enemy.y + enemy.height / 2,
                        explosion.x,
                        explosion.y
                    );

                    if (dist < explosion.radius) {
                        enemy.active = false;
                        this.score += enemy.points;
                    }
                });

                return false;
            }

            return dynamite.active;
        });

        // Actualizar enemigos
        this.enemies.forEach(enemy => {
            enemy.update(this.collisionDetector, this.player.x, this.player.y);
        });

        // Colisiones láser-enemigo
        this.lasers.forEach(laser => {
            this.enemies.forEach(enemy => {
                if (laser.active && enemy.active &&
                    this.collisionDetector.checkRectCollision(laser.getBounds(), enemy.getBounds())) {
                    laser.active = false;
                    enemy.active = false;
                    this.score += enemy.points;
                    this.particleSystem.createSparks(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                }
            });
        });

        // Eliminar enemigos muertos
        this.enemies = this.enemies.filter(enemy => enemy.active);

        // Colisiones jugador-enemigo
        this.enemies.forEach(enemy => {
            if (this.collisionDetector.checkRectCollision(this.player.getBounds(), enemy.getBounds())) {
                if (this.player.takeDamage()) {
                    this.lives--;
                    this.energy = Math.max(0, this.energy - 20);
                    this.particleSystem.createExplosion(this.player.x, this.player.y, '#ff0000', 15);

                    if (this.lives <= 0) {
                        this.checkGameOver();
                    }
                }
            }
        });

        // Colisión con lava
        if (this.collisionDetector.checkLavaCollision(
            this.player.x, this.player.y, this.player.width, this.player.height)) {
            if (this.player.takeDamage()) {
                this.lives--;
                this.energy = Math.max(0, this.energy - 30);
                this.particleSystem.createExplosion(this.player.x, this.player.y, '#ff8800', 20);

                if (this.lives <= 0) {
                    this.checkGameOver();
                }
            }
        }

        // Consumo de energía por vuelo
        if (this.input.up) {
            this.energy -= 0.2;
            if (this.energy <= 0) {
                this.energy = 0;
            }
        }

        // Recuperar energía lentamente
        if (!this.input.up && this.energy < this.maxEnergy) {
            this.energy += 0.1;
        }

        // Verificar si llegó al minero
        if (this.level.minerPosition) {
            const minerBounds = {
                x: this.level.minerPosition.x * 32,
                y: this.level.minerPosition.y * 32,
                width: 32,
                height: 32
            };

            if (this.collisionDetector.checkRectCollision(this.player.getBounds(), minerBounds)) {
                this.rescueMiner();
            }
        }

        // Sistema de vida extra cada 20000 puntos
        if (this.score - this.lastExtraLifeScore >= this.extraLifeThreshold) {
            this.lives++;
            this.lastExtraLifeScore += this.extraLifeThreshold;
            // Efecto visual de vida extra
            this.particleSystem.createExplosion(this.player.x, this.player.y, '#00ff00', 30);
        }

        // Actualizar partículas
        this.particleSystem.update();

        // Actualizar UI
        this.updateUI();
    }

    updateLevelTransition() {
        this.transitionTimer++;

        if (this.transitionTimer >= this.transitionDuration) {
            this.transitionTimer = 0;
            this.state = 'playing';
            this.initLevel(this.currentLevel);
        }
    }

    updateEndScreen() {
        if (this.input.enter) {
            this.resetGame();
        }
    }

    rescueMiner() {
        // Puntos por rescate
        const rescueBonus = 1000 + (this.currentLevel * 100);
        this.score += rescueBonus;

        // Bonus por energía restante
        this.score += Math.floor(this.energy * 10);

        // Efectos visuales
        this.particleSystem.createExplosion(
            this.level.minerPosition.x * 32,
            this.level.minerPosition.y * 32,
            '#00ff00',
            50
        );

        // Avanzar al siguiente nivel
        this.currentLevel++;

        if (this.currentLevel > this.maxLevels) {
            // Juego completado - verificar high score
            this.checkVictory();
        } else {
            this.state = 'levelTransition';
        }
    }

    checkGameOver() {
        this.finalScore = this.score;
        this.finalLevel = this.currentLevel;

        // Verificar si califica para high score
        if (this.highScoreManager.isHighScore(this.score)) {
            this.scoreRank = this.highScoreManager.getScoreRank(this.score);
            this.playerInitials = '';
            this.state = 'enterInitials';
        } else {
            this.state = 'gameOver';
        }
    }

    checkVictory() {
        this.finalScore = this.score;
        this.finalLevel = this.currentLevel;

        // Verificar si califica para high score
        if (this.highScoreManager.isHighScore(this.score)) {
            this.scoreRank = this.highScoreManager.getScoreRank(this.score);
            this.playerInitials = '';
            this.state = 'enterInitials';
        } else {
            this.state = 'victory';
        }
    }

    updateEnterInitials() {
        // Capturar letras para las iniciales
        const key = this.input.getLastKey();

        if (key && this.input.isLetter(key) && this.playerInitials.length < 4) {
            this.playerInitials += key.toUpperCase();
        }

        // Borrar letra
        if (this.input.backspace && this.playerInitials.length > 0) {
            this.playerInitials = this.playerInitials.slice(0, -1);
        }

        // Confirmar (mínimo 1 letra)
        if (this.input.enter && this.playerInitials.length > 0) {
            // Guardar el score
            this.highScoreManager.addScore(
                this.playerInitials,
                this.finalScore,
                this.finalLevel
            );

            // Determinar si fue game over o victoria
            if (this.finalLevel >= this.maxLevels) {
                this.state = 'victory';
            } else {
                this.state = 'gameOver';
            }
        }
    }

    resetGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.lives = 5;
        this.energy = 100;
        this.lastExtraLifeScore = 0;
        this.state = 'playing';
        this.initLevel(this.currentLevel);
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.currentLevel;
        document.getElementById('dynamite').textContent = this.dynamiteCount;
        document.getElementById('energy').textContent = Math.floor(this.energy);
    }

    render() {
        this.renderer.clear();

        switch (this.state) {
            case 'start':
                this.renderer.drawStartScreen(this.highScoreManager.getScores());
                break;

            case 'playing':
                // Dibujar nivel
                this.renderer.drawLevel(this.level);

                // Dibujar dinamitas
                this.dynamites.forEach(dynamite => dynamite.draw(this.ctx));

                // Dibujar láseres
                this.lasers.forEach(laser => laser.draw(this.ctx));

                // Dibujar enemigos
                this.enemies.forEach(enemy => enemy.draw(this.ctx));

                // Dibujar jugador
                this.player.draw(this.ctx, this.particleSystem);

                // Dibujar partículas
                this.particleSystem.draw(this.ctx);
                break;

            case 'levelTransition':
                // Dibujar nivel actual
                this.renderer.drawLevel(this.level);
                this.renderer.drawLevelTransition(this.currentLevel);
                break;

            case 'enterInitials':
                this.renderer.drawEnterInitials(
                    this.playerInitials,
                    this.finalScore,
                    this.scoreRank
                );
                break;

            case 'gameOver':
                this.renderer.drawGameOver(this.finalScore, this.finalLevel);
                break;

            case 'victory':
                this.renderer.drawVictory(this.finalScore);
                break;
        }
    }

    run() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.run());
    }
}
