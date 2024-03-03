
function readProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            let shuffledData;
            if (category) {
                const filteredData = data.filter(product => product.category.toLowerCase() === category.toLowerCase());
                shuffledData = shuffleArray(filteredData);
            } else {
                shuffledData = shuffleArray(data);
            }
            showProduct(shuffledData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayProduct(product) {
    const {image, url, title, category} = product;
    let html = `
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="room-item shadow rounded overflow-hidden">
                <div class="position-relative">
                    <a href="${url}"><img class="img-fluid" src="${image}" alt="${title}" style="height: 430px"></a>
                    <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">${category}</small>
                </div>
                <div class="p-4 mt-2">
                    <div class="d-flex justify-content-between mb-3">
                        <h5 class="mb-0">${title}</h5>
                    </div>
                    
                    <div class="d-flex justify-content-between">
                        <a class="btn btn-sm btn-primary rounded py-2 px-4" href="${url}">View Detail</a>
                        <a class="btn btn-sm btn-dark rounded py-2 px-4" href="${url}">Buy Now</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    let element = document.getElementById('products');
    element.innerHTML += html;
}

function showProduct(data) {
    data.map(product => displayProduct(product))
}

readProducts();
