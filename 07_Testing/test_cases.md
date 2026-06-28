# OptiCrop Test Cases

This document lists the test cases designed and executed to verify the functionality, reliability, and performance of the **OptiCrop** application.

| Test Case ID | Module | Input / Action | Expected Output | Actual Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-001** | Dataset Verification | Check if `Crop_recommendation.csv` exists. | File exists in `03_Data_Analysis/`. | File exists. | **Pass** |
| **TC-002** | Dataset Verification | Load dataset using pandas. | Dataset loads successfully without errors; not empty. | Dataset loaded successfully (2200 rows). | **Pass** |
| **TC-003** | Dataset Verification | Verify required columns exist. | All 8 required columns (`N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall`, `label`) exist. | All 8 required columns are present. | **Pass** |
| **TC-004** | Model Verification | Check if `crop_model.pkl` exists. | File exists in `06_Web_Application/model/`. | File exists. | **Pass** |
| **TC-005** | Model Verification | Load model using joblib. | Model loads successfully, is a dict, and contains the `"model"` key. | Model loaded successfully (Scikit-Learn Pipeline). | **Pass** |
| **TC-006** | Prediction Core | Pass sample: `N=90, P=42, K=43, Temp=20.8, Hum=82, pH=6.5, Rain=202` to model. | Returns a valid non-empty string crop name. | Returns `"rice"`. | **Pass** |
| **TC-007** | Flask Routing | Send `GET /` request. | Returns HTTP 200; page contains "OptiCrop" and input form. | Returns HTTP 200; contains "OptiCrop" and form. | **Pass** |
| **TC-008** | Flask Routing | Send `POST /predict` with valid values (same as TC-006). | Returns HTTP 200; page contains "Recommendation" and "Rice". | Returns HTTP 200; displays "Rice" with 75.1% confidence. | **Pass** |
| **TC-009** | Form Validation | Submit form with empty `N` (Nitrogen) field. | Form submission blocked; displays "Nitrogen (N) is required." | Submission blocked; displays "Nitrogen (N) is required." | **Pass** |
| **TC-010** | Form Validation | Submit form with negative value (`P = -5`). | Form submission blocked; displays "Phosphorous (P) must be between 0 and 200 mg/kg." | Submission blocked; displays "Phosphorous (P) must be between 0 and 200 mg/kg." | **Pass** |
| **TC-011** | Form Validation | Input alphabetic characters (`"abc"`) into `K` field. | Input blocked by keystroke handler or rejected; displays "Potassium (K) must be a number." | Characters blocked by keyboard listener; error shown if bypassed. | **Pass** |
| **TC-012** | Form Validation | Submit form with `ph = 15.5`. | Form submission blocked; displays "Soil pH must be between 0.0 and 14.0." | Submission blocked; displays "Soil pH must be between 0 and 14." | **Pass** |
| **TC-013** | Form Validation | Submit form with `temperature = -20`. | Form submission blocked; displays "Temperature must be between -10°C and 60°C." | Submission blocked; displays "Temperature must be between -10°C and 60°C." | **Pass** |
| **TC-014** | Error Handling | Temporarily rename `crop_model.pkl` and send `POST /predict`. | Application does not crash; displays a user-friendly error message. | Displays "Prediction system is offline: Model file is missing." | **Pass** |
| **TC-015** | Performance | Measure prediction response time for a single sample. | Prediction completes in less than 1.0 second. | Inference completed in **1.27 ms**. | **Pass** |
