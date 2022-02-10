class Auth {
    constructor({ url, token }) {
        this.url = url;
        this.token = token;
    }

    _getResponseData(res) {
        if (res.ok) {
            console.log(res)
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

    }

    register({password, email}) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                // authorization: this.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, email})
        })
            .then(
                console.log(JSON.stringify({password, email})),
                this._getResponseData);
    }
}


const auth = new Auth({
    url: 'https://auth.nomoreparties.co',
    token: '76c1c471-2766-4a3c-9dbb-2acf0a9ae808'
});

export default auth;
