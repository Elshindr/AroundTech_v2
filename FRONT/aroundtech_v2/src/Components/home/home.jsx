import styles from './page.module.css';
import { useUser } from '../../Contexts/UserContext';
import { Error, Loading } from '../loadingError/loadingErrorComponent';

export default function Home() {

    // Utilisation du hook useUser
    const contextUser = useUser();
    const loading = contextUser.loading;
    const error = contextUser.error;


    if (loading) {
        return <Loading />;
    }

/*     if (error) {
        return <Error />;
    }
 */
    const userName = contextUser.user ? `${contextUser.user.firstname} ${contextUser.user.lastname}` : "Utilisateur";

    return (
        <main>
            <h1>Bienvenue sur l'application de Gestion Des Missions</h1>
            <div className={styles.userInfo}>
                <div className={styles.userName}>Bonjour, {userName}</div>
            </div>
            <div className={styles.citation}>
                "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte." <br /> — Winston Churchill
            </div>
        </main>
    )
}