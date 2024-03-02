const fetchCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const display = data.data;
    displayAll(display);
}

const btnContainer = document.getElementById('btn-container');
const ErrorElement = document.getElementById('error-element'); 

const displayAll = (displayData) => {
    displayData.forEach(item => {
        const newBtn = document.createElement('button');
        newBtn.className = "btn btn-ghost bg-slate-700 text-white text-lg";
        newBtn.innerText = item.category;
        newBtn.addEventListener('click', () => {
            cardContainer.innerHTML = ''; // Clear existing cards
            fetchDataByCategory(item.category_id);
        });
        btnContainer.appendChild(newBtn);
    });
}

const cardContainer = document.getElementById('card-container');

const fetchDataByCategory = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const videos = data.data;
    if(videos.length=== 0)
        {
            ErrorElement.classList.remove('hidden');
        }
        else{

            ErrorElement.classList.add('hidden'); 
        }

    videos.forEach(video => {
        let badge = '';
        if (video.authors[0].verified) {
            badge ='<img class="w-6 h-6" src="verify.png"></img>';
        }
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src="${video.thumbnail}" alt="${video.title}" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="${video.authors[0].profile_name}" />
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                                ${badge}
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });
}

fetchCategories(); 
