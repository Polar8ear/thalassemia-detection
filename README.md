# Thalassemia Detection System

This is a system that encapsulates a YOLOv5 classification model to detect thalassemia in microscopic images of blood cells.

## Getting Started

### Backend
1. Make sure you have installed python (3.9.13) by running `python --version` in your terminal
2. Change directory to backend directory: `cd backend`
3. Create a virtual environment using venv (optional): `python -m venv .venv`
4. Use the virtual environment (different for each opearting system) :`source .venv/Scripts/activate`
5. Install the related packages: `pip install -r requirements.txt`
6. Start the backend server: `python app.py`

### Frontend
1. Make sure you have installed python (3.9.13) by running `node --version` in your terminal
2. Change directory to frontend directory: `cd frontend`
3. Make sure you have yarn installed: `npm install --global yarn`
4. Install relevant packages: `yarn`
5. Start the frontend server: `yarn dev`