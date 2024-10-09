
async function patchUser(userId: string, body: { name: string, role: string, bio: string | null }) {

    return fetch(`/api/users?id=${userId}`, {
        method: "PATCH",
        body: JSON.stringify(body)
    })
        .then((res) => {
            if (!res.ok) throw new Error(`Could not patch user: ${res.statusText}`);
            return res.json()
        })
        .then((data) => data)
        .catch(err => {
            console.error(err)
            throw err
        })

}

export { patchUser }