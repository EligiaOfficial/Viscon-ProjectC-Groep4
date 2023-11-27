import {useState} from "react";

const RoundButton = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const toggleColor = () => {
        setIsSuccess(!isSuccess);
    };

    const buttonColorClass = isSuccess ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className="mb-2">
            <button
                className={`w-4 h-4 rounded-full text-white focus:outline-none ${buttonColorClass}`}
                onClick={toggleColor}
            >
            </button>
        </div>
    );
};

export default RoundButton
