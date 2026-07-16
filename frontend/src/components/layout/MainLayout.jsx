import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {

  return (

    <div className="
      min-h-screen
      bg-slate-100
      dark:bg-[#0a0c10]
      text-slate-900
      dark:text-slate-200
      flex
      font-sans
    ">


      {/* Sidebar */}

      <div className="
        w-64
        border-r
        border-slate-200
        dark:border-slate-800/60
        bg-white
        dark:bg-[#0f1117]
      ">

        <Sidebar />

      </div>



      {/* Main Content */}

      <div className="
        flex-1
        flex
        flex-col
        min-w-0
      ">


        <Navbar />



        <main className="
          flex-1
          overflow-y-auto
          p-8
          bg-slate-50
          dark:bg-[#0a0c10]
        ">


          <div className="
            max-w-7xl
            mx-auto
          ">

            {children}

          </div>


        </main>




        <footer className="
          py-4
          px-8
          border-t
          border-slate-200
          dark:border-slate-800/40
          text-[10px]
          text-slate-500
          uppercase
          tracking-widest
          text-center
        ">

          Forensic Analysis System v2.4.0 • Internal Use Only

        </footer>


      </div>


    </div>

  );

}