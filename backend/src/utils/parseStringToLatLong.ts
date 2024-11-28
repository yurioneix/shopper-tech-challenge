import { LatLongitude } from "../interfaces/apiRoute.interface";

export function parseLatLng(latLngString: string): LatLongitude | null {
    // Expressão regular para extrair latitude e longitude da string
    const regex = /^(-?\d+\.\d+),\s*(-?\d+\.\d+)$/;
  
    const match = latLngString.match(regex);
  
    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
  
      return { latitude, longitude };
    } else {
      console.error("Formato inválido para a string de latitude e longitude.");
      return null;
    }
  }