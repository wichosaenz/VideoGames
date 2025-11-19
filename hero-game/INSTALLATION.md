# 🌐 Guía de Instalación en Servidor Web - H.E.R.O.

## ✅ Correcciones Aplicadas para Servidores Linux

El juego ahora es **100% compatible con servidores Linux** (Apache, Nginx, DreamHost, etc.) gracias a las siguientes correcciones:

### 🔧 Cambios Realizados

1. **Todos los archivos JavaScript renombrados a minúsculas:**
   - ✅ `particle.js` (antes Particle.js)
   - ✅ `input.js` (antes Input.js)
   - ✅ `collision.js` (antes Collision.js)
   - ✅ `laser.js` (antes Laser.js)
   - ✅ `dynamite.js` (antes Dynamite.js)
   - ✅ `enemy.js` (antes Enemy.js)
   - ✅ `player.js` (antes Player.js)
   - ✅ `level.js` (antes Level.js)
   - ✅ `highscore.js` (antes HighScore.js)
   - ✅ `renderer.js` (antes Renderer.js)
   - ✅ `game.js` (antes Game.js)

2. **index.html actualizado** con las rutas correctas en minúsculas

3. **Sintaxis verificada** en todos los archivos

4. **Clases en ámbito global** confirmadas

---

## 📦 Instalación en Servidor Web

### Método 1: FTP/SFTP (Más Común)

#### Paso 1: Preparar los Archivos
```bash
# En tu computadora local
# Asegúrate de tener la última versión
git pull origin claude/html5-game-development-01AxqQHvYYx8hEb4LFyAmjsN

# O descarga el ZIP del repositorio
```

#### Paso 2: Subir al Servidor
1. Conecta a tu servidor vía FTP/SFTP (usa FileZilla, WinSCP, o Cyberduck)
2. Navega a la carpeta `public_html` o `www`
3. Sube **toda** la carpeta `hero-game` manteniendo la estructura:

```
public_html/hero-game/
├── index.html
├── README.md
├── TROUBLESHOOTING.md
├── css/
│   └── style.css
├── js/
│   ├── utils.js
│   ├── particle.js
│   ├── input.js
│   ├── collision.js
│   ├── laser.js
│   ├── dynamite.js
│   ├── enemy.js
│   ├── player.js
│   ├── level.js
│   ├── highscore.js
│   ├── renderer.js
│   ├── game.js
│   └── main.js
└── assets/
```

#### Paso 3: Verificar Permisos (Importante en Linux)
Si tienes acceso SSH, ejecuta:
```bash
# Navegar a la carpeta
cd public_html/hero-game

# Establecer permisos correctos
chmod 755 js css assets
chmod 644 index.html README.md TROUBLESHOOTING.md
chmod 644 css/*.css
chmod 644 js/*.js
```

Si solo tienes FTP, usa tu cliente FTP para establecer:
- **Carpetas** (`js/`, `css/`, `assets/`): 755
- **Archivos** (`.html`, `.js`, `.css`, `.md`): 644

#### Paso 4: Acceder al Juego
Abre tu navegador y ve a:
```
https://tu-dominio.com/hero-game/
```

---

### Método 2: SSH + Git (Avanzado)

Si tienes acceso SSH y Git instalado en el servidor:

```bash
# Conectar al servidor
ssh usuario@tu-servidor.com

# Navegar a public_html
cd public_html

# Clonar el repositorio (si no existe)
git clone https://github.com/usuario/repositorio.git hero-game

# O hacer pull si ya existe
cd hero-game
git pull origin claude/html5-game-development-01AxqQHvYYx8hEb4LFyAmjsN

# Establecer permisos
chmod -R 755 .
find . -type f -exec chmod 644 {} \;
```

---

### Método 3: cPanel File Manager

1. Inicia sesión en cPanel
2. Ve a **File Manager**
3. Navega a `public_html`
4. Haz clic en **Upload** (Subir)
5. Selecciona y sube todos los archivos de la carpeta `hero-game`
6. Una vez subidos, verifica la estructura de carpetas
7. Haz clic derecho en cada carpeta (`js`, `css`) → **Change Permissions** → 755
8. Haz clic derecho en archivos → **Change Permissions** → 644

---

## ✅ Verificación Post-Instalación

### 1. Verificar que los Archivos se Subieron Correctamente

Abre tu navegador y prueba acceder directamente a los archivos JS:
```
https://tu-dominio.com/hero-game/js/game.js
```

Deberías ver el código JavaScript, NO un error 404.

### 2. Abrir la Consola del Navegador

1. Abre `https://tu-dominio.com/hero-game/`
2. Presiona **F12** para abrir Developer Tools
3. Ve a la pestaña **Console**

Deberías ver:
```
Cargando scripts del juego...
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

### 3. Verificar que ENTER Funciona

1. Presiona **ENTER** en la página
2. En la consola deberías ver:
```
ENTER presionado, iniciando juego...
Reseteando juego...
Inicializando nivel 1
Nivel inicializado correctamente
```

---

## 🚨 Solución de Problemas Comunes

### Problema 1: Error 404 en archivos JS

**Causa:** Las rutas no coinciden con los nombres de archivos reales.

**Solución:**
```bash
# Verificar que TODOS los archivos estén en minúsculas
ls -la public_html/hero-game/js/

# Deberías ver:
# game.js (NO Game.js)
# input.js (NO Input.js)
# etc.
```

### Problema 2: "Clase requerida no encontrada"

**Causa:** Algún archivo JS no se cargó correctamente.

**Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Network** (Red)
3. Recarga la página (Ctrl+R)
4. Busca archivos JS en rojo (status 404)
5. Verifica que ese archivo existe en el servidor con el nombre exacto (minúsculas)

### Problema 3: Página en blanco

**Causa:** Error de JavaScript deteniendo la ejecución.

**Solución:**
1. Abre la consola (F12)
2. Busca mensajes en rojo
3. El error te dirá en qué archivo y línea está el problema
4. Verifica que subiste la última versión de ese archivo

### Problema 4: Permisos denegados

**Causa:** Los archivos no tienen los permisos correctos.

**Solución:**
```bash
# Vía SSH
chmod -R 755 public_html/hero-game
chmod 644 public_html/hero-game/index.html
chmod 644 public_html/hero-game/js/*.js

# O usar el File Manager de cPanel
```

---

## 📊 Checklist de Instalación

Marca cada elemento cuando lo hayas verificado:

- [ ] Todos los archivos JS están en minúsculas en el servidor
- [ ] La carpeta `js/` tiene permiso 755
- [ ] Los archivos `.js` tienen permiso 644
- [ ] El archivo `index.html` tiene permiso 644
- [ ] Puedo acceder a https://mi-dominio.com/hero-game/index.html
- [ ] Puedo acceder a https://mi-dominio.com/hero-game/js/game.js (veo código)
- [ ] La consola no muestra errores 404
- [ ] La consola muestra "✓ Juego iniciado correctamente!"
- [ ] Presionar ENTER inicia el juego
- [ ] Presionar ESC vuelve al menú

---

## 🎮 URL de Ejemplo

Una vez instalado correctamente, tu juego estará disponible en:
```
https://tu-dominio.com/hero-game/
```

O si lo subiste a una subcarpeta:
```
https://tu-dominio.com/juegos/hero-game/
```

---

## 📞 Soporte Adicional

Si después de seguir todos estos pasos el juego aún no funciona:

1. **Copia TODO el contenido de la consola** del navegador (F12 → Console)
2. **Toma una captura de pantalla** de la página
3. **Verifica la pestaña Network** (F12 → Network) y busca archivos en rojo
4. **Incluye esta información:**
   - Proveedor de hosting (ej: DreamHost)
   - URL donde subiste el juego
   - Sistema operativo del servidor (si lo conoces)
   - Mensajes de error completos

---

## ✨ Características Post-Instalación

Una vez funcionando, el juego incluye:

- ✅ **20 niveles** completos
- ✅ **Sistema de High Scores** con localStorage (se guarda en el navegador del usuario)
- ✅ **Controles completos** con teclado
- ✅ **Compatible** con todos los navegadores modernos
- ✅ **Responsive** (se adapta a diferentes tamaños de pantalla)
- ✅ **Sin necesidad de base de datos** (todo funciona client-side)

---

¡Disfruta tu juego H.E.R.O. en línea! 🚀🎮
