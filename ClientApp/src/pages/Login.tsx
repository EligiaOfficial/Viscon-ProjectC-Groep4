
function Login() {

    return (
        <>
            <div className="flex flex-row h-screen">
                <div className="basis-1/2 hidden md:block">
                    <img className={"object-cover w-full h-full"} src="https://viscongroup.eu/app/mu-plugins/customized-login/dist/images/background.jpg" alt=""/>
                </div>
                <div className="basis-full md:basis-1/3 bg-gray-150 mt-20">

                    <div className="mt-20 sm:mx-auto sm:max-w-sm">
                        <h1 className={"mb-3 pt-5 text-xl text-gray-800"}>Welcome!</h1>
                        <p className={"mb-5 text-sm text-gray-400"}>Voer uw gegevens in om door te gaan.</p>
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium leading-3 text-gray-500">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autoComplete="email" required
                                           className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-xs font-medium leading-2 text-gray-500">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="text-xs text-gray-600 hover:text-indigo-500">Lost your password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" autoComplete="current-password"
                                           required
                                           className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className={"flex justify-end"}>
                                <button type="submit"
                                        className="flex w-1/4 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Sign
                                    in
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login
