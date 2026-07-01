# Entity Relationship Diagram

## Project
OptiCrop Smart Agricultural Production Optimization System

## Entities

- User
- SoilData
- Crop
- Dataset
- MLModel
- Prediction
- Report

## Relationships

User (1) ------ (M) SoilData

SoilData (1) ------ (1) Prediction

Crop (1) ------ (M) Prediction

Dataset (1) ------ (M) MLModel

MLModel (1) ------ (M) Prediction

Prediction (1) ------ (M) Report

## Purpose

The ER diagram defines the database structure used for storing users, soil data, machine learning models, crop information, prediction history, and reports.