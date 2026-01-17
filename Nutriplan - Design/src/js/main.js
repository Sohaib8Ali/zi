const recipes_grid = document.getElementById('recipes-grid');
const Recipe_Details = document.getElementById('RecipeDetails');

async function get() {
    const response = await fetch('https://nutriplan-api.vercel.app/api/meals/random?count=25');
    const data = await response.json();
    console.log(data.results);

    recipes_grid.innerHTML = '';

    if (data.results && data.results.length > 0) {
        data.results.forEach(meal => {
            const div = document.createElement('div');
            div.innerHTML = `<div id="mealCard"
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="52772">
            <div class="relative h-48 overflow-hidden">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src= "${meal.thumbnail}" 
                loading="lazy" />
              <div class="absolute bottom-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                  ${meal.name}
                </span>
                <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                  ${meal.category}
                </span>
              </div>
            </div>`;


            // Recipe Details

            div.addEventListener('click', () => {
                Recipe_Details.innerHTML = `
                    <div class="relative h-80 md:h-96">
                        <img src="${meal.thumbnail}" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 right-0 p-8">
                            <div class="flex items-center gap-3 mb-3">
                                <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area}</span>
                                <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
                            </div>
                            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                                ${meal.name}
                            </h1>
                            <div class="flex items-center gap-6 text-white/90">
                                <span class="flex items-center gap-2">
                                    <i class="fa-solid fa-clock"></i>
                                    <span>30 min</span>
                                </span>
                                <span class="flex items-center gap-2">
                                    <i class="fa-solid fa-utensils"></i>
                                    <span id="hero-servings">4 servings</span>
                                </span>
                                <span class="flex items-center gap-2">
                                    <i class="fa-solid fa-fire"></i>
                                    <span id="hero-calories">485 cal/serving</span>
                                </span>
                            </div>
                        </div>
                    </div>
                `;

                Recipe_Details.scrollIntoView({ behavior: "smooth" });
            });
            recipes_grid.appendChild(div);
        });
    } else {
        recipes_grid.innerHTML = "<p>No meals found.</p>";
    }
}

// categories-grid
const categories_grid = document.getElementById('categories-grid');

async function categoriesGrid() {
    const response_categories_grid = await fetch('https://nutriplan-api.vercel.app/api/meals/categories');
    const data = await response_categories_grid.json();
    console.log(data.results);

    categories_grid.innerHTML = "";

    data.results.forEach(category => {
        const div = document.createElement("div");

        div.innerHTML = `<div
            class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group">
            <div class="flex items-center gap-2.5">
              <div
                class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                 <img src="${category.thumbnail}"/>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
              </div>
            </div>
          </div>
          `;

        div.addEventListener("click", () => {
            getMealsByCategory(category.name);
        });
        categories_grid.appendChild(div);
    });
};



// category-card
async function getMealsByCategory(categoryName) {
    const response = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/filter?category=${categoryName}`
    );

    const data = await response.json();
    console.log(data.results);

    recipes_grid.innerHTML = "";

    data.results.forEach(meal => {
        recipes_grid.innerHTML += `<div id="mealCard"
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="52772">
            <div class="relative h-48 overflow-hidden">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src= "${meal.thumbnail}" 
                loading="lazy" />
              <div class="absolute bottom-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                  ${meal.name}
                </span>
                <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                  ${meal.category}
                </span>
              </div>
            </div>`
    });
}
get();
categoriesGrid();
getMealsByCategory();

