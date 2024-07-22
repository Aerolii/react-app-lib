import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="container mx-auto grid h-screen grid-cols-1 grid-rows-1 place-items-center">
      <div className="-mt-[200px] grid min-h-[200px] place-items-center">
        <h1 className="text-2xl text-red-500">Oops!</h1>
        <p className="scroll-smooth font-normal text-gray-500">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-pretty text-gray-400">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
