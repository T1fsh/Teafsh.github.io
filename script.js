// ================= CONFIG =================
// 把这里换成你和 admin.html 里一样的信息
const SUPABASE_URL = 'https://jdevfxwclgiprzlpjwax.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qSuUKVirzbKfMCCipZMLlw_vjnQHbMj';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================= 核心逻辑：从数据库获取文章 =================
async function loadPosts() {
    // 1. 获取 DOM 容器
    const grid = document.querySelector('.grid');

    // 2. 从 Supabase 查询 posts 表，按创建时间倒序排列
    const { data: posts, error } = await client
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error loading posts:", error);
        grid.innerHTML = "<p>System Offline: Cannot connect to database.</p>";
        return;
    }

    // 3. 如果有文章，清空现在的示例卡片，渲染真的文章
    if (posts && posts.length > 0) {
        grid.innerHTML = ''; // 清空 HTML 里写死的假数据

        posts.forEach(post => {
            // 创建卡片 HTML
            const article = document.createElement('article');
            article.className = 'card';

            // 处理标签样式
            // 假设你输入的标签是 "#AI #Tech"，我们用空格分割
            const tagsHtml = post.tags ? post.tags.split(' ').map(tag =>
                `<span class="tag">${tag}</span>`
            ).join('') : '';

            article.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <div class="tags">${tagsHtml}</div>
            `;

            grid.appendChild(article);
        });
    }
}

// ================= 之前的视觉特效 (保留不动) =================

// 1. 打字机
const text = "Brewing Knowledge, Sipping Future...";
const typingElement = document.getElementById('typing-text');
let index = 0;
function typeWriter() {
    if (typingElement && index < text.length) { // 加个检查防止报错
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// 2. 粒子背景 (精简版)
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particlesArray;

// ... (这里保留你之前的粒子动画代码，除了最后的 window.onload) ...
// 为了节省篇幅，这里假设你保留了之前的 Particle 类和 animate 函数

// ... 你的 Particle 类代码 ...
// ... 你的 init 函数 ...
// ... 你的 animate 函数 ...

// 将 window.onload 修改为：
window.onload = function() {
    typeWriter();

    // 如果有 canvas 才执行动画（防止 admin 页面报错）
    if(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // 这里需要把之前的 init() 和 animate() 代码放进来或者确保它们能访问到
        // 建议把之前的粒子代码完整保留
        // 这里只是示意
        // init();
        // animate();
    }

    // 新增：加载文章
    loadPosts();
};

