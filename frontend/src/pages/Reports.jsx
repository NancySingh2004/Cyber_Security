import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";

import {
  FileText,
  Download,
  Eye,
  Trash2,
  Plus,
  Search,
} from "lucide-react";


const API_URL = "http://127.0.0.1:8000/reports";


export default function Reports() {


  const [reports, setReports] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);



  // Fetch Reports

  const fetchReports = async()=>{

    try{

      const res = await fetch(
        `${API_URL}/`
      );

      const data = await res.json();

      setReports(data);

    }

    catch(error){

      console.error(
        "Failed to fetch reports",
        error
      );

    }

    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchReports();

  },[]);





  // Generate Report

  const generateReport = async()=>{


    const data = {

      case_name:"Mobile Theft Investigation",

      evidence_name:"msgstore.db",

      report_type:"PDF"

    };



    try{

      await fetch(
        `${API_URL}/`,
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify(data)

        }
      );


      fetchReports();


    }

    catch(error){

      console.error(error);

    }


  };






  // Delete Report

  const deleteReport = async(id)=>{


    try{

      await fetch(
        `${API_URL}/${id}`,
        {
          method:"DELETE"
        }
      );


      fetchReports();


    }

    catch(error){

      console.error(error);

    }


  };






  const filteredReports =
    reports.filter((report)=>

      report.case_name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );






  return (

    <MainLayout>


      <div className="space-y-8">



        {/* Header */}

        <div className="flex justify-between items-center">


          <div>

            <h1 className="
              text-3xl
              font-bold
              text-slate-900
              dark:text-white
            ">
              Reports
            </h1>


            <p className="text-slate-500 mt-1">
              Generate and manage forensic reports.
            </p>


          </div>




          <button

            onClick={generateReport}

            className="
            flex
            items-center
            gap-2
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            px-5
            py-3
            rounded-xl
            "

          >

            <Plus size={18}/>

            Generate Report


          </button>



        </div>






        {/* Search */}

        <div className="relative">


          <Search

            size={18}

            className="
            absolute
            left-4
            top-3.5
            text-slate-400
            "

          />



          <input

            value={search}

            onChange={(e)=>
              setSearch(e.target.value)
            }


            placeholder="Search reports..."


            className="
            w-full
            pl-11
            py-3
            rounded-xl
            border
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            text-slate-900
            dark:text-white
            "

          />


        </div>







        {/* Table */}


        <div className="
          rounded-xl
          overflow-hidden
          border
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-slate-900
        ">



        {

          loading ?

          (

            <div className="p-10 text-center text-slate-500">

              Loading reports...

            </div>

          )

          :

          (

          <table className="w-full">


            <thead className="
              bg-slate-100
              dark:bg-slate-800
            ">


              <tr>


                <th className="px-6 py-4 text-left">
                  Case
                </th>


                <th className="px-6 py-4 text-left">
                  Evidence
                </th>


                <th className="px-6 py-4 text-left">
                  Type
                </th>


                <th className="px-6 py-4 text-left">
                  Status
                </th>


                <th className="px-6 py-4 text-left">
                  Date
                </th>


                <th className="px-6 py-4 text-center">
                  Actions
                </th>


              </tr>


            </thead>




            <tbody>


            {

              filteredReports.map((report)=>(


                <tr

                key={report.id}

                className="
                border-t
                border-slate-200
                dark:border-slate-800
                "

                >



                <td className="px-6 py-5">

                  {report.case_name}

                </td>




                <td className="px-6 py-5">

                  {report.evidence_name}

                </td>




                <td className="px-6 py-5">

                  {report.report_type}

                </td>





                <td className="px-6 py-5">


                  <span className="
                  px-3
                  py-1
                  rounded-full
                  bg-emerald-500/10
                  text-emerald-500
                  text-xs
                  ">

                    {report.status}

                  </span>


                </td>





                <td className="px-6 py-5">

                  {
                    new Date(
                      report.created_at
                    ).toLocaleDateString()
                  }

                </td>






                <td className="px-6 py-5">


                  <div className="
                  flex
                  justify-center
                  gap-3
                  ">



                  <button

                  onClick={()=>window.open(
                    `${API_URL}/view/${report.id}`,
                    "_blank"
                  )}

                  >

                    <Eye
                    size={18}
                    className="text-cyan-500"
                    />

                  </button>






                  <button

                  onClick={()=>window.open(
                    `${API_URL}/download/${report.id}`,
                    "_blank"
                  )}

                  >

                    <Download
                    size={18}
                    className="text-emerald-500"
                    />

                  </button>






                  <button

                  onClick={()=>deleteReport(report.id)}

                  >

                    <Trash2
                    size={18}
                    className="text-red-500"
                    />

                  </button>



                  </div>


                </td>




                </tr>


              ))

            }


            </tbody>



          </table>

          )

        }


        </div>






        <div className="
        rounded-xl
        bg-cyan-500/10
        border
        border-cyan-500/20
        p-5
        flex
        items-center
        gap-3
        ">


          <FileText
          className="text-cyan-500"
          size={26}
          />


          <div>

            <h3 className="
            font-semibold
            text-slate-900
            dark:text-white
            ">
              Forensic Reports
            </h3>


            <p className="text-sm text-slate-500">

              PDF reports generated from investigation data.

            </p>


          </div>


        </div>



      </div>


    </MainLayout>

  );

}