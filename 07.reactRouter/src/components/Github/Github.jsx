import { useLoaderData } from "react-router-dom"

function Github() {
  /* const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://api.github.com/users/hiteshchoudhary")
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(data);        
      })      
  },[]) */

  const data = useLoaderData()

  return (
    <div 
    className='text-center m-4 text-white bg-gray-600 
    p-4 text-3xl'>Github Followers: {data.followers}
    <img src={data.avatar_url} alt={data.name} width={300} />
    </div>
  )
}

export default Github

export const getFollowers = async () => {
  const response = await fetch("https://api.github.com/users/hiteshchoudhary")
  return response.json()
}