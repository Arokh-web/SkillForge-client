module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        barBg: "#CFB77D",
        textMain: "#26353B",
        logout: "#FF0000",
        account: "#BBFF00",
        sidebarBg: "#26353B",
        taskBar: "#6F97A2",
        projectsDropdown: "#B75C5C",
        dashboardBg: "#F9E5C5",
      },
      fontFamily: {
        logo: ['"Island Moments"', "cursive"],
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
};
