# cd BackEnd; cd recomendation-system; uvicorn server:app --reload


# Importing Necessary modules
from typing import Union
from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from joblib import dump, load

app = FastAPI()


@app.get('/')
def main():
    return {'message': 'Recomendation system!'}


@app.get('/recommend/')
async def read_item(tuoi: int, gioiTinh: str, BMI: float, tiLeMo: float, tiLeCo: float):
    model = load('model.mol')
    labels = model.classes_
    # print(model.predict_proba([[45, 100, 22.6, 11.2, 29.9]]))
    # http://127.0.0.1:8000/recommend?tuoi=45&gioiTinh=100&BMI=22.6&tiLeMo=11.2&tiLeCo=29.9
    if (gioiTinh == "NAM"):
        gioiTinh = 100
    else:
        gioiTinh = 0

    rs = []
    rs = model.predict_proba([[tuoi, gioiTinh, BMI, tiLeMo, tiLeCo]])[0]
    rs = dict(zip(labels, rs))
    print([tuoi, gioiTinh, BMI, tiLeMo, tiLeCo])
    return rs
