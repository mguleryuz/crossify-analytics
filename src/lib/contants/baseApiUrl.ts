const PORT = () => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'production':
      return 8080
    case 'development':
      return 3000
    default:
      return 3000
  }
}

const baseApiUrl = () => `http://localhost:${PORT()}`

export default baseApiUrl
