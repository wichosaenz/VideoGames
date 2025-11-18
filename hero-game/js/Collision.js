// Sistema de detección de colisiones
class CollisionDetector {
    constructor(level) {
        this.level = level;
        this.tileSize = 32;
    }

    // Verificar colisión con las paredes del nivel
    checkWallCollision(x, y, width, height) {
        const tileX1 = Math.floor(x / this.tileSize);
        const tileX2 = Math.floor((x + width - 1) / this.tileSize);
        const tileY1 = Math.floor(y / this.tileSize);
        const tileY2 = Math.floor((y + height - 1) / this.tileSize);

        for (let ty = tileY1; ty <= tileY2; ty++) {
            for (let tx = tileX1; tx <= tileX2; tx++) {
                if (this.isSolidTile(tx, ty)) {
                    return true;
                }
            }
        }
        return false;
    }

    // Verificar si un tile es sólido
    isSolidTile(tx, ty) {
        if (!this.level || !this.level.tiles) return false;

        if (ty < 0 || ty >= this.level.tiles.length) return true;
        if (tx < 0 || tx >= this.level.tiles[0].length) return true;

        const tile = this.level.tiles[ty][tx];
        // 0 = vacío, 1 = pared, 2 = pared destructible, 3 = lava
        return tile === 1 || tile === 2;
    }

    // Verificar colisión con lava
    checkLavaCollision(x, y, width, height) {
        const tileX1 = Math.floor(x / this.tileSize);
        const tileX2 = Math.floor((x + width - 1) / this.tileSize);
        const tileY1 = Math.floor(y / this.tileSize);
        const tileY2 = Math.floor((y + height - 1) / this.tileSize);

        for (let ty = tileY1; ty <= tileY2; ty++) {
            for (let tx = tileX1; tx <= tileX2; tx++) {
                if (this.isLavaTile(tx, ty)) {
                    return true;
                }
            }
        }
        return false;
    }

    // Verificar si un tile es lava
    isLavaTile(tx, ty) {
        if (!this.level || !this.level.tiles) return false;

        if (ty < 0 || ty >= this.level.tiles.length) return false;
        if (tx < 0 || tx >= this.level.tiles[0].length) return false;

        return this.level.tiles[ty][tx] === 3;
    }

    // Verificar si una pared es destructible
    isDestructibleWall(tx, ty) {
        if (!this.level || !this.level.tiles) return false;

        if (ty < 0 || ty >= this.level.tiles.length) return false;
        if (tx < 0 || tx >= this.level.tiles[0].length) return false;

        return this.level.tiles[ty][tx] === 2;
    }

    // Destruir pared en coordenadas de píxeles
    destroyWall(x, y) {
        const tx = Math.floor(x / this.tileSize);
        const ty = Math.floor(y / this.tileSize);

        if (this.isDestructibleWall(tx, ty)) {
            this.level.tiles[ty][tx] = 0; // Convertir a vacío
            return true;
        }
        return false;
    }

    // Obtener tiles adyacentes destructibles (para dinamita)
    getDestructibleTilesInRadius(x, y, radius) {
        const tiles = [];
        const centerTX = Math.floor(x / this.tileSize);
        const centerTY = Math.floor(y / this.tileSize);
        const radiusInTiles = Math.ceil(radius / this.tileSize);

        for (let ty = centerTY - radiusInTiles; ty <= centerTY + radiusInTiles; ty++) {
            for (let tx = centerTX - radiusInTiles; tx <= centerTX + radiusInTiles; tx++) {
                if (this.isDestructibleWall(tx, ty)) {
                    tiles.push({ x: tx, y: ty });
                }
            }
        }
        return tiles;
    }

    // Colisión rectángulo con rectángulo
    checkRectCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    // Colisión circular
    checkCircleCollision(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < circle1.radius + circle2.radius;
    }
}
