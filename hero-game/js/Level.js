// Sistema de niveles
// Tipos de tiles: 0 = vacío, 1 = pared sólida, 2 = pared destructible, 3 = lava, 4 = inicio, 5 = minero
class Level {
    constructor(levelNumber) {
        this.levelNumber = levelNumber;
        this.tileSize = 32;
        this.cols = 25;
        this.rows = 19;
        this.tiles = [];
        this.enemies = [];
        this.minerPosition = null;
        this.startPosition = { x: 64, y: 32 };
        this.dynamiteCount = 6;

        this.generateLevel(levelNumber);
    }

    generateLevel(levelNum) {
        // Generar el mapa base según el nivel
        const levelData = this.getLevelData(levelNum);
        this.tiles = levelData.tiles;
        this.enemies = levelData.enemies;
        this.minerPosition = levelData.minerPosition;
        this.startPosition = levelData.startPosition || { x: 64, y: 32 };
    }

    getLevelData(levelNum) {
        // Niveles predefinidos inspirados en H.E.R.O.
        const levels = [
            // Nivel 1 - Tutorial básico
            {
                tiles: this.createSimpleLevel(3, 2, 1),
                enemies: [
                    { type: 'bat', x: 300, y: 200 }
                ],
                minerPosition: { x: 12, y: 15 },
                startPosition: { x: 64, y: 32 }
            },
            // Nivel 2 - Más murciélagos
            {
                tiles: this.createSimpleLevel(4, 3, 2),
                enemies: [
                    { type: 'bat', x: 200, y: 150 },
                    { type: 'bat', x: 400, y: 250 }
                ],
                minerPosition: { x: 12, y: 16 },
                startPosition: { x: 64, y: 32 }
            },
            // Nivel 3 - Introducción a arañas
            {
                tiles: this.createSimpleLevel(5, 3, 2),
                enemies: [
                    { type: 'spider', x: 250, y: 200 },
                    { type: 'bat', x: 350, y: 180 }
                ],
                minerPosition: { x: 12, y: 15 },
                startPosition: { x: 64, y: 32 }
            },
            // Nivel 4 - Laberinto vertical
            {
                tiles: this.createVerticalMaze(3, 4),
                enemies: [
                    { type: 'bat', x: 200, y: 100 },
                    { type: 'spider', x: 300, y: 300 },
                    { type: 'bat', x: 400, y: 400 }
                ],
                minerPosition: { x: 12, y: 17 },
                startPosition: { x: 64, y: 32 }
            },
            // Nivel 5 - Serpientes
            {
                tiles: this.createSimpleLevel(6, 4, 3),
                enemies: [
                    { type: 'snake', x: 250, y: 200 },
                    { type: 'spider', x: 350, y: 250 },
                    { type: 'bat', x: 450, y: 150 }
                ],
                minerPosition: { x: 12, y: 16 },
                startPosition: { x: 64, y: 32 }
            },
            // Nivel 6 - Lava aparece
            {
                tiles: this.createLavaLevel(4, 3),
                enemies: [
                    { type: 'bat', x: 200, y: 150 },
                    { type: 'snake', x: 350, y: 300 }
                ],
                minerPosition: { x: 12, y: 15 },
                startPosition: { x: 64, y: 32 }
            },
            // Nivel 7 - Más complejo
            {
                tiles: this.createComplexMaze(5, 4),
                enemies: [
                    { type: 'bat', x: 150, y: 100 },
                    { type: 'spider', x: 300, y: 250 },
                    { type: 'snake', x: 450, y: 350 },
                    { type: 'bat', x: 550, y: 200 }
                ],
                minerPosition: { x: 12, y: 17 },
                startPosition: { x: 64, y: 32 }
            },
            // Nivel 8 - Desafío de precisión
            {
                tiles: this.createNarrowPathLevel(5, 4),
                enemies: [
                    { type: 'bat', x: 200, y: 150 },
                    { type: 'bat', x: 350, y: 250 },
                    { type: 'spider', x: 450, y: 300 }
                ],
                minerPosition: { x: 12, y: 16 },
                startPosition: { x: 64, y: 32 }
            },
            // Nivel 9 - Múltiples enemigos
            {
                tiles: this.createSimpleLevel(7, 5, 3),
                enemies: [
                    { type: 'bat', x: 150, y: 120 },
                    { type: 'bat', x: 300, y: 200 },
                    { type: 'spider', x: 250, y: 280 },
                    { type: 'snake', x: 400, y: 350 },
                    { type: 'bat', x: 500, y: 180 }
                ],
                minerPosition: { x: 12, y: 17 },
                startPosition: { x: 64, y: 32 }
            },
            // Nivel 10 - Mitad del juego
            {
                tiles: this.createComplexMaze(6, 5),
                enemies: [
                    { type: 'bat', x: 180, y: 100 },
                    { type: 'spider', x: 280, y: 220 },
                    { type: 'snake', x: 380, y: 320 },
                    { type: 'bat', x: 480, y: 180 },
                    { type: 'spider', x: 350, y: 400 }
                ],
                minerPosition: { x: 12, y: 17 },
                startPosition: { x: 64, y: 32 }
            },
            // Niveles 11-20 con dificultad creciente
            ...Array(10).fill(null).map((_, i) => ({
                tiles: i % 3 === 0 ? this.createComplexMaze(7 + i, 5 + i) :
                      i % 3 === 1 ? this.createLavaLevel(5 + i, 4 + i) :
                      this.createVerticalMaze(6 + i, 5 + i),
                enemies: this.generateEnemiesForLevel(11 + i),
                minerPosition: { x: 12, y: 15 + (i % 3) },
                startPosition: { x: 64, y: 32 }
            }))
        ];

        return levels[levelNum - 1] || levels[0];
    }

    generateEnemiesForLevel(level) {
        const enemyCount = Math.min(3 + level, 8);
        const enemies = [];
        const types = ['bat', 'spider', 'snake'];

        for (let i = 0; i < enemyCount; i++) {
            enemies.push({
                type: types[i % 3],
                x: 150 + (i * 80),
                y: 100 + (i * 50) % 400
            });
        }

        return enemies;
    }

    createSimpleLevel(destructibleCount, lavaCount, batCount) {
        const tiles = [];

        // Crear nivel base vacío con bordes
        for (let y = 0; y < this.rows; y++) {
            tiles[y] = [];
            for (let x = 0; x < this.cols; x++) {
                // Bordes
                if (x === 0 || x === this.cols - 1 || y === 0 || y === this.rows - 1) {
                    tiles[y][x] = 1;
                } else {
                    tiles[y][x] = 0;
                }
            }
        }

        // Añadir plataformas y paredes destructibles
        for (let i = 0; i < destructibleCount; i++) {
            const y = 5 + i * 3;
            for (let x = 8; x < 17; x++) {
                if (x % 2 === 0) {
                    tiles[y][x] = 2; // Pared destructible
                }
            }
        }

        // Añadir algo de lava
        for (let i = 0; i < lavaCount; i++) {
            const y = this.rows - 2;
            const startX = 3 + i * 5;
            for (let x = startX; x < startX + 3; x++) {
                if (x < this.cols - 1) {
                    tiles[y][x] = 3; // Lava
                }
            }
        }

        return tiles;
    }

    createVerticalMaze(sections, destructibleSections) {
        const tiles = this.createSimpleLevel(0, 0, 0);

        // Crear secciones verticales con pasillos
        for (let section = 0; section < sections; section++) {
            const y = 3 + section * 4;
            const wallX = 5 + (section % 2) * 10;

            for (let i = 0; i < 8; i++) {
                if (wallX + i < this.cols - 1) {
                    tiles[y][wallX + i] = section < destructibleSections ? 2 : 1;
                }
            }
        }

        return tiles;
    }

    createLavaLevel(destructibleCount, lavaStreams) {
        const tiles = this.createSimpleLevel(destructibleCount, 0, 0);

        // Añadir corrientes de lava verticales
        for (let i = 0; i < lavaStreams; i++) {
            const x = 5 + i * 5;
            for (let y = this.rows - 6; y < this.rows - 1; y++) {
                if (x < this.cols - 1) {
                    tiles[y][x] = 3; // Lava
                }
            }
        }

        return tiles;
    }

    createComplexMaze(complexity, destructibleCount) {
        const tiles = this.createSimpleLevel(0, 0, 0);

        // Crear un laberinto más complejo
        for (let i = 0; i < complexity; i++) {
            const y = 2 + i * 2;
            const startX = 3 + (i % 3) * 6;

            for (let x = startX; x < startX + 8; x++) {
                if (x < this.cols - 1 && y < this.rows - 1) {
                    tiles[y][x] = i < destructibleCount ? 2 : 1;
                }
            }

            // Añadir paredes verticales
            if (i % 2 === 0) {
                for (let dy = 0; dy < 4; dy++) {
                    if (y + dy < this.rows - 1) {
                        tiles[y + dy][startX] = i < destructibleCount ? 2 : 1;
                    }
                }
            }
        }

        return tiles;
    }

    createNarrowPathLevel(sections, destructibleCount) {
        const tiles = this.createSimpleLevel(0, 0, 0);

        // Crear caminos estrechos zigzagueantes
        for (let section = 0; section < sections; section++) {
            const y = 3 + section * 3;
            const direction = section % 2 === 0 ? 1 : -1;
            const startX = section % 2 === 0 ? 3 : this.cols - 10;

            for (let i = 0; i < 15; i++) {
                const x = startX + i * direction;
                if (x > 0 && x < this.cols - 1 && y < this.rows - 1) {
                    // Paredes arriba y abajo del camino
                    if (y > 1) tiles[y - 1][x] = section < destructibleCount ? 2 : 1;
                    if (y < this.rows - 2) tiles[y + 1][x] = section < destructibleCount ? 2 : 1;
                }
            }
        }

        return tiles;
    }

    getTileAt(x, y) {
        const tx = Math.floor(x / this.tileSize);
        const ty = Math.floor(y / this.tileSize);

        if (ty < 0 || ty >= this.rows || tx < 0 || tx >= this.cols) {
            return 1; // Fuera de límites = pared
        }

        return this.tiles[ty][tx];
    }
}
