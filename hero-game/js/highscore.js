// Sistema de High Scores tipo Arcade
class HighScoreManager {
    constructor() {
        this.storageKey = 'hero_game_high_scores';
        this.maxScores = 10; // Top 10 jugadores
        this.scores = this.loadScores();
    }

    // Cargar puntuaciones desde localStorage
    loadScores() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error al cargar high scores:', e);
        }

        // Puntuaciones por defecto
        return [
            { initials: 'ACT', score: 50000, level: 20 },
            { initials: 'HRO', score: 45000, level: 18 },
            { initials: 'JET', score: 40000, level: 16 },
            { initials: 'FLY', score: 35000, level: 14 },
            { initials: 'WIN', score: 30000, level: 12 },
            { initials: 'TOP', score: 25000, level: 10 },
            { initials: 'PRO', score: 20000, level: 8 },
            { initials: 'ACE', score: 15000, level: 6 },
            { initials: 'PLY', score: 10000, level: 4 },
            { initials: 'NEW', score: 5000, level: 2 }
        ];
    }

    // Guardar puntuaciones en localStorage
    saveScores() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
        } catch (e) {
            console.error('Error al guardar high scores:', e);
        }
    }

    // Verificar si una puntuación califica para el top
    isHighScore(score) {
        if (this.scores.length < this.maxScores) {
            return true;
        }
        return score > this.scores[this.scores.length - 1].score;
    }

    // Obtener la posición que ocuparía una puntuación
    getScoreRank(score) {
        for (let i = 0; i < this.scores.length; i++) {
            if (score > this.scores[i].score) {
                return i + 1; // Posición 1-based
            }
        }
        return this.scores.length + 1;
    }

    // Agregar una nueva puntuación
    addScore(initials, score, level) {
        const newScore = {
            initials: initials.toUpperCase().substring(0, 4), // Máximo 4 letras
            score: score,
            level: level,
            date: new Date().toISOString()
        };

        this.scores.push(newScore);

        // Ordenar por puntuación (mayor a menor)
        this.scores.sort((a, b) => b.score - a.score);

        // Mantener solo el top 10
        this.scores = this.scores.slice(0, this.maxScores);

        this.saveScores();

        return this.getScoreRank(score);
    }

    // Obtener todas las puntuaciones
    getScores() {
        return this.scores;
    }

    // Resetear puntuaciones (volver a default)
    resetScores() {
        this.scores = this.loadScores();
        localStorage.removeItem(this.storageKey);
        this.scores = this.loadScores();
        this.saveScores();
    }

    // Obtener la puntuación más alta
    getHighestScore() {
        return this.scores.length > 0 ? this.scores[0].score : 0;
    }
}
