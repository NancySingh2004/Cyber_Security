import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext();



export function ThemeProvider({children}){


  const [theme,setThemeState] = useState(
    localStorage.getItem("theme") || "dark"
  );



  useEffect(()=>{


    const root = document.documentElement;


    if(theme==="light"){

      root.classList.remove("dark");

    }
    else{

      root.classList.add("dark");

    }


    localStorage.setItem(
      "theme",
      theme
    );


  },[theme]);




  const setTheme=(value)=>{

    setThemeState(value);

  };



  return (

    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}



export function useTheme(){

  return useContext(ThemeContext);

}