document.addEventListener('DOMContentLoaded', function () {
    // Função para criar o fundo espacial animado
    function createSpaceBackground() {
        const canvas = document.createElement('canvas'); // Cria um elemento canvas
        const ctx = canvas.getContext('2d'); // Obtém o contexto 2D do canvas

        canvas.width = window.innerWidth; // Define a largura do canvas como a largura da janela
        canvas.height = window.innerHeight; // Define a altura do canvas como a altura da janela

        const stars = []; // Array para armazenar as estrelas
        const comets = []; // Array para armazenar os cometas

        // Loop para criar estrelas
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * canvas.width, // Posição X aleatória
                y: Math.random() * canvas.height, // Posição Y aleatória
                radius: Math.random() * 2, // Raio aleatório
                alpha: Math.random() * 0.5 + 0.5, // Transparência aleatória
                glowing: Math.random() > 0.5 // Brilho aleatório
            });
        }

        // Loop para criar cometas
        for (let i = 0; i < 5; i++) {
            comets.push({
                x: Math.random() * canvas.width, // Posição X aleatória
                y: Math.random() * canvas.height, // Posição Y aleatória
                speed: Math.random() * 2 + 1, // Velocidade aleatória do cometa
                length: Math.random() * 30 + 10, // Comprimento aleatório do cometa
                angle: Math.random() * Math.PI * 2 // Ângulo aleatório de movimento do cometa
            });
        }

        // Função para desenhar o fundo espacial
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

            // Desenha estrelas
            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];

                if (star.glowing) {
                    star.alpha += 0.02;
                } else {
                    star.alpha -= 0.02;
                }

                star.alpha = Math.max(0.5, Math.min(1, star.alpha));

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();

                if (Math.random() < 0.02) {
                    star.glowing = !star.glowing;
                }
            }

            // Desenha cometas
            for (let i = 0; i < comets.length; i++) {
                const comet = comets[i];
                ctx.beginPath();
                ctx.moveTo(comet.x, comet.y);
                ctx.lineTo(comet.x - Math.cos(comet.angle) * comet.length, comet.y - Math.sin(comet.angle) * comet.length);
                ctx.strokeStyle = "white";
                ctx.lineWidth = 1;
                ctx.stroke();

                // Atualiza a posição do cometa
                comet.x -= Math.cos(comet.angle) * comet.speed;
                comet.y -= Math.sin(comet.angle) * comet.speed;

                // Reposiciona o cometa quando sair do canvas
                if (comet.x < -comet.length || comet.y < -comet.length || comet.x > canvas.width + comet.length || comet.y > canvas.height + comet.length) {
                    comet.x = Math.random() * canvas.width;
                    comet.y = Math.random() * canvas.height;
                    comet.angle = Math.random() * Math.PI * 2;
                }
            }

            requestAnimationFrame(draw); // Solicita uma nova animação
        }

        draw(); // Chama a função para iniciar a animação

        document.body.appendChild(canvas); // Adiciona o canvas ao corpo do documento
    }

    createSpaceBackground(); // Chama a função para criar o fundo espacial
});
