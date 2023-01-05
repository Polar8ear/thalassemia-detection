# Thalassemia Detection System

This is a system that encapsulates a YOLOv5 classification model to detect thalassemia in microscopic images of blood cells.

## Getting Started

### Backend

1. Make sure you have installed python (3.9.13) by running `python --version` in your terminal
2. Change directory to backend directory: `cd backend`
3. Create a virtual environment using venv (optional): `python -m venv .venv`
4. Use the virtual environment:
```bash
# Linux and MacOS bash shell
source .venv/Scripts/activate

# Windows command prompt
.venv\Scripts\activate.bat

#Windows powershell
.venv\Scripts\Activate.ps1
```
5. Install the related packages: `pip install -r requirements.txt`
6. Start the backend server: `python app.py`

### Frontend

1. Make sure you have installed node by running `node --version` in your terminal
2. Change directory to frontend directory: `cd frontend`
3. Make sure you have yarn installed
```bash
# if you have node > v18
corepack enable

# else
npm install -g yarn
```
4. Install relevant packages: `yarn`
5. Start the frontend server: `yarn dev`