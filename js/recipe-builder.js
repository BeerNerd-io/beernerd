// Home Brew Recipe Builder

class RecipeBuilder {
    constructor() {
        this.recipe = {
            name: '',
            style: '',
            batchSize: 5,
            grains: [],
            hops: [],
            yeast: '',
            otherIngredients: [],
            mashSchedule: [],
            fermentationSchedule: []
        };
        this.initializeUI();
    }

    initializeUI() {
        const form = document.getElementById('recipe-form');
        if (!form) return;

        form.innerHTML = `
            <div class="recipe-section">
                <h3 class="orbitron">Basic Info</h3>
                <div class="input-group">
                    <input type="text" id="recipe-name" required placeholder="Recipe Name">
                    <input type="text" id="beer-style" required placeholder="Beer Style">
                    <input type="number" id="batch-size" value="5" min="1" step="0.5" required placeholder="Batch Size (gallons)">
                </div>
            </div>

            <div class="recipe-section">
                <h3 class="orbitron">Ingredients</h3>
                <div id="grains-section">
                    <h4>Grains</h4>
                    <div id="grains-list"></div>
                    <button type="button" id="add-grain" class="btn-add">Add Grain</button>
                </div>
                <div id="hops-section">
                    <h4>Hops</h4>
                    <div id="hops-list"></div>
                    <button type="button" id="add-hop" class="btn-add">Add Hop</button>
                </div>
                <div class="input-group">
                    <input type="text" id="yeast" required placeholder="Yeast">
                </div>
                <div id="other-ingredients-section">
                    <h4>Other Ingredients</h4>
                    <div id="other-ingredients-list"></div>
                    <button type="button" id="add-ingredient" class="btn-add">Add Ingredient</button>
                </div>
            </div>

            <div class="recipe-section">
                <h3 class="orbitron">Brewing Process</h3>
                <div id="mash-schedule-section">
                    <h4>Mash Schedule</h4>
                    <div id="mash-steps-list"></div>
                    <button type="button" id="add-mash-step" class="btn-add">Add Mash Step</button>
                </div>
                <div id="fermentation-schedule-section">
                    <h4>Fermentation Schedule</h4>
                    <div id="fermentation-steps-list"></div>
                    <button type="button" id="add-fermentation-step" class="btn-add">Add Fermentation Step</button>
                </div>
            </div>

            <div id="recipe-calculations" class="recipe-section">
                <h3 class="orbitron">Recipe Calculations</h3>
                <div class="calculations-grid">
                    <div class="calculation-item">
                        <span>Original Gravity (OG):</span>
                        <span id="og-value">1.000</span>
                    </div>
                    <div class="calculation-item">
                        <span>Final Gravity (FG):</span>
                        <span id="fg-value">1.000</span>
                    </div>
                    <div class="calculation-item">
                        <span>ABV:</span>
                        <span id="abv-value">0.0%</span>
                    </div>
                    <div class="calculation-item">
                        <span>IBU:</span>
                        <span id="ibu-value">0</span>
                    </div>
                    <div class="calculation-item">
                        <span>SRM:</span>
                        <span id="srm-value">0</span>
                    </div>
                </div>
            </div>

            <div class="recipe-actions">
                <button type="submit" id="save-recipe" class="btn-primary">Save Recipe</button>
                <button type="button" id="download-pdf" class="btn-secondary">Download PDF</button>
            </div>
        `;

        this.attachEventListeners();
        this.updateCalculations();
    }

    attachEventListeners() {
        document.getElementById('add-grain').addEventListener('click', () => this.addIngredientField('grains'));
        document.getElementById('add-hop').addEventListener('click', () => this.addIngredientField('hops'));
        document.getElementById('add-ingredient').addEventListener('click', () => this.addIngredientField('other'));
        document.getElementById('add-mash-step').addEventListener('click', () => this.addProcessStep('mash'));
        document.getElementById('add-fermentation-step').addEventListener('click', () => this.addProcessStep('fermentation'));
        document.getElementById('recipe-form').addEventListener('input', () => this.updateCalculations());
        document.getElementById('save-recipe').addEventListener('click', (e) => this.saveRecipe(e));
        document.getElementById('download-pdf').addEventListener('click', () => this.downloadPDF());
    }

    addIngredientField(type) {
        const section = document.getElementById(`${type}-list`);
        const fieldSet = document.createElement('div');
        fieldSet.className = 'ingredient-fieldset';
        
        let html = '';
        if (type === 'grains') {
            html = `
                <input type="text" placeholder="Grain type" required>
                <input type="number" placeholder="Amount (lbs)" step="0.1" min="0" required>
                <input type="number" placeholder="Lovibond" min="0" required>
            `;
        } else if (type === 'hops') {
            html = `
                <input type="text" placeholder="Hop variety" required>
                <input type="number" placeholder="Amount (oz)" step="0.1" min="0" required>
                <input type="number" placeholder="Alpha Acid %" step="0.1" min="0" max="100" required>
                <input type="number" placeholder="Boil Time (min)" min="0" required>
            `;
        } else {
            html = `
                <input type="text" placeholder="Ingredient name" required>
                <input type="text" placeholder="Amount" required>
                <input type="text" placeholder="When to add" required>
            `;
        }
        html += '<button type="button" class="btn-remove">Remove</button>';
        
        fieldSet.innerHTML = html;
        fieldSet.querySelector('.btn-remove').addEventListener('click', () => fieldSet.remove());
        section.appendChild(fieldSet);
    }

    addProcessStep(type) {
        const section = document.getElementById(`${type}-steps-list`);
        const fieldSet = document.createElement('div');
        fieldSet.className = 'process-fieldset';
        
        let html = '';
        if (type === 'mash') {
            html = `
                <input type="number" placeholder="Temperature (°F)" min="0" required>
                <input type="number" placeholder="Duration (min)" min="0" required>
            `;
        } else {
            html = `
                <input type="text" placeholder="Stage name" required>
                <input type="number" placeholder="Temperature (°F)" min="0" required>
                <input type="number" placeholder="Duration (days)" min="0" required>
            `;
        }
        html += '<button type="button" class="btn-remove">Remove</button>';
        
        fieldSet.innerHTML = html;
        fieldSet.querySelector('.btn-remove').addEventListener('click', () => fieldSet.remove());
        section.appendChild(fieldSet);
    }

    updateCalculations() {
        // Placeholder for calculation logic
        // In a real implementation, these would be based on the recipe inputs
        document.getElementById('og-value').textContent = '1.050';
        document.getElementById('fg-value').textContent = '1.010';
        document.getElementById('abv-value').textContent = '5.2%';
        document.getElementById('ibu-value').textContent = '35';
        document.getElementById('srm-value').textContent = '10';
    }

    saveRecipe(e) {
        e.preventDefault();
        // Implement recipe saving logic here
        alert('Recipe saved successfully!');
    }

    downloadPDF() {
        // Implement PDF generation and download logic here
        alert('PDF download started!');
    }
}

// Initialize the Recipe Builder when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new RecipeBuilder();
});
