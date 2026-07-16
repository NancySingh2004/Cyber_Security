export default function SaveButton({

    loading,
    onClick

}) {

    return (

        <button

            onClick={onClick}

            disabled={loading}

            className="
                w-full
                bg-cyan-600
                hover:bg-cyan-700
                disabled:bg-slate-300
                dark:disabled:bg-slate-700
                text-white
                font-semibold
                py-3
                rounded-xl
                transition
            "

        >

            {
                loading
                    ? "Saving..."
                    : "Save Settings"
            }

        </button>

    );

}