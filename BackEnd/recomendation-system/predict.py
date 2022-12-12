# hỗ trợ trong lưu trữ model
from joblib import dump, load

model = load('model.mol')

print(model.classes_)
print(model.predict_proba([[45, 100, 22.6, 11.2, 29.9]]))
