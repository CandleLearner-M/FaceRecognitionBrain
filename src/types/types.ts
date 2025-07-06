// Input types (what comes from Clarifai)
export interface ClarifaiResponse {
  status: {
    code: number;
    description: string;
    req_id: string;
  };
  outputs: ClarifaiOutput[];
}

export interface ClarifaiOutput {
  id: string;
  status: {
    code: number;
    description: string;
  };
  created_at: string;
  input: {
    id: string;
    data: {
      image: {
        url: string;
        base64: string;
      };
    };
  };
  data: {
    regions: ClarifaiRegion[];
  };
}

export interface ClarifaiRegion {
  id: string;
  region_info: {
    bounding_box: {
      top_row: number;
      left_col: number;
      bottom_row: number;
      right_col: number;
    };
  };
  data: {
    concepts: Array<{
      id: string;
      name: string;
      value: number;
      app_id: string;
      user_id: string;
    }>;
  };
  value: number;
}

// Output types (simplified structure)
export interface FaceDetectionResult {
  success: boolean;
  imageUrl: string;
  faces: DetectedFace[];
  requestId: string;
  processedAt: string;
}

export interface DetectedFace {
  id: string;
  boundingBox: BoundingBox;
  confidence: number;
}

export interface BoundingBox {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
}