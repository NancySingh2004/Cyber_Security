export default function EvidenceTable({ files }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-8">

      <h2 className="text-xl font-semibold mb-5">
        Evidence Repository
      </h2>


      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">

              <th className="p-3">
                File Name
              </th>

              <th className="p-3">
                Type
              </th>

              <th className="p-3">
                Size
              </th>

              <th className="p-3">
                SHA-256
              </th>

              <th className="p-3">
                Status
              </th>

            </tr>
          </thead>


          <tbody>

            {files.map((file,index)=>(

              <tr
                key={index}
                className="border-b border-slate-800"
              >

                <td className="p-3">
                  {file.name}
                </td>


                <td className="p-3">
                  {file.type}
                </td>


                <td className="p-3">
                  {file.size}
                </td>


                <td className="p-3 max-w-xs truncate text-cyan-400">
                  {file.hash}
                </td>


                <td className="p-3">

                  <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full">

                    Verified

                  </span>

                </td>


              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}