// --- 功能 1: 打字机效果 ---
const text = "Brewing Knowledge, Sipping Future..."; // 你想展示的 Slogan
const typingElement = document.getElementById('typing-text');
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // 调整数字可以控制打字速度
    }
}

// --- 功能 2: 粒子背景动画 (Canvas) ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particlesArray;

// 设置 Canvas 尺寸
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 粒子类定义
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 0.4) - 0.2; // 漂浮速度 X
        this.directionY = (Math.random() * 0.4) - 0.2; // 漂浮速度 Y
        this.size = Math.random() * 2 + 1; // 粒子大小
        this.color = '#00FF94'; // 粒子颜色 (Neon Matcha)
    }

    // 绘制粒子
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // 更新粒子位置
    update() {
        // 边界检测：碰到屏幕边缘反弹
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// 初始化粒子数组
function init() {
    particlesArray = [];
    // 根据屏幕面积计算粒子数量，保持密度一致
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// 连线函数：如果两个粒子足够近，就画线
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            // 连线距离阈值
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                // 连线颜色
                ctx.strokeStyle = 'rgba(0, 255, 148,' + opacityValue * 0.2 + ')'; 
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.innerWidth, canvas.innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// --- 事件监听 ---

// 页面加载完成后启动
window.onload = function() {
    typeWriter();
    init();
    animate();
};

// 窗口大小改变时重置 Canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
