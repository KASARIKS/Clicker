// html elemetns
let beans = document.querySelector('.beans-span');
let farm_btn = document.querySelector('.farm-button');
let simple_farm_shop = document.getElementById('simple-farm-shop');
let auto_farm_shop = document.getElementById('auto-farm-shop');
let auto_speed_shop = document.getElementById('auto-speed-shop')
let auto_app = 1;
let simple_app = 5;
let speed_delay = 2;

function appBeans(beans_num) {
    let beans_num_old = Number(beans.innerHTML);
    beans.innerHTML = `${beans_num_old + beans_num}`;
    
    // shop cycle, painting shop buttons
    for (let i = 0; i < simple_farm_shop.children.length; ++i) {
        if (simple_farm_shop.children[i].getAttribute('data-cost') <= Number(beans.innerHTML)) {
            simple_farm_shop.children[i].classList.remove('btn-outline-danger');
            simple_farm_shop.children[i].classList.add('btn-outline-success');
        } else {
            simple_farm_shop.children[i].classList.remove('btn-outline-success');
            simple_farm_shop.children[i].classList.add('btn-outline-danger'); 
        }

        if (auto_farm_shop.children[i].getAttribute('data-cost') <= Number(beans.innerHTML)) {
            auto_farm_shop.children[i].classList.remove('btn-outline-danger');
            auto_farm_shop.children[i].classList.add('btn-outline-success');
        } else {
            auto_farm_shop.children[i].classList.remove('btn-outline-success');
            auto_farm_shop.children[i].classList.add('btn-outline-danger');     
        }

        if (auto_speed_shop.children[i].getAttribute('data-cost') <= Number(beans.innerHTML)) {
            auto_speed_shop.children[i].classList.remove('btn-outline-danger');
            auto_speed_shop.children[i].classList.add('btn-outline-success');
        } else {
            auto_speed_shop.children[i].classList.remove('btn-outline-success');
            auto_speed_shop.children[i].classList.add('btn-outline-danger');
        }
    }
}

// when buy upgrade farm-button
for (let i = 0; i < simple_farm_shop.children.length; ++i) {
    simple_farm_shop.children[i].addEventListener('click', () => {
        if (Number(simple_farm_shop.children[i].getAttribute('data-cost')) <= Number(beans.innerHTML)) {
            simple_app += Number(simple_farm_shop.children[i].getAttribute('data-upgrade'));
            appBeans(-1 * Number(simple_farm_shop.children[i].getAttribute('data-cost')));
        }
    });
}

// when buy upgrade count of auto farming
for (let i = 0; i < auto_farm_shop.children.length; ++i) {
    auto_farm_shop.children[i].addEventListener('click', () => {
        if (Number(auto_farm_shop.children[i].getAttribute('data-cost')) <= Number(beans.innerHTML)) {
            auto_app += Number(auto_farm_shop.children[i].getAttribute('data-upgrade'));
            appBeans(-1 * Number(auto_farm_shop.children[i].getAttribute('data-cost')));
        }
    });
}

// when buy upgrade speed of auto farming
for (let i = 0; i < auto_speed_shop.children.length; ++i) {
    auto_speed_shop.children[i].addEventListener('click', () => {
        if (Number(auto_speed_shop.children[i].getAttribute('data-cost')) <= Number(beans.innerHTML)) {
            speed_delay += Number(auto_speed_shop.children[i].getAttribute('data-upgrade'));
            if (speed_delay < 0) {speed_delay = 0.1}
            appBeans(-1 * Number(auto_speed_shop.children[i].getAttribute('data-cost')));
        }
    });
}

// auto-farm function, it`s recursive function, pushing itself to stack of calling
function autoFarm() {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            appBeans(auto_app);
            autoFarm();
            resolve();
        }, speed_delay * 1000);
    });
}


farm_btn.addEventListener('click', () => {appBeans(simple_app)});
autoFarm();
