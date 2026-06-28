# 🌾 OptiCrop

**AI-Powered Smart Agricultural Production Optimization System**

OptiCrop is an end-to-end Machine Learning-based web application that recommends the most suitable crop based on soil nutrients and environmental conditions. The system helps farmers, researchers, and policymakers make data-driven agricultural decisions to improve crop productivity and promote sustainable farming practices.

---

## 📖 Project Overview

The system analyzes important agricultural parameters such as:
* **Nitrogen (N)**
* **Phosphorus (P)**
* **Potassium (K)**
* **Temperature**
* **Humidity**
* **pH**
* **Rainfall**

Using these parameters, the trained Machine Learning model predicts the most suitable crop for cultivation.

---

## 🎯 Objectives

* Recommend the best crop for given soil and weather conditions.
* Improve agricultural productivity.
* Reduce farming risks.
* Promote sustainable agriculture.
* Provide intelligent decision support using Machine Learning.

---

## 🚀 Features

* 🌾 **Smart Crop Recommendation**: Powered by a serialized Scikit-Learn pipeline.
* 📊 **Soil & Environmental Analysis**: Preprocessed using the IQR outlier removal method.
* 🤖 **Machine Learning Prediction**: Near-instantaneous inference (latency of **1.27 ms**).
* 🌐 **Flask Web Application**: Premium **Nature-Tech Glassmorphic** UI with glowing animations.
* 🛡️ **Dual-Layer Validation**: Client-side (JS) and server-side (Flask) input checks.
* 📑 **Comprehensive Testing**: Automated unit tests achieving **100% pass rate**.

---

## 🛠 Technology Stack

* **Backend**: Python 3.x, Flask, Joblib, Pandas, NumPy, Scikit-learn
* **Frontend**: HTML5, CSS3 (Vanilla glassmorphism), JavaScript (real-time validation & loading)
* **Deployment**: Gunicorn, Render, PythonAnywhere

---

## 📂 Repository Structure

```text
OptiCrop/
│
├── 01_Problem_Definition/        # Project definition, survey, and impact analysis
├── 02_Entity_Relationship_Diagram/ # Database architecture and ER diagrams
├── 03_Data_Analysis/             # Exploratory Data Analysis & Raw Dataset
├── 04_Preprocessing/             # Missing values, IQR outlier treatment, and splitting
├── 05_Model_Building/            # Model training, K-Means, and serialization
├── 06_Web_Application/           # Flask app backend, HTML templates, CSS/JS static files
├── 07_Testing/                   # Automated unit tests, manual testing guides, and reports
├── 08_Documentation/             # User manual, API, report, and deployment guides
├── 09_Workflows/                 # Visual project workflow and sequence diagrams
│
├── README.md                     # This root documentation file
├── requirements.txt              # Root dependencies including Gunicorn for production
├── .gitignore                    # Python and IDE git ignore rules
├── runtime.txt                   # Python version for Render deployment
└── Procfile                      # Process file for Render web service deployment
```

---

## 🔄 Project Workflow

```text
Problem Definition
        │
        ▼
Requirement Analysis
        │
        ▼
Database Design (ERD)
        │
        ▼
Dataset Collection
        │
        ▼
Exploratory Data Analysis (EDA)
        │
        ▼
Data Preprocessing (Outlier Removal)
        │
        ▼
Model Building & Serialization
        │
        ▼
Flask Web Application
        │
        ▼
Testing (Automated & Manual)
        │
        ▼
Documentation & Deployment
```

---

## ⚙️ Installation & Execution

### 1. Clone the repository
```bash
git clone https://github.com/sivaganesh7/Optic-Crop.git
cd Optic-Crop
```

### 2. Set up and activate a virtual environment
```bash
python -m venv .venv
.venv\Scripts\activate  # On Windows
source .venv/bin/activate  # On macOS/Linux
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Flask application
```bash
cd 06_Web_Application
python app.py
```
Open your browser and navigate to: **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## 🚀 Deployment

This repository is pre-configured for root-level deployment on **Render** using the provided [Procfile](file:///d:/Projects/Optic-Crop/Procfile) and [runtime.txt](file:///d:/Projects/Optic-Crop/runtime.txt). 
* The **Build Command** on Render should be: `pip install -r requirements.txt`
* The **Start Command** is handled automatically by the `Procfile` (`web: gunicorn --chdir 06_Web_Application app:app`).

---

## 📈 Future Enhancements

* **Fertilizer Recommendation**: Suggest appropriate fertilizers based on the N-P-K ratios entered.
* **Crop Disease Detection**: Add leaf image uploads to diagnose plant diseases.
* **Yield Prediction**: Estimate tonnage per hectare.
* **Weather Forecast Integration**: Auto-detect weather parameters using external APIs.
* **AI Chat Assistant**: Provide interactive agricultural advice using LLMs.
