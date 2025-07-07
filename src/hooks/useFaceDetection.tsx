import type {FaceDetectionResult} from '../types/types';
import { convertClarifaiResponse } from '../utils/clarifai';

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
  if(cached?.result) {
    return cached.result;
  }

  // if there was an error, throw it
  if (cached?.error) {
    throw cached.error;
  }

  // If we have a promise in flight, throw it to trigger suspense
  if (cached?.promise) {
    throw cached.promise;
  }

  // start new request
  const promise = fetch("/api/v2/models/" + MODEL_ID + "/outputs", generateClarifaiRequest(imageUrl))
    .then(res => res.json())
    .then(clarifaiData => {
        const result = convertClarifaiResponse(clarifaiData);

        // cache the result
        cache.set(imageUrl, {result});
        
        return result;
    })
    .catch(error => {
        cache.set(imageUrl, {error});

        throw error;
    });

    // cache the promise
    cache.set(imageUrl, { promise })

    throw promise;

}