import { port, http } from './app'

const server = http.listen(port, () => console.log(`listening on port: ${port}`))

export default server
