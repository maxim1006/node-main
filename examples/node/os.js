const os = require("os");

console.log("Операционная система", os.platform()); // Операционная система darwin
console.log("Архитектура процессора ", os.arch()); // Архитектура процессора  x64
console.log("Инфа о процессорах ", os.cpus()); // Объект с процессором
console.log("Свободная память ", os.freemem()); // 157278208 // bytes
console.log("Всего память ", os.totalmem()); // 8589934592
console.log("Домашняя директория ", os.homedir()); // /Users/max
console.log("Сколько времени поднята система ", os.uptime()); // 764233 // секунды



