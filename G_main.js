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



//详情图片slideshow
const currentIndexes = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};

function showImage(contentId, index) {
    const images = document.querySelectorAll(`#content-left-${contentId} .slide-image`);
    images.forEach((img, i) => {
        if (i === index) {
            img.style.display = 'block';
            const randomAngle = Math.random() * 30 - 15; // 生成-15到15度之间的随机角度
            img.style.transform = `rotate(${randomAngle}deg)`;
        } else {
            img.style.display = 'none';
            img.style.transform = 'rotate(0deg)'; // 重置其他图片的旋转角度
        }
    });
}

function nextImage(contentId) {
    currentIndexes[contentId] = (currentIndexes[contentId] + 1) % document.querySelectorAll(`#content-left-${contentId} .slide-image`).length;
    showImage(contentId, currentIndexes[contentId]);
}

function prevImage(contentId) {
    currentIndexes[contentId] = (currentIndexes[contentId] - 1 + document.querySelectorAll(`#content-left-${contentId} .slide-image`).length) % document.querySelectorAll(`#content-left-${contentId} .slide-image`).length;
    showImage(contentId, currentIndexes[contentId]);
}

// 初始化显示第一张图片
for (let contentId in currentIndexes) {
    showImage(contentId, currentIndexes[contentId]);
}




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
