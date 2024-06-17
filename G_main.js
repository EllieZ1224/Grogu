function showDetail(id) {
    const details = document.querySelectorAll('.detail');
    details.forEach(detail => {
        detail.classList.remove('active');
    });

    const detailElement = document.getElementById(`detail-${id}`);
    detailElement.classList.add('active');

    const content = document.getElementById('main-content');
    content.classList.remove('active');

    // 使用 setTimeout 确保动画每次点击都触发
    setTimeout(() => {
        content.classList.add('active');
    }, 900);
}


let currentIndex = 0;
const images = document.querySelectorAll('.slide-image');

function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

showImage(currentIndex);

function expandContent(event) {
    // 阻止点击事件冒泡，防止触发父元素的点击事件
    event.stopPropagation();

    const targetId = event.currentTarget.getAttribute('data-target');
    const targetContent = document.getElementById(targetId);

    document.querySelectorAll('.new-content').forEach(content => {
        content.style.display = 'none';
        content.style.opacity = '0';
    });

    const mainContent = document.getElementById('main-content');
    mainContent.classList.add('expanded');

    targetContent.style.display = 'flex'; // 变更为 flex
    setTimeout(() => {
        targetContent.style.opacity = '1';
       // document.body.style.overflow = 'hidden'; // 禁用滚动
    }, 10);
}

document.querySelectorAll('.detail').forEach(detail => {
    detail.addEventListener('click', expandContent);
});

document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        const mainContent = document.getElementById('main-content');
        mainContent.classList.remove('expanded');

        document.querySelectorAll('.new-content').forEach(content => {
            content.style.display = 'none';
            content.style.opacity = '0';
        });

        document.body.style.overflow = 'auto'; // 恢复滚动

        mainContent.scrollIntoView({ behavior: 'smooth' }); // 滚动到主内容
    });
});
