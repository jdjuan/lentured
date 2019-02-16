//------------------------------------------------------------------------------
//VARIABLES
        var canvas;
        var contexto;
        var canvasWidth;
        var canvasHeight;
        var jugador;
        var util;
        var enemigo;
        var senales;
        var movIzquierda = false;
        var movDerecha = false;
        var segundos;
        var cash;
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//INICIALIZAR
        window.onload = function() {
            cash = document.getElementById('cash');
            canvas = document.getElementById('canvas');
            Width = parseInt(canvas.width);
            Height = parseInt(canvas.height);
            contexto = canvas.getContext('2d');
            jugador = new Jugador();
            util = new Util();
            senales = new Array();
            enemigo = new Enemigo();
            segundos = 59;
            generarSenales();
            intervals();
        };

        function clear() {
            canvas.width = canvas.width;
        }

        function intervals() {
            setInterval(reducirTiempo, 1000);
            setInterval(generarSenales, 800);
            setInterval(graficar, 20);
            setInterval(controladoreMovimiento, 20);
            setInterval(actualizarItems, 20);
            setInterval(verificarColisiones, 20);
            setInterval(robarSenal, 1000);
            setInterval(desactivarEnemigo, 2000);
        }
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//GRAFICAR
        function graficar() {
            clear();
            contexto.drawImage(util.backgroundImg, util.backgroundX, util.backgroundY);
            contexto.drawImage(jugador.img, jugador.x, jugador.y);
            contexto.drawImage(util.descargaImg, util.descargaX, util.descargaY);
            contexto.drawImage(util.senalImg, util.senalX, util.senalY);
            contexto.drawImage(util.antenaImg, util.antenaX, util.antenaY);
            contexto.drawImage(util.tiempoImg, util.tiempoX, util.tiempoY);

            if (enemigo.activo) {
                contexto.drawImage(enemigo.img, enemigo.x, enemigo.y);
            }
            funcionSenal();
            for (var i = 0; i < senales.length; i++) {
                if (senales[i].activa) {
                    contexto.drawImage(senales[i].img, senales[i].x, senales[i].y);
                }
            }
        }
//------------------------------------------------------------------------------
//MOVIMIENTO
        function controladoreMovimiento() {
            if (jugador.direccionIzq) {
                jugador.img = jugador.imgIzq;
                jugador.x -= 4;
            } else if (jugador.direccionDer) {
                jugador.x += 4;
                jugador.img = jugador.imgDer;
            }
            for (var i = 0; i < senales.length; i++) {
                if (senales[i].activa) {
                    senales[i].y += 4;
                    if (senales[i].y > 621) {
                        senales[i].activa = false;
                    }
                }
            }
        }

//------------------------------------------------------------------------------
//FUNCION SENAL
        function funcionSenal() {
            for (var i = 0; i < senales.length; i++) {
                if (senales[i].activa) {
                    switch (senales[i].tipo) {
                        case (1)://izquierda
                            senales[i].x = -(senales[i].y / 1.5) + 470;
                            break;
                        case (2)://derecha
                            senales[i].x = -(senales[i].y / 3) + 470;
                            break;
                        case (3)://derecha
                            senales[i].x = 470;
                            break;
                        case (4)://derecha
                            senales[i].x = (senales[i].y / 3) + 470;
                            break;
                        case (5)://derecha
                            senales[i].x = (senales[i].y / 1.5) + 470;
                            break;
                    }
                }
            }
        }
//------------------------------------------------------------------------------

        window.onkeydown = function(e) {
            e.preventDefault();
            var keyCode = e.keyCode || e.which || window.Event;
            switch (keyCode) {
                case (37)://izquierda
                    jugador.direccionIzq = true;
                    break;
                case (39)://derecha
                    jugador.direccionDer = true;
                    break;
            }
        }
        window.onkeyup = function(e) {
            e.preventDefault();
            var keyCode = e.keyCode || e.which || window.Event;
            switch (keyCode) {
                case (37)://izquierda
                    jugador.direccionIzq = false;
                    break;
                case (39)://derecha
                    jugador.direccionDer = false;
                    break;
            }
        }
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//ACTUALIZAR ITEMS
        function actualizarItems() {
            switch (util.descarga) {
                case (1)://izquierda
                    jugador.direccionIzq = true;
                    break;
                case (2)://derecha
                    jugador.direccionDer = true;
                    break;
                case (3)://derecha
                    jugador.direccionDer = true;
                    break;
                case (4)://derecha
                    jugador.direccionDer = true;
                    break;
                case (5)://derecha
                    jugador.direccionDer = true;
                    break;
                case (6)://derecha
                    jugador.direccionDer = true;
                    break;
                case (7)://derecha
                    jugador.direccionDer = true;
                    break;
                case (8)://derecha
                    jugador.direccionDer = true;
                    break;
                case (9)://derecha
                    jugador.direccionDer = true;
                    break;
                case (10)://derecha
                    jugador.direccionDer = true;
                    break;
                case (11)://derecha
                    jugador.direccionDer = true;
                    break;
            }

            if (util.senalIntensidad < 10) {
                util.senalImg = util.senalImg1;
            } else if (util.senalIntensidad < 20) {
                util.senalImg = util.senalImg2;
            } else if (util.senalIntensidad < 30) {
                util.senalImg = util.senalImg3;
            } else if (util.senalIntensidad < 40) {
                util.senalImg = util.senalImg4;
            } else if (util.senalIntensidad < 55) {
                util.senalImg = util.senalImg5;
            } else if (util.senalIntensidad < 70) {
                util.senalImg = util.senalImg6;
            } else if (util.senalIntensidad < 80) {
                util.senalImg = util.senalImg7;
            } else if (util.senalIntensidad < 90) {
                util.senalImg = util.senalImg8;
            } else if (util.senalIntensidad <= 100) {
                util.senalImg = util.senalImg9;
            }

            if (util.descarga < 10) {
                util.descargaImg = util.descargaImg1;
            } else if (util.descarga < 20) {
                util.descargaImg = util.descargaImg2;
            } else if (util.descarga < 30) {
                util.descargaImg = util.descargaImg3;
            } else if (util.descarga < 40) {
                util.descargaImg = util.descargaImg4;
            } else if (util.descarga < 50) {
                util.descargaImg = util.descargaImg5;
            } else if (util.descarga < 60) {
                util.descargaImg = util.descargaImg6;
            } else if (util.descarga < 70) {
                util.descargaImg = util.descargaImg7;
            } else if (util.descarga < 80) {
                util.descargaImg = util.descargaImg8;
            } else if (util.descarga < 90) {
                util.descargaImg = util.descargaImg9;
            } else if (util.descarga < 100) {
                util.descargaImg = util.descargaImg10;
            } else if (util.descarga == 100) {
                util.descargaImg = util.descargaImg11;
            }
//            
            if (segundos >= 59) {
                util.tiempoImg = util.tiempoImg59;
            } else if (segundos >= 58) {
                util.tiempoImg = util.tiempoImg58;
            } else if (segundos >= 57) {
                util.tiempoImg = util.tiempoImg57;
            } else if (segundos >= 56) {
                util.tiempoImg = util.tiempoImg56;
            } else if (segundos >= 55) {
                util.tiempoImg = util.tiempoImg55;
            } else if (segundos >= 54) {
                util.tiempoImg = util.tiempoImg54;
            } else if (segundos >= 53) {
                util.tiempoImg = util.tiempoImg53;
            } else if (segundos >= 52) {
                util.tiempoImg = util.tiempoImg52;
            } else if (segundos >= 51) {
                util.tiempoImg = util.tiempoImg51;
            } else if (segundos >= 50) {
                util.tiempoImg = util.tiempoImg50;
            } else if (segundos >= 49) {
                util.tiempoImg = util.tiempoImg49;
            } else if (segundos >= 48) {
                util.tiempoImg = util.tiempoImg48;
            } else if (segundos >= 47) {
                util.tiempoImg = util.tiempoImg47;
            } else if (segundos >= 46) {
                util.tiempoImg = util.tiempoImg46;
            } else if (segundos >= 45) {
                util.tiempoImg = util.tiempoImg45;
            } else if (segundos >= 44) {
                util.tiempoImg = util.tiempoImg44;
            } else if (segundos >= 43) {
                util.tiempoImg = util.tiempoImg43;
            } else if (segundos >= 42) {
                util.tiempoImg = util.tiempoImg42;
            } else if (segundos >= 41) {
                util.tiempoImg = util.tiempoImg41;
            } else if (segundos >= 40) {
                util.tiempoImg = util.tiempoImg40;
            } else if (segundos >= 39) {
                util.tiempoImg = util.tiempoImg39;
            } else if (segundos >= 38) {
                util.tiempoImg = util.tiempoImg38;
            } else if (segundos >= 37) {
                util.tiempoImg = util.tiempoImg37;
            } else if (segundos >= 36) {
                util.tiempoImg = util.tiempoImg36;
            } else if (segundos >= 35) {
                util.tiempoImg = util.tiempoImg35;
            } else if (segundos >= 34) {
                util.tiempoImg = util.tiempoImg34;
            } else if (segundos >= 33) {
                util.tiempoImg = util.tiempoImg33;
            } else if (segundos >= 32) {
                util.tiempoImg = util.tiempoImg32;
            } else if (segundos >= 31) {
                util.tiempoImg = util.tiempoImg31;
            } else if (segundos >= 30) {
                util.tiempoImg = util.tiempoImg30;
            } else if (segundos >= 29) {
                util.tiempoImg = util.tiempoImg29;
            } else if (segundos >= 28) {
                util.tiempoImg = util.tiempoImg28;
            } else if (segundos >= 27) {
                util.tiempoImg = util.tiempoImg27;
            } else if (segundos >= 26) {
                util.tiempoImg = util.tiempoImg26;
            } else if (segundos >= 25) {
                util.tiempoImg = util.tiempoImg25;
            } else if (segundos >= 24) {
                util.tiempoImg = util.tiempoImg24;
            } else if (segundos >= 23) {
                util.tiempoImg = util.tiempoImg23;
            } else if (segundos >= 22) {
                util.tiempoImg = util.tiempoImg22;
            } else if (segundos >= 21) {
                util.tiempoImg = util.tiempoImg21;
            } else if (segundos >= 20) {
                util.tiempoImg = util.tiempoImg20;
            } else if (segundos >= 19) {
                util.tiempoImg = util.tiempoImg19;
            } else if (segundos >= 18) {
                util.tiempoImg = util.tiempoImg18;
            } else if (segundos >= 17) {
                util.tiempoImg = util.tiempoImg17;
            } else if (segundos >= 16) {
                util.tiempoImg = util.tiempoImg16;
            } else if (segundos >= 15) {
                util.tiempoImg = util.tiempoImg15;
            } else if (segundos >= 14) {
                util.tiempoImg = util.tiempoImg14;
            } else if (segundos >= 13) {
                util.tiempoImg = util.tiempoImg13;
            } else if (segundos >= 12) {
                util.tiempoImg = util.tiempoImg12;
            } else if (segundos >= 11) {
                util.tiempoImg = util.tiempoImg11;
            } else if (segundos >= 10) {
                util.tiempoImg = util.tiempoImg10;
            } else if (segundos >= 9) {
                util.tiempoImg = util.tiempoImg9;
            } else if (segundos >= 8) {
                util.tiempoImg = util.tiempoImg8;
            } else if (segundos >= 7) {
                util.tiempoImg = util.tiempoImg7;
            } else if (segundos >= 6) {
                util.tiempoImg = util.tiempoImg6;
            } else if (segundos >= 5) {
                util.tiempoImg = util.tiempoImg5;
            } else if (segundos >= 4) {
                util.tiempoImg = util.tiempoImg4;
            } else if (segundos >= 3) {
                util.tiempoImg = util.tiempoImg3;
            } else if (segundos >= 2) {
                util.tiempoImg = util.tiempoImg2;
            } else if (segundos >= 1) {
                util.tiempoImg = util.tiempoImg1;
            }
        }
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//GENERAR SEÑALES
        function generarSenales() {
            senal = new Senal();
            senal.activa = true;
            senal.x = 470;
            senal.y = 110;
            senal.tipo = Math.floor((Math.random() * 5) + 1);
            senales.push(senal);
            //DECREMENTAR SEÑAL
            util.senalIntensidad -= 1.75;
            if (util.senalIntensidad < 0) {
                util.senalIntensidad = 0;
            }

            //DESCARGAR ARCHIVO
            util.descarga += 5 * (util.senalIntensidad / 100);
            if (util.descarga > 110) {
                document.location = 'ganaste.html';
            }
        }
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//ACTUALIZAR SPRITES
        function actualizarSprites() {
            if (jugador.direccionIzq) {
                jugador.indexSprite
                jugador.img.src = "media/avatarIzq.png";
            } else if (jugador.direccionDer) {
                jugador.img.src = "media/avatarDer.png";
            } else {

            }
        }
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//VERIFICAR COLISIONES
        function verificarColisiones() {
            for (var i = 0; i < senales.length; i++) {
                if (senales[i].activa) {
                    if (senales[i].x > jugador.x && senales[i].x < jugador.x + 98) {
                        if (senales[i].x + 40 > jugador.x && senales[i].x + 40 < jugador.x + 98) {
                            if (senales[i].y + 33 > jugador.y) {
                                cash.currentTime=0;
                                cash.play();
                                
                                util.senalIntensidad += 8;
                                if (util.senalIntensidad > 100) {
                                    util.senalIntensidad = 100;
                                }
                                senales[i].activa = false;
                            }
                        }
                    }
                    if (enemigo.activo) {
                        if (senales[i].x > enemigo.x && senales[i].x < enemigo.x + 111) {
                            if (senales[i].x + 40 > enemigo.x && senales[i].x + 40 < enemigo.x + 111) {
                                if (senales[i].y + 33 > enemigo.y) {
                                    senales[i].activa = false;
                                }
                            }
                        }
                    }
                }
            }
        }
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//ROBAR SENAL
        function robarSenal() {
            if (!enemigo.activo) {

                enemigo.x = Math.floor((Math.random() * 500) + 1) + 250;
//                enemigo.x = 200;
                enemigo.y = 289;
                enemigo.activo = true;

//                for (var i = 0; i < senales.length; i++) {
//                    if (senales[i].activa) {
//                        if (senales[i].y > 260 && senales[i].y < 300) {
//                            enemigo.x = senales[i].x - 80;
//                            enemigo.y = senales[i].y - 15;
//                            enemigo.y = 290;
//                            enemigo.activo = true;
//                            senales[i].activa = false;
//                            break;
//                        }
//                    }
//                }
            }
        }
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//ACTIVAR ENEMIGO
        function desactivarEnemigo() {
            enemigo.activo = false;//                enemigo.activo = !enemigo.activo;
        }
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//REDUCIR TIEMPO
        function reducirTiempo() {
            segundos -= 1;
            console.log(segundos);
            if (segundos <= 0) {
                document.location = 'perdiste.html';
            }
        }
//------------------------------------------------------------------------------


       