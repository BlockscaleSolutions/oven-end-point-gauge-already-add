import FetchJsonClient from "fetch-json-client";

class WebService extends FetchJsonClient {
    constructor(base_url, token) {
        super();
        this.configure(config => {
            if (token) {
                config.withBaseUrl(base_url);
                config.withHeader("Authorization", `Bearer ${token}`);
            } else {
                config.withBaseUrl(base_url);
            }
        });
    }
}

export default new class {
    get auth() {
        console.log(0);
        const base_url = "localhost:9001/api";
        return new WebService(base_url);
    }

    get o() {
        const base_url = "";
        const token = window.localStorage.getItem("--jwt--");
        return new WebService(base_url, token);
    }
}();
