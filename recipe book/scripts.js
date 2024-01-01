document.addEventListener('DOMContentLoaded', function () {
    const recipeList = document.getElementById('recipeList');
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const recipeModal = document.getElementById('recipeModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const recipeForm = document.getElementById('recipeForm');
    const modalTitle = document.getElementById('modalTitle');

    addRecipeBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalHandler);
    recipeForm.addEventListener('submit', saveRecipe);
    recipeList.addEventListener('click', handleRecipeListClick);

    displayRecipes();

    function openModal() {
        modalTitle.textContent = 'Add Recipe';
        recipeForm.reset();
        recipeModal.style.display = 'block';
    }

    function closeModalHandler() {
        recipeModal.style.display = 'none';
    }

    function saveRecipe(event) {
        event.preventDefault();

        const recipeName = document.getElementById('recipeName').value;
        const ingredients = document.getElementById('ingredients').value;
        const instructions = document.getElementById('instructions').value;

        if (recipeName && ingredients && instructions) {
            const recipe = {
                name: recipeName,
                ingredients: ingredients,
                instructions: instructions
            };

            let recipes = getRecipesFromStorage();
            recipes.push(recipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));

            displayRecipes();
            closeModalHandler();
        }
    }

    function handleRecipeListClick(event) {
        if (event.target.tagName === 'BUTTON') {
            const index = event.target.dataset.index;
            deleteRecipe(index);
        }
    }

    function deleteRecipe(index) {
        let recipes = getRecipesFromStorage();
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

    function displayRecipes() {
        const recipes = getRecipesFromStorage();
        recipeList.innerHTML = '';

        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            recipeCard.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
                <p><strong>Instructions:</strong><br>${recipe.instructions}</p>
                <button data-index="${index}">Delete</button>
            `;

            recipeList.appendChild(recipeCard);
        });
    }

    function getRecipesFromStorage() {
        let recipes = localStorage.getItem('recipes');
        return recipes ? JSON.parse(recipes) : [];
    }
});
