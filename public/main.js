// Main JavaScript file for CookBook app

document.addEventListener('DOMContentLoaded', function() {
    // Initialize any interactive elements when the page loads
    console.log('CookBook app loaded successfully!');
    
    // Add confirmation dialogs for delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete, [onclick*="confirm"]');
    deleteButtons.forEach(button => {
        if (!button.getAttribute('onclick')) {
            button.addEventListener('click', function(e) {
                if (!confirm('Are you sure you want to delete this item?')) {
                    e.preventDefault();
                    return false;
                }
            });
        }
    });
    
    // Auto-focus first input in forms
    const firstInput = document.querySelector('form input[type="text"]:first-of-type');
    if (firstInput) {
        firstInput.focus();
    }
    
    // Add smooth transitions for form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
            }
        });
    });
});

// Utility functions
function showMessage(message, type = 'info') {
    // Simple message display function
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        border-radius: 4px;
        z-index: 1000;
        max-width: 300px;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Recipe-specific functionality
function toggleIngredientSelection() {
    // Function to help with ingredient selection in forms
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="ingredients"]');
    const selectedCount = document.querySelectorAll('input[type="checkbox"][name="ingredients"]:checked').length;
    
    // Update any ingredient count displays
    const countDisplay = document.querySelector('.ingredient-count');
    if (countDisplay) {
        countDisplay.textContent = `${selectedCount} ingredients selected`;
    }
}

// Add event listeners for ingredient checkboxes
document.addEventListener('change', function(e) {
    if (e.target.matches('input[type="checkbox"][name="ingredients"]')) {
        toggleIngredientSelection();
    }
});