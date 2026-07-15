import { UploadCloud } from "lucide-react";

export default function UploadZone({
  cases,
  selectedCase,
  setSelectedCase,
  onSelectFiles,
}) {

  const handleChange = (e) => {

    const selectedFiles = Array.from(
      e.target.files
    );

    if (selectedFiles.length > 0) {
      onSelectFiles(selectedFiles);
    }

  };


  return (

    <div className="bg-slate-900 border-2 border-dashed border-cyan-500 rounded-xl p-10">


      <UploadCloud
        size={60}
        className="mx-auto text-cyan-400 mb-5"
      />


      <h2 className="text-2xl font-semibold text-center mb-2">
        Import Mobile Evidence
      </h2>


      <p className="text-slate-400 text-center mb-6">
        Supported:
        SQLite • APK • Images • ZIP • JSON • CSV
      </p>



      {/* Show case selector only for general upload */}

      {!selectedCase && (

        <div className="mb-6">

          <label className="block mb-2 font-medium">
            Select Investigation Case
          </label>


          <select
            value={selectedCase}
            onChange={(e) =>
              setSelectedCase(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3"
          >

            <option value="">
              -- Select Case --
            </option>


            {cases.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.title}
              </option>

            ))}


          </select>

        </div>

      )}



      {/* Upload */}

      <div className="text-center">


        <label
          htmlFor="evidence"
          className="cursor-pointer inline-block bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-semibold"
        >
          Browse Evidence
        </label>


        <input
          id="evidence"
          type="file"
          multiple
          hidden
          onChange={handleChange}
        />


      </div>


    </div>

  );

}