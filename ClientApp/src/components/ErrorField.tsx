
const ErrorField = ({error}: {error: string}) => {

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded">
            <span className="text-sm">{error}</span>
        </div>
    );
};

export default ErrorField
