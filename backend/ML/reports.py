import os
import h5py
import tensorflow as tf
# import keras as keras
import tensorflow.keras 
from tensorflow.keras.models import load_model
import cv2 as cv2
import matplotlib
from numpy import loadtxt
# from keras.models import load_model



# load model
#model = load_model('../backend/ML')
# summarize model.


model = load_model('./xray_model.h5')
model.summary()
load_image = cv2.imread(r'D:\\3-1\\Design Project\\My-Health-Keeper\\backend\\ML\\NORMAL2-IM-0086-0001.jpeg')
img_new = cv2.resize(load_image, (180,180))
new = img_new.reshape(1,img_new.shape[0], img_new.shape[1],3)
result = model.predict(new, steps=10)
print(result)