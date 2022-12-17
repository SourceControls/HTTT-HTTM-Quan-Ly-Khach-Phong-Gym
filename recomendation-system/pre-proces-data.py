

from sklearn.neighbors import KNeighborsClassifier
# hỗ trợ chia ds ra 75%-tran và 25% test
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from joblib import dump, load


ds = pd.read_csv('Data_train.csv')


features = ds.values[:, :5]

# features[:, 0:1] /= 100  # tuoi
# features[:, 2:3] /= 45  # BMI
# features[:, 3:4] /= 45  # ti_le_mo
# features[:, 4:5] /= 55  # ti_le_co
print(ds)

nhan = np.transpose(ds.values[:, 5])
# print(features)

X_train = features
y_train = nhan

X_train, X_test, y_train, y_test = train_test_split(
    features, nhan, test_size=0.25, random_state=1)
for i in range(30):
    model = KNeighborsClassifier(n_neighbors=i+1).fit(X_train, y_train)
    print("K = "+str(i+1)+", Score = " +
          str(round(model.score(X_test, y_test), 2)))

model = KNeighborsClassifier(n_neighbors=11).fit(X_train, y_train)
dump(model, 'model.mol')

# print(model.score(X_test, y_test))

# save model

# print(model.predict_proba([[45, 100, 22.6, 11.2, 29.9]]))

# plt.scatter(X_train[:, 1:2], y_train, marker='o', c='b')
# plt.show()
