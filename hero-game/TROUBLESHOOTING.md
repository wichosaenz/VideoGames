# 🔧 Guía de Solución de Problemas - H.E.R.O.

## ✅ Correcciones Aplicadas (Última Actualización)

### 🐛 Problema: Pantalla Negra / Juego No Inicia

**Síntomas:**
- Solo se muestra una pantalla negra
- Presionar ENTER no hace nada
- Presionar ESC no hace nada
- El juego no responde a ninguna tecla

**Causa Identificada:**
El juego intentaba inicializar el nivel en el constructor antes de que el jugador presionara ENTER, causando inconsistencias en el estado del juego.

**Solución Aplicada:**
- ✅ El nivel ahora se inicializa SOLO después de presionar ENTER
- ✅ Agregadas validaciones de seguridad en todo el código
- ✅ Mejor manejo de errores con mensajes claros

---

## 🎮 Cómo Verificar que el Juego Funciona

### Paso 1: Abrir la Consola del Navegador
1. Presiona **F12** en tu navegador
2. Ve a la pestaña **Console** (Consola)

### Paso 2: Buscar Mensajes de Inicialización
Deberías ver algo como esto:
```
🎮 Iniciando H.E.R.O. Game...
Buscando canvas...
Canvas encontrado: [object HTMLCanvasElement]
Contexto 2D obtenido correctamente
✓ Input disponible
✓ ParticleSystem disponible
✓ Renderer disponible
✓ HighScoreManager disponible
✓ Game disponible
Creando instancia del juego...
Construyendo Game...
Game constructor completado. Estado: start
Juego creado, estado inicial: start
Iniciando loop del juego...
✓ Juego iniciado correctamente!
```

### Paso 3: Probar los Controles
1. **ENTER** - Debería iniciar el juego
   - Verás un mensaje en consola: "ENTER presionado, iniciando juego..."
   - Verás: "Reseteando juego..." y "Inicializando nivel 1"

2. **ESC** - Debería volver al menú
   - Verás: "ESC presionado, volviendo al menú..."

3. **Flechas/Espacio** - Deberían controlar el héroe

---

## 🚨 Si Aún No Funciona

### Opción 1: Verificar Errores en Consola

Si ves mensajes de error en rojo en la consola, busca:

**Error: "No se pudo encontrar el canvas"**
- Solución: Verifica que estés abriendo `index.html` correctamente

**Error: "Clase requerida no encontrada"**
- Solución: Verifica que todos los archivos JS estén en la carpeta `js/`

**Error: "Failed to load resource"**
- Solución: Verifica las rutas de los archivos

### Opción 2: Limpiar Caché del Navegador

1. Presiona **Ctrl+Shift+R** (Windows) o **Cmd+Shift+R** (Mac)
2. O ve a Configuración → Privacidad → Borrar datos de navegación

### Opción 3: Probar en Otro Navegador

Prueba en este orden:
1. Google Chrome (Recomendado)
2. Mozilla Firefox
3. Microsoft Edge
4. Brave

---

## 📁 Verificación de Archivos

Asegúrate de que tengas esta estructura EXACTA:

```
hero-game/
├── index.html              ✓ Debe existir
├── README.md
├── TROUBLESHOOTING.md      ✓ Este archivo
├── css/
│   └── style.css           ✓ Debe existir
├── js/
│   ├── utils.js            ✓ Debe existir
│   ├── Particle.js         ✓ Debe existir
│   ├── Input.js            ✓ Debe existir
│   ├── Collision.js        ✓ Debe existir
│   ├── Laser.js            ✓ Debe existir
│   ├── Dynamite.js         ✓ Debe existir
│   ├── Enemy.js            ✓ Debe existir
│   ├── Player.js           ✓ Debe existir
│   ├── Level.js            ✓ Debe existir
│   ├── HighScore.js        ✓ Debe existir
│   ├── Renderer.js         ✓ Debe existir
│   ├── Game.js             ✓ Debe existir
│   └── main.js             ✓ Debe existir
└── assets/
```

---

## 🔍 Verificación Rápida con Test

Abre la consola y escribe:

```javascript
// Verificar que las clases están cargadas
console.log('Game:', typeof Game);
console.log('Input:', typeof Input);
console.log('Renderer:', typeof Renderer);
```

Deberías ver:
```
Game: function
Input: function
Renderer: function
```

Si ves `undefined`, significa que ese archivo no se cargó correctamente.

---

## 🌐 Ejecución en Servidor Web

### Opción A: Python (Simple HTTP Server)
```bash
# En la carpeta hero-game
python -m http.server 8000

# Abre: http://localhost:8000
```

### Opción B: Node.js (http-server)
```bash
# Instalar (solo una vez)
npm install -g http-server

# Ejecutar
http-server -p 8000

# Abre: http://localhost:8000
```

### Opción C: VS Code Live Server
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

---

## 💻 Compatibilidad

### ✅ Navegadores Compatibles
- Chrome 60+
- Firefox 55+
- Edge 79+
- Safari 11+
- Opera 47+
- Brave (cualquier versión reciente)

### ✅ Sistemas Operativos Probados
- Windows 11 ✓
- Windows 10 ✓
- macOS ✓
- Linux ✓

### ✅ Modos de Ejecución
- Archivo local (file://) ✓
- Servidor Apache ✓
- Servidor Python ✓
- Servidor Node.js ✓
- GitHub Pages ✓
- Netlify ✓

---

## 📞 Reportar Problemas

Si después de seguir todos estos pasos el juego aún no funciona:

1. **Abre la consola** (F12)
2. **Copia TODO el contenido** de la consola
3. **Toma una captura** de pantalla de la página
4. **Incluye la siguiente información:**
   - Sistema operativo (ej: Windows 11)
   - Navegador y versión (ej: Chrome 120)
   - Modo de ejecución (local, servidor, etc.)
   - Mensajes de error completos

---

## 🎯 Checklist de Diagnóstico

Marca cada elemento que hayas verificado:

- [ ] He limpiado la caché del navegador (Ctrl+Shift+R)
- [ ] Todos los archivos están en sus carpetas correctas
- [ ] Puedo ver el título "H.E.R.O." y la tabla de scores
- [ ] La consola no muestra errores en rojo
- [ ] Estoy usando un navegador moderno actualizado
- [ ] He probado en al menos 2 navegadores diferentes
- [ ] Presioné ENTER y vi mensajes en consola
- [ ] Presioné ESC y vi mensajes en consola

Si marcaste TODAS las casillas y aún no funciona, es posible que haya un problema específico con tu configuración que requiera investigación adicional.

---

## 🎮 Guía de Inicio Rápido (Una Vez Funcionando)

1. **Abre** `index.html` en tu navegador
2. **Presiona ENTER** para comenzar
3. **Usa las flechas** para moverte
4. **Presiona ↑** para volar
5. **Presiona ESPACIO** para disparar
6. **Presiona ESC** para volver al menú en cualquier momento

¡Disfruta el juego! 🚀
