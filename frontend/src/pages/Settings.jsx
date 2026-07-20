import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";

import ToggleCard from "../components/settings/ToggleCard";
import SelectCard from "../components/settings/SelectedCard";
import SaveButton from "../components/settings/SaveButton";

import {
  getSettings,
  saveSettings,
} from "../services/settingsService";

import { useTheme } from "../context/ThemeContext";


export default function Settings() {


  const { setTheme } = useTheme();


  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");



  useEffect(() => {

    async function fetchSettings(){

      try{

        const data = await getSettings();

        setSettings(data);

        // Backend se theme sync
        if(data.theme){
          setTheme(data.theme);
        }

      }

      catch(error){

        console.error(error);

      }

      finally{

        setLoading(false);

      }

    }


    fetchSettings();


  }, []);



  const toggle = (key)=>{

    setSettings({

      ...settings,

      [key]: !settings[key]

    });

  };



  const handleSave = async()=>{


    try{


      setSaving(true);


      await saveSettings(settings);


      // Apply theme after save
      setTheme(settings.theme);



      setMessage(
        "Settings saved successfully"
      );


      setTimeout(()=>{

        setMessage("");

      },3000);


    }

    catch(error){


      console.error(error);


      setMessage(
        "Failed to save settings"
      );


    }

    finally{

      setSaving(false);

    }

  };



  if(loading){

    return (

      <MainLayout>

        <div className="text-white p-10">

          Loading settings...

        </div>

      </MainLayout>

    );

  }



  return (

    <MainLayout>


      <div className="max-w-4xl mx-auto space-y-6">


        <div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">

            Settings

          </h1>


          <p className="text-slate-500 dark:text-slate-400 mt-1">

            Configure forensic analysis preferences

          </p>

        </div>



        <ToggleCard

          title="Auto SHA-256 Hashing"

          description="Generate hash automatically after upload"

          checked={settings.auto_hash}

          onChange={()=>toggle("auto_hash")}

        />


        <ToggleCard

          title="Auto Analysis"

          description="Analyze evidence automatically"

          checked={settings.auto_analyze}

          onChange={()=>toggle("auto_analyze")}

        />



        <ToggleCard

          title="Integrity Verification"

          description="Verify evidence hash integrity"

          checked={settings.verify_integrity}

          onChange={()=>toggle("verify_integrity")}

        />



        <ToggleCard

          title="Preserve Original Evidence"

          description="Keep original uploaded files"

          checked={settings.preserve_original}

          onChange={()=>toggle("preserve_original")}

        />



        <ToggleCard

          title="WhatsApp Parser"

          description="Extract WhatsApp chats"

          checked={settings.whatsapp}

          onChange={()=>toggle("whatsapp")}

        />



        <ToggleCard

          title="SQLite Analyzer"

          description="Analyze database files"

          checked={settings.sqlite}

          onChange={()=>toggle("sqlite")}

        />



        <ToggleCard

          title="APK Analyzer"

          description="Analyze Android packages"

          checked={settings.apk}

          onChange={()=>toggle("apk")}

        />



        <ToggleCard

          title="ZIP Analyzer"

          description="Analyze archive evidence"

          checked={settings.zip}

          onChange={()=>toggle("zip")}

        />



        <ToggleCard

          title="AI Scam Detection"

          description="Detect suspicious conversations"

          checked={settings.scam_detection}

          onChange={()=>toggle("scam_detection")}

        />



        <ToggleCard

          title="Timeline Reconstruction"

          description="Generate event timeline"

          checked={settings.timeline}

          onChange={()=>toggle("timeline")}

        />



        <SelectCard

  title="Report Format"

  description="Default export format"

  value={settings.report_format}

  options={[
    "PDF",
    "JSON",
    "CSV",
    "HTML"
  ]}

  onChange={(e)=>

    setSettings({

      ...settings,

      report_format:e.target.value

    })

  }

/>



        <SelectCard

          title="Theme"

          description="Application appearance"

          value={settings.theme}

          options={[
            "dark",
            "light"
          ]}

          onChange={(e)=>{


            const newTheme = e.target.value;


            setSettings({

              ...settings,

              theme:newTheme

            });


            // Instant theme change
            setTheme(newTheme);


          }}

        />



        <SaveButton

          loading={saving}

          onClick={handleSave}

        />



        {

          message &&

          <div className="text-center text-cyan-500">

            {message}

          </div>

        }


      </div>


    </MainLayout>

  );

}