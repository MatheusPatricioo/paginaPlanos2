document.addEventListener('DOMContentLoaded', function () {
    function createSpaceBackground() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        const comets = []; // Array para armazenar os cometas

        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                alpha: Math.random() * 0.5 + 0.5,
                glowing: Math.random() > 0.5
            });
        }

        for (let i = 0; i < 5; i++) { // Criando 5 cometas
            comets.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: Math.random() * 2 + 1, // Velocidade do cometa
                length: Math.random() * 30 + 10, // Comprimento do cometa
                angle: Math.random() * Math.PI * 2 // Ângulo de movimento do cometa
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

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

            // Desenhar cometas
            for (let i = 0; i < comets.length; i++) {
                const comet = comets[i];
                ctx.beginPath();
                ctx.moveTo(comet.x, comet.y);
                ctx.lineTo(comet.x - Math.cos(comet.angle) * comet.length, comet.y - Math.sin(comet.angle) * comet.length);
                ctx.strokeStyle = "white";
                ctx.lineWidth = 1;
                ctx.stroke();

                // Atualizar posição do cometa
                comet.x -= Math.cos(comet.angle) * comet.speed;
                comet.y -= Math.sin(comet.angle) * comet.speed;

                // Reposicionar cometa quando sair da tela
                if (comet.x < -comet.length || comet.y < -comet.length || comet.x > canvas.width + comet.length || comet.y > canvas.height + comet.length) {
                    comet.x = Math.random() * canvas.width;
                    comet.y = Math.random() * canvas.height;
                    comet.angle = Math.random() * Math.PI * 2;
                }
            }

            requestAnimationFrame(draw);
        }

        draw();

        document.body.appendChild(canvas);
    }

    createSpaceBackground();
});
