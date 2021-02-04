export class GithubUsersFinder {

    async getResults(query, numOfResults) {
        const url = `https://api.github.com/search/users?q=${query}&per_page=${numOfResults}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.items.map(user => ({
                text: user.login,
                value: user.id
            }));
        }
    }
}