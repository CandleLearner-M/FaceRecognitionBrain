import type {FaceDetectionResult} from '../types/types';

const cache = new Map<string, {
  promise?: Promise<FaceDetectionResult>;
  result?: FaceDetectionResult;
  error?: Error;
}>();


const PAT = '5851bf812aee43c7b596e389ae7a999a';
const USER_ID = 'clarifai';       
const APP_ID = 'main';
const MODEL_ID = 'face-detection';


const generateClarifaiRequest = function (url: string) {
  
 const IMAGE_URL = url;

 const raw = JSON.stringify({
   "user_app_id": {
       "user_id": USER_ID,
       "app_id": APP_ID
   },
   "inputs": [
       {
           "data": {
               "image": {
                   "url": IMAGE_URL
               }
           }
       }
   ]
 });

 const requestOptions = {
     method: 'POST',
     headers: {
         'Accept': 'application/json',
         'Authorization': 'Key ' + PAT
     },
     body: raw
 };

 return requestOptions;
}

export function useFaceDetection(imageUrl: string): FaceDetectionResult {
  // check cached first
  const cached = cache.get(imageUrl);

  // if we have a cached result then return it
}