

export default class CronService {

    static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/cron`;

    static async launchCron() {

        return fetch(this.url, {
            method: 'GET',
            credentials: 'include', // Inclure les cookies si nécessaire
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                return res;
            })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error("Erreur dans launchCron", error);
            });
    }
}  