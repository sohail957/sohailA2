document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const successMessage = document.getElementById('form-success');
    const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');

    // Function to add error class and display message
    const showError = (element, message) => {
        // Find the element to attach the error message to
        let errorContainer = element.parentNode;

        // For radio/checkbox groups, we attach the error to the element below the question
        if (element.classList.contains('form-question')) {
            errorContainer = element.nextElementSibling;
        }

        // Check if error message already exists
        let errorSpan = errorContainer.querySelector('.error-message');

        if (!errorSpan) {
            // Create new error message span
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-message');
            errorSpan.style.color = 'red';
            errorSpan.style.fontSize = '0.9em';
            errorSpan.style.marginTop = '5px';
            errorContainer.appendChild(errorSpan);
        }
        
        errorSpan.textContent = message;

        // Add visual indicator to the input itself (if it's a direct input field)
        if (element.tagName !== 'P') {
            element.classList.add('input-error');
        }
    };

    // Function to remove error class and message
    const clearError = (element) => {
        if (element.tagName !== 'P') {
            element.classList.remove('input-error');
        }
        
        // Find the parent element where the error might be attached
        let errorContainer = element.parentNode;
        if (element.classList.contains('form-question')) {
            errorContainer = element.nextElementSibling;
        }

        const errorSpan = errorContainer.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.remove();
        }
    };

    // Real-time validation for required fields
    requiredInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                clearError(input);
            }
        });
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop default submission

        let isValid = true;
        successMessage.textContent = ''; // Clear previous message

        // 1. Validate all required fields using browser built-in validation
        requiredInputs.forEach(input => {
            if (!input.checkValidity()) {
                // Focus on the first invalid field to guide the user
                if (isValid) {
                    input.focus();
                }
                isValid = false;
                showError(input, input.validationMessage || 'This field is required.');
            } else {
                clearError(input);
            }
        });

        // 2. Additional check for the 'isNew' radio button group
        const newPatientRadios = form.elements.isNew;
        let isRadioChecked = false;
        for (const radio of newPatientRadios) {
            if (radio.checked) {
                isRadioChecked = true;
                break;
            }
        }

        const questionElement = form.querySelector('.form-question');
        if (!isRadioChecked) {
            isValid = false;
            // Display error near the question/group
            showError(questionElement, 'Please indicate if you are a new patient.');
        } else {
            clearError(questionElement);
        }
        
        // 3. Handle successful submission
        if (isValid) {
            // In a real application, you would send data to a server here (e.g., using fetch API)
            
            // Simulation of successful booking
            form.reset();
            
            // Clear all visual errors on successful reset
            form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            form.querySelectorAll('.error-message').forEach(el => el.remove());

            successMessage.textContent = '✅ Your appointment request has been submitted! We will contact you soon to confirm the details.';
            successMessage.style.color = 'green';
            console.log('Form data submitted successfully (simulated).');
        }
    });
});