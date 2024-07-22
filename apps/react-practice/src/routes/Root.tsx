import {
  Form,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { createContact, getContacts } from "./../datas/contacts";
import { ContactName } from "./Contact";
import { Loading } from "../components/icons/icons";
import { useEffect, useRef } from "react";
import React from "react";
// import Loading from "./../components/icons/Loading.svg";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const contacts = await getContacts(q);
  return { contacts, q };
};

export const action = async () => {
  const contact = await createContact();
  // return { contact };
  return redirect(`/contacts/${contact.id}/edit`);
};

export default function Root() {
  const { contacts, q } = useLoaderData();
  console.log("contacts :>> ", contacts);

  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    search.current!.value = q;
  }, [q]);

  return (
    <div className="grid h-screen w-screen grid-cols-[260px_1fr]">
      <div className="grid h-full w-full grid-rows-[56px_1fr_40px] border-r border-gray-100 bg-gray-50">
        <header className="flex items-center justify-center border-b border-gray-100/90">
          <Search ref={search} defaultValue={q} />
          <Form method="post">
            <button
              type="submit"
              className="rounded-md bg-green-500 px-4 py-1 text-green-800 hover:bg-green-400"
            >
              new
            </button>
          </Form>
        </header>
        <nav>
          {contacts.length ? (
            <ul className="flex h-full flex-col space-y-1 px-3 py-2">
              {contacts.map((contact) => (
                <ContactLink contact={contact} key={contact.id} />
              ))}
            </ul>
          ) : (
            <p className="text-md py-3 text-center text-gray-400">
              <i>No Contacts</i>
            </p>
          )}
        </nav>
        <footer>footer</footer>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

function ContactLink({ contact }) {
  return (
    <NavLink
      className={({ isActive, isPending }) => {
        return `block rounded-xl px-3 py-2 text-purple-500 hover:bg-purple-300 ${isActive ? "bg-purple-300" : ""}`;
      }}
      to={`/contacts/${contact.id}`}
    >
      {({ isActive, isPending }) => {
        return (
          <ContactName
            contact={contact}
            children={!isActive && isPending ? <Loading /> : null}
          />
        );
      }}
    </NavLink>
  );
}

const Search = React.forwardRef<HTMLInputElement, { defaultValue: string }>(
  ({ defaultValue = "" }, ref) => {
    return (
      <Form role="search" className="flex items-center space-x-2 px-3">
        <input
          ref={ref}
          type="search"
          aria-label="Search contacts"
          placeholder="Search"
          name="q"
          defaultValue={defaultValue}
          className="w-[160px] rounded-md border border-green-500 bg-transparent px-2 py-1 outline-none hover:border-green-400 focus:border-2"
        />
      </Form>
    );
  },
);
