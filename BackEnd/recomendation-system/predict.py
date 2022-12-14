from joblib import dump, load
model = load('model.mol')
print(model.predict_proba([[43, 100, 22.6, 11.2, 29.9]]))
