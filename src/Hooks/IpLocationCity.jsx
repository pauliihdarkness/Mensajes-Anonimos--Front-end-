import { useEffect, useState } from "react";
import axios from "axios";

const IpLocationCity = () => {
  const locationCityApi = import.meta.env.VITE_LOCATION_API_URL;

  const [ciudad, setCiudad] = useState("Localización desconocida");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCiudad = async () => {
      try {
        const res = await axios.get(locationCityApi);
        const ciudadApi = res.data?.ip_response?.location?.city;
        setCiudad(ciudadApi || "Localización desconocida");
      } catch (err) {
        console.error("Error al obtener la ciudad:", err);
        setError(err);
        setCiudad("Localización desconocida");
      } finally {
        setLoading(false);
      }
    };

    obtenerCiudad();
  }, []);

  return { ciudad, loading, error };
};

export default IpLocationCity;
