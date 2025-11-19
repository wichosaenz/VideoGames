// Sistema de renderizado
class Renderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.tileSize = 32;
        this.lavaAnimFrame = 0;
        this.lavaAnimTimer = 0;
    }

    clear() {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawLevel(level) {
        for (let y = 0; y < level.rows; y++) {
            for (let x = 0; x < level.cols; x++) {
                const tile = level.tiles[y][x];
                const px = x * this.tileSize;
                const py = y * this.tileSize;

                this.drawTile(tile, px, py);
            }
        }

        // Dibujar minero atrapado
        if (level.minerPosition) {
            this.drawMiner(
                level.minerPosition.x * this.tileSize,
                level.minerPosition.y * this.tileSize
            );
        }

        // Actualizar animación de lava
        this.lavaAnimTimer++;
        if (this.lavaAnimTimer >= 10) {
            this.lavaAnimFrame = (this.lavaAnimFrame + 1) % 4;
            this.lavaAnimTimer = 0;
        }
    }

    drawTile(type, x, y) {
        const ctx = this.ctx;

        switch (type) {
            case 0: // Vacío
                // Fondo oscuro de la mina
                ctx.fillStyle = '#0a0a0a';
                ctx.fillRect(x, y, this.tileSize, this.tileSize);
                break;

            case 1: // Pared sólida
                this.drawSolidWall(x, y);
                break;

            case 2: // Pared destructible
                this.drawDestructibleWall(x, y);
                break;

            case 3: // Lava
                this.drawLava(x, y);
                break;
        }
    }

    drawSolidWall(x, y) {
        const ctx = this.ctx;

        // Gradiente de roca gris oscura
        const gradient = ctx.createLinearGradient(x, y, x + this.tileSize, y + this.tileSize);
        gradient.addColorStop(0, '#4a4a4a');
        gradient.addColorStop(0.5, '#3a3a3a');
        gradient.addColorStop(1, '#2a2a2a');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, this.tileSize, this.tileSize);

        // Detalles de roca (textura)
        ctx.fillStyle = '#555555';
        ctx.fillRect(x + 4, y + 4, 6, 6);
        ctx.fillRect(x + 20, y + 8, 4, 4);
        ctx.fillRect(x + 8, y + 20, 5, 5);

        ctx.fillStyle = '#333333';
        ctx.fillRect(x + 12, y + 12, 8, 8);
        ctx.fillRect(x + 24, y + 20, 4, 4);

        // Borde oscuro
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
    }

    drawDestructibleWall(x, y) {
        const ctx = this.ctx;

        // Roca marrón destructible
        const gradient = ctx.createLinearGradient(x, y, x + this.tileSize, y + this.tileSize);
        gradient.addColorStop(0, '#8B4513');
        gradient.addColorStop(0.5, '#654321');
        gradient.addColorStop(1, '#4a3010');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, this.tileSize, this.tileSize);

        // Grietas (indicando que es destructible)
        ctx.strokeStyle = '#3a2010';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 8, y);
        ctx.lineTo(x + 12, y + this.tileSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + 20, y + 4);
        ctx.lineTo(x + 24, y + this.tileSize - 4);
        ctx.stroke();

        // Detalles de roca
        ctx.fillStyle = '#9B6523';
        ctx.fillRect(x + 4, y + 6, 5, 5);
        ctx.fillRect(x + 18, y + 12, 6, 6);

        // Borde
        ctx.strokeStyle = '#2a1a0a';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
    }

    drawLava(x, y) {
        const ctx = this.ctx;

        // Colores de lava animados
        const colors = ['#ff4400', '#ff6600', '#ff8800', '#ffaa00'];
        const baseColor = colors[this.lavaAnimFrame];

        // Lava con gradiente
        const gradient = ctx.createLinearGradient(x, y, x, y + this.tileSize);
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.5, '#ff0000');
        gradient.addColorStop(1, '#cc0000');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, this.tileSize, this.tileSize);

        // Burbujas brillantes animadas
        ctx.fillStyle = '#ffff00';
        const bubbleOffset = this.lavaAnimFrame * 2;
        ctx.fillRect(x + 6 + bubbleOffset, y + 8, 4, 4);
        ctx.fillRect(x + 20 - bubbleOffset, y + 20, 3, 3);

        // Efecto de brillo
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, this.tileSize, 4);
        ctx.globalAlpha = 1;
    }

    drawMiner(x, y) {
        const ctx = this.ctx;

        // Minero atrapado (persona pidiendo ayuda)
        ctx.save();

        // Cuerpo (ropa azul de trabajo)
        ctx.fillStyle = '#0066cc';
        ctx.fillRect(x + 8, y + 12, 16, 16);

        // Cabeza
        ctx.fillStyle = '#ffcc99';
        ctx.fillRect(x + 10, y + 4, 12, 10);

        // Casco amarillo
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(x + 8, y + 2, 16, 4);

        // Lámpara del casco (parpadeante)
        if (Math.floor(Date.now() / 500) % 2 === 0) {
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(x + 14, y, 4, 2);

            // Haz de luz
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(x + 12, y - 8, 8, 8);
            ctx.globalAlpha = 1;
        }

        // Brazos levantados (pidiendo ayuda)
        ctx.fillStyle = '#0066cc';
        ctx.fillRect(x + 4, y + 12, 4, 8);
        ctx.fillRect(x + 24, y + 12, 4, 8);

        // Manos
        ctx.fillStyle = '#ffcc99';
        ctx.fillRect(x + 4, y + 10, 4, 4);
        ctx.fillRect(x + 24, y + 10, 4, 4);

        // Piernas
        ctx.fillStyle = '#0066cc';
        ctx.fillRect(x + 10, y + 28, 5, 4);
        ctx.fillRect(x + 17, y + 28, 5, 4);

        ctx.restore();
    }

    drawStartScreen(highScores) {
        const ctx = this.ctx;

        // Fondo
        ctx.fillStyle = '#000033';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Título
        ctx.save();
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';

        // Efecto de sombra
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00ffff';

        ctx.fillStyle = '#00ffff';
        ctx.fillText('H.E.R.O.', this.canvas.width / 2, 80);

        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fillText('Helicopter Emergency Rescue Operation', this.canvas.width / 2, 120);

        // Instrucciones principales (parpadeantes)
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#ffff00';
        ctx.shadowBlur = 5;
        if (Math.floor(Date.now() / 500) % 2 === 0) {
            ctx.fillText('PRESIONA ENTER PARA COMENZAR', this.canvas.width / 2, 160);
        }

        // Tabla de HIGH SCORES
        this.drawHighScoreTable(highScores, 200);

        // Controles
        ctx.font = '12px Arial';
        ctx.fillStyle = '#00ff00';
        ctx.shadowBlur = 3;
        ctx.textAlign = 'left';

        const controlsX = 50;
        const controlsY = 500;
        const lineHeight = 20;

        ctx.fillText('CONTROLES:', controlsX, controlsY);
        ctx.fillText('← → : Mover', controlsX, controlsY + lineHeight);
        ctx.fillText('↑ : Jetpack', controlsX, controlsY + lineHeight * 2);
        ctx.fillText('↓ : Descender', controlsX, controlsY + lineHeight * 3);
        ctx.fillText('ESPACIO : Láser', controlsX, controlsY + lineHeight * 4);
        ctx.fillText('ESPACIO+↓ : Dinamita', controlsX, controlsY + lineHeight * 5);
        ctx.fillText('ESC : Menú', controlsX, controlsY + lineHeight * 6);

        // Misión
        ctx.fillStyle = '#ff8800';
        ctx.textAlign = 'center';
        ctx.font = '14px Arial';
        ctx.fillText('¡Rescata a los mineros atrapados!', this.canvas.width / 2, 580);

        ctx.restore();
    }

    drawGameOver(score, level) {
        const ctx = this.ctx;

        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff0000';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ff0000';
        ctx.fillText('GAME OVER', this.canvas.width / 2, 250);

        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fillText(`Puntuación Final: ${score}`, this.canvas.width / 2, 320);
        ctx.fillText(`Nivel Alcanzado: ${level}`, this.canvas.width / 2, 360);

        ctx.font = '18px Arial';
        ctx.fillStyle = '#ffff00';
        ctx.fillText('PRESIONA ENTER PARA REINICIAR', this.canvas.width / 2, 450);

        ctx.restore();
    }

    drawVictory(score) {
        const ctx = this.ctx;

        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 50, 0.8)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00ff00';
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#00ff00';
        ctx.fillText('¡VICTORIA!', this.canvas.width / 2, 200);

        ctx.font = '28px Arial';
        ctx.fillStyle = '#ffff00';
        ctx.shadowBlur = 15;
        ctx.fillText('¡Has completado los 20 niveles!', this.canvas.width / 2, 280);

        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fillText(`Puntuación Final: ${score}`, this.canvas.width / 2, 350);

        ctx.font = '18px Arial';
        ctx.fillStyle = '#00ffff';
        ctx.fillText('PRESIONA ENTER PARA JUGAR DE NUEVO', this.canvas.width / 2, 450);

        ctx.restore();
    }

    drawLevelTransition(levelNumber) {
        const ctx = this.ctx;

        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00ffff';
        ctx.fillText(`NIVEL ${levelNumber}`, this.canvas.width / 2, this.canvas.height / 2);

        ctx.restore();
    }

    // Dibujar tabla de HIGH SCORES estilo arcade
    drawHighScoreTable(scores, startY) {
        const ctx = this.ctx;

        ctx.save();
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff00ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff00ff';
        ctx.fillText('HIGH SCORES', this.canvas.width / 2, startY);

        // Encabezados
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#00ff00';
        ctx.shadowBlur = 5;
        ctx.textAlign = 'left';

        const tableX = 250;
        const tableY = startY + 40;
        const lineHeight = 24;

        ctx.fillText('RANK', tableX, tableY);
        ctx.fillText('NAME', tableX + 70, tableY);
        ctx.fillText('SCORE', tableX + 150, tableY);
        ctx.fillText('LEVEL', tableX + 250, tableY);

        // Línea separadora
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tableX, tableY + 5);
        ctx.lineTo(tableX + 300, tableY + 5);
        ctx.stroke();

        // Mostrar top 5
        ctx.font = '14px monospace';
        const scoreList = scores || [];
        const maxDisplay = Math.min(5, scoreList.length);

        for (let i = 0; i < maxDisplay; i++) {
            const score = scoreList[i];
            const y = tableY + 30 + (i * lineHeight);

            // Color dorado para el primero
            if (i === 0) {
                ctx.fillStyle = '#ffd700';
                ctx.shadowColor = '#ffd700';
            } else if (i === 1) {
                ctx.fillStyle = '#c0c0c0'; // Plata
                ctx.shadowColor = '#c0c0c0';
            } else if (i === 2) {
                ctx.fillStyle = '#cd7f32'; // Bronce
                ctx.shadowColor = '#cd7f32';
            } else {
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ffffff';
            }

            ctx.shadowBlur = 3;

            // Rank
            ctx.fillText(`${i + 1}.`, tableX, y);

            // Iniciales
            ctx.fillText(score.initials, tableX + 70, y);

            // Score
            ctx.fillText(score.score.toLocaleString(), tableX + 150, y);

            // Level
            ctx.fillText(score.level.toString(), tableX + 250, y);
        }

        ctx.restore();
    }

    // Pantalla para ingresar iniciales (estilo arcade)
    drawEnterInitials(currentInitials, score, rank) {
        const ctx = this.ctx;

        ctx.save();

        // Fondo semi-transparente
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Título
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffff00';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ffff00';
        ctx.fillText('¡NUEVO RÉCORD!', this.canvas.width / 2, 150);

        // Rango alcanzado
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#00ff00';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff00';

        let rankText = `TOP ${rank}`;
        if (rank === 1) rankText = '¡ERES EL NÚMERO 1!';
        else if (rank === 2) rankText = '¡SEGUNDO LUGAR!';
        else if (rank === 3) rankText = '¡TERCER LUGAR!';

        ctx.fillText(rankText, this.canvas.width / 2, 200);

        // Puntuación
        ctx.font = '20px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fillText(`Puntuación: ${score.toLocaleString()}`, this.canvas.width / 2, 250);

        // Instrucción
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 8;
        ctx.fillText('INGRESA TUS INICIALES (4 LETRAS)', this.canvas.width / 2, 320);

        // Cuadro de iniciales con efecto retro
        const boxY = 360;
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.canvas.width / 2 - 120, boxY, 240, 60);

        // Iniciales actuales (grandes y brillantes)
        ctx.font = 'bold 48px monospace';
        ctx.fillStyle = '#ffff00';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ffff00';

        // Mostrar iniciales con cursor parpadeante
        let displayText = currentInitials.padEnd(4, '_');

        // Cursor parpadeante en la posición actual
        if (currentInitials.length < 4 && Math.floor(Date.now() / 300) % 2 === 0) {
            const chars = displayText.split('');
            chars[currentInitials.length] = '█';
            displayText = chars.join('');
        }

        ctx.fillText(displayText, this.canvas.width / 2, boxY + 48);

        // Instrucciones de control
        ctx.font = '14px Arial';
        ctx.fillStyle = '#aaaaaa';
        ctx.shadowBlur = 3;
        ctx.fillText('Escribe tus iniciales | BACKSPACE para borrar | ENTER para confirmar',
                     this.canvas.width / 2, 480);

        ctx.restore();
    }
}
