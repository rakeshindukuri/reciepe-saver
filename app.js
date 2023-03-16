// Define global variables
const recipeForm = document.querySelector('form');
const recipeList = document.querySelector('ul');
const recipeDetailsModal = document.querySelector('#recipe-details-modal');
const recipeDetailsTitle = document.querySelector('#recipe-details-title');
const recipeDetailsInstructions = document.querySelector('#recipe-details-instructions');
const recipeDetailsNotes = document.querySelector('#recipe-details-notes');
let recipes = [];

// Add event listeners
recipeForm.addEventListener('submit', addRecipe);
recipeList.addEventListener('click', showRecipeDetails);
recipeDetailsModal.addEventListener('click', hideRecipeDetails);

// Function to add a recipe
function addRecipe(event) {
  event.preventDefault();
  const title = recipeForm.querySelector('#recipe-title').value;
  const instructions = recipeForm.querySelector('#recipe-instructions').value;
  const notes = recipeForm.querySelector('#recipe-notes').value;
  const recipe = {title, instructions, notes};
  recipes.push(recipe);
  recipeForm.reset();
  updateRecipeList();
  localStorage.setItem('recipes', JSON.stringify(recipes));
}


// Function to update the recipe list in the UI
function updateRecipeList() {
  // Update the recipe list in the UI
  recipeList.innerHTML = '';
  recipes.forEach((recipe, index) => {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    h3.textContent = recipe.title;
    li.appendChild(h3);
    li.dataset.index = index;
    recipeList.appendChild(li);
  });

  // Store the recipes in local storage
  localStorage.setItem('recipes', JSON.stringify(recipes));
}


// Function to show recipe details in a modal
function showRecipeDetails(event) {
  const li = event.target.closest('li');
  if (li) {
    const index = li.dataset.index;
    const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (storedRecipes) {
      recipes = storedRecipes;
    }
    const recipe = recipes[index];
    recipeDetailsTitle.textContent = recipe.title;
    recipeDetailsInstructions.textContent = recipe.instructions;
    recipeDetailsNotes.textContent = recipe.notes;
    recipeDetailsModal.style.display = 'block';
  }
}


// Function to hide recipe details modal
function hideRecipeDetails(event) {
  if (event.target === recipeDetailsModal) {
    recipeDetailsModal.style.display = 'none';
  }
}

