import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  Search,
  FileText,
  Settings,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {

  const location = useLocation();


  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard
    },
    {
      name: "Investigations",
      path: "/cases",
      icon: FolderOpen
    },
    {
      name: "AI Analysis",
      path: "/analysis",
      icon: Search
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    },
  ];



  return (

    <aside
      className="
        w-64
        min-h-screen
        flex
        flex-col
        bg-white
        dark:bg-[#0f1117]
        border-r
        border-slate-200
        dark:border-slate-800/60
      "
    >


      {/* Brand */}

      <div className="p-8 flex items-center gap-2">

        <div
          className="
            bg-cyan-500/10
            p-2
            rounded-lg
          "
        >

          <ShieldCheck
            size={24}
            className="text-cyan-500"
          />

        </div>


        <h1
          className="
            text-xl
            font-bold
            tracking-tight
            text-slate-900
            dark:text-white
          "
        >
          ForensiQ
        </h1>


      </div>




      {/* Navigation */}

      <nav className="flex-1 px-4 space-y-1">


        {
          navItems.map((item)=>{

            const isActive =
              location.pathname === item.path;


            const Icon = item.icon;


            return (

              <Link
                key={item.name}
                to={item.path}

                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  text-sm
                  font-medium
                  transition-all

                  ${
                    isActive
                    ?
                    "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20"
                    :
                    "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                  }
                `}
              >

                <Icon
                  size={18}
                  strokeWidth={
                    isActive ? 2.5 : 2
                  }
                />


                {item.name}


              </Link>

            );

          })
        }


      </nav>





      {/* Footer */}

      <div
        className="
          p-6
          border-t
          border-slate-200
          dark:border-slate-800/60
        "
      >

        <div
          className="
            bg-slate-100
            dark:bg-[#0a0c10]
            rounded-lg
            p-4
            border
            border-slate-200
            dark:border-slate-800
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-widest
              text-slate-500
              mb-1
            "
          >
            Node Status
          </p>


          <div
            className="
              flex
              items-center
              gap-2
              text-emerald-500
              text-xs
              font-bold
            "
          >

            <span
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-500
                animate-pulse
              "
            ></span>


            SECURE LINK

          </div>


        </div>

      </div>


    </aside>

  );

}