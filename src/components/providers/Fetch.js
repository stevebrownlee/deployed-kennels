export const fetchIt = (url, method = "GET", body = null) => {
    let options = {
        "method": method,
        "headers": {}
    }

    switch (method) {
        case "POST":
        case "PUT":
            options.headers = {
                "Content-Type": "application/json"
            }
            break;
        default:
            break;
    }

    if (body !== null) {
        options.body = body
    }

    options.headers.Authorization = `Bearer ${localStorage.getItem("kennel_token")}`

    return fetch(url, options).then(r => {
        let tokenStatus = "valid"
        if (r.status === 401) {
            tokenStatus = "invalid"
            localStorage.removeItem("kennel_token")
        }
        return {
            tokenStatus,
            data: r.json()
        }
    })

}

export const request = {
    init(url) {
        this.options = {}
        this.options.headers = {}
        this.options.headers.Authorization = `Bearer ${localStorage.getItem("kennel_token")}`
        this.url = url
    },

    get(url) {
        this.init(url)
        this.options.method = "GET"
        return this.send()
    },

    post(url) {
        this.init(url)
        this.options.method = "POST"
        this.options.headers["Content-Type"] = "application/json"
        this.options.headers["Accept"] = "application/json"
        return this
    },

    put(url) {
        this.init(url)
        this.options.method = "PUT"
        this.options.headers = {
            "Content-Type": "application/json"
        }
        return this
    },

    delete(url) {
        this.init(url)
        this.options.method = "DELETE"
        return this.send()
    },

    withBody(body) {
        if (this.options.method === "POST" || this.options.method === "PUT") {
            this.options.body = JSON.stringify(body)
        }
        return this
    },

    async send() {
        const req = await fetch(this.url, this.options)
        const parsed = await req.json()
        return parsed
    }
}