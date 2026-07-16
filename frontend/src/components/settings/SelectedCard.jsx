export default function SelectCard({

    title,
    description,
    value,
    options,
    onChange

}) {

    return (

        <div
            className="
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-800
                rounded-xl
                p-5
            "
        >

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
                    mb-4
                "
            >
                {description}
            </p>


            <select

                value={value}

                onChange={onChange}

                className="
                    w-full
                    bg-slate-100
                    dark:bg-slate-800
                    border
                    border-slate-300
                    dark:border-slate-700
                    rounded-lg
                    p-3
                    text-slate-900
                    dark:text-white
                    focus:outline-none
                    focus:border-cyan-500
                "

            >

                {options.map((item)=>(

                    <option
                        key={item}
                        value={item}
                    >
                        {item}
                    </option>

                ))}

            </select>


        </div>

    );

}