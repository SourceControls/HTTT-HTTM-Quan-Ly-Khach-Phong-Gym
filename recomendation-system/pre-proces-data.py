

from sklearn.neighbors import KNeighborsClassifier
# hỗ trợ chia ds ra 75%-tran và 25% test
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from joblib import dump, load


ds = pd.read_csv('Data_train.csv')


features = ds.values[:, :5]
# nhãn của từng features
nhan = np.transpose(ds.values[:, 5])


X_train = features
y_train = nhan

# ========== test data ==========

# X_train, X_test, y_train, y_test = train_test_split(
#     features, nhan, test_size=0.25, random_state=1)
# for i in range(0, 100, 5):
#     if i == 0:
#         i = 1
#     model = KNeighborsClassifier(n_neighbors=i).fit(X_train, y_train)
#     print("K = "+str(i)+", Score = " +
#           str(round(model.score(X_test, y_test), 2)))

# ========== end test===========

model = KNeighborsClassifier(n_neighbors=10).fit(X_train, y_train)
dump(model, 'model.mol')

# print(model.score(X_test, y_test))

# plt.scatter(X_train[:, 1:2], y_train, marker='o', c='b')
# plt.show()
