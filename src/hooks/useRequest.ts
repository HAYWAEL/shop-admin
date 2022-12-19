import { useState, useEffect } from 'react'

const useRequest = (fn) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const ret = await fn();
                setData(ret)
            } catch (err) {
                setError(err)
            }
            setLoading(false)

        }
        fetchData()
    }, [])

    return { data, error, loading }
}

export default useRequest