

from sklearn.neighbors import KNeighborsClassifier
# hỗ trợ chia ds ra 75%-tran và 25% test
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from joblib import dump, load


ds = pd.read_csv('Data_train.csv')
# print(ds.values.shape)

features = ds.values[:, :5]
labels = np.transpose(ds.values[:, 5])

X_train, X_test, y_train, y_test = train_test_split(
    features, labels, random_state=0)


# for i in range(100):
# model = KNeighborsClassifier(n_neighbors=i+1).fit(X_train, y_train)
# print(model.score(X_test, y_test))
model = KNeighborsClassifier(n_neighbors=12).fit(X_train, y_train)
print(model.score(X_test, y_test))
# save model
dump(model, 'model.mol')

print(model.predict_proba([[45, 100, 22.6, 11.2, 29.9]]))

# plt.scatter(X_train[:, 1:2], y_train, marker='o', c='b')
# plt.show()
