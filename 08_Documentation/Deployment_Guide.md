# OptiCrop - Deployment Guide

This guide describes how to deploy the **OptiCrop** web application in three environments: a Local Machine, Render (Cloud Platform), and PythonAnywhere (WSGI-based hosting).

---

## 1. Local Machine Deployment
This is the simplest way to run the application for development and demonstration.

### Steps
1. Navigate to the project root:
   ```bash
   cd Optic-Crop
   ```
2. Activate your virtual environment:
   ```bash
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # macOS/Linux
   ```
3. Navigate to the web application folder:
   ```bash
   cd 06_Web_Application
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```
5. Access the application in your browser at `http://127.0.0.1:5000`.

---

## 2. Deployment on Render
Render is a modern cloud platform that offers free hosting for web services, making it ideal for Python/Flask projects.

### Step 1: Prepare the Repository
Ensure your project is pushed to a Git repository (GitHub or GitLab). The repository must contain:
- The `06_Web_Application/` directory.
- `06_Web_Application/requirements.txt` listing all dependencies.
- `06_Web_Application/app.py` as the main entry point.
- The pre-trained model file at `06_Web_Application/model/crop_model.pkl`.

### Step 2: Create a Web Service on Render
1. Log in to your **Render** dashboard ([dashboard.render.com](https://dashboard.render.com/)).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub/GitLab account and select your `Optic-Crop` repository.
4. Configure the service settings:
   - **Name**: `opticrop` (or any unique name).
   - **Region**: Select the region closest to your target users.
   - **Branch**: `main` (or your default branch).
   - **Root Directory**: `06_Web_Application` *(Critical: This tells Render to run commands inside the 06_Web_Application folder).*
   - **Runtime**: `Python 3` (or the version matching your local environment).
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app` *(Note: Render installs gunicorn automatically if it is in requirements.txt. Since we did not include it in our local requirements, we should add `gunicorn` to `06_Web_Application/requirements.txt` or use `python app.py` for development, but for production, gunicorn is highly recommended. Render can also run `python -m flask run --host 0.0.0.0 --port $PORT` as a start command).*
5. Scroll down and click **Create Web Service**.

### Step 3: Verify the Deployment
Render will build the project and deploy it. Once the log says `Your service is live`, click on the provided URL (e.g., `https://opticrop.onrender.com`) to test the application.

---

## 3. Deployment on PythonAnywhere
PythonAnywhere is a specialized Python hosting platform that uses WSGI servers.

### Step 1: Upload the Project Files
1. Log in to your **PythonAnywhere** account ([www.pythonanywhere.com](https://www.pythonanywhere.com/)).
2. Go to the **Files** tab.
3. Create a directory named `Optic-Crop`.
4. Upload all files from your local `06_Web_Application` folder into this directory (including `app.py`, `requirements.txt`, the `templates` and `static` folders, and the `model/crop_model.pkl` file). You can upload them as a ZIP file and unzip it using the bash console.

### Step 2: Create a Virtual Environment in PythonAnywhere
1. Go to the **Consoles** tab and open a **Bash** console.
2. Create and activate a virtual environment:
   ```bash
   mkvirtualenv --python=/usr/bin/python3.10 opticrop-venv
   ```
3. Install the project requirements:
   ```bash
   pip install -r /home/yourusername/Optic-Crop/requirements.txt
   ```
4. Note down the path to your virtual environment (usually `/home/yourusername/.virtualenvs/opticrop-venv`).

### Step 3: Configure the Web App
1. Go to the **Web** tab in PythonAnywhere and click **Add a new web app**.
2. Select **Manual Configuration** (do not select Flask, as we want to use our custom virtual environment).
3. Select the Python version (e.g., `Python 3.10`).
4. Once created, configure the paths in the Web tab:
   - **Source Code**: `/home/yourusername/Optic-Crop`
   - **Working Directory**: `/home/yourusername/Optic-Crop`
   - **Virtualenv**: Enter the path to your virtual environment: `/home/yourusername/.virtualenvs/opticrop-venv`
5. Scroll down to the **Static files** section and add paths to serve your CSS and JS:
   - **URL**: `/static/`
   - **Directory**: `/home/yourusername/Optic-Crop/static`

### Step 4: Edit the WSGI Configuration File
1. Under the **Web** tab, click on the link to the **WSGI configuration file** (usually `/var/www/yourusername_pythonanywhere_com_wsgi.py`).
2. Delete the default contents and replace them with:
   ```python
   import sys
   import os

   # Add your project directory to the sys.path
   project_home = '/home/yourusername/Optic-Crop'
   if project_home not in sys.path:
       sys.path = [project_home] + sys.path

   # Set the working directory
   os.chdir(project_home)

   # Import the Flask app object
   from app import app as application
   ```
3. Save the file.
4. Go back to the **Web** tab and click **Reload yourusername.pythonanywhere.com**.
5. Visit your URL to verify that the application is running.
