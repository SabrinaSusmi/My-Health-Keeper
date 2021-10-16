import os
import h5py
#import tensorflow as tf
import keras as keras
import cv2 as cv2
from numpy import loadtxt
from keras.models import load_model



# load model
model = load_model('./xray_model.h5')
# summarize model.
model.summary()

load_image = cv2.imread('./backend/ML/person1_virus_7.jpeg')
img_new = cv2.resize(load_image, (180,180))
new = img_new.reshape(1,img_new.shape[0], img_new.shape[1],3)
result = new_model.predict(new, steps=10)
print(result[0][0])
