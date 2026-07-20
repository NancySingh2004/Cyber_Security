export default function SMSViewer({ messages }) {


  return (

    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">


      <table className="w-full text-left">


        <thead className="bg-slate-950">

          <tr>

            <th className="p-4 text-xs text-slate-500">
              NUMBER
            </th>


            <th className="p-4 text-xs text-slate-500">
              TYPE
            </th>


            <th className="p-4 text-xs text-slate-500">
              MESSAGE
            </th>


            <th className="p-4 text-xs text-slate-500">
              DATE
            </th>


          </tr>

        </thead>



        <tbody>


        {
          messages.map((sms,index)=>(

            <tr
              key={index}
              className="border-t border-slate-800"
            >


              <td className="p-4 text-white">

                {sms.address}

              </td>



              <td className="p-4">


                <span
                className={
                  sms.type==="Received"
                  ?
                  "text-green-400"
                  :
                  "text-cyan-400"
                }
                >

                  {sms.type}

                </span>


              </td>



              <td className="p-4 text-slate-300 max-w-md">

                <p className="truncate">

                {sms.body}

                </p>

              </td>



              <td className="p-4 text-slate-400">

                {sms.date}

              </td>


            </tr>

          ))
        }


        </tbody>


      </table>


    </div>

  )

}