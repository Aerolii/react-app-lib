import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { getContact } from "../datas/contacts";

export default function Contact() {
  const { contact } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div
      id="contact"
      className={`flex space-x-4 ${navigation.state === "loading" ? "animate-pulse" : ""}`}
    >
      <div className="h-40 w-40 overflow-hidden rounded-2xl shadow-md">
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div className="flex flex-col items-start space-y-2">
        <ContactName contact={contact} />

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              className="text-md text-blue-500"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && (
          <p className="text-sm italic text-gray-600">{contact.notes}</p>
        )}

        <div className="flex items-center space-x-4">
          <Form action="edit">
            <button
              type="submit"
              className="box-border w-20 rounded-md border-gray-200 bg-gray-200/60 px-4 py-1 text-green-500 outline-none hover:bg-gray-100 focus:border"
            >
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="box-border w-20 rounded-md border-gray-200 bg-gray-200/60 px-4 py-1 text-red-500 outline-none hover:bg-gray-100 focus:border"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const favorite = contact.favorite;
  return (
    <Form
      method="post"
      className="ml-2 flex size-5 items-center text-yellow-300"
    >
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        className="text-15"
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

export function ContactName({ contact, children }) {
  return (
    <h1 className="inline-flex items-center text-2xl font-semibold">
      {contact.first || contact.last ? (
        <>
          {contact.first} {contact.last}
        </>
      ) : (
        <i>No Name</i>
      )}{" "}
      <Favorite contact={contact} />
      <span className="ml-2"> {children && children}</span>
    </h1>
  );
}

// loader
export const contactLoader = async ({ params }) => {
  const contact = await getContact(params.contactId);
  return { contact };
};
