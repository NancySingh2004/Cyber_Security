export default function ToggleCard({

    title,
    description,
    checked,
    onChange

}) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-800
                rounded-xl
                p-5
            "
        >

            <div>

                <h3
                    className="
                        text-slate-900
                        dark:text-white
                        font-semibold
                    "
                >
                    {title}
                </h3>


                <p
                    className="
                        text-slate-500
                        dark:text-slate-400
                        text-sm
                        mt-1
                    "
                >
                    {description}
                </p>

            </div>



            <label className="relative inline-flex items-center cursor-pointer">

                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                />


                <div
                    className="
                        w-11
                        h-6
                        bg-slate-300
                        dark:bg-slate-700
                        rounded-full
                        peer
                        peer-checked:bg-cyan-600
                        after:content-['']
                        after:absolute
                        after:top-[2px]
                        after:left-[2px]
                        after:bg-white
                        after:border
                        after:rounded-full
                        after:h-5
                        after:w-5
                        after:transition-all
                        peer-checked:after:translate-x-full
                    "
                />


            </label>


        </div>

    );

}