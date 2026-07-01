# OptiCrop - Installation Guide

This guide provides step-by-step instructions for installing and running the **OptiCrop** application on your local machine.

---

## 1. Prerequisites

Before installing the application, ensure you have the following software installed:

* **Python 3.8 or higher**: Download and install it from [python.org](https://www.python.org/downloads/). Make sure to check the box **"Add Python to PATH"** during installation.
* **pip (Python Package Installer)**: Usually comes pre-installed with Python.
* **VS Code (Visual Studio Code)**: Recommended code editor. Download it from [code.visualstudio.com](https://code.visualstudio.com/).
* **Git**: Optional, for cloning the repository. Download it from [git-scm.com](https://git-scm.com/).

---

## 2. Installation Steps

### Step 1: Clone or Download the Project
Clone the repository using Git, or download the ZIP file and extract it to a folder on your computer.

```bash
# Clone the repository
git clone <repository-url>

# Navigate into the project root directory
cd Optic-Crop
```

### Step 2: Open the Project in VS Code
1. Open **VS Code**.
2. Click on **File > Open Folder...** and select the `Optic-Crop` directory.
3. Open a terminal in VS Code (**Terminal > New Terminal**).

### Step 3: Set Up a Virtual Environment
It is highly recommended to use a virtual environment to avoid package conflicts.

```bash
# Create a virtual environment named '.venv'
python -m venv .venv

# Activate the virtual environment:
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1

# On Windows (Command Prompt):
.venv\Scripts\activate.bat

# On macOS / Linux:
source .venv/bin/activate
```

Once activated, your terminal prompt will be prefixed with `(.venv)`.

### Step 4: Install Dependencies
Navigate to the `06_Web_Application` folder and install the required libraries listed in `requirements.txt`:

```bash
# Navigate to the 06_Web_Application folder
cd 06_Web_Application

# Install dependencies
pip install -r requirements.txt
```

This command will install the following packages:
- **Flask**: The web framework.
- **joblib**: For loading the pre-trained model.
- **numpy** & **pandas**: For handling data matrices.
- **scikit-learn**: For running model predictions.

### Step 5: Verify Model File Placement
Ensure that the pre-trained model `crop_model.pkl` is located in the `06_Web_Application/model/` directory. If it is missing, copy it from `05_Model_Building/crop_model.pkl`.

---

## 3. Running the Application

1. In the terminal (inside the `06_Web_Application` directory and with the virtual environment activated), run the following command:
   ```bash
   python app.py
   ```
2. The terminal will display output similar to this:
   ```text
   Model bundle loaded successfully.
    * Serving Flask app 'app'
    * Debug mode: on
    * Running on http://127.0.0.1:5000
   ```
3. Open your web browser and go to:
   👉 **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## 4. Deactivating the Virtual Environment
When you are finished running the application, you can close the terminal or deactivate the virtual environment by running:
```bash
deactivate
```
