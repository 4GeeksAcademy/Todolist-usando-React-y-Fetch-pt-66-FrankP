const user = "frank_dev_test";
const url = `https://playground.4geeks.com/todo/users/${user}`;

console.log(" Probando conexión con la API...");


fetch(url, { method: "POST" })
    .then(resp => {
        console.log(`Estado POST (Crear): ${resp.status}`);
        return resp.json();
    })
    .then(() => {
        
        return fetch(url);
    })
    .then(resp => resp.json())
    .then(data => {
        console.log("✅ Usuario en la base de datos:", data);
    })
    .catch(err => console.error("Error en la prueba:", err));