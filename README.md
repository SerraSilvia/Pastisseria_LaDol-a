# Pastisseria_LaDol-a
Desenvolupament_aplicacions_entorns_mobils
Comandes a seguir per preparar el nostre entorn de desenvolupament:

npm init -y
npm i
npm i express
npm i ejs
npm i nodemon -D -> és el que permet npm run dev
npm i body-parse
npm i db-local
npm i jsonwebtoken
npm i cookie-parser
npm i crypto
npm i bcryptjs
npm run dev o si tenim un arxiu en scripts,
"scripts": { "test": "echo "Error: no test specified" && exit 1", "start": "node server.js" },
node server.js
afegir en package.json: "scripts": { "dev": "nodemon index.js", // }

sota del main: "main": "index.js", "type": "module",

Aprenem a crear un servidor web amb Node.js emprant:
Express → framework per a crear servidors.

EJS → motor de plantilles per a renderitzar HTML dinàmic.

body-parser / express.json() → per a llegir dades que arriben en el body d' una petició (ex: formularis).

Nodemon → reinicia el servidor automàticament quan canvies codi.

jsonwebtoken, cookie-parser, db-local → serveixen per a fer login amb tokens, cookies i base de dades local.

L'exemple:

index.js monta un servidor Express.

Quan entres a /, renderitza la vista login.ejs.

Hi ha rutes per a registrar usuaris (/register) o fer login.

En el navegador, els formularis envien dades al servidor amb fetch.