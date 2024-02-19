import { useState, useEffect } from 'react';
import { useUser } from './UserContext';

export default function useUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contextUser = useUser();

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Envoi d'une requête GET à l'API pour récupérer les données de l'utilisateur
        const response = await fetch('/info-user', { credentials: 'include' });
        if (response.ok) {
          // Si la réponse est réussie, extrait les données JSON et les stocke dans le state userData
          const data = await response.json();
          setUserData(data);
          contextUser.updateUser(data);

        } else {
          // Si la réponse n'est pas réussie, lance une exception
          throw new Error('Échec du chargement des données utilisateur');
        }
      } catch (e) {
        // En cas d'erreur dans la requête, stocke le message d'erreur dans le state error
        setError(e.message);
      } finally {
        // Une fois la requête terminée, qu'elle soit réussie ou non, met le state loading à false
        setLoading(false);
      }
    }

    // Appel de la fonction fetchUserData à l'initialisation du composant
    fetchUserData();
  }, []);

  // Renvoie les states userData, loading et error pour être utilisés par les composants
  return { userData, loading, error };
}
