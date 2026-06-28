# OptiCrop - Manual 07_Testing Guide

This document provides step-by-step instructions for manually verifying the **OptiCrop** web application.

---

## 1. Home Page 07_Testing
### Objective
Verify that the home page loads correctly and displays all required elements.

### Steps
1. Open a web browser and navigate to: `http://127.0.0.1:5000`.
2. Verify that the page title is **OptiCrop - Smart Agricultural Production Optimization**.
3. Verify that the header displays the **OptiCrop** logo (with the leaf icon), the main title, and the subtitle.
4. Verify that the form contains exactly 7 input fields:
   - Nitrogen (N)
   - Phosphorous (P)
   - Potassium (K)
   - Temperature (°C)
   - Humidity (%)
   - Soil pH
   - Rainfall (mm)
5. Verify that each input field has a placeholder, a helper text indicating the recommended range, and an **info icon (i)** that displays a tooltip on hover.
6. Verify the presence of two buttons: **Reset Form** and **Predict Suitable Crop**.

---

## 2. Prediction 07_Testing
### Objective
Verify that the system performs crop predictions and displays the result correctly.

### Steps
1. Navigate to the home page.
2. Fill in the form fields with the following valid values:
   - **Nitrogen**: `90`
   - **Phosphorous**: `42`
   - **Potassium**: `43`
   - **Temperature**: `20.8`
   - **Humidity**: `82`
   - **Soil pH**: `6.5`
   - **Rainfall**: `202`
3. Click the **Predict Suitable Crop** button.
4. Verify that the loading overlay appears with the message *"Analyzing Soil & Weather..."* and a spinning animation.
5. Verify that you are redirected to the result page.
6. Verify that the result page displays the **Recommended Crop** inside a large glowing card: **Rice**.
7. Verify that the confidence score is displayed (e.g., `Confidence: 75.1%`).
8. Verify that the "Submitted Parameters" section shows a summary table matching the values you entered.

---

## 3. Form Validation 07_Testing
### Objective
Verify that the form prevents invalid data submission and displays helpful validation errors.

### Steps
1. **Empty Fields**:
   - Go to the home page.
   - Leave the **Nitrogen** field empty, and fill all other fields with valid values.
   - Click **Predict Suitable Crop**.
   - Verify that the form does not submit, the Nitrogen field is highlighted in red, and the error message *"Nitrogen (N) is required."* is displayed.
2. **Negative Values**:
   - Enter `-10` in the **Nitrogen** field and `6.5` in the **pH** field.
   - Click **Predict Suitable Crop**.
   - Verify that the form does not submit, and the error message *"Nitrogen (N) cannot be less than 0mg/kg."* appears.
3. **Out-of-Bounds Values**:
   - Enter `15.5` in the **Soil pH** field.
   - Click **Predict Suitable Crop**.
   - Verify that the form does not submit, and the error message *"Soil pH cannot exceed 14."* appears.
4. **Alphabetic Characters**:
   - Try typing letters (e.g., `abc`) into the **Potassium** field.
   - Verify that the keystroke handler blocks the characters, preventing them from being typed.
   - (If copy-pasted) Verify that an error message *"Potassium (K) must be a number."* is displayed.

---

## 4. Navigation 07_Testing
### Objective
Verify that all links and navigation buttons work correctly.

### Steps
1. Run a successful prediction to reach the result page.
2. Click the **Predict Again** button.
3. Verify that you are redirected back to the home page (`/`) and that the form is empty and ready for new inputs.
4. Run another prediction to reach the result page.
5. Click the **Return Home** button.
6. Verify that you are redirected back to the home page.
7. Fill out some fields on the home page, then click the **Reset Form** button.
8. Verify that all input fields are cleared, and any active validation error messages are removed.

---

## 5. Responsive Design 07_Testing
### Objective
Verify that the application layout is responsive and mobile-friendly.

### Steps
1. Open the home page.
2. Open your browser's Developer Tools (F12) and toggle the **Device Toolbar** (mobile view).
3. Select a mobile device size (e.g., iPhone 12, Pixel 5) or manually resize the viewport.
4. Verify that:
   - The form layout collapses from a multi-column grid into a single column.
   - All input fields remain fully visible and clickable.
   - The buttons stack vertically to fit the screen width.
   - No text is clipped or overflows the screen edges.
5. Repeat the checks on the result page, ensuring the crop recommendation card and parameters table scale down gracefully.

---

## 6. Error Handling 07_Testing
### Objective
Verify that the application handles server-side errors gracefully without exposing raw code exceptions.

### Steps
1. Go to the `06_Web_Application/model/` directory.
2. Temporarily rename `crop_model.pkl` to `crop_model_temp.pkl` to simulate a missing model file.
3. Go to the web browser, fill in the form with valid values, and click **Predict Suitable Crop**.
4. Verify that:
   - The application does not show a blank page or a raw Python traceback (500 Internal Server Error).
   - An alert banner appears on the home page with the message: *"Prediction system is offline: Model file is missing. Please contact administration."*
5. Rename `crop_model_temp.pkl` back to `crop_model.pkl` and verify that the prediction functionality is restored.
