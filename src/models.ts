export interface HeartRateMeasurement {
  time: number;
  rate: number;
  hrv: number;
}

//export interface HeartRateData {
  //heartrate: {
    //measurements: Measurement[];
    //trends: RunningTrends;
  //};
//}

export interface PulsatilityMeasurement {
  pulsatility: number;
  time: number;
}

//export interface PulsatilityData {
  //  measurements: PulsatilityMeasurements[];
    //trends: PulsatilityTrends;
//}

export interface RunningTrends {
   hrv: {
    average: number;
  };
  rate: {
    average: number;
  };
}

export interface PulsatilityTrends {
  average: number;
}

export interface DemoResults{
  heartrate: {
    measurements: HeartRateMeasurement[];
    trends: RunningTrends;
  };
  brainPulsatility: {
    measurements: PulsatilityMeasurement[];
    trends: PulsatilityTrends;
  };
  gIndex: {
    measurements: GIndexMeasurement[];
    trends: GIndexTrends;
  };
}

export interface GIndexTrends {
  average: number;
}

export interface GIndexMeasurement {
  index: number;
  time: number;
}