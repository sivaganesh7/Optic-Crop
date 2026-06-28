/**
 * OptiCrop - Client-Side Validation and UI Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("prediction-form");
    const loadingOverlay = document.getElementById("loading-overlay");
    const inputs = form.querySelectorAll("input");

    // Define validation constraints matching the backend
    const constraints = {
        N: { min: 0, max: 200, label: "Nitrogen (N)", unit: "mg/kg" },
        P: { min: 0, max: 200, label: "Phosphorous (P)", unit: "mg/kg" },
        K: { min: 0, max: 300, label: "Potassium (K)", unit: "mg/kg" },
        temperature: { min: -10, max: 60, label: "Temperature", unit: "°C" },
        humidity: { min: 0, max: 100, label: "Humidity", unit: "%" },
        ph: { min: 0, max: 14, label: "Soil pH", unit: "" },
        rainfall: { min: 0, max: 500, label: "Rainfall", unit: "mm" }
    };

    /**
     * Shows validation error for a specific input group
     */
    function showError(input, message) {
        const group = input.closest(".input-group");
        const errorDisplay = group.querySelector(".error-msg");
        group.classList.add("invalid");
        errorDisplay.textContent = message;
    }

    /**
     * Clears validation error for a specific input group
     */
    function clearError(input) {
        const group = input.closest(".input-group");
        const errorDisplay = group.querySelector(".error-msg");
        group.classList.remove("invalid");
        errorDisplay.textContent = "";
    }

    /**
     * Validates a single input field
     */
    function validateField(input) {
        const id = input.id;
        const valStr = input.value.trim();
        const rule = constraints[id];

        if (!rule) return true;

        // 1. Check if empty
        if (valStr === "") {
            showError(input, `${rule.label} is required.`);
            return false;
        }

        // 2. Check if numeric
        const value = parseFloat(valStr);
        if (isNaN(value)) {
            showError(input, `${rule.label} must be a number.`);
            return false;
        }

        // 3. Check minimum bound
        if (value < rule.min) {
            showError(input, `${rule.label} cannot be less than ${rule.min}${rule.unit}.`);
            return false;
        }

        // 4. Check maximum bound
        if (value > rule.max) {
            showError(input, `${rule.label} cannot exceed ${rule.max}${rule.unit}.`);
            return false;
        }

        // Field is valid
        clearError(input);
        return true;
    }

    // Attach real-time validation on input
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            validateField(input);
        });

        // Prevent typing non-numeric characters where possible
        input.addEventListener("keydown", (e) => {
            // Allow control keys (backspace, delete, tab, arrows, etc.)
            const allowedKeys = [
                "Backspace", "Delete", "Tab", "Escape", "Enter", 
                "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
                "Home", "End"
            ];
            
            if (allowedKeys.includes(e.key)) {
                return;
            }

            // Allow decimal point and minus sign (only once, and at appropriate positions)
            if (e.key === "." && !input.value.includes(".")) {
                return;
            }
            if (e.key === "-" && input.value === "" && input.id === "temperature") {
                return;
            }

            // Allow numbers
            if (/^[0-9]$/.test(e.key)) {
                return;
            }

            // Prevent any other keypress
            e.preventDefault();
        });
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
        let isFormValid = true;

        // Validate all fields
        inputs.forEach(input => {
            const isFieldValid = validateField(input);
            if (!isFieldValid) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            // Stop form submission if validation fails
            e.preventDefault();
            
            // Find the first invalid element and scroll it into view
            const firstInvalid = form.querySelector(".input-group.invalid");
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        } else {
            // Show loading overlay
            loadingOverlay.classList.add("active");
        }
    });

    // Handle form reset
    form.addEventListener("reset", () => {
        // Clear all validation errors
        inputs.forEach(input => {
            clearError(input);
        });
        
        // Hide error alert if present
        const errorAlert = document.getElementById("error-alert");
        if (errorAlert) {
            errorAlert.style.opacity = "0";
            setTimeout(() => {
                errorAlert.style.display = "none";
            }, 300);
        }
    });
});
