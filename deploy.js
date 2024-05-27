const FtpClient = require('ftp');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuración FTP
const config = {
    host: 'motocare.com.ar',
    user: 'motocare',
    password: 'Moto.Motocare2024',
    destinationPath: '/domains/motocare.com.ar/public_html/rental',
};

// Directorio de construcción
const distDir = path.join(__dirname, '/dist/spa');

// Iniciar cliente FTP
const client = new FtpClient();

// Función para subir archivos
function uploadFiles(client, dir) {
    return new Promise((resolve) => {
        fs.readdir(dir, (err, files) => {
            if (err) throw err;

            const totalFiles = files.length;
            let uploadedFiles = 0;

            for (const file of files) {
                const filePath = path.join(dir, file);

                fs.stat(filePath, (err, stats) => {
                    if (err) throw err;

                    if (stats.isFile()) {
                        client.put(filePath, file, (err) => {
                            if (err) {
                                console.error('Error uploading file', filePath, file);
                                return;
                            }
                            console.log(file + ' subido correctamente');
                            uploadedFiles++;

                            // Si todos los archivos se han subido, cerrar la conexión
                            if (uploadedFiles === totalFiles) {
                                client.end();
                                console.log('Todos los archivos se han subido. Conexión cerrada.');
                            }
                        });
                    } else if (stats.isDirectory()) {
                        // client.mkdir(file, true, (err) => {
                        //     if (err) throw err;
                        //     client.cwd(file, (err) => {
                        //         if (err) {
                        //             console.error('Error changing directory ', file);
                        //             return;
                        //         }
                        //         uploadFiles(client, filePath);
                        //     });
                        // });
                        client.list((err, list) => {
                            if (err) throw err;

                            // Si la carpeta ya existe, no intentar crearla
                            if (!list.some((item) => item.name === file)) {
                                client.mkdir(file, true, (err) => {
                                    if (err) throw err;
                                    client.cwd(file, (err) => {
                                        if (err) throw err;
                                        uploadFiles(client, filePath);
                                    });
                                });
                            } else {
                                client.cwd(file, (err) => {
                                    if (err) throw err;
                                    uploadFiles(client, filePath);
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}

// Ejecutar comando de construcción
exec('npm run build', (err, stdout, stderr) => {
    if (err) {
        console.error('Build error', err);
        return;
    }

    console.log('Build cokpleted!');

    // Conectar al servidor FTP y subir archivos
    client.connect(config);

    client.on('ready', () => {
        client.cwd(config.destinationPath, (err) => {
            if (err) throw err;
            uploadFiles(client, distDir).then(() => {
                client.end();
            });
        });
    });
});
