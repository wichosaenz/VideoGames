# 🎮 H.E.R.O. - Helicopter Emergency Rescue Operation

## 🚀 Descripción

¡Bienvenido a H.E.R.O.! Un emocionante videojuego de acción y rescate inspirado en el clásico de Activision para Atari 2600, completamente reimaginado con gráficos mejorados estilo 16-bit (Sega Megadrive/Super Nintendo) y desarrollado en HTML5/JavaScript puro.

Sumérgete en las profundidades de peligrosas minas abandonadas, equipado con un jetpack de última generación y un láser de alta potencia. Tu misión: rescatar a los mineros atrapados mientras enfrentas criaturas hostiles, lava mortal y obstáculos destructibles.

## 🎯 Características

### Tecnología
- ✅ **100% HTML5/JavaScript** - Sin dependencias externas
- ✅ **Compatible con todos los navegadores** modernos (Firefox, Chrome, Edge, Safari)
- ✅ **Ejecución local** - Sin necesidad de servidor
- ✅ **Gráficos mejorados** - Sprites estilo 16-bit con efectos de partículas
- ✅ **Física realista** - Sistema de gravedad y colisiones

### Contenido del Juego
- 🏔️ **20 Niveles únicos** con dificultad progresiva
- 🦇 **3 Tipos de enemigos**: Murciélagos, Arañas y Serpientes
- 💥 **Sistema de combate completo**: Láser y dinamita
- 🎖️ **Sistema de puntuación** con vidas extra cada 20,000 puntos
- ⚡ **Gestión de energía** del jetpack
- 🧨 **6 Dinamitas** por nivel para destruir paredes
- 🏆 **High Scores tipo Arcade** con persistencia localStorage
- ⌨️ **Entrada de iniciales** al lograr un récord (4 letras)
- 🔄 **Tecla ESC** para volver al menú en cualquier momento

## 🕹️ Controles

| Tecla | Acción |
|-------|--------|
| **← →** | Mover izquierda/derecha |
| **↑** | Activar Jetpack (volar hacia arriba) |
| **↓** | Descender más rápido |
| **ESPACIO** | Disparar láser |
| **ESPACIO + ↓** | Colocar dinamita |
| **ENTER** | Iniciar juego / Reiniciar / Confirmar |
| **ESC** | Volver al menú principal |
| **BACKSPACE** | Borrar letra (al ingresar iniciales) |

## 📋 Cómo Jugar

### Objetivo
Tu misión es rescatar al minero atrapado en cada nivel. Para ello debes:

1. **Navegar** por la mina usando las flechas del teclado
2. **Volar** con tu jetpack (tecla ↑) - ¡Cuidado con la energía!
3. **Eliminar enemigos** disparando con el láser (ESPACIO)
4. **Destruir paredes** con dinamita (ESPACIO + ↓)
5. **Evitar la lava** y otros peligros
6. **Llegar al minero** para completar el nivel

### Sistema de Vidas
- Comienzas con **5 vidas**
- Pierdes vida al tocar enemigos o lava
- Ganas **1 vida extra** cada 20,000 puntos
- Game Over cuando te quedas sin vidas

### Energía
- El jetpack consume energía al volar
- La energía se recupera lentamente cuando no vuelas
- Sin energía, no puedes volar

### Puntuación
- **100 puntos** por cada enemigo eliminado
- **1,000+ puntos** por rescatar un minero (bonus según nivel)
- **Bonus** por energía restante al rescatar

### Sistema de High Scores Tipo Arcade
- **Top 10 jugadores** guardados en localStorage
- Si logras un high score, podrás **ingresar tus iniciales** (hasta 4 letras)
- Los high scores se **conservan** entre sesiones
- Pantalla de inicio muestra el **Top 5** de mejores jugadores
- Colores especiales: 🥇 Oro (1°), 🥈 Plata (2°), 🥉 Bronce (3°)

## 🚀 Instalación y Ejecución

### Opción 1: Ejecución Local (Recomendada)

1. **Descarga** o clona este repositorio
2. **Abre** el archivo `index.html` en tu navegador favorito
3. **¡Juega!** - Es así de simple

```bash
# Clonar el repositorio (si aplica)
git clone [url-del-repositorio]

# Navegar a la carpeta
cd hero-game

# Abrir en el navegador (ejemplo en macOS/Linux)
open index.html

# O simplemente haz doble clic en index.html
```

### Opción 2: Servidor Web Local

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (con http-server instalado)
npx http-server

# Luego abre: http://localhost:8000
```

### Opción 3: Publicación Web

Simplemente sube todos los archivos a tu servidor web o servicio de hosting (GitHub Pages, Netlify, Vercel, etc.)

## 📁 Estructura del Proyecto

```
hero-game/
├── index.html              # Archivo principal HTML
├── README.md              # Este archivo
├── css/
│   └── style.css          # Estilos del juego
├── js/
│   ├── main.js           # Punto de entrada
│   ├── Game.js           # Motor principal del juego
│   ├── Player.js         # Clase del héroe
│   ├── Enemy.js          # Sistema de enemigos
│   ├── Level.js          # Generador de niveles
│   ├── Laser.js          # Sistema de disparos
│   ├── Dynamite.js       # Sistema de dinamita
│   ├── Collision.js      # Detección de colisiones
│   ├── Input.js          # Manejo de controles
│   ├── Particle.js       # Sistema de partículas
│   ├── HighScore.js      # Sistema de puntuaciones altas
│   ├── Renderer.js       # Sistema de renderizado
│   └── utils.js          # Utilidades generales
└── assets/               # (Futuro: sonidos e imágenes)
```

## 🎨 Características Técnicas

### Gráficos Mejorados
- Sprites dibujados con Canvas API
- Sistema de partículas para explosiones y efectos
- Animaciones fluidas a 60 FPS
- Efectos de iluminación y sombras
- Paleta de colores estilo 16-bit

### Enemigos
1. **Murciélagos** 🦇
   - Movimiento ondulante
   - Patrulla horizontal
   - Velocidad media

2. **Arañas** 🕷️
   - Movimiento horizontal
   - Patas animadas
   - Velocidad lenta

3. **Serpientes** 🐍
   - Movimiento serpenteante
   - Lengua animada
   - Velocidad media-alta

### Tipos de Terreno
- **Paredes sólidas** (grises) - Indestructibles
- **Paredes destructibles** (marrones) - Se destruyen con dinamita
- **Lava** (naranja animada) - Mortal al contacto
- **Espacios vacíos** - Navegables

## 🎮 Niveles

El juego cuenta con **20 niveles** únicos:

- **Niveles 1-3**: Tutorial y familiarización
- **Niveles 4-7**: Introducción de mecánicas complejas
- **Niveles 8-13**: Dificultad media con múltiples enemigos
- **Niveles 14-20**: Desafío máximo con laberintos complejos

Cada nivel incrementa en:
- Cantidad de enemigos
- Complejidad del laberinto
- Presencia de lava
- Paredes destructibles

## 🏆 Consejos y Estrategias

1. **Administra tu energía** - No vueles constantemente
2. **Usa la dinamita sabiamente** - Solo tienes 6 por nivel
3. **Elimina enemigos desde lejos** - El láser tiene buen alcance
4. **Planifica tu ruta** - Observa el nivel antes de avanzar
5. **Recoge puntos** - Cada 20,000 ganas una vida extra
6. **Evita la lava** - Quita mucha energía al tocarla

## 🛠️ Requisitos del Sistema

- **Navegador moderno** con soporte HTML5 Canvas
  - Chrome 60+
  - Firefox 55+
  - Safari 11+
  - Edge 79+
- **JavaScript habilitado**
- **Resolución mínima**: 1024x768

## 🔧 Desarrollo

### Tecnologías Utilizadas
- HTML5 Canvas
- JavaScript ES6+
- CSS3

### Características del Código
- Arquitectura orientada a objetos
- Sistema modular
- Código limpio y comentado
- Sin dependencias externas
- Optimizado para rendimiento

## 📝 Créditos

- **Juego original**: H.E.R.O. por Activision (1984)
- **Plataforma original**: Atari 2600
- **Esta versión**: Remake en HTML5/JavaScript
- **Gráficos**: Estilo mejorado inspirado en Sega Megadrive/Super Nintendo

## 📜 Licencia

Este proyecto es un tributo al clásico H.E.R.O. creado con fines educativos y de entretenimiento.

## 🎉 ¡Disfruta el Juego!

¿Listo para la aventura? ¡Rescata a todos los mineros y conviértete en un verdadero H.E.R.O.!

---

**Desarrollado con ❤️ y JavaScript**

Para reportar bugs o sugerencias, por favor abre un issue en el repositorio.

¡Buena suerte en tu misión de rescate! 🚁
