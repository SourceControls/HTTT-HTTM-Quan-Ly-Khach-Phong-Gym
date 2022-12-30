

from sklearn.neighbors import KNeighborsClassifier
# hỗ trợ chia ds ra 75%-tran và 25% test
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from joblib import dump


# from sklearn import tree  # 0.86
# from sklearn import svm  # 0.9
# from sklearn.naive_bayes import GaussianNB  # 0.94
# from sklearn.neural_network import MLPClassifier  # 0.9 - 10000


ds = pd.read_csv('Data_train.csv')


features = ds.values[:, :5]
features[:, 0:1] /= 100
features[:, 2:3] /= 40
features[:, 3:4] /= 40
features[:, 4:5] /= 50
# nhãn của từng features

nhan = np.transpose(ds.values[:, 5])

X_train = features
y_train = nhan

# ========== test data ==========
# y = []
# X_train, X_test, y_train, y_test = train_test_split(
#     features, nhan, test_size=0.25, random_state=1)
# for i in range(0, 150, 2):
#     if i == 0:
#         i = 1
#     model = KNeighborsClassifier(
#         n_neighbors=i, weights='distance').fit(X_train, y_train)
#     print("K = "+str(i)+", Score = " +
#           str(round(model.score(X_test, y_test), 2)))
# y.append(round(model.score(X_test, y_test), 2))
# plt.plot(range(0, 150, 2), y)

# ========== end test===========

model = KNeighborsClassifier(
    n_neighbors=40, weights='distance').fit(X_train, y_train)
dump(model, 'model.mol')

# print(model.score(X_test, y_test))
print(model.predict_proba([[24/100, 0, 24.5/40, 28/40, 31/50]])[0])

plt.show()
