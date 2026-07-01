# OptiCrop - User Manual

This manual provides instructions on how to access, navigate, and use the **OptiCrop** Crop Recommendation System.

---

## 1. Accessing the Application

To open and run the OptiCrop application:
1. Ensure the Flask server is running on your machine (see the [Installation Guide](Installation_Guide.md) for details).
2. Open any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).
3. Type the following address in the URL bar and press Enter:
   👉 **[http://127.0.0.1:5000](http://127.0.0.1:5000)**
4. The home page will load, displaying the **OptiCrop** input form.

---

## 2. Entering Input Values

The system requires seven soil and environmental parameters to make an accurate crop recommendation. Enter the values in the respective fields:

### A. Soil Parameters
1. **Nitrogen (N)**: Enter the nitrogen content of your soil in milligrams per kilogram ($mg/kg$). *Recommended range: 0 to 200.*
2. **Phosphorous (P)**: Enter the phosphorous content of your soil in $mg/kg$. *Recommended range: 0 to 200.*
3. **Potassium (K)**: Enter the potassium content of your soil in $mg/kg$. *Recommended range: 0 to 300.*
4. **Soil pH**: Enter the pH value of the soil. This indicates acidity or alkalinity (7.0 is neutral). *Valid range: 0.0 to 14.0.*

### B. Weather & Environmental Parameters
5. **Temperature (°C)**: Enter the average ambient temperature of your region in degrees Celsius. *Plausible range: -10 to 60.*
6. **Humidity (%)**: Enter the relative atmospheric humidity percentage. *Valid range: 0% to 100%.*
7. **Rainfall (mm)**: Enter the average seasonal or annual rainfall in millimeters. *Plausible range: 0 to 500.*

> [!TIP]
> Hover your cursor over the small **info icon (i)** next to each field label to see a brief description of the parameter.

---

## 3. Predicting a Crop

1. Once all seven fields are filled with numerical values, review them for accuracy.
2. Click the **Predict Suitable Crop** button (the green glowing button at the bottom right).
3. If any field contains invalid data (e.g., negative values, out-of-bounds pH, or empty fields), the form will block submission and highlight the invalid fields in red with an error message. Correct these values and click predict again.
4. If the inputs are valid, a full-screen loading overlay will appear stating **"Analyzing Soil & Weather..."**. The prediction takes less than a second.
5. You will be redirected to the **Recommendation Analysis** page.

---

## 4. Understanding the Prediction Result

The result page is divided into three key sections:

### A. Recommended Crop Card
A large, highlighted, glowing card displays the name of the recommended crop in bold letters (e.g., **Rice**, **Maize**, **Mango**, etc.). This crop has been determined by the machine learning model as the most biologically suited to your soil and weather conditions.

### B. Confidence Score
If the model calculates class probabilities, a confidence badge is shown (e.g., `Confidence: 75.7%`). This indicates the statistical confidence level of the model's recommendation.

### C. Submitted Parameters Summary
A grid at the bottom of the page displays the exact values you entered. This allows you to verify your inputs and keep a record of the query.

### D. Navigation Buttons
- **Predict Again**: Redirects you to the home page with a cleared form to run another analysis.
- **Return Home**: Redirects you back to the home page.

---

## 5. Troubleshooting Common Issues

### Issue 1: "This site can't be reached" (Page does not load)
* **Cause**: The Flask development server is not running, or it is running on a different port.
* **Solution**: Go to your terminal/VS Code, navigate to the `06_Web_Application` folder, and run `python app.py`. Make sure the terminal says `Running on http://127.0.0.1:5000`.

### Issue 2: "Prediction system is offline: Model file is missing"
* **Cause**: The serialized model `crop_model.pkl` is missing from the `06_Web_Application/model/` directory.
* **Solution**: Copy `crop_model.pkl` from the `05_Model_Building/` directory and paste it into `06_Web_Application/model/`. Restart the Flask server.

### Issue 3: "All inputs must be valid numerical values"
* **Cause**: You bypassed the browser's keystroke handler and pasted alphabetic text or special characters into the form.
* **Solution**: Ensure only numbers and decimals are entered in all fields.

### Issue 4: "Internal Server Error (HTTP 500)"
* **Cause**: An unexpected error occurred on the backend.
* **Solution**: Check the terminal logs where Flask is running to see the error traceback. If the issue persists, verify that the version of `scikit-learn` used to train the model matches the version installed in your virtual environment.
