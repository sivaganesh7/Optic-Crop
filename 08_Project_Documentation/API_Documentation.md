# OptiCrop - API 08_Documentation

This document describes the API endpoints available in the **OptiCrop** web application. The backend is built using Flask and exposes two primary routes.

---

## Endpoint Overview

| Route | Method | Content-Type | Description |
| :--- | :--- | :--- | :--- |
| `/` | `GET` | `text/html` | Displays the main user interface (Home Page). |
| `/predict` | `POST` | `application/x-www-form-urlencoded` | Accepts soil and environmental parameters, processes them through the ML model, and returns the recommendation. |

---

## 1. GET /

### Description
Renders the home page containing the user input form.

### Request
* **URL**: `/`
* **Method**: `GET`
* **Headers**: None
* **Query Parameters**: None

### Response
* **Status Code**: `200 OK`
* **Content-Type**: `text/html`
* **Body**: HTML content of the home page.

---

## 2. POST /predict

### Description
Receives form data, validates the inputs, loads the pre-trained machine learning model, makes a prediction, and renders the result page.

### Request
* **URL**: `/predict`
* **Method**: `POST`
* **Headers**:
  - `Content-Type: application/x-www-form-urlencoded`
* **Body Parameters**:
  The body must contain exactly seven numerical fields.

| Parameter | Type | Required | Range / Constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| `N` | `float` | Yes | `0` to `200` | Nitrogen content in the soil ($mg/kg$). |
| `P` | `float` | Yes | `0` to `200` | Phosphorous content in the soil ($mg/kg$). |
| `K` | `float` | Yes | `0` to `300` | Potassium content in the soil ($mg/kg$). |
| `temperature` | `float` | Yes | `-10.0` to `60.0` | Ambient temperature in degrees Celsius (°C). |
| `humidity` | `float` | Yes | `0.0` to `100.0` | Relative humidity percentage (%). |
| `ph` | `float` | Yes | `0.0` to `14.0` | Soil pH level. |
| `rainfall` | `float` | Yes | `0.0` to `500.0` | Average rainfall in millimeters ($mm$). |

### Response (Success)
* **Status Code**: `200 OK`
* **Content-Type**: `text/html`
* **Body**: Renders `result.html` containing:
  - **`crop`**: String representing the recommended crop (e.g., `Rice`, `Maize`).
  - **`confidence`**: Float representing the prediction probability (e.g., `75.7`).
  - **`inputs`**: A dictionary containing the parsed input parameters.

### Response (Validation Failure or Error)
* **Status Code**: `200 OK` (Flask handles errors gracefully and renders the form page with error messages)
* **Content-Type**: `text/html`
* **Body**: Renders `index.html` containing:
  - **`error`**: String explaining the validation failure or system offline message.
  - **`form_data`**: The form data entered by the user, so they do not have to retype it.

---

## Example Form Submission (Under the Hood)

When the user submits the HTML form, the browser sends an HTTP request similar to the following:

```http
POST /predict HTTP/1.1
Host: 127.0.0.1:5000
Content-Type: application/x-www-form-urlencoded

N=90&P=42&K=43&temperature=20.8&humidity=82&ph=6.5&rainfall=202
```

The Flask server processes this request, converts the values, and executes:

```python
# Create DataFrame
sample_df = pd.DataFrame([{
    "N": 90.0, "P": 42.0, "K": 43.0, 
    "temperature": 20.8, "humidity": 82.0, 
    "ph": 6.5, "rainfall": 202.0
}])

# Make prediction
prediction = model.predict(sample_df)[0]  # Returns 'rice'
```

It then renders the result page showing **Rice** to the user.
