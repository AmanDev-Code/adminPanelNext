  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,

    async rewrites() {
      return [
        {
          source: "/",
          destination: "/login/userLogin", // Serve admin dashboard
        },
        {
          source: "/userlogin",
          destination: "/login/userLogin", // Serve admin login
        },
        {
          source: "/userDashboard",
          destination: "/userDashboard", // Serve admin login
        },
        {
          source: "/admin",
          destination: "/login/adminLogin", // Serve admin login
        },
        {
          source: "/dashboardAdmin",
          destination: "/adminDashboard", // Serve admin dashboard
        },
        // {
        //   source: "/about",
        //   destination: "/adminAbout", // Serve admin about
        // },
        // {
        //   source: "/login",
        //   destination: "/"
        // },
   
       
      ];
    }
  };

  module.exports = nextConfig;
