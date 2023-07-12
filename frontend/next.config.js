/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

}

module.exports = {
  nextConfig,

  //usar pa buscar as imagens em local host
  images: {
    domains: ['localhost'],
  },
}
