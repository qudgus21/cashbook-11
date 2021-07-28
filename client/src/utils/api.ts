const api = async (method: string, url:string, data={}) => {

    const apiHost = 'http://localhost:3000/api'
    
    let options: any = { 
        method, 
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (method.toUpperCase() === 'POST' || method.toUpperCase() === "PUT") 
        options.body = JSON.stringify(data);

    try {
        let response: any = await fetch(`${apiHost}${url}`, options);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result;
    } catch (e) {
        return { isFail: true, message: e.message };
    }
}

export default api;