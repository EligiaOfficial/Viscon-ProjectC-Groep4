
const ErrorField = ({title, description, buttonText, buttonFunction}: 
                        {title: string, description: string, buttonText: string, buttonFunction: any}
) => {

    return (

        <div id="toast-interactive"
             className="w-auto p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400
             fixed inset-x-0 insert-y-0 max-h-max my-auto max-w-max mx-auto"
             role="alert">
            <div className="flex justify-center p-5">
                <div className="text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
                    <div className="mb-2 text-sm font-normal">{description}</div>
                    <div className="">
                        <div onClick={buttonFunction}>
                            <a href="#"
                               className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center 
                               text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none 
                               focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            >
                                {buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default ErrorField
