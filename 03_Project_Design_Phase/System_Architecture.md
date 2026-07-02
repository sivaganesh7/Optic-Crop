# System Architecture

## Overview

The OptiCrop system follows a three-layer architecture consisting of the Presentation Layer, Application Layer, and Machine Learning Layer.

## Architecture

User

↓

Web Browser

↓

HTML + CSS + JavaScript

↓

Flask Backend

↓

Machine Learning Model

↓

Crop Recommendation

## Components

### Presentation Layer

- HTML
- CSS
- JavaScript

Provides an interactive interface for users to enter soil and weather parameters.

### Application Layer

- Flask

Handles user requests, validates input, loads the trained model, and returns prediction results.

### Machine Learning Layer

- Logistic Regression
- K-Means Clustering

Processes the input values and predicts the most suitable crop.

### Dataset

Crop_recommendation.csv

Contains

- Nitrogen
- Phosphorous
- Potassium
- Temperature
- Humidity
- pH
- Rainfall
- Crop Label

## Advantages

- Modular
- Scalable
- Easy to maintain
- Easy to deploy