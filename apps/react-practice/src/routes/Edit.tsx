import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { updateContact } from "../datas/contacts";

export const updateContactAction = async ({ request, params }) => {
  const formData = await request.formData();
  const contact = Object.fromEntries(formData);
  await updateContact(params.contactId, contact);
  return redirect(`/contacts/${params.contactId}`);
};

export default function Edit() {
  const { contact } = useLoaderData();

  const navigate = useNavigate();

  console.log("contact :>> ", contact);

  return (
    <Form
      method="post"
      className="flex flex-col space-y-3 rounded-lg border p-3"
    >
      <div className="grid grid-cols-[120px_1fr_1fr] items-center space-x-3">
        <label
          htmlFor="name"
          className="justify-self-end text-pretty font-serif text-gray-600"
        >
          Name
        </label>
        <input
          name="first"
          type="text"
          id="name"
          defaultValue={contact.first}
          className="rounded-md border px-3 py-1"
        />
        <input
          name="last"
          type="text"
          defaultValue={contact.last}
          id="name"
          className="rounded-md border px-3 py-1"
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] items-center space-x-3">
        <label
          htmlFor="twitter"
          className="justify-self-end text-pretty font-serif text-gray-600"
        >
          Twitter
        </label>
        <input
          type="text"
          id="twitter"
          name="twitter"
          className="rounded-md border px-3 py-1"
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] items-center space-x-3">
        <label
          htmlFor="avator"
          className="justify-self-end text-pretty font-serif text-gray-600"
        >
          Avator URL
        </label>
        <input
          type="text"
          id="avator"
          name="avator"
          className="rounded-md border px-3 py-1"
        />
      </div>

      <div className="grid grid-cols-[120px_1fr] items-start space-x-3">
        <label
          htmlFor="notes"
          className="justify-self-end text-pretty font-serif text-gray-600"
        >
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          className="rounded-md border px-3 py-1"
        />
      </div>
      <div className="grid grid-flow-col grid-cols-[120px_1fr] gap-x-3">
        <div className="col-start-2 flex space-x-3">
          <button
            className="rounded-md border border-transparent bg-blue-500 px-4 py-1 text-blue-100 outline-none hover:bg-blue-400 focus:outline-blue-400"
            type="submit"
          >
            Save
          </button>
          <button
            className="rounded-md border border-transparent bg-red-500 px-4 py-1 text-red-100 outline-none hover:bg-red-400 focus:outline-blue-400"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Form>
  );
}
