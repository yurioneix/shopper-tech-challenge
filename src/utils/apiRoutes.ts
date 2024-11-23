import axios from "axios";
import * as dotenv from "dotenv";
import { ComputeRoutesResponse, LatLongitude } from "../interfaces/apiRoute.interface";

dotenv.config();

export default async function getRoute(
    origin: LatLongitude, 
    destination: LatLongitude
): Promise<ComputeRoutesResponse> {
    
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        console.error("A chave da API incorreta ou não configurada no .env");
    }

    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

    const response = await axios.post<ComputeRoutesResponse>(
        url,
        {
        origin: { location: { latLng: origin } },
        destination: { location: { latLng: destination } },
        travelMode: "DRIVE",
        },
        {
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
        },
        }
    );
    return response.data;
} 