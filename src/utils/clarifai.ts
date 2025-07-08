import type { BoundingBox, ClarifaiResponse, DetectedFace, FaceDetectionResult } from "../types/types";


/**
 * Converts Clarifai API response into a clean object easy to work with
 */
export function convertClarifaiResponse(response: ClarifaiResponse): FaceDetectionResult {
  const isSuccess = response.status.code === 10000;
  
  if (!isSuccess || !response.outputs.length) {
    return {
      success: false,
      imageUrl: '',
      faces: [],
      requestId: response.status.req_id,
      processedAt: new Date().toISOString()
    };
  }

  const output = response.outputs[0];
  const imageUrl = output.input.data.image.url;

  const regions = output.data.regions || [];
  
  const faces: DetectedFace[] = regions.map(region => {
    const bbox = region.region_info.bounding_box;
    
    const boundingBox: BoundingBox = {
      top: bbox.top_row,
      left: bbox.left_col,
      bottom: bbox.bottom_row,
      right: bbox.right_col,
      width: bbox.right_col - bbox.left_col,
      height: bbox.bottom_row - bbox.top_row
    };

    return {
      id: region.id,
      boundingBox,
      confidence: region.value
    };
  });

  return {
    success: true,
    imageUrl,
    faces,
    requestId: response.status.req_id,
    processedAt: output.created_at
  };
}

/**
 * Helper function to get face count
 */
export function getFaceCount(result: FaceDetectionResult): number {
  return result.faces.length;
}

/**
 * Helper function to get high-confidence faces (above threshold)
 */
export function getHighConfidenceFaces(
  result: FaceDetectionResult, 
  threshold: number = 0.9
): DetectedFace[] {
  return result.faces.filter(face => face.confidence >= threshold);
}

/**
 * Helper function to convert bounding box to CSS styles
 * Useful for positioning overlays on images
 */
export function boundingBoxToCSS(
  boundingBox: BoundingBox,
  imageWidth: number,
  imageHeight: number
): React.CSSProperties {
  return {
    position: 'absolute',
    left: `${boundingBox.left * imageWidth}px`,
    top: `${boundingBox.top * imageHeight}px`,
    width: `${boundingBox.width * imageWidth}px`,
    height: `${boundingBox.height * imageHeight}px`,
    border: '2px solid #ff6b6b',
    borderRadius: '4px',
    pointerEvents: 'none'
  };
}