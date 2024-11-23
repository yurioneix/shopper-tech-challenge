interface LatLongitude {
    latitude: number;
    longitude: number;
}
  
interface Route {
    distanceMeters: number;
    duration: string;
}
  
interface ComputeRoutesResponse {
    routes: Route[];
}

export {
    LatLongitude,
    Route,
    ComputeRoutesResponse
}